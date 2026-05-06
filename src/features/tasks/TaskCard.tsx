import { useState } from 'react';
import { Clock, Trash2, CheckCircle2, Circle, Edit3, Tag } from 'lucide-react';
import type { Task } from '../../types';
import {
  getPriorityColor,
  getPriorityDot,
  formatDueDate,
  isOverdue,
} from '../../utils/priority';
import { useTaskStore } from '../../store/useTaskStore';

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
}

const categoryEmoji: Record<string, string> = {
  work: '💼',
  personal: '🏠',
  health: '💪',
  learning: '📚',
  other: '🌀',
};

export function TaskCard({ task, onEdit }: TaskCardProps) {
  const { toggleStatus, deleteTask } = useTaskStore();
  const [deleting, setDeleting] = useState(false);

  const overdue = isOverdue(task.due) && task.status !== 'done';
  const done = task.status === 'done';
  const priority = task.priority ?? 'low';
  const priorityClass = getPriorityColor(priority);
  const dotClass = getPriorityDot(priority);
  const dueFmt = formatDueDate(task.due);

  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => deleteTask(task.id), 250);
  };

  return (
    <div
      className={`card group p-5 flex flex-col gap-3 transition-all duration-200 ${
        deleting ? 'opacity-0 scale-95' : ''
      } ${done ? 'opacity-60' : 'hover:shadow-card-hover hover:-translate-y-0.5'}`}
    >
      {/* Top row */}
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => toggleStatus(task.id)}
          className="mt-0.5 flex-shrink-0 text-gray-300 hover:text-brand-600 transition-colors"
        >
          {done ? (
            <CheckCircle2 size={18} className="text-brand-600" />
          ) : (
            <Circle size={18} />
          )}
        </button>

        {/* Title + category */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-sm">{categoryEmoji[task.category]}</span>
            <span className={`badge border text-[10px] ${priorityClass}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
              {priority}
            </span>
          </div>
          <h3
            className={`font-medium text-sm text-gray-900 leading-snug ${
              done ? 'line-through text-gray-400' : ''
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="text-xs text-gray-400 mt-0.5 line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          )}
        </div>

        {/* Score badge */}
        <div className="flex-shrink-0">
          <div className="text-right">
            <div className="text-lg font-heading font-bold text-gray-900">{task.priorityScore}</div>
            <div className="text-[10px] text-gray-400">score</div>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 pt-1 border-t border-gray-50">
        <Clock size={11} className={`flex-shrink-0 ${overdue ? 'text-red-500' : 'text-gray-400'}`} />
        <span
          className={`text-xs font-medium ${
            overdue ? 'text-red-600' : done ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {dueFmt}
        </span>

        <span className="text-gray-200">·</span>
        <span className="text-xs text-gray-400">{task.effortHours}h effort</span>

        {task.tags && task.tags.length > 0 && (
          <>
            <span className="text-gray-200">·</span>
            <Tag size={10} className="text-gray-400" />
            <span className="text-xs text-gray-400 truncate">{task.tags[0]}</span>
          </>
        )}

        {/* Actions */}
        <div className="ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button
              onClick={() => onEdit(task)}
              className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <Edit3 size={12} />
            </button>
          )}
          <button
            onClick={handleDelete}
            className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
