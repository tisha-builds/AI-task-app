import { Link } from 'react-router-dom';
import { ArrowRight, Brain, CheckCircle, TrendingUp } from 'lucide-react';

const stats = [
  { value: '3.2×', label: 'more tasks completed' },
  { value: '40%', label: 'less decision fatigue' },
  { value: '2 min', label: 'daily setup time' },
];

const floatingCards = [
  {
    id: 'c1',
    style: 'top-10 left-4 md:left-8',
    priority: 'Critical',
    priorityColor: 'text-red-600 bg-red-50',
    dot: 'bg-red-500',
    title: 'Investor deck due',
    score: '9.2',
  },
  {
    id: 'c2',
    style: 'bottom-20 right-4 md:right-8',
    priority: 'High',
    priorityColor: 'text-orange-600 bg-orange-50',
    dot: 'bg-orange-500',
    title: 'Fix auth bug',
    score: '7.8',
  },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-100/60 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-sage-100/80 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-50/40 blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(#0d5e3a 1px, transparent 1px), linear-gradient(90deg, #0d5e3a 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div className="space-y-8">
            {/* Label */}
            <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 border border-brand-200 rounded-full px-4 py-1.5 text-xs font-semibold">
              <Brain size={12} />
              AI-Powered Prioritization
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-gray-900 leading-[1.1] text-balance">
                Stop guessing.
                <br />
                <span className="text-brand-700">Work on what</span>
                <br />
                matters most.
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed max-w-md">
                TaskMind scores every task by urgency, importance, and effort — then tells you exactly what to tackle next.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/dashboard" className="btn-primary px-7 py-3.5 text-base shadow-glow-sm">
                Get started free
                <ArrowRight size={16} />
              </Link>
              <Link to="/dashboard" className="btn-secondary px-7 py-3.5 text-base">
                View demo
              </Link>
            </div>

            {/* Trust */}
            <div className="flex items-center gap-6 pt-2">
              {[
                'No credit card needed',
                'Setup in 2 minutes',
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <CheckCircle size={12} className="text-brand-600" />
                  {t}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-heading font-bold text-brand-700">{s.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Dashboard mockup */}
          <div className="relative hidden md:block">
            <div className="relative">
              {/* Main dashboard card */}
              <div className="rounded-3xl border border-gray-200 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.10)] overflow-hidden">
                {/* Top bar */}
                <div className="bg-brand-900 px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-lg bg-brand-600 flex items-center justify-center">
                      <Brain size={10} className="text-white" />
                    </div>
                    <span className="text-white text-xs font-semibold">TaskMind Dashboard</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {['bg-red-400', 'bg-yellow-400', 'bg-green-400'].map((c, i) => (
                      <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
                    ))}
                  </div>
                </div>

                {/* Dashboard body */}
                <div className="p-5 space-y-3 bg-gray-50">
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Total Tasks', value: '8', icon: '📋' },
                      { label: 'In Progress', value: '2', icon: '⚡' },
                      { label: 'Done Today', value: '1', icon: '✅' },
                    ].map((s) => (
                      <div key={s.label} className="bg-white rounded-xl p-3 border border-gray-100">
                        <div className="text-lg">{s.icon}</div>
                        <div className="text-lg font-bold text-gray-900 mt-1">{s.value}</div>
                        <div className="text-[10px] text-gray-500">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Task list preview */}
                  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-gray-50 flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-700">Priority Queue</span>
                      <span className="text-[10px] text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">AI sorted</span>
                    </div>
                    {[
                      { title: 'Finalize investor deck', score: 9.2, priority: 'Critical', color: 'bg-red-500', pBg: 'bg-red-50 text-red-700' },
                      { title: 'Fix auth bug in production', score: 8.6, priority: 'Critical', color: 'bg-red-500', pBg: 'bg-red-50 text-red-700' },
                      { title: 'Write API v2 spec', score: 5.0, priority: 'High', color: 'bg-orange-500', pBg: 'bg-orange-50 text-orange-700' },
                      { title: 'Weekly retrospective', score: 4.9, priority: 'High', color: 'bg-orange-500', pBg: 'bg-orange-50 text-orange-700' },
                    ].map((task) => (
                      <div key={task.title} className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${task.color}`} />
                        <span className="text-xs text-gray-700 flex-1 truncate">{task.title}</span>
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md ${task.pBg}`}>{task.score}</span>
                      </div>
                    ))}
                  </div>

                  {/* AI insight */}
                  <div className="bg-brand-700 rounded-xl p-3 flex items-start gap-2.5">
                    <Brain size={14} className="text-brand-200 mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] text-brand-100 leading-relaxed">
                      <span className="text-white font-semibold">AI Insight:</span> Focus on the investor deck first — highest urgency-to-effort ratio today.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-card-hover border border-gray-100 p-3 flex items-center gap-2">
                <TrendingUp size={16} className="text-brand-700" />
                <div>
                  <div className="text-xs font-bold text-gray-900">Priority score</div>
                  <div className="text-[10px] text-gray-500">Updated in real-time</div>
                </div>
              </div>

              {/* Floating badge 2 */}
              <div className="absolute -bottom-3 -left-4 bg-brand-700 rounded-2xl shadow-glow-sm p-3 flex items-center gap-2">
                <div className="w-5 h-5 bg-brand-600 rounded-lg flex items-center justify-center">
                  <CheckCircle size={12} className="text-white" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white">3.2× productivity</div>
                  <div className="text-[9px] text-brand-200">avg user improvement</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
