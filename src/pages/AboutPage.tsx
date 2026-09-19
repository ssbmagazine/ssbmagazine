import { useRef } from "react";
import { useI18n } from "../i18n/context";
import {
  loc,
  magazineEmails,
  personDetail,
  personName,
  personRole,
  personSecondaryName,
  registration,
  teamSections,
} from "../data/team";
import { assetUrl } from "../lib/issues";

export function AboutPage() {
  const { lang, t } = useI18n();
  const certDialog = useRef<HTMLDialogElement>(null);

  return (
    <article>
      <p className="page-kicker">{t.nav.about}</p>
      <h2 className="page-title">{t.about.title}</h2>
      <p className="lede">{t.about.lede}</p>

      <section className="panel about-registration">
        <h2>{t.about.registration}</h2>
        <dl className="detail-list">
          <div>
            <dt>{t.about.regNumber}</dt>
            <dd>
              <code>{registration.number}</code>
            </dd>
          </div>
          <div>
            <dt>{t.about.regOwner}</dt>
            <dd>{loc(registration.owner, lang)}</dd>
          </div>
          <div>
            <dt>{t.about.regPlace}</dt>
            <dd>{loc(registration.place, lang)}</dd>
          </div>
          <div>
            <dt>{t.about.regDate}</dt>
            <dd>{loc(registration.registeredOn, lang)}</dd>
          </div>
        </dl>
        <p className="cta-row">
          <button
            type="button"
            className="btn solid"
            onClick={() => certDialog.current?.showModal()}
          >
            {t.about.viewCertificate}
          </button>
        </p>
      </section>

      <dialog ref={certDialog} className="cert-dialog">
        <form method="dialog" className="cert-dialog-bar">
          <h2 className="cert-dialog-title">{t.about.certificateTitle}</h2>
          <button type="submit" className="btn">
            {t.about.closeCertificate}
          </button>
        </form>
        <img
          className="cert-dialog-image"
          src={assetUrl(registration.certificate)}
          alt={t.about.certificateAlt}
        />
      </dialog>

      {teamSections.map((section) => (
        <section className="team-section" key={section.id}>
          <h3 className="team-section-title">{t.about[section.id]}</h3>
          {section.id === "convenors" ? (
            <p className="muted team-note">{t.about.convenorsNote}</p>
          ) : null}
          <div className="people-grid">
            {section.people.map((person) => {
              const detail = personDetail(person, lang);
              return (
                <article className="person-card" key={person.id}>
                  <div className="person-avatar" aria-hidden="true" />
                  <div className="person-body">
                    <p className="person-role">{personRole(person, lang)}</p>
                    <h4 className="person-name">{personName(person, lang)}</h4>
                    <p className="person-name-alt">{personSecondaryName(person, lang)}</p>
                    {detail ? (
                      <p className="person-detail">{detail}</p>
                    ) : (
                      <p className="person-bio muted">{t.about.bioSoon}</p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}

      <section className="panel about-contact">
        <h2>{t.about.contact}</h2>
        <p>
          {t.footer.email}:{" "}
          {magazineEmails.map((email, index) => (
            <span key={email}>
              {index > 0 ? ", " : null}
              <a className="inline-link" href={`mailto:${email}`}>
                {email}
              </a>
            </span>
          ))}
        </p>
        <p className="muted" style={{ marginTop: "0.6rem" }}>
          {loc(
            {
              te: "బేగంపేట సమితి, హైదరాబాద్ 500 016",
              en: "Begumpet Samithi, Hyderabad 500 016",
            },
            lang,
          )}
        </p>
      </section>
    </article>
  );
}
