import { Link } from "react-router-dom";
import { useI18n } from "../i18n/context";

export function SearchPage() {
  const { t } = useI18n();

  return (
    <article>
      <p className="page-kicker">{t.nav.search}</p>
      <h2 className="page-title">{t.search.title}</h2>
      <p className="lede">{t.search.lede}</p>
      <section className="panel">
        <p>{t.search.note}</p>
        <p style={{ marginTop: "1rem" }}>
          <Link className="inline-link" to="/archive">
            {t.nav.archive}
          </Link>
        </p>
      </section>
    </article>
  );
}
