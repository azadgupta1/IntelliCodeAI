# IntelliCodeAI 🚀

**Your Personal AI Code Reviewer – Built for Developers, Loved by Repositories.**

IntelliCodeAI is an intelligent platform that automatically reviews your code using powerful AI models like Google Gemini. It provides real-time feedback, highlights bugs, offers optimization suggestions, and even allows you to fix and commit code changes directly from the platform. Whether you upload files or connect GitHub repositories, IntelliCodeAI ensures your code is always clean, efficient, and production-ready.

---

## 🔥 Features

- ⚙️ **AI-Powered Code Review**
  - Analyzes code for bugs, anti-patterns, performance issues, and code smells using LLMs (Gemini Flash).
  
- 🔗 **GitHub Integration**
  - Connect GitHub account via OAuth.
  - Analyze any file or commit from your repositories.
  - Auto-analysis via GitHub Webhooks.

- 📥 **Upload & Analyze Files**
  - Drag & drop or upload code files for instant review—no GitHub required.

- 🧠 **AI Fix Suggestions**
  - View side-by-side original vs improved code.
  - One-click fix and commit back to GitHub.

- 🕹️ **In-Platform Code Editor**
  - Edit, review, and commit fixes—all inside IntelliCodeAI.

- 📊 **Dashboard**
  - Track analysis history, error trends, and repository health.

- 🔔 **Real-Time Notifications**
  - Get alerts for new issues, commits, pull requests, and fixes.

- 🌐 **Auto Analysis via Webhooks**
  - Automatically analyze every new GitHub commit if auto-analyze is enabled.

---

## 📸 Screenshots

| Dashboard View | AI Fix Suggestions |
|----------------|--------------------|
| ![dashboard](./screenshots/dashboard.png) | ![ai-fix](./screenshots/aifix.png) |

---

## 🛠️ Tech Stack

**Frontend**:  
- React (Vite)  
- Tailwind CSS  
- Framer Motion  
- ShadCN UI  

**Backend**:  
- Node.js + Express  
- PostgreSQL with Prisma ORM  
- Google Gemini API  
- GitHub REST & Webhook APIs  

**Others**:  
- JWT Auth  
- GitHub OAuth  
- Ngrok (for local webhook testing)  

---

## 🚀 Getting Started

### 🔧 Prerequisites
- Node.js >= 18.x
- PostgreSQL
- GitHub OAuth App credentials
- Google Gemini API key

---

### 📦 Backend Setup

```bash
cd backend
cp .env.example .env    # Fill in required env variables
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
