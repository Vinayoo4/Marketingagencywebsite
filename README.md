# Shri Nandi Marketing Agency

Local-first React + TypeScript + Vite SPA with a local TypeScript backend that uses JSON files as a NoSQL-style store.

## Stack

- Frontend: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router
- Backend: Node.js + TypeScript + Express (`/local-backend`)
- Data store: local JSON files in `/data`

## Routes

- `/`
- `/about`
- `/services`
- `/contact`
- `/admin`

## Local data collections

- `data/inquiries.json`
- `data/services.json`
- `data/testimonials.json`
- `data/admin_users.json`

## Local backend API

- `GET /api/services`
- `GET /api/testimonials`
- `POST /api/inquiries`
- `GET /api/inquiries` (admin)
- `PATCH /api/inquiries/:id` (admin)
- `POST /api/admin/login`

## Development

Install frontend dependencies:

```bash
npm install
```

Install local backend dependencies:

```bash
cd local-backend
npm install
cd ..
```

Start backend:

```bash
npm run dev:backend
```

Start frontend:

```bash
npm run dev
```

Build frontend:

```bash
npm run build
```

Default local admin credentials:

- username: `admin`
- password: `admin123`
