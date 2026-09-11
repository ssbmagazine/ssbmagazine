import { useI18n } from "../i18n/context";
import {
  personName,
  personRole,
  personSecondaryName,
  teamSections,
} from "../data/team";

export function AboutPage() {
  const { lang, t } = useI18n();

  return (
    <article>
      <p className="page-kicker">{t.nav.about}</p>
      <h2 className="page-title">{t.about.title}</h2>
      <p className="lede">{t.about.lede}</p>

      {teamSections.map((section) => (
        <section className="team-section" key={section.id}>
          <h3 className="team-section-title">{t.about[section.id]}</h3>
          <div className="people-grid">
            {section.people.map((person) => (
              <article className="person-card" key={person.id}>
                <div className="person-avatar" aria-hidden="true" />
                <div className="person-body">
                  <p className="person-role">{personRole(person, lang)}</p>
                  <h4 className="person-name">{personName(person, lang)}</h4>
                  <p className="person-name-alt">{personSecondaryName(person, lang)}</p>
                  <p className="person-bio muted">{t.about.bioSoon}</p>
                </div>
              </article>
            ))}
          </div>
          {section.id === "publishing" ? (
            <p className="muted team-note">{t.about.moreSoon}</p>
          ) : null}
        </section>
      ))}
    </article>
  );
}
