import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Hero } from '../components/Hero/Hero';
import { Features } from '../components/Features';
import { Pricing } from '../components/Pricing';
import { Footer } from '../components/Footer/Footer';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Product Manager',
    avatar: 'PS',
    text: 'TaskMind cut my morning planning from 20 minutes to 2. The priority score actually matches what my gut says.',
  },
  {
    name: 'Alex Chen',
    role: 'Solo Founder',
    avatar: 'AC',
    text: "I used to have 40 tabs of 'important stuff'. Now I have one dashboard. Game changer.",
  },
  {
    name: 'Maria Santos',
    role: 'Senior Engineer',
    avatar: 'MS',
    text: 'The effort-weighted scoring is brilliant. A 10-minute task and a 10-hour task both matter — this knows the difference.',
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14 space-y-3">
            <div className="section-label">Social proof</div>
            <h2 className="text-4xl font-heading font-bold text-gray-900">
              Customers who've reached
              <br />
              their objectives.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="card-hover p-6 space-y-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-700 text-white text-xs flex items-center justify-center font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Pricing />

      {/* CTA Banner */}
      <section className="py-20 bg-brand-900 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-brand-700/40 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 w-48 h-48 rounded-full bg-brand-600/30 blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-4xl font-heading font-bold text-white">
            Start working on what
            <br />
            actually matters.
          </h2>
          <p className="text-brand-200">
            Free forever. No credit card required. Setup in 2 minutes.
          </p>
          <Link to="/dashboard" className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-50 transition-colors shadow-lg">
            Get started free
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
