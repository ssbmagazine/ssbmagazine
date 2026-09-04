import { useI18n } from "../i18n/context";

const teams = ["editorial", "design", "content"] as const;

export function AboutPage() {
  const { t } = useI18n();

  return (
    <article>
      <p className="page-kicker">{t.nav.about}</p>
      <h2 className="page-title">{t.about.title}</h2>
      <p className="lede">{t.about.lede}</p>
      <div className="team-grid">
        {teams.map((team) => (
          <section className="panel" key={team}>
            <h2>{t.about[team]}</h2>
            <p>{t.about.placeholder}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
