import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CoverCard } from "../components/CoverCard";
import { CoverSlideshow } from "../components/CoverSlideshow";
import { useI18n } from "../i18n/context";
import { assetUrl, issuePath, issueTitle, latestIssue } from "../lib/issues";

const ZOOM_MS = 7800;
const HOLD_MS = 2000;
/** Hero photo intrinsic ratio (4288 × 2848) → height/width. */
const HERO_ASPECT = 2848 / 4288;
/** width/height */
const HERO_WH = 4288 / 2848;

function isDesktop() {
  return window.matchMedia("(min-width: 721px)").matches;
}

/** Scale at which `object-fit: contain` still fills the stage (no letterbox). */
function coverScaleFor(stage: HTMLElement) {
  const W = stage.clientWidth;
  const H = stage.clientHeight;
  if (W < 1 || H < 1) return 1.6;
  const stageAspect = W / H;
  const fittedW = stageAspect > HERO_WH ? H * HERO_WH : W;
  const fittedH = stageAspect > HERO_WH ? H : W / HERO_WH;
  return Math.max(W / fittedW, H / fittedH);
}

function letterboxBand(stage: HTMLElement) {
  const fittedW = stage.clientHeight * HERO_WH;
  return Math.max(0, (stage.clientWidth - fittedW) / 2);
}

export function HomePage() {
  const { lang, t } = useI18n();
  const latest = latestIssue();
  const contentRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const userScrolledRef = useRef(false);
  const [zooming, setZooming] = useState(false);
  const [settled, setSettled] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [startScale, setStartScale] = useState(1.7);
  const [desktop, setDesktop] = useState(true);
  const heroSrc = assetUrl("brand/hero-swami-book.jpg");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 721px)");
    const apply = () => setDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const sync = () => {
      if (isDesktop()) {
        setStartScale(Math.max(coverScaleFor(stage) * 1.28, 1.35));
        const band = settled ? letterboxBand(stage) : 0;
        document.documentElement.style.setProperty("--hero-letterbox", `${band}px`);
      } else {
        setStartScale(1.4);
        document.documentElement.style.setProperty("--hero-letterbox", "0px");
      }
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(stage);
    return () => {
      ro.disconnect();
      document.documentElement.style.removeProperty("--hero-letterbox");
    };
  }, [settled, desktop]);

  useEffect(() => {
    if (reduceMotion) {
      setZooming(true);
      setSettled(true);
      return;
    }

    if (window.scrollY > 48) {
      setZooming(true);
      setSettled(true);
      return;
    }

    userScrolledRef.current = false;
    const onScroll = () => {
      if (window.scrollY > 48) userScrolledRef.current = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let cancelled = false;
    let settleTimer = 0;
    let scrollTimer = 0;
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (cancelled) return;
        // Phone + desktop: start zoom (on phone this also shrinks height → content rises).
        setZooming(true);
        settleTimer = window.setTimeout(() => {
          if (!cancelled) setSettled(true);
        }, ZOOM_MS);

        // Desktop only: separate auto-scroll after the plate freezes.
        if (isDesktop()) {
          scrollTimer = window.setTimeout(() => {
            if (cancelled || userScrolledRef.current) return;
            const el = contentRef.current;
            if (!el) return;
            const top = el.getBoundingClientRect().top + window.scrollY - 8;
            window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
          }, ZOOM_MS + HOLD_MS);
        }
      });
    });

    return () => {
      cancelled = true;
      window.clearTimeout(settleTimer);
      window.clearTimeout(scrollTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduceMotion]);

  const heroClass = [
    "home-hero",
    desktop ? "is-desktop" : "is-phone",
    zooming ? "is-zooming" : "",
    settled ? "is-settled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className="home-page">
      <section
        className={heroClass}
        aria-label={t.home.heroAlt}
        style={
          {
            ["--hero-aspect" as string]: String(HERO_ASPECT),
            ["--hero-start-scale" as string]: String(startScale),
          } as React.CSSProperties
        }
      >
        <div className="home-hero-stage" ref={stageRef}>
          {desktop ? (
            <img className="home-hero-ambient" src={heroSrc} alt="" aria-hidden />
          ) : null}
          <img className="home-hero-image" src={heroSrc} alt={t.home.heroAlt} />
        </div>
        <div className="home-hero-copy">
          <p className="page-kicker">{t.home.kicker}</p>
          <h2 className="page-title">{t.siteTitle}</h2>
          <p className="lede">{t.home.intro}</p>
        </div>
      </section>

      <div className="home-after-hero" ref={contentRef}>
        <CoverSlideshow />

        {latest ? (
          <section className="latest-block">
            <CoverCard issue={latest} large />
            <div>
              <p className="page-kicker">{t.home.latest}</p>
              <h3>{issueTitle(latest, lang)}</h3>
              <div className="cta-row">
                <Link className="btn solid" to={issuePath(latest)}>
                  {t.home.readIssue}
                </Link>
                <Link className="btn" to="/archive">
                  {t.home.browseArchive}
                </Link>
              </div>
            </div>
          </section>
        ) : (
          <Link className="btn" to="/archive">
            {t.home.browseArchive}
          </Link>
        )}
      </div>
    </article>
  );
}
