import { useI18n } from "../i18n/context";
import { assetUrl } from "../lib/issues";

const items = [
  {
    id: "flyer-en",
    file: "resources/silver-jubilee-flyer-en.png",
    titleKey: "flyerEn" as const,
  },
  {
    id: "flyer-te",
    file: "resources/silver-jubilee-flyer-te.png",
    titleKey: "flyerTe" as const,
  },
  {
    id: "logo-25",
    file: "brand/silver-jubilee-logo.png",
    titleKey: "logo25" as const,
  },
];

export function ResourcesPage() {
  const { t } = useI18n();

  return (
    <article>
      <p className="page-kicker">{t.nav.resources}</p>
      <h2 className="page-title">{t.resources.title}</h2>
      <p className="lede">{t.resources.lede}</p>

      <section className="resources-grid">
        {items.map((item) => (
          <article className="panel resource-card" key={item.id}>
            <h2>{t.resources[item.titleKey]}</h2>
            <a
              className="resource-preview"
              href={assetUrl(item.file)}
              target="_blank"
              rel="noreferrer"
            >
              <img src={assetUrl(item.file)} alt={t.resources[item.titleKey]} />
            </a>
            <p className="cta-row">
              <a className="btn solid" href={assetUrl(item.file)} download>
                {t.resources.download}
              </a>
            </p>
          </article>
        ))}
      </section>
    </article>
  );
}
