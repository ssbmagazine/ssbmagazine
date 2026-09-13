import { useState } from "react";
import { useI18n } from "../i18n/context";
import {
  loc,
  subscription,
  subscriptionUpiPayUrl,
  subscriptionWhatsAppUrl,
} from "../data/team";
import { assetUrl } from "../lib/issues";

export function SubscribePage() {
  const { lang, t } = useI18n();
  const bank = subscription.bank;
  const [copied, setCopied] = useState(false);
  const otherMethods = subscription.paymentMethods.filter((row) => row.id !== "upi");

  async function copyUpiId() {
    try {
      await navigator.clipboard.writeText(subscription.upiId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className="subscribe-page">
      <p className="page-kicker">{t.nav.subscribe}</p>
      <h2 className="page-title">{t.subscribe.title}</h2>
      <p className="lede">{t.subscribe.lede}</p>

      <div className="subscribe-body">
      <section className="panel subscribe-rates">
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

      <section className="panel subscribe-flow">
        <ol className="subscribe-simple">
          <li className="subscribe-step">
            <h2>
              <span className="step-num" aria-hidden="true">
                1
              </span>
              {t.subscribe.step1Title}
            </h2>
            <p className="step-lead">{t.subscribe.step1Lead}</p>
            <figure className="qr-block">
              <img
                className="qr-image"
                src={assetUrl("brand/upi-qr.jpeg")}
                alt={t.subscribe.qrAlt}
              />
              <figcaption>{t.subscribe.qrCaption}</figcaption>
            </figure>
            <div className="upi-id-box">
              <p className="upi-id-label">{t.subscribe.upiIdLabel}</p>
              <p className="upi-id-value">
                <code>{subscription.upiId}</code>
              </p>
              <div className="cta-row">
                <button type="button" className="btn" onClick={copyUpiId}>
                  {copied ? t.subscribe.copied : t.subscribe.copyUpi}
                </button>
                <a className="btn solid" href={subscriptionUpiPayUrl()}>
                  {t.subscribe.payUpiCta}
                </a>
              </div>
            </div>
          </li>

          <li className="subscribe-step subscribe-step-follow">
            <h2>
              <span className="step-num" aria-hidden="true">
                2
              </span>
              {t.subscribe.step2Title}
            </h2>
            <p className="step-lead">{t.subscribe.step2Lead}</p>
            <p className="cta-row">
              <a
                className="btn solid"
                href={subscriptionWhatsAppUrl(lang)}
                target="_blank"
                rel="noreferrer"
              >
                {t.subscribe.whatsappCta}
              </a>
            </p>
            <p className="whatsapp-number">
              {t.subscribe.whatsapp}: {subscription.whatsappDisplay}
            </p>
          </li>
        </ol>
      </section>

      <details className="panel subscribe-more">
        <summary>{t.subscribe.moreWays}</summary>
        <p className="pay-required">{t.subscribe.payRequired}</p>
        <table className="data-table">
          <thead>
            <tr>
              <th scope="col">{t.subscribe.methodCol}</th>
              <th scope="col">{t.subscribe.howCol}</th>
            </tr>
          </thead>
          <tbody>
            {otherMethods.map((row) => (
              <tr key={row.id}>
                <td>
                  <strong>{loc(row.method, lang)}</strong>
                </td>
                <td>{loc(row.how, lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
        <p className="muted more-address">{loc(subscription.address, lang)}</p>
      </details>
      </div>
    </article>
  );
}
