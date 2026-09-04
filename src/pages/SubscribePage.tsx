import { useI18n } from "../i18n/context";

export function SubscribePage() {
  const { t } = useI18n();

  return (
    <article>
      <p className="page-kicker">{t.nav.subscribe}</p>
      <h2 className="page-title">{t.subscribe.title}</h2>
      <p className="lede">{t.subscribe.lede}</p>
      <section className="panel">
        <h2>{t.subscribe.how}</h2>
        <div className="qr-slot">
          <p>{t.subscribe.qrCaption}</p>
        </div>
        <ol>
          <li>{t.subscribe.step1}</li>
          <li>{t.subscribe.step2}</li>
          <li>{t.subscribe.step3}</li>
        </ol>
        <p style={{ marginTop: "1rem" }}>{t.subscribe.note}</p>
      </section>
    </article>
  );
}
