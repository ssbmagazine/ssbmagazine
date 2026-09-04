import { useEffect, useMemo, useState } from "react";
import { CoverCard } from "../components/CoverCard";
import { useI18n } from "../i18n/context";
import { decadesWithIssues, issuesByYear, issueTitle, latestIssue } from "../lib/issues";

export function ArchivePage() {
  const { lang, t, fmt } = useI18n();
  const [decade, setDecade] = useState<number | null>(null);
  const latest = latestIssue();
  const decades = decadesWithIssues();
  const shelves = useMemo(() => issuesByYear(decade), [decade]);

  useEffect(() => {
    const id = window.location.hash.replace(/^#/, "");
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [shelves]);

  return (
    <article>
      <p className="page-kicker">{t.nav.archive}</p>
      <h2 className="page-title">{t.archive.title}</h2>
      <p className="lede">{t.archive.lede}</p>

      {latest ? (
        <section className="latest-block" style={{ marginBottom: "2rem" }}>
          <CoverCard issue={latest} large />
          <div>
            <p className="page-kicker">{t.archive.latest}</p>
            <h3>{issueTitle(latest, lang)}</h3>
          </div>
        </section>
      ) : null}

      <div className="decade-bar" role="tablist" aria-label={t.archive.title}>
        <button
          type="button"
          className="chip"
          aria-pressed={decade === null}
          onClick={() => setDecade(null)}
        >
          {t.archive.all}
        </button>
        {decades.map((item) => (
          <button
            key={item}
            type="button"
            className="chip"
            aria-pressed={decade === item}
            onClick={() => setDecade(item)}
          >
            {fmt(t.archive.decade, item)}
          </button>
        ))}
      </div>

      {shelves.length === 0 ? <p className="muted">{t.archive.empty}</p> : null}

      {shelves.map((shelf) => (
        <section className="shelf" key={shelf.year} id={`year-${shelf.year}`}>
          <div className="shelf-head">
            <h2>{shelf.year}</h2>
            <span className="shelf-count">{fmt(t.archive.issues, shelf.issues.length)}</span>
          </div>
          <div className="rail">
            {shelf.issues.map((issue) => (
              <CoverCard key={issue.id} issue={issue} />
            ))}
          </div>
        </section>
      ))}
    </article>
  );
}
