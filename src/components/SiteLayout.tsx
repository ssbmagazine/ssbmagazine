import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { assetUrl } from "../lib/issues";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function SiteLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const silk = `url(${assetUrl("brand/silk-texture.jpg")})`;

  useEffect(() => {
    document.documentElement.style.setProperty("--silk-url", silk);
    return () => {
      document.documentElement.style.removeProperty("--silk-url");
    };
  }, [silk]);

  return (
    <div className={`site-shell${isHome ? " is-home" : ""}`}>
      <Header />
      <main className={`site-main${isHome ? " is-home" : ""}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
