import { Link } from "react-router-dom";
import { useI18n } from "../i18n/context";

export function ResourcesPage() {
  const { t } = useI18n();

  return (
    <article>
      <p className="page-kicker">{t.nav.resources}</p>
      <h2 className="page-title">{t.resources.title}</h2>
      <p className="lede">{t.resources.lede}</p>
      <section className="panel">
        <p>{t.resources.note}</p>
        <p style={{ marginTop: "1rem" }}>
          <Link className="inline-link" to="/archive">
            {t.nav.archive}
          </Link>
        </p>
      </section>
    </article>
  );
}
