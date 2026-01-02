# ⭐ IntelliCodeAI  
### AI-Powered Code Review Platform for Modern Development Teams

> **IntelliCodeAI** is a full-stack AI code review platform that integrates directly with GitHub to automatically analyze commits, detect issues, suggest fixes, and push improvements — **before code reaches production**.

Built to mirror real-world developer workflows, IntelliCodeAI combines **LLM-driven analysis**, **GitHub automation**, and a **production-grade backend** to deliver continuous code quality at scale.

---

## 🚀 Why IntelliCodeAI?

Modern teams struggle with:
- Inconsistent code reviews  
- Late detection of bugs & anti-patterns  
- Manual, time-consuming PR feedback  

**IntelliCodeAI solves this by acting as an always-on AI reviewer**, deeply integrated into GitHub.

✅ Faster feedback  
✅ Higher code quality  
✅ Zero manual overhead  

---

## ⚡ Key Capabilities

- Automated AI Code Reviews on every commit  
- GitHub OAuth + Webhooks for real-time analysis  
- Side-by-side AI Fix Suggestions  
- In-platform Code Editor & Commit Flow  
- Repository Health Dashboard & Error Trends  

---

## 🔥 Core Features

### 🧠 AI-Powered Code Analysis
- Detects bugs, logical errors, performance bottlenecks
- Identifies anti-patterns & code smells
- Powered by **Google Gemini Flash (LLM)**

---

### 🔗 Deep GitHub Integration
- Secure GitHub OAuth authentication
- Analyze files, commits, and repositories
- Webhook-driven auto-analysis on every commit

---

### 🧩 AI Fix Suggestions
- Side-by-side original vs AI-improved code
- One-click apply & commit directly to GitHub

---

### 🕹️ In-Platform Code Editor
- Review, edit, and refine AI suggestions
- Commit fixes without leaving IntelliCodeAI

---

### 📊 Analytics Dashboard
- Analysis history
- Error frequency trends
- Repository health insights

---

### 🔔 Real-Time Notifications
- Commit events
- Detected issues
- Fix suggestions & applied changes

---

## 🧠 System Architecture

![System Architecture](./docs/architecture.png)

**Flow Overview**
1. GitHub event triggers webhook  
2. Backend queues AI analysis  
3. LLM evaluates code  
4. Results stored & visualized  
5. Optional fix committed back to GitHub  

---

## 🗄️ Database Design

![Database Schema](./docs/db-design.png)

- Normalized relational schema
- Prisma ORM
- Optimized for scalability and traceability

---

## 📸 Product Screenshots

| Dashboard | AI Fix Suggestions |
|---------|-------------------|
| ![Dashboard](./screenshots/dashboard.png) | ![AI Fix](./screenshots/aifix.png) |

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Framer Motion
- Monaco Editor
- TanStack Query

### Backend
- Node.js + Express
- PostgreSQL
- Prisma ORM
- Google Gemini API
- GitHub REST & Webhook APIs

### Infrastructure & Auth
- JWT Authentication
- GitHub OAuth
- Ngrok (local webhook testing)

---

## 🧪 Testing Strategy

- Manual API testing using Postman
- Webhook validation via Ngrok
- Edge-case testing:
  - Invalid OAuth states
  - Large commits
  - Concurrent analysis limits

> Designed around real production workflows, not just happy paths.

---

## ⚙️ Getting Started

### Prerequisites
- Node.js >= 18
- PostgreSQL
- GitHub OAuth App
- Google Gemini API Key

---

### Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```


### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables (Backend)
```bash
PORT=3000
DATABASE_URL=

JWT_SECRET=
JWT_EXPIRATION=12h

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_REDIRECT_URI=

GEMINI_API_KEY=
GEMINI_API_KEY_CHATBOT=

FRONTEND_URL=http://localhost:5173
WEBHOOK_URL=<ngrok_url>
```


## 🌱 Roadmap
- Pull Request inline comments
- Team-level analytics
- CI/CD integration
- Multi-language support


## Author
### Azad Gupta
Full-Stack Developer | AI-Focused Systems

- Built with a strong emphasis on real-world engineering practices, scalability, and developer productivity.
EOF