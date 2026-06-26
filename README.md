# Silent Gallery 🌌

> **AI Voice Assistant & Smart Workspace**

Silent Gallery is a next-generation productivity operating system that seamlessly blends task management with powerful AI automation. It empowers users to control their workflow hands-free using real-time voice commands, automatically schedule Google Meet sessions, and gain intelligent insights from their daily journals.

---

## ✨ Key Features

- 🎙️ **Interactive Voice Agent:** Built with **Whisper** (Speech-to-Text) and **Llama-3** (via Groq API). Talk to your workspace naturally to execute tasks and schedule events entirely hands-free.
- 📅 **Google Workspace Integration:** Instantly generate **Google Meet** video links, sync events to your **Google Calendar**, and send automated email invitations via **Gmail** using voice commands.
- 🧠 **AI NLP Journaling:** A smart journaling module that uses **Wink NLP** to automatically run sentiment analysis on your entries and extract key topics/tags in real time.
- 📊 **Predictive Daily Briefing:** Analyzes your schedule density and meeting loads to provide a personalized, contextual morning briefing and productivity forecast.
- 🎨 **Immersive UI/UX:** A highly interactive interface featuring complex micro-animations crafted with **Framer Motion** and **Tailwind CSS**.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS, Framer Motion
- **Audio:** Web Audio API (MediaRecorder)

### Backend & Database
- **Database:** PostgreSQL (via Supabase)
- **ORM:** Prisma
- **Auth:** NextAuth.js (Google OAuth)

### AI & Integrations
- **LLM / Processing:** Llama-3 (Groq API), Whisper (Groq API)
- **NLP:** Wink NLP
- **APIs:** Google Calendar API, Google Meet APIs

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18+)
- PostgreSQL database (e.g., Supabase or local)
- [Groq API Key](https://console.groq.com/) for Llama-3 & Whisper
- [Google Cloud Console](https://console.cloud.google.com/) Credentials (for NextAuth & Calendar API)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/silent-gallery.git
   cd silent-gallery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   # Database (PostgreSQL)
   DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

   # NextAuth & Google OAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # AI Configuration
   GROQ_API_KEY="your-groq-api-key"

   # Preferences
   TZ="Asia/Kolkata"
   ```

4. **Initialize Database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 👨‍💻 Note for Recruiters & Developers
Silent Gallery was built to demonstrate advanced proficiency in connecting complex system architecture with modern, fluid UI design. It showcases the ability to manage multimodal inputs (Web Audio API), integrate heavy 3rd-party ecosystems (Google Workspace OAuth & Calendar APIs), and utilize cutting-edge LLMs (Llama-3 via Groq) in a real-world, scalable environment.
