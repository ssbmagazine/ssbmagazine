import { useEffect, useState } from "react";
import { assetUrl } from "../lib/issues";
import { useI18n } from "../i18n/context";

const SLIDES = [
  { src: "brand/cover-slideshow/2002-early.jpg", labelKey: "slide2002Early" as const },
  { src: "brand/cover-slideshow/2002-a.jpg", labelKey: "slide2002" as const },
  { src: "brand/cover-slideshow/2014-12.jpg", labelKey: "slide2014" as const },
  { src: "brand/cover-slideshow/2015-11.jpg", labelKey: "slide2015" as const },
  { src: "brand/cover-slideshow/2020-11.jpg", labelKey: "slide2020" as const },
  { src: "brand/cover-slideshow/2023-11.jpg", labelKey: "slide2023" as const },
  { src: "brand/cover-slideshow/2025-11.jpg", labelKey: "slide2025" as const },
];

export function CoverSlideshow() {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, []);

  const slide = SLIDES[index];

  return (
    <section className="cover-slideshow" aria-roledescription="carousel" aria-label={t.home.slideshowLabel}>
      <div className="cover-slideshow-frame">
        {SLIDES.map((item, i) => (
          <img
            key={item.src}
            className={i === index ? "is-active" : undefined}
            src={assetUrl(item.src)}
            alt={t.home[item.labelKey]}
          />
        ))}
      </div>
      <p className="cover-slideshow-caption">{t.home[slide.labelKey]}</p>
      <div className="cover-slideshow-dots" role="tablist" aria-label={t.home.slideshowLabel}>
        {SLIDES.map((item, i) => (
          <button
            key={item.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={i === index ? "is-active" : undefined}
            onClick={() => setIndex(i)}
            aria-label={t.home[item.labelKey]}
          />
        ))}
      </div>
    </section>
  );
}
