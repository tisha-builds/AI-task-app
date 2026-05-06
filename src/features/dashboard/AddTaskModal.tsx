import { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { useTaskStore } from '../../store/useTaskStore';
import type { Task, Category } from '../../types';

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  editTask?: Task | null;
}

const categoryOptions: { value: Category; label: string; emoji: string }[] = [
  { value: 'work', label: 'Work', emoji: '💼' },
  { value: 'personal', label: 'Personal', emoji: '🏠' },
  { value: 'health', label: 'Health', emoji: '💪' },
  { value: 'learning', label: 'Learning', emoji: '📚' },
  { value: 'other', label: 'Other', emoji: '🌀' },
];

const defaultForm = {
  title: '',
  description: '',
  due: '',
  importance: 5,
  urgency: 5,
  effortHours: 1,
  category: 'work' as Category,
  tags: '',
};

export function AddTaskModal({ open, onClose, editTask }: AddTaskModalProps) {
  const { addTask, updateTask } = useTaskStore();
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState<Partial<typeof defaultForm>>({});

  useEffect(() => {
    if (editTask) {
      setForm({
        title: editTask.title,
        description: editTask.description ?? '',
        due: editTask.due.slice(0, 16), // for datetime-local
        importance: editTask.importance,
        urgency: editTask.urgency,
        effortHours: editTask.effortHours,
        category: editTask.category,
        tags: (editTask.tags ?? []).join(', '),
      });
    } else {
      setForm(defaultForm);
    }
    setErrors({});
  }, [editTask, open]);

  if (!open) return null;

  const validate = () => {
    const e: Partial<typeof defaultForm> = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.due) e.due = 'Due date is required';
    return e;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const taskData = {
      title: form.title.trim(),
      description: form.description.trim() || undefined,
      due: new Date(form.due).toISOString(),
      importance: form.importance,
      urgency: form.urgency,
      effortHours: form.effortHours,
      category: form.category,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      status: 'todo' as const,
    };

    if (editTask) {
      updateTask(editTask.id, taskData);
    } else {
      addTask(taskData);
    }
    onClose();
  };

  const SliderField = ({
    label,
    field,
    hint,
  }: {
    label: string;
    field: 'importance' | 'urgency' | 'effortHours';
    hint: string;
  }) => {
    const max = field === 'effortHours' ? 20 : 10;
    const step = field === 'effortHours' ? 0.5 : 1;
    const val = form[field] as number;
    return (
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-xs font-semibold text-gray-700">{label}</label>
          <span className="text-xs font-bold text-brand-700">{val}{field === 'effortHours' ? 'h' : '/10'}</span>
        </div>
        <input
          type="range"
          min={field === 'effortHours' ? 0.5 : 1}
          max={max}
          step={step}
          value={val}
          onChange={(e) => setForm({ ...form, [field]: parseFloat(e.target.value) })}
          className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-brand-700"
        />
        <div className="text-[10px] text-gray-400 mt-0.5">{hint}</div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="font-heading font-bold text-gray-900">
              {editTask ? 'Edit task' : 'New task'}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Priority score auto-calculates from your inputs
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Task title *</label>
            <input
              type="text"
              className={`input-base ${errors.title ? 'border-red-300 focus:ring-red-500' : ''}`}
              placeholder="e.g. Finalize investor deck"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              autoFocus
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Description</label>
            <textarea
              className="input-base resize-none h-20"
              placeholder="Optional: add more context..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          {/* Due + Category row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Due date *</label>
              <input
                type="datetime-local"
                className={`input-base ${errors.due ? 'border-red-300' : ''}`}
                value={form.due}
                onChange={(e) => setForm({ ...form, due: e.target.value })}
              />
              {errors.due && <p className="text-xs text-red-500 mt-1">{errors.due}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Category</label>
              <select
                className="input-base"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
              >
                {categoryOptions.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.emoji} {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4 bg-gray-50 rounded-2xl p-4">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority factors</div>
            <SliderField label="Urgency" field="urgency" hint="How time-sensitive is this?" />
            <SliderField label="Importance" field="importance" hint="What's the impact if not done?" />
            <SliderField label="Effort (hours)" field="effortHours" hint="How long will this take?" />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Tags</label>
            <input
              type="text"
              className="input-base"
              placeholder="bug, finance, meeting (comma-separated)"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
          <button onClick={onClose} className="btn-ghost">Cancel</button>
          <button onClick={handleSubmit} className="btn-primary">
            <Plus size={15} />
            {editTask ? 'Update task' : 'Add task'}
          </button>
        </div>
      </div>
    </div>
  );
}
