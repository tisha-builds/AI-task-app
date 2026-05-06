# TaskMind — AI-Powered Task Prioritization

> Stop guessing. Work on what matters most.

A modern React + Vite SPA that automatically prioritizes your tasks using a science-backed urgency/importance/effort formula, with a polished landing page and interactive dashboard.

---

## ✨ Features

- **AI Priority Scoring** — every task gets a score: `(0.6 × urgency + 0.4 × importance) / effort`
- **Landing Page** — hero, features, pricing, testimonials, CTA
- **Dashboard** — task grid/list, filter by status/category, search, sort
- **Add / Edit / Delete tasks** — full CRUD with a minimal modal
- **Insights Panel** — AI assistant simulation, stats, focus queue
- **Zustand state** — global store, no boilerplate
- **Mock backend** — swap to real API in seconds (see Migration Plan)

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:5173
```

---

## 📁 Project Structure

```
src/
  assets/styles/      # Global CSS (TailwindCSS)
  components/         # Shared UI (Navbar, Hero, Footer, etc.)
  features/
    tasks/            # TaskCard component
    dashboard/        # Dashboard, AddTaskModal, InsightsPanel
  store/              # Zustand global store
  services/           # API client + mock data
  utils/              # Priority scoring algorithm
  types/              # TypeScript interfaces
```

---

## 🔧 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint check |
| `npm test` | Run Jest tests |

---

## 🧮 Priority Algorithm

```ts
priorityScore = (0.6 × urgency + 0.4 × importance) / effortHours
```

- **Urgency** (1–10): How time-sensitive is this?
- **Importance** (1–10): What's the impact if skipped?
- **Effort** (hours): Normalizes so quick wins surface faster

| Score | Priority |
|-------|----------|
| ≥ 8   | 🔴 Critical |
| ≥ 5   | 🟠 High |
| ≥ 3   | 🟡 Medium |
| < 3   | 🟢 Low |

---

## 🗺️ Migration Plan

| Stage | What to add |
|-------|------------|
| 1 (current) | MVP — in-memory mock data, full UI |
| 2 | Real backend — enable `backend/server.js`, set `VITE_API_URL` |
| 3 | Auth — JWT or Firebase Auth, protected routes |
| 4 | Real AI — OpenAI/Gemini API call for dynamic prioritization |
| 5 | Polish — animations, dark mode, code-splitting |

---

## 🚢 Deployment

Both **Vercel** and **Netlify** work out of the box:

```bash
# Vercel
npx vercel --prod

# Netlify
npx netlify deploy --prod --dir=dist
```

CI/CD is configured via GitHub Actions (`.github/workflows/ci.yml`).

---

## 🛠 Tech Stack

- **React 18** + **TypeScript**
- **Vite 5** — fast HMR, ES Modules
- **TailwindCSS 3** — utility-first styling
- **Zustand** — global state (no boilerplate)
- **React Router v6** — client-side routing
- **Framer Motion** — animations (ready to use)
- **Lucide React** — icons

---

## 📄 License

MIT
