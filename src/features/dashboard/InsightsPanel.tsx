import { Brain, Loader2, X, Lightbulb, AlertTriangle, TrendingUp } from 'lucide-react';
import { useTaskStore } from '../../store/useTaskStore';
import { getPriorityColor, getPriorityDot } from '../../utils/priority';

export function InsightsPanel() {
  const { tasks, isAiLoading, aiInsight, simulateAiPrioritization, getStats } =
    useTaskStore();

  const stats = getStats();
  const completionRate = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

  const pendingTasks = tasks
    .filter((t) => t.status !== 'done')
    .sort((a, b) => (b.priorityScore ?? 0) - (a.priorityScore ?? 0))
    .slice(0, 3);

  const categoryCount = tasks.reduce<Record<string, number>>((acc, t) => {
    acc[t.category] = (acc[t.category] ?? 0) + 1;
    return acc;
  }, {});

  const topCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0];

  const staticInsights = [
    {
      icon: TrendingUp,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      text: `${completionRate}% of tasks completed. ${completionRate >= 50 ? 'Great momentum!' : 'Keep pushing!'}`,
    },
    {
      icon: AlertTriangle,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      text: stats.overdue > 0
        ? `${stats.overdue} task${stats.overdue > 1 ? 's' : ''} overdue. Tackle them first.`
        : 'No overdue tasks. Nice work staying ahead!',
    },
    {
      icon: Lightbulb,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      text: topCategory
        ? `Most tasks are in "${topCategory[0]}" (${topCategory[1]}). Consider batching them.`
        : 'Add tasks to unlock category insights.',
    },
  ];

  return (
    <aside className="space-y-5">
      {/* AI Prioritization button */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-3">
          <Brain size={16} className="text-brand-700" />
          <span className="text-sm font-semibold text-gray-900">AI Assistant</span>
        </div>
        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
          Let AI analyze your task queue and surface what to work on next.
        </p>
        <button
          onClick={simulateAiPrioritization}
          disabled={isAiLoading}
          className="btn-primary w-full justify-center text-xs py-2.5"
        >
          {isAiLoading ? (
            <>
              <Loader2 size={13} className="animate-spin" />
              Analyzing tasks…
            </>
          ) : (
            <>
              <Brain size={13} />
              Run AI prioritization
            </>
          )}
        </button>

        {/* AI insight result */}
        {aiInsight && (
          <div className="mt-3 bg-brand-50 border border-brand-200 rounded-xl p-3 text-xs text-brand-800 leading-relaxed">
            {aiInsight}
          </div>
        )}
      </div>

      {/* Stats summary */}
      <div className="card p-5">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Today's summary</div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Total', value: stats.total, color: 'text-gray-900' },
            { label: 'Done', value: stats.done, color: 'text-green-600' },
            { label: 'Due today', value: stats.todayCount, color: 'text-amber-600' },
            { label: 'Overdue', value: stats.overdue, color: 'text-red-600' },
          ].map((s) => (
            <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
              <div className={`text-xl font-heading font-bold ${s.color}`}>{s.value}</div>
              <div className="text-[10px] text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>Completion</span>
            <span className="font-semibold text-brand-700">{completionRate}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-600 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Top priority tasks */}
      <div className="card p-5">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Focus queue</div>
        <div className="space-y-2">
          {pendingTasks.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-4">All clear! 🎉</p>
          ) : (
            pendingTasks.map((task, i) => {
              const priority = task.priority ?? 'low';
              const dotClass = getPriorityDot(priority);
              return (
                <div key={task.id} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-xs font-bold text-gray-300 w-4">{i + 1}</span>
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${dotClass}`} />
                  <span className="text-xs text-gray-700 flex-1 truncate">{task.title}</span>
                  <span className="text-xs font-bold text-gray-500">{task.priorityScore}</span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Static insights */}
      <div className="card p-5">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Insights</div>
        <div className="space-y-3">
          {staticInsights.map((ins, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className={`w-6 h-6 rounded-lg ${ins.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <ins.icon size={11} className={ins.color} />
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{ins.text}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
