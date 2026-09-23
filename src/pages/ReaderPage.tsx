import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { IconMoon, IconSun } from "../components/Icons";
import { PageThumb } from "../components/PageThumb";
import { PdfPage } from "../components/PdfPage";
import { useI18n } from "../i18n/context";
import { useTheme } from "../theme/context";
import {
  assetUrl,
  findIssue,
  issueNeighbors,
  issuePath,
  issueTitle,
  lastPageKey,
} from "../lib/issues";
import { pdfjs } from "../lib/pdf";

export function ReaderPage() {
  const { year = "", slug = "" } = useParams();
  const issue = findIssue(year, slug);
  const { lang, setLang, t, fmt } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [error, setError] = useState(false);
  const [pageCount, setPageCount] = useState(issue?.pageCount ?? 0);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(1.4);
  const pagesRef = useRef<HTMLDivElement>(null);
  const hopperRailRef = useRef<HTMLDivElement>(null);
  const jumpTargetRef = useRef<number | null>(null);
  const currentPageRef = useRef(1);

  const neighbors = issue ? issueNeighbors(issue) : { prev: null, next: null };
  const pages = useMemo(() => Array.from({ length: pageCount }, (_, i) => i + 1), [pageCount]);

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  useEffect(() => {
    setPdf(null);
    setError(false);
    setCurrentPage(1);
    setZoom(1);
    setAspectRatio(1.4);
    jumpTargetRef.current = null;
    if (!issue) return;

    let cancelled = false;
    const task = pdfjs.getDocument({
      url: assetUrl(issue.pdf),
      isEvalSupported: true,
    });
    task.promise
      .then(async (doc) => {
        if (cancelled) {
          void doc.destroy();
          return;
        }
        try {
          const first = await doc.getPage(1);
          if (!cancelled) {
            const viewport = first.getViewport({ scale: 1 });
            setAspectRatio(viewport.height / viewport.width);
          }
        } catch {
          /* keep default aspect */
        }
        setPdf(doc);
        setPageCount(doc.numPages);
        try {
          const stored = Number(localStorage.getItem(lastPageKey(issue.id)));
          if (stored >= 1 && stored <= doc.numPages) setCurrentPage(stored);
        } catch {
          /* ignore */
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
      void task.destroy();
    };
  }, [issue]);

  useEffect(() => {
    const node = pagesRef.current;
    if (!node) return;
    const observer = new ResizeObserver((entries) => {
      const next = entries[0]?.contentRect.width ?? 0;
      setWidth(Math.floor(next));
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [pdf]);

  useEffect(() => {
    if (!issue || !pdf) return;
    try {
      localStorage.setItem(lastPageKey(issue.id), String(currentPage));
    } catch {
      /* ignore */
    }
  }, [currentPage, issue, pdf]);

  useEffect(() => {
    if (!pdf) return;
    const node = pagesRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const page = Number((visible?.target as HTMLElement | undefined)?.dataset.page);
        if (!page) return;
        if (jumpTargetRef.current !== null) {
          if (page === jumpTargetRef.current) jumpTargetRef.current = null;
          else return;
        }
        setCurrentPage(page);
      },
      { root: null, threshold: [0.35, 0.55, 0.75] },
    );
    node.querySelectorAll("[data-page]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pdf, pageCount, width, aspectRatio]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollToPage(Math.min(pageCount, currentPageRef.current + 1));
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollToPage(Math.max(1, currentPageRef.current - 1));
      } else if (event.key === "]" && neighbors.next) {
        navigate(issuePath(neighbors.next));
      } else if (event.key === "[" && neighbors.prev) {
        navigate(issuePath(neighbors.prev));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, neighbors.next, neighbors.prev, pageCount]);

  useEffect(() => {
    const active = hopperRailRef.current?.querySelector(".page-thumb.active");
    active?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [currentPage, pdf]);

  useEffect(() => {
    if (!pdf || currentPage <= 1) return;
    const id = requestAnimationFrame(() => scrollToPage(currentPage, "auto"));
    return () => cancelAnimationFrame(id);
  }, [pdf]);

  function scrollToPage(page: number, behavior?: ScrollBehavior) {
    if (pageCount < 1) return;
    const clamped = Math.min(Math.max(1, page), pageCount);
    const distance = Math.abs(clamped - currentPageRef.current);
    const resolved = behavior ?? (distance > 1 ? "auto" : "smooth");
    jumpTargetRef.current = clamped;
    setCurrentPage(clamped);
    const target = pagesRef.current?.querySelector(`[data-page="${clamped}"]`);
    target?.scrollIntoView({ behavior: resolved, block: "start" });
    if (resolved === "auto") {
      requestAnimationFrame(() => {
        if (jumpTargetRef.current === clamped) jumpTargetRef.current = null;
      });
    } else {
      window.setTimeout(() => {
        if (jumpTargetRef.current === clamped) jumpTargetRef.current = null;
      }, 500);
    }
  }

  if (!issue) {
    return (
      <div className="reader">
        <p className="reader-status">{t.reader.missing}</p>
        <p className="reader-status">
          <Link className="inline-link" to="/archive">
            {t.reader.backArchive}
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="reader">
      <div className="reader-bar">
        <div className="reader-exit">
          <Link className="btn reader-home" to="/" aria-label={t.reader.backHome}>
            {t.reader.backHomeShort}
          </Link>
          <Link
            className="btn solid reader-back"
            to={`/archive#year-${issue.year}`}
            aria-label={t.reader.backArchive}
          >
            <span className="reader-back-full">{t.reader.backArchive}</span>
            <span className="reader-back-short" aria-hidden="true">
              ← {t.reader.backArchiveShort}
            </span>
          </Link>
        </div>
        <div className="reader-title">
          <strong>{issueTitle(issue, lang)}</strong>
          <span className="reader-page-full">
            {pageCount ? fmt(t.reader.page, currentPage, pageCount) : t.reader.loading}
          </span>
          <span className="reader-page-short">
            {pageCount ? fmt(t.reader.pageShort, currentPage, pageCount) : "…"}
          </span>
        </div>
        <div className="reader-actions">
          <button type="button" className="icon-btn" aria-label={t.reader.zoomOut} onClick={() => setZoom((z) => Math.max(0.7, z - 0.15))}>
            <span className="label-full">{t.reader.zoomOut}</span>
            <span className="label-short" aria-hidden="true">−</span>
          </button>
          <button type="button" className="icon-btn" aria-label={t.reader.fit} onClick={() => setZoom(1)}>
            <span className="label-full">{t.reader.fit}</span>
            <span className="label-short" aria-hidden="true">⟷</span>
          </button>
          <button type="button" className="icon-btn" aria-label={t.reader.zoomIn} onClick={() => setZoom((z) => Math.min(2.2, z + 0.15))}>
            <span className="label-full">{t.reader.zoomIn}</span>
            <span className="label-short" aria-hidden="true">+</span>
          </button>
          <a className="icon-btn" href={assetUrl(issue.pdf)} download aria-label={t.reader.download}>
            <span className="label-full">{t.reader.download}</span>
            <span className="label-short" aria-hidden="true">↓</span>
          </a>
          <button type="button" className="icon-btn" onClick={() => setLang(lang === "te" ? "en" : "te")}>
            {lang === "te" ? "EN" : "తె"}
          </button>
          <button
            type="button"
            className="icon-btn theme-toggle"
            onClick={toggleTheme}
            aria-pressed={theme === "dark"}
            aria-label={theme === "dark" ? t.theme.light : t.theme.dark}
          >
            {theme === "dark" ? <IconSun /> : <IconMoon />}
          </button>
        </div>
      </div>

      {!pdf && !error ? <p className="reader-status">{t.reader.loading}</p> : null}
      {error ? <p className="reader-status">{t.reader.error}</p> : null}

      {pdf ? (
        <div className="reader-pages" ref={pagesRef}>
          {pages.map((pageNumber) => (
            <PdfPage
              key={`${issue.id}-${pageNumber}`}
              pdf={pdf}
              pageNumber={pageNumber}
              width={width}
              zoom={zoom}
              aspectRatio={aspectRatio}
            />
          ))}
        </div>
      ) : (
        <div className="reader-pages" ref={pagesRef} />
      )}

      <div className="reader-hopper">
        <div className="hopper-nav">
          {neighbors.prev ? (
            <Link className="btn" to={issuePath(neighbors.prev)}>
              {t.reader.prevIssue}
            </Link>
          ) : (
            <span />
          )}
          {neighbors.next ? (
            <Link className="btn" to={issuePath(neighbors.next)}>
              {t.reader.nextIssue}
            </Link>
          ) : (
            <span />
          )}
        </div>
        {pdf ? (
          <div className="hopper-rail" ref={hopperRailRef}>
            {pages.map((pageNumber) => (
              <PageThumb
                key={`${issue.id}-thumb-${pageNumber}`}
                pdf={pdf}
                pageNumber={pageNumber}
                active={pageNumber === currentPage}
                onSelect={scrollToPage}
                label={fmt(t.reader.pageThumb, pageNumber)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
