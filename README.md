# Mdyaf Website

الموقع الرسمي لشركة مضياف العربية، مبني باستخدام React + Vite + TypeScript.

## Architecture

- Frontend: React + Vite + TypeScript
- UI: Tailwind CSS + shadcn/ui
- Backend: Supabase
- Authentication: Supabase Auth
- Source control: GitHub
- Deployment target: Vercel

## Development

Requirements:

- Node.js 20+
- npm

Install dependencies:

```sh
npm install
```

Start development server:

```sh
npm run dev
```

Build production bundle:

```sh
npm run build
```

## Environment variables

Create a local `.env` file using `.env.example` as a template:

```env
VITE_SUPABASE_URL=https://xxvqvxugnvhbxrnqepiu.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

Never commit secret or service-role keys to the repository.

## Deployment

The intended production flow is:

GitHub -> Vercel -> mdyaf.sa

Supabase provides database and authentication services.

The migration branch is `mdyaf-independent`. Production `main` should only be updated after the independent build and preview deployment are verified.
