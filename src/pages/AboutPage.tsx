import { useI18n } from "../i18n/context";

export function AboutPage() {
  const { t } = useI18n();

  return (
    <article>
      <p className="page-kicker">{t.nav.about}</p>
      <h2 className="page-title">{t.about.title}</h2>
      <p className="lede">{t.about.lede}</p>
      <div className="team-grid">
        <section className="panel">
          <h2>{t.about.editorial}</h2>
          <ul className="name-list">
            {t.about.editorialMembers.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </section>
        <section className="panel">
          <h2>{t.about.publishing}</h2>
          <ul className="name-list">
            {t.about.publishingMembers.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
          <p className="muted" style={{ marginTop: "0.75rem" }}>
            {t.about.moreSoon}
          </p>
        </section>
        <section className="panel">
          <h2>{t.about.printing}</h2>
          <p className="print-name">{t.about.printingNameTe}</p>
          <p className="muted">{t.about.printingName}</p>
        </section>
      </div>
    </article>
  );
}
