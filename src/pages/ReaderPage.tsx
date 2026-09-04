import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { CoverCard } from "../components/CoverCard";
import { PdfPage } from "../components/PdfPage";
import { useI18n } from "../i18n/context";
import { useTheme } from "../theme/context";
import {
  assetUrl,
  findIssue,
  issueNeighbors,
  issuePath,
  issuesForYear,
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
  const pagesRef = useRef<HTMLDivElement>(null);

  const neighbors = issue ? issueNeighbors(issue) : { prev: null, next: null };
  const yearIssues = issue ? issuesForYear(issue.year) : [];
  const pages = useMemo(() => Array.from({ length: pageCount }, (_, i) => i + 1), [pageCount]);

  useEffect(() => {
    setPdf(null);
    setError(false);
    setCurrentPage(1);
    setZoom(1);
    if (!issue) return;

    let cancelled = false;
    const task = pdfjs.getDocument({
      url: assetUrl(issue.pdf),
      isEvalSupported: true,
    });
    task.promise
      .then((doc) => {
        if (cancelled) {
          void doc.destroy();
          return;
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
        if (page) setCurrentPage(page);
      },
      { root: null, threshold: [0.35, 0.55, 0.75] },
    );
    node.querySelectorAll("[data-page]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pdf, pageCount, width]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollToPage(Math.min(pageCount, currentPage + 1));
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollToPage(Math.max(1, currentPage - 1));
      } else if (event.key === "]" && neighbors.next) {
        navigate(issuePath(neighbors.next));
      } else if (event.key === "[" && neighbors.prev) {
        navigate(issuePath(neighbors.prev));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentPage, navigate, neighbors.next, neighbors.prev, pageCount]);

  useEffect(() => {
    document.querySelector(".hopper-cover.active")?.scrollIntoView({
      inline: "center",
      block: "nearest",
    });
  }, [issue]);

  useEffect(() => {
    if (!pdf || currentPage <= 1) return;
    const id = requestAnimationFrame(() => scrollToPage(currentPage, "auto"));
    return () => cancelAnimationFrame(id);
  }, [pdf]);

  function scrollToPage(page: number, behavior: ScrollBehavior = "smooth") {
    if (pageCount < 1) return;
    const clamped = Math.min(Math.max(1, page), pageCount);
    const target = pagesRef.current?.querySelector(`[data-page="${clamped}"]`);
    target?.scrollIntoView({ behavior, block: "start" });
    setCurrentPage(clamped);
  }

  if (!issue) {
    return (
      <div className="reader">
        <p className="reader-status">{t.reader.missing}</p>
        <p className="reader-status">
          <Link className="inline-link" to="/archive">
            {t.reader.close}
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="reader">
      <div className="reader-bar">
        <Link className="btn" to={`/archive#year-${issue.year}`}>
          {t.reader.close}
        </Link>
        <div className="reader-title">
          <strong>{issueTitle(issue, lang)}</strong>
          <span>
            {pageCount ? fmt(t.reader.page, currentPage, pageCount) : t.reader.loading}
          </span>
        </div>
        <div className="reader-actions">
          <button type="button" className="icon-btn" onClick={() => setZoom((z) => Math.max(0.7, z - 0.15))}>
            {t.reader.zoomOut}
          </button>
          <button type="button" className="icon-btn" onClick={() => setZoom(1)}>
            {t.reader.fit}
          </button>
          <button type="button" className="icon-btn" onClick={() => setZoom((z) => Math.min(2.2, z + 0.15))}>
            {t.reader.zoomIn}
          </button>
          <a className="icon-btn" href={assetUrl(issue.pdf)} download>
            {t.reader.download}
          </a>
          <button type="button" className="icon-btn" onClick={() => setLang(lang === "te" ? "en" : "te")}>
            {lang === "te" ? "EN" : "తె"}
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-pressed={theme === "dark"}
            aria-label={theme === "dark" ? t.theme.light : t.theme.dark}
          >
            {theme === "dark" ? "Aa" : "A"}
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
        <div className="hopper-rail">
          {yearIssues.map((item) => (
            <CoverCard
              key={item.id}
              issue={item}
              compact
              className={`hopper-cover${item.id === issue.id ? " active" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
