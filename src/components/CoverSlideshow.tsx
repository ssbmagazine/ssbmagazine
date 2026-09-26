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

function slideOffset(i: number, index: number, length: number) {
  let d = i - index;
  if (d > length / 2) d -= length;
  if (d < -length / 2) d += length;
  return d;
}

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
  const len = SLIDES.length;

  return (
    <section className="cover-carousel" aria-roledescription="carousel" aria-label={t.home.slideshowLabel}>
      <div className="cover-carousel-stage">
        {SLIDES.map((item, i) => {
          const offset = slideOffset(i, index, len);
          const abs = Math.abs(offset);
          if (abs > 1) return null;
          const role =
            offset === 0 ? "center" : offset < 0 ? "prev" : "next";
          return (
            <button
              key={item.src}
              type="button"
              className={`cover-carousel-card is-${role}`}
              style={{ ["--card-offset" as string]: String(offset) }}
              onClick={() => setIndex(i)}
              aria-label={t.home[item.labelKey]}
              aria-current={offset === 0 ? "true" : undefined}
              tabIndex={offset === 0 ? 0 : -1}
            >
              <img src={assetUrl(item.src)} alt="" draggable={false} />
            </button>
          );
        })}
      </div>
      <p className="cover-carousel-caption">{t.home[slide.labelKey]}</p>
      <div className="cover-carousel-dots" role="tablist" aria-label={t.home.slideshowLabel}>
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
