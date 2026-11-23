import InfoPage from '@/components/info-page';
import { pageMetadata } from '@/lib/seo';
import './subscription.css';

export const metadata = pageMetadata(
  'ARC Subscription Details',
  'Review suggested ARC subscription plans, sample pricing, tenure, and included features.',
  '/subscription',
);

const plans = [
  { name: 'Free Trial', tenure: '15 days', amount: '₹0', features: ['Explore ARC production traceability', 'Try a sample component verification'], trial: '15 days' },
  { name: 'Basic', tenure: 'Monthly', amount: '₹499', features: ['Component identity records', 'Inspection history', 'Parent–child traceability'] },
  { name: 'Basic', tenure: 'Yearly', amount: '₹4,999', features: ['Component identity records', 'Inspection history', 'Parent–child traceability'] },
  { name: 'Professional', tenure: 'Monthly', amount: '₹999', features: ['Everything in Basic', 'Enhanced reporting', 'Team visibility'] },
  { name: 'Professional', tenure: 'Yearly', amount: '₹9,999', features: ['Everything in Basic', 'Enhanced reporting', 'Team visibility'] },
  { name: 'Enterprise', tenure: 'Custom', amount: 'Contact Sales', features: ['Custom deployment scope', 'Tailored integrations', 'Dedicated discussions'] },
];

export default function Subscription() {
  return (
    <InfoPage title="ARC Subscription Details" className="subscription-page">
      <p className="subscription-intro">Review the plan options below and contact our team to discuss access for your production environment.</p>
      <div className="subscription-grid" aria-label="Suggested subscription plans">
        {plans.map((plan) => (
          <article className="subscription-card" key={`${plan.name}-${plan.tenure}`}>
            <div className="subscription-card-heading">
              <div className="subscription-plan-meta">
                <span className="section-label">{plan.tenure.toUpperCase()}</span>
                <strong className="subscription-price">{plan.amount}</strong>
              </div>
              <h2>{plan.name}</h2>
            </div>
            <p className="subscription-tenure">{plan.name === 'Enterprise' ? 'Tailored to your requirements' : `${plan.tenure} subscription`}</p>
            <h3>Suggested features</h3>
            <ul>{plan.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            {plan.trial && <p className="trial-duration">Free trial duration: <strong>{plan.trial}</strong></p>}
            <a className="site-primary choose-plan" href={`mailto:saas@arc-ai.in?subject=${encodeURIComponent(`ARC ${plan.name} ${plan.tenure} plan enquiry`)}`}>
              Explore Plan <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>
      <section className="subscription-status" aria-labelledby="subscription-status-title">
        <div><span className="section-label">ACCOUNT</span><h2 id="subscription-status-title">Subscription status</h2><p>Your current subscription is unavailable on this public website. Connect to an ARC account to view account-specific details.</p></div>
        <dl>
          <div><dt>Current plan / status</dt><dd>Account not connected</dd></div>
          <div><dt>Renewal date</dt><dd>Unavailable</dd></div>
          <div><dt>Expiry date</dt><dd>Unavailable</dd></div>
        </dl>
      </section>
    </InfoPage>
  );
}
