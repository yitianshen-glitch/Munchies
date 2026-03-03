# Munchies

Restaurant discovery app built with Next.js 15 App Router. Browse and filter restaurants by food category, delivery time, and price range.

## Setup

```bash
npm install
```

## Running

| Command | Description |
|---|---|
| `npm run dev` | Start dev server at http://localhost:3000 |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |

## Stack

- **Next.js 15** — App Router, Server Components, SSR
- **TypeScript** — full type safety
- **Tailwind CSS v4** — styling and responsive layout
- **Vitest + React Testing Library** — unit and component tests

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Home — restaurant list with filters
│   └── restaurants/[id]/page.tsx # Restaurant detail page
├── components/       # UI components
│   └── filters/      # Filter sidebar and topbar
├── hooks/            # useFilters — URL-based filter state
├── lib/              # API client (api.ts)
├── types/            # Shared TypeScript types
└── utils/            # Pure functions (format, filterRestaurants)

tests/
├── unit/             # Pure function tests
├── components/       # Component rendering tests
└── integration/      # Filter logic integration tests
```

## API

Data is fetched from `https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api`

| Endpoint | Used for |
|---|---|
| `GET /restaurants` | Restaurant list (home page) |
| `GET /restaurants/{id}` | Single restaurant (detail page) |
| `GET /filter` | Food category filters |
| `GET /filter/{id}` | Category image and name (detail page) |
| `GET /open/{id}` | Open/closed status per restaurant |
| `GET /price-range/{id}` | Price range label per restaurant |
