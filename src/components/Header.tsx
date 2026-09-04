import { NavLink } from "react-router-dom";
import { useI18n } from "../i18n/context";
import { useTheme } from "../theme/context";
import { assetUrl } from "../lib/issues";

const links = [
  { to: "/", key: "home" as const },
  { to: "/archive", key: "archive" as const },
  { to: "/about", key: "about" as const },
  { to: "/subscribe", key: "subscribe" as const },
  { to: "/search", key: "search" as const },
];

export function Header() {
  const { lang, setLang, t } = useI18n();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="masthead">
      <div className="brand-row">
        <img className="brand-logo" src={assetUrl("brand/logo.png")} alt="" />
        <div className="brand-titles">
          <h1>{t.siteTitle}</h1>
          <p>{t.siteSubtitle}</p>
        </div>
        <img className="brand-logo circle" src={assetUrl("brand/sssb-logo.jpg")} alt="" />
      </div>
      <div className="toolbar">
        <nav className="nav-links" aria-label={t.siteTitle}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              {t.nav[link.key]}
            </NavLink>
          ))}
        </nav>
        <div className="toggles">
          <button
            type="button"
            className="toggle"
            aria-label={lang === "te" ? "English" : "తెలుగు"}
            onClick={() => setLang(lang === "te" ? "en" : "te")}
          >
            {lang === "te" ? "EN" : "తె"}
          </button>
          <button
            type="button"
            className="toggle"
            aria-pressed={theme === "dark"}
            aria-label={theme === "dark" ? t.theme.light : t.theme.dark}
            onClick={toggleTheme}
          >
            {theme === "dark" ? "Aa" : "A"}
          </button>
        </div>
      </div>
    </header>
  );
}
