import { Link } from "react-router-dom";
import { CoverCard } from "../components/CoverCard";
import { useI18n } from "../i18n/context";
import { issuePath, issueTitle, latestIssue } from "../lib/issues";

export function HomePage() {
  const { lang, t } = useI18n();
  const latest = latestIssue();

  return (
    <article>
      <p className="page-kicker">{t.home.kicker}</p>
      <h2 className="page-title">{t.siteTitle}</h2>
      <p className="lede">{t.home.intro}</p>

      <figure className="hero-slot">
        <p>{t.home.heroCaption}</p>
      </figure>

      {latest ? (
        <section className="latest-block">
          <CoverCard issue={latest} large />
          <div>
            <p className="page-kicker">{t.home.latest}</p>
            <h3>{issueTitle(latest, lang)}</h3>
            <div className="cta-row">
              <Link className="btn solid" to={issuePath(latest)}>
                {t.home.readIssue}
              </Link>
              <Link className="btn" to="/archive">
                {t.home.browseArchive}
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <Link className="btn" to="/archive">
          {t.home.browseArchive}
        </Link>
      )}
    </article>
  );
}
