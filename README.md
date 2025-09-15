# 🦸 Superhero App UI

A modern React UI for managing superheroes and their powers, built with **TypeScript**, **Tailwind CSS**, **TanStack Router**, **TanStack Query**, **React Hook Form**, and **Zod**.

---

## 🚀 Features

- List, create, edit, and view superheroes
- Form validation with **Zod** and **React Hook Form**
- Data fetching and caching with **TanStack Query**
- Client-side routing with **TanStack Router**
- Tailwind CSS for responsive and modern styling
- Modular and scalable project structure

---

## 🏗 Project Structure

```
src/
├── public/                 # Images, icons, etc.
├── features/
│   ├── super-power/        # Super powers feature
│   └── superhero/          # Superheroes feature
│       ├── components/     # Cards, forms, lists, detail views
│       ├── hooks/          # Custom hooks
│       ├── pages/          # Page components
│       ├── queries/        # TanStack Query options
│       ├── schemas/        # Zod validation schemas
│       ├── services/       # API services
│       └── types/          # TypeScript interfaces
├── routes/                 # TanStack Router route definitions
├── shared/                 # Shared components, hooks, providers, types
├── main.tsx                # App entry
├── providers.tsx           # React providers
├── route.config.ts         # Router configuration
├── routeTree.gen.ts        # Auto-generated route tree
└── index.css               # Tailwind styles
```

🛠 Tech Stack

- **React 19+** — UI library
- **TypeScript** — Type safety
- **Tailwind CSS** — Utility-first styling
- **TanStack Router** — Client-side routing
- **TanStack Query** — Data fetching & caching
- **React Hook Form** — Form state management
- **Zod** — Schema validation

## ⚡ How to Run Locally

Follow these steps to run the project on your machine:

1. **Clone the repository**

```
git clone https://github.com/your-username/superhero-app-ui.git
cd superhero-app-ui

Install dependencies
npm install

Start development server
npm run dev

Build for production
npm run build

```

🌍 Deployment

The project is deployed on Vercel: https://superhero-app-ui.vercel.app
