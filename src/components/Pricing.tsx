import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'For individuals getting started.',
    cta: 'Start free',
    ctaStyle: 'btn-secondary w-full justify-center',
    features: [
      'Up to 20 tasks',
      'AI priority scoring',
      'Basic insights',
      'CSV export',
    ],
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: 'per month',
    desc: 'For focused professionals and solopreneurs.',
    cta: 'Start free trial',
    ctaStyle: 'btn-primary w-full justify-center shadow-glow-sm',
    features: [
      'Unlimited tasks',
      'AI priority scoring',
      'Advanced insights & analytics',
      'Recurring tasks',
      'Tag & category filters',
      'Priority email support',
    ],
    highlight: true,
  },
  {
    name: 'Team',
    price: '$29',
    period: 'per seat / month',
    desc: 'For teams that move fast together.',
    cta: 'Contact sales',
    ctaStyle: 'btn-secondary w-full justify-center',
    features: [
      'Everything in Pro',
      'Shared workspaces',
      'Team dashboards',
      'Admin controls',
      'SSO / SAML',
      'Dedicated support',
    ],
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-surface-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14 space-y-3">
          <div className="section-label">Pricing</div>
          <h2 className="text-4xl font-heading font-bold text-gray-900">Simple, transparent pricing</h2>
          <p className="text-gray-500">No hidden fees. Cancel anytime.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-7 border transition-all ${
                plan.highlight
                  ? 'bg-brand-900 border-brand-700 shadow-glow'
                  : 'bg-white border-gray-200 shadow-card'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-brand-500 text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                    Most popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className={`text-sm font-semibold mb-1 ${plan.highlight ? 'text-brand-300' : 'text-gray-500'}`}>
                  {plan.name}
                </div>
                <div className="flex items-end gap-1.5">
                  <span className={`text-4xl font-heading font-bold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm mb-1 ${plan.highlight ? 'text-brand-300' : 'text-gray-400'}`}>
                    / {plan.period}
                  </span>
                </div>
                <p className={`text-sm mt-2 ${plan.highlight ? 'text-brand-200' : 'text-gray-500'}`}>
                  {plan.desc}
                </p>
              </div>

              <Link to="/dashboard" className={plan.ctaStyle}>
                {plan.cta}
              </Link>

              <ul className="mt-6 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <Check
                      size={14}
                      className={`flex-shrink-0 ${plan.highlight ? 'text-brand-400' : 'text-brand-600'}`}
                    />
                    <span className={plan.highlight ? 'text-brand-100' : 'text-gray-600'}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
