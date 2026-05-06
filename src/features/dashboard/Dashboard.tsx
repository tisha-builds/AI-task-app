import { useState } from 'react';
import { Plus, Search, SlidersHorizontal, LayoutGrid, List } from 'lucide-react';
import { useTaskStore } from '../../store/useTaskStore';
import { TaskCard } from '../tasks/TaskCard';
import { InsightsPanel } from './InsightsPanel';
import { AddTaskModal } from './AddTaskModal';
import type { Task, FilterStatus, SortField } from '../../types';

type ViewMode = 'grid' | 'list';

const statusTabs: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

const sortOptions: { value: SortField; label: string }[] = [
  { value: 'priorityScore', label: 'Priority score' },
  { value: 'due', label: 'Due date' },
  { value: 'createdAt', label: 'Newest first' },
  { value: 'title', label: 'Alphabetical' },
];

const categoryOptions = [
  { value: 'all', label: 'All categories' },
  { value: 'work', label: '💼 Work' },
  { value: 'personal', label: '🏠 Personal' },
  { value: 'health', label: '💪 Health' },
  { value: 'learning', label: '📚 Learning' },
  { value: 'other', label: '🌀 Other' },
];

export function Dashboard() {
  const { filters, setFilter, getFilteredTasks, getStats } = useTaskStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const tasks = getFilteredTasks();
  const stats = getStats();

  const openAdd = () => {
    setEditTask(null);
    setModalOpen(true);
  };
  const openEdit = (task: Task) => {
    setEditTask(task);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-surface-50 pt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Main column */}
          <div className="flex-1 min-w-0 space-y-5">

            {/* Page header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-heading font-bold text-gray-900">My Tasks</h1>
                <p className="text-sm text-gray-400 mt-0.5">
                  {stats.total} tasks · {stats.done} done · {stats.overdue} overdue
                </p>
              </div>
              <button onClick={openAdd} className="btn-primary text-sm py-2.5">
                <Plus size={15} />
                Add task
              </button>
            </div>

            {/* Search + filter bar */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  className="input-base pl-9 text-sm"
                  placeholder="Search tasks…"
                  value={filters.search}
                  onChange={(e) => setFilter({ search: e.target.value })}
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`btn-ghost border border-gray-200 py-2.5 ${showFilters ? 'bg-gray-100' : ''}`}
              >
                <SlidersHorizontal size={14} />
                <span className="hidden sm:inline text-sm">Filters</span>
              </button>

              {/* View toggle */}
              <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:bg-gray-50'}`}
                >
                  <LayoutGrid size={14} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:bg-gray-50'}`}
                >
                  <List size={14} />
                </button>
              </div>
            </div>

            {/* Expanded filters */}
            {showFilters && (
              <div className="card p-4 grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Category</label>
                  <select
                    className="input-base text-sm"
                    value={filters.category}
                    onChange={(e) => setFilter({ category: e.target.value })}
                  >
                    {categoryOptions.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Sort by</label>
                  <select
                    className="input-base text-sm"
                    value={filters.sortBy}
                    onChange={(e) => setFilter({ sortBy: e.target.value as SortField })}
                  >
                    {sortOptions.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Status tabs */}
            <div className="flex gap-1 border-b border-gray-100 pb-0">
              {statusTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setFilter({ status: tab.value })}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors border-b-2 -mb-px ${
                    filters.status === tab.value
                      ? 'text-brand-700 border-brand-700 bg-brand-50'
                      : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Task grid/list */}
            {tasks.length === 0 ? (
              <div className="card flex flex-col items-center justify-center py-16 text-center">
                <div className="text-4xl mb-3">🎯</div>
                <div className="text-gray-500 font-medium">No tasks found</div>
                <p className="text-sm text-gray-400 mt-1">
                  {filters.search ? 'Try a different search.' : 'Add a task to get started.'}
                </p>
                {!filters.search && (
                  <button onClick={openAdd} className="btn-primary mt-4 text-sm">
                    <Plus size={14} />
                    Add your first task
                  </button>
                )}
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4'
                    : 'flex flex-col gap-3'
                }
              >
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} onEdit={openEdit} />
                ))}

                {/* Add task card */}
                <button
                  onClick={openAdd}
                  className={`border-2 border-dashed border-gray-200 rounded-2xl p-5 text-center text-sm text-gray-400 hover:border-brand-400 hover:text-brand-600 hover:bg-brand-50 transition-all group ${
                    viewMode === 'list' ? 'py-4' : ''
                  }`}
                >
                  <Plus size={18} className="mx-auto mb-1 text-gray-300 group-hover:text-brand-500 transition-colors" />
                  Add task
                </button>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="w-full lg:w-72 xl:w-80 flex-shrink-0">
            <InsightsPanel />
          </div>
        </div>
      </div>

      {/* Modal */}
      <AddTaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        editTask={editTask}
      />
    </div>
  );
}
