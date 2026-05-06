import { Brain, Zap, BarChart3, Clock, Shield, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Brain,
    color: 'bg-brand-700',
    title: 'AI Priority Scoring',
    desc: 'Every task gets a score based on urgency, importance, and effort. The formula adapts to your work style over time.',
  },
  {
    icon: Zap,
    color: 'bg-amber-500',
    title: 'Instant Focus Mode',
    desc: 'One click surfaces your top 3 tasks for the day. No more scanning long lists. Just what matters, now.',
  },
  {
    icon: BarChart3,
    color: 'bg-blue-600',
    title: 'Productivity Insights',
    desc: 'Visual breakdowns of how your time is distributed. Spot bottlenecks before they derail your week.',
  },
  {
    icon: Clock,
    color: 'bg-purple-600',
    title: 'Deadline Intelligence',
    desc: 'Deadlines dynamically reweight task scores. As due dates approach, urgency increases automatically.',
  },
  {
    icon: Shield,
    color: 'bg-red-600',
    title: 'Overdue Alerts',
    desc: 'Nothing slips through the cracks. Overdue tasks are flagged and reprioritized immediately.',
  },
  {
    icon: ArrowRight,
    color: 'bg-green-600',
    title: 'Friction-Free Input',
    desc: 'Add tasks in seconds. A minimal form asks only what it needs: title, deadline, effort, and impact.',
  },
];

const highlights = [
  { value: '(0.6 × urgency + 0.4 × importance)', label: 'score formula numerator' },
  { value: '÷ effort hours', label: 'normalized by time investment' },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="section-label">Core features</div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 text-balance">
            Powerful features built
            <br />
            for focused work
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Simple, structured tools that surface exactly what deserves your attention — without asking you to figure it out yourself.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((f) => (
            <div key={f.title} className="card-hover p-6 group">
              <div className={`w-10 h-10 rounded-xl ${f.color} flex items-center justify-center mb-4 shadow-sm`}>
                <f.icon size={18} className="text-white" />
              </div>
              <h3 className="font-heading font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Formula callout */}
        <div className="relative rounded-3xl bg-brand-900 p-10 overflow-hidden">
          {/* BG decoration */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-brand-700/30 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-brand-600/20 blur-2xl" />

          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-brand-300">The algorithm</div>
              <h3 className="text-3xl font-heading font-bold text-white">
                Science-backed prioritization
              </h3>
              <p className="text-brand-200 leading-relaxed">
                Inspired by the Eisenhower Matrix, our formula weights urgency and importance against the effort required — so a quick, critical task always floats to the top.
              </p>
            </div>
            <div className="bg-brand-800/60 rounded-2xl border border-brand-700/50 p-6 font-mono text-sm space-y-3">
              <div className="text-brand-300 text-xs">// Priority calculation</div>
              <div className="text-green-400">
                score = <span className="text-white">(</span>
              </div>
              <div className="pl-4 text-amber-300">
                0.6 × urgency
                <span className="text-white"> +</span>
              </div>
              <div className="pl-4 text-amber-300">
                0.4 × importance
              </div>
              <div className="text-white">
                ) / effortHours
              </div>
              <div className="border-t border-brand-700/50 pt-3 text-brand-300 text-xs">
                → higher score = do it first
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
