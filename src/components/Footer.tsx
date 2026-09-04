import { useI18n } from "../i18n/context";

export function Footer() {
  const { t, fmt } = useI18n();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <strong>{t.siteTitle}</strong>
        <span>{t.footer.blurb}</span>
        <span>{t.footer.socials}: Instagram · YouTube · Facebook</span>
        <span>{t.footer.banners}</span>
        <span>{fmt(t.footer.copy, new Date().getFullYear())}</span>
      </div>
    </footer>
  );
}
