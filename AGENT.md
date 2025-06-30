# Agent Instructions for JambQuestions

## Commands
- **Dev**: `npm run dev` (uses turbopack)
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Start**: `npm start`
- No specific test commands configured

## Architecture
- **Framework**: Next.js 15 (App Router) with TypeScript
- **Database**: PostgreSQL via `postgres` library (connection: `POSTGRES_URL` env var with SSL)
- **Email**: Nodemailer with Gmail/SMTP for password resets
- **State**: Zustand for client state management
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Auth**: Custom auth system with password reset tokens

## Database Schema
Tables: users, subjects, questions, password_reset_tokens, practice_sessions, user_progress, goals, notifications

## Code Style
- **TypeScript**: Strict mode enabled, `@/*` path mapping
- **Imports**: Use `@/` for relative imports from root
- **Components**: React functional components with TypeScript
- **API Routes**: Next.js App Router API handlers in `app/api/`
- **Email Templates**: Inline HTML with gradient styling (#667eea to #764ba2)
- **Error Handling**: Try-catch blocks with console.error logging
