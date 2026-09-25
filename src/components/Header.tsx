import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useI18n } from "../i18n/context";
import { useTheme } from "../theme/context";
import { assetUrl } from "../lib/issues";
import { IconClose, IconMenu, IconMoon, IconSun } from "./Icons";

const links = [
  { to: "/", key: "home" as const },
  { to: "/archive", key: "archive" as const },
  { to: "/about", key: "about" as const },
  { to: "/subscribe", key: "subscribe" as const },
  { to: "/resources", key: "resources" as const },
  { to: "/search", key: "search" as const },
];

export function Header() {
  const { lang, setLang, t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="masthead">
      <div className="brand-row">
        <img className="brand-logo circle" src={assetUrl("brand/logo.png")} alt="" />
        <div className="brand-titles">
          <h1>{t.siteTitle}</h1>
          <p>{t.siteSubtitle}</p>
        </div>
        <img className="brand-logo circle" src={assetUrl("brand/sssb-logo.jpg")} alt="" />
      </div>
      <div className="toolbar">
        <button
          type="button"
          className="nav-menu-btn"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <IconClose /> : <IconMenu />}
          <span>{menuOpen ? t.nav.closeMenu : t.nav.menu}</span>
        </button>
        <nav
          id="site-nav"
          className={`nav-links${menuOpen ? " is-open" : ""}`}
          aria-label={t.siteTitle}
        >
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
            className="toggle theme-toggle"
            aria-pressed={theme === "dark"}
            aria-label={theme === "dark" ? t.theme.light : t.theme.dark}
            onClick={toggleTheme}
          >
            {theme === "dark" ? <IconSun /> : <IconMoon />}
          </button>
        </div>
      </div>
    </header>
  );
}
