import { useI18n } from "../i18n/context";
import {
  loc,
  magazineEmails,
  subscription,
  subscriptionWhatsAppUrl,
} from "../data/team";
import { assetUrl } from "../lib/issues";

export function SubscribePage() {
  const { lang, t } = useI18n();
  const bank = subscription.bank;

  return (
    <article className="subscribe-page">
      <p className="page-kicker">{t.nav.subscribe}</p>
      <h2 className="page-title">{t.subscribe.title}</h2>
      <p className="lede">{t.subscribe.lede}</p>

      <div className="subscribe-grid">
        <section className="panel">
          <h2>{t.subscribe.ratesTitle}</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">{t.subscribe.planCol}</th>
                <th scope="col">{t.subscribe.amountCol}</th>
              </tr>
            </thead>
            <tbody>
              {subscription.rates.map((row) => (
                <tr key={row.id}>
                  <td>{loc(row.plan, lang)}</td>
                  <td className="amount-cell">{loc(row.amount, lang)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="panel">
          <h2>{t.subscribe.payTitle}</h2>
          <p className="pay-required">{t.subscribe.payRequired}</p>
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">{t.subscribe.methodCol}</th>
                <th scope="col">{t.subscribe.howCol}</th>
              </tr>
            </thead>
            <tbody>
              {subscription.paymentMethods.map((row) => (
                <tr key={row.id}>
                  <td>
                    <strong>{loc(row.method, lang)}</strong>
                  </td>
                  <td>{loc(row.how, lang)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      <div className="subscribe-grid subscribe-grid-follow">
        <section className="panel">
          <h2>{t.subscribe.bankTitle}</h2>
          <figure className="qr-block">
            <img
              className="qr-image"
              src={assetUrl("brand/upi-qr.jpeg")}
              alt={t.subscribe.qrAlt}
            />
            <figcaption>{t.subscribe.qrCaption}</figcaption>
          </figure>
          <h3 className="panel-subhead">{t.subscribe.bankSubhead}</h3>
          <table className="data-table bank-table">
            <tbody>
              <tr>
                <th scope="row">{t.subscribe.bankName}</th>
                <td>{loc(bank.name, lang)}</td>
              </tr>
              <tr>
                <th scope="row">{t.subscribe.bankBranch}</th>
                <td>{loc(bank.branch, lang)}</td>
              </tr>
              <tr>
                <th scope="row">{t.subscribe.bankHolder}</th>
                <td>{loc(bank.holder, lang)}</td>
              </tr>
              <tr>
                <th scope="row">{t.subscribe.bankAccount}</th>
                <td>
                  <code>{bank.account}</code>
                </td>
              </tr>
              <tr>
                <th scope="row">IFSC</th>
                <td>
                  <code>{bank.ifsc}</code>
                </td>
              </tr>
              <tr>
                <th scope="row">MICR</th>
                <td>
                  <code>{bank.micr}</code>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="panel">
          <h2>{t.subscribe.contactTitle}</h2>
          <p className="person-role" style={{ marginBottom: "0.25rem" }}>
            {loc(subscription.contactRole, lang)}
          </p>
          <p className="print-name">{loc(subscription.contactName, lang)}</p>
          <p className="muted">{loc(subscription.address, lang)}</p>
          <p style={{ marginTop: "0.75rem" }}>
            {t.footer.email}:{" "}
            {magazineEmails.map((email, index) => (
              <span key={email}>
                {index > 0 ? ", " : null}
                <a className="inline-link" href={`mailto:${email}`}>
                  {email}
                </a>
              </span>
            ))}
          </p>
          <p style={{ marginTop: "0.9rem" }}>{t.subscribe.afterPay}</p>
          <p style={{ marginTop: "0.75rem" }}>
            <a
              className="btn solid"
              href={subscriptionWhatsAppUrl(lang)}
              target="_blank"
              rel="noreferrer"
            >
              {t.subscribe.whatsappCta}
            </a>
          </p>
          <p className="muted" style={{ marginTop: "0.55rem" }}>
            {t.subscribe.whatsapp}: {subscription.whatsappDisplay}
          </p>
          <ol className="subscribe-steps">
            <li>{t.subscribe.step1}</li>
            <li>{t.subscribe.step2}</li>
            <li>{t.subscribe.step3}</li>
          </ol>
        </section>
      </div>
    </article>
  );
}
