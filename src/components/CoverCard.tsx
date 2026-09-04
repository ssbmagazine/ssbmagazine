import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/context";
import { assetUrl, issuePath, issueTitle } from "../lib/issues";
import type { Issue } from "../types";

type Props = {
  issue: Issue;
  large?: boolean;
  compact?: boolean;
  className?: string;
};

export function CoverCard({ issue, large, compact, className = "" }: Props) {
  const { lang, t } = useI18n();
  const [src, setSrc] = useState(assetUrl(issue.cover));
  const [failed, setFailed] = useState(false);
  const rendered = useRef(false);

  useEffect(() => {
    setSrc(assetUrl(issue.cover));
    setFailed(false);
    rendered.current = false;
  }, [issue.cover]);

  useEffect(() => {
    if (!failed || rendered.current) return;
    let cancelled = false;
    rendered.current = true;

    (async () => {
      try {
        const { loadPdf } = await import("../lib/pdf");
        const doc = await loadPdf(assetUrl(issue.pdf));
        const page = await doc.getPage(1);
        const viewport = page.getViewport({ scale: 0.45 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext("2d");
        if (!context) return;
        await page.render({ canvasContext: context, viewport, canvas }).promise;
        if (!cancelled) {
          setSrc(canvas.toDataURL("image/jpeg", 0.82));
          setFailed(false);
        }
        await doc.destroy();
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [failed, issue.pdf]);

  return (
    <Link
      to={issuePath(issue)}
      className={`cover-link cover-card${large ? " large" : ""} ${className}`.trim()}
      aria-label={`${t.archive.open}: ${issueTitle(issue, lang)}`}
    >
      <div className="cover-frame">
        {issue.type === "special" ? <span className="cover-badge">{t.archive.special}</span> : null}
        {failed ? (
          <div className="cover-fallback">{issueTitle(issue, lang)}</div>
        ) : (
          <img
            src={src}
            alt=""
            onError={() => setFailed(true)}
          />
        )}
      </div>
      {compact ? null : <p className="cover-label">{issueTitle(issue, lang)}</p>}
    </Link>
  );
}
