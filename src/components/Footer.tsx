import { useI18n } from "../i18n/context";

const EMAILS = ["sathyasaibalavikas@gmail.com", "sathysaibalavikas@yahoo.co.in"] as const;

export function Footer() {
  const { t, fmt } = useI18n();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <strong>{t.siteTitle}</strong>
        <span>{t.footer.blurb}</span>
        <span>{t.footer.posted}</span>
        <span>
          {t.footer.email}:{" "}
          {EMAILS.map((email, index) => (
            <span key={email}>
              {index > 0 ? ", " : null}
              <a className="inline-link" href={`mailto:${email}`}>
                {email}
              </a>
            </span>
          ))}
        </span>
        <span>{fmt(t.footer.copy, new Date().getFullYear())}</span>
      </div>
    </footer>
  );
}
