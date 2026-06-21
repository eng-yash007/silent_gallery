# The Silent Gallery - Project Documentation & Production Workflow

This document provides a complete breakdown of the project's architecture, the technology stack used, the purpose of each page, and a step-by-step workflow to make the application 100% production-ready.

---

## 1. Technology Stack (What & Why)

### Frontend & Backend Framework
* **Next.js 14 (App Router)** 
  * *Why:* It allows us to write both the frontend UI and the backend API logic in one single project. It makes the app extremely fast using Server Components.
  
### Styling & UI
* **Tailwind CSS**
  * *Why:* Used to build the "Glassmorphism" UI, dynamic hover states, and responsive design without writing messy custom CSS files. It's highly maintainable.

### Database & ORM
* **SQLite (Local Database)**
  * *Why:* Easy to set up for local development without needing Docker or external servers.
* **Prisma ORM**
  * *Why:* It provides a secure, type-safe way to communicate with the database (Tasks, Journals, Projects) from our Next.js Server Actions.

### Authentication
* **NextAuth.js (Auth.js)**
  * *Why:* The most secure and standard way to implement "Login with Google" in Next.js. We need this to get the user's permission to read their Google Calendar and Gmail securely.

---

## 2. Page & Section Breakdown

### Layout Components
* **Sidebar (`Sidebar.tsx`)**: The main navigation menu. It dynamically highlights the active page.
* **Header (`Header.tsx`)**: Contains the dynamic Notifications dropdown and quick-access buttons.

### Application Pages
* **Today (`/`)**: The main dashboard. Users can add, complete, and delete daily protocols (tasks). This is connected to the local SQLite database.
* **Calendar (`/calendar`)**: Designed to show a monthly layout and a list of synced events. *(Currently UI only; pending Google API integration).*
* **Projects (`/projects`)**: A workspace for tracking long-term goals and their progress. *(Pending Database integration).*
* **Journal (`/journal`)**: A rich-text reflection area for evening logs. *(Pending Database integration).*
* **Mailbox (`/mailbox`)**: An email client interface. *(Pending Google Gmail API integration).*
* **News, Progress, Profile, Settings, Help**: Additional auxiliary pages that currently hold static UI structures.

---

## 3. Production-Ready Workflow (Next Steps)

To make this project fully functional and deploy it live to the internet, follow these easy steps:

### Phase 1: Google API Integrations (Crucial Next Step)
Right now, the Calendar and Mailbox are just UI. To make them real:
1. **Create a Google Cloud Project**: Go to the Google Cloud Console.
2. **Enable APIs**: Enable the `Google Calendar API` and `Gmail API`.
3. **Generate Credentials**: Create OAuth 2.0 Client IDs.
4. **Update `.env`**: Add your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to the project's `.env` file.
5. **Implement Fetch Logic**: Write Next.js Server Actions to fetch your real emails and events.

### Phase 2: Complete the Local Database (CRUD)
The "Today" page tasks are fully working with the database. We need to do the same for the rest:
1. **Journal**: Create a form to write and save journal entries to the database.
2. **Projects**: Create a form to add new projects, update their status, and delete them.

### Phase 3: Prepare for Production Database
SQLite is great for local development, but Vercel (our host) doesn't support local SQLite files easily.
1. **Setup PostgreSQL**: Create a free Postgres database on **Vercel Postgres** or **Supabase**.
2. **Update Prisma**: Change `provider = "sqlite"` to `provider = "postgresql"` in `schema.prisma`.
3. **Migrate**: Run `npx prisma db push` to create the tables on the live database.

### Phase 4: Final Polish & Deployment
1. **Testing**: Click through every page, ensuring no errors occur when adding/deleting items.
2. **Push to GitHub**: Commit your code and push the repository to GitHub.
3. **Deploy to Vercel**: 
   - Go to vercel.com and import your GitHub repository.
   - Add your `.env` variables (Database URL, Google Client ID/Secret) into the Vercel dashboard.
   - Click Deploy!

---
*Created automatically to help guide the final development phases.*
