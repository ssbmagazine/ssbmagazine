import { useI18n } from "../i18n/context";
import { magazineEmails, registration } from "../data/team";
import { assetUrl } from "../lib/issues";

export function Footer() {
  const { t, fmt } = useI18n();
  return (
    <footer className="site-footer">
      <div
        className="footer-banner"
        style={{ backgroundImage: `url(${assetUrl("brand/silver-jubilee-banner.png")})` }}
      >
        <div className="footer-inner">
          <span>
            {t.footer.blurb} {t.footer.posted}
          </span>
          <span>
            {t.footer.email}:{" "}
            {magazineEmails.map((email, index) => (
              <span key={email}>
                {index > 0 ? ", " : null}
                <a className="inline-link" href={`mailto:${email}`}>
                  {email}
                </a>
              </span>
            ))}
          </span>
          <span>
            {fmt(t.footer.copy, new Date().getFullYear())} · {t.footer.reg}{" "}
            {registration.number}
          </span>
        </div>
      </div>
    </footer>
  );
}
