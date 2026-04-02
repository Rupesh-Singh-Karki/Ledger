# Ledger — Personal Finance Dashboard

A modern, responsive personal finance dashboard built with React, TypeScript, and Tailwind CSS. Track income, expenses, and gain financial insights — all client-side with mock data.

<p align="center">
  <strong>Built for Zorvyn's Frontend Engineering Assessment</strong>
</p>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Dashboard** | Summary cards, balance trend chart, category breakdown donut, recent transactions |
| **Transactions** | Full CRUD (Add/Edit/Delete), search, filter, sort, CSV export |
| **Insights** | Computed financial insights: top category, MoM trends, savings rate, largest expense |
| **RBAC** | Toggle between Admin/Viewer roles — actions disabled (not hidden) for Viewer |
| **Theming** | Light/Dark mode with persisted preference |
| **Responsive** | Mobile-first layout with table → card view switching |
| **Skeleton Loaders** | Shimmer loading states during mock API delays |
| **State Persistence** | Zustand + localStorage — data survives page refresh |

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 8 |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Components | shadcn/ui (Radix primitives + CVA) |
| Charts | Recharts |
| State | Zustand (with persist middleware) |
| Routing | React Router v7 |
| Icons | Lucide React |
| Dates | date-fns |
| Toasts | Sonner |

## 🏗 Architecture

```
src/
├── api/               # Mock API layer (simulated delays)
├── components/
│   ├── dashboard/     # Summary cards, charts, recent transactions
│   ├── insights/      # Insight cards and list
│   ├── layout/        # AppShell, Header, Sidebar, MobileSidebar
│   ├── rbac/          # RoleSwitcher, RoleGuard, PermissionTooltip
│   ├── transactions/  # Table, cards, filters, form dialog
│   └── ui/            # shadcn primitives + custom shared components
├── data/              # Mock transactions (52 entries) + categories
├── hooks/             # Custom hooks (useTransactions, useDashboardData, etc.)
├── lib/               # Utility functions (cn)
├── pages/             # Route-level page components (lazy-loaded)
├── store/             # Zustand slices (transactions + UI)
├── styles/            # Global CSS with design tokens
├── types/             # TypeScript interfaces
└── utils/             # Formatters, calculations, CSV export
```

### Key Design Decisions

- **No derived state in store** — Totals, trends, and insights are computed on-the-fly via pure functions in `utils/calculations.ts`
- **Source-of-truth pattern** — Only raw transactions, role, theme, and filters are persisted
- **Mock API layer** — All data access goes through `api/` functions with simulated 400-600ms delays
- **RBAC via disabling** — Viewer sees all UI but with disabled actions + permission tooltips
- **Color constraints** — Strict teal/cyan/blue/slate palette. No red, green, purple, or yellow.

## 🎨 Design System

**"Obsidian Flux"** — a dark-first, editorial fintech aesthetic.

| Token | Dark | Light |
|-------|------|-------|
| Background | `#121212` | `#F5F7F9` |
| Card | `#1E1E1E` | `#FFFFFF` |
| Primary (Teal) | `#2DD4BF` | `#14B8A6` |
| Secondary (Blue) | `#60A5FA` | `#3B82F6` |
| Destructive (Orange) | `#F97316` | `#EA580C` |
| Typography | Inter (400/500/600/700) | Inter |
| Border Radius | `1.5rem` (24px) | — |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📊 Mock Data

52 hand-crafted transactions spanning **August–December 2024**:
- Recurring: salary ($4,500/mo), rent ($1,200/mo), Netflix, gym, utilities
- October: travel spike (Chicago conference — $800 flight + $250 dinner)
- November: freelance income ($1,200 website redesign)
- December: holiday spending ($350 gifts) + investment dividend ($200)
- 3 pending transactions in December

## 🔐 RBAC Roles

| Action | Admin | Viewer |
|--------|-------|--------|
| View all data | ✅ | ✅ |
| Add transaction | ✅ | 🔒 Disabled |
| Edit transaction | ✅ | 🔒 Disabled |
| Delete transaction | ✅ | 🔒 Disabled |
| Export CSV | ✅ | ✅ |
| Toggle theme | ✅ | ✅ |

## 📁 File Count

~55 files total (components, hooks, store, utils, types, pages, styles)

---

**Author:** Rupesh Singh Karki  
**Assessment:** Zorvyn Frontend Engineering  
**Stack:** React 19 · TypeScript · Tailwind v4 · shadcn/ui · Recharts · Zustand
