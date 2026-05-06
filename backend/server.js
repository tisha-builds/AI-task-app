/**
 * backend/server.js — Simple Express API for Stage 2 migration.
 * Run: node backend/server.js
 */
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

// In-memory task store (replace with DB in Stage 3)
let tasks = [
  {
    id: uuidv4(),
    title: 'Finalize Q3 investor deck',
    description: 'Update slides with latest metrics.',
    due: new Date(Date.now() + 86400000).toISOString(),
    importance: 10,
    urgency: 9,
    effortHours: 3,
    status: 'in-progress',
    category: 'work',
    tags: ['investor', 'finance'],
    createdAt: new Date().toISOString(),
  },
];

// Utility: compute priority score
function calcScore({ urgency, importance, effortHours }) {
  return Math.round(((0.6 * urgency + 0.4 * importance) / Math.max(0.5, effortHours)) * 10) / 10;
}
function getPriority(score) {
  if (score >= 8) return 'critical';
  if (score >= 5) return 'high';
  if (score >= 3) return 'medium';
  return 'low';
}
function enrich(task) {
  const score = calcScore(task);
  return { ...task, priorityScore: score, priority: getPriority(score) };
}

// Routes
app.get('/api/tasks', (req, res) => {
  res.json(tasks.map(enrich));
});

app.post('/api/tasks', (req, res) => {
  const task = {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    ...req.body,
  };
  tasks.push(task);
  res.status(201).json(enrich(task));
});

app.patch('/api/tasks/:id', (req, res) => {
  const idx = tasks.findIndex((t) => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  tasks[idx] = { ...tasks[idx], ...req.body };
  res.json(enrich(tasks[idx]));
});

app.delete('/api/tasks/:id', (req, res) => {
  tasks = tasks.filter((t) => t.id !== req.params.id);
  res.status(204).end();
});

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => console.log(`✅ API listening on http://localhost:${PORT}`));
