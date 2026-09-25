import { Link } from "react-router-dom";
import { CoverCard } from "../components/CoverCard";
import { CoverSlideshow } from "../components/CoverSlideshow";
import { useI18n } from "../i18n/context";
import { assetUrl, issuePath, issueTitle, latestIssue } from "../lib/issues";

export function HomePage() {
  const { lang, t } = useI18n();
  const latest = latestIssue();

  return (
    <article className="home-page">
      <section className="home-hero">
        <img
          className="home-hero-image"
          src={assetUrl("brand/hero-swami-book.jpg")}
          alt={t.home.heroAlt}
        />
        <div className="home-hero-copy">
          <p className="page-kicker">{t.home.kicker}</p>
          <h2 className="page-title">{t.siteTitle}</h2>
          <p className="lede">{t.home.intro}</p>
        </div>
      </section>

      <CoverSlideshow />

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
