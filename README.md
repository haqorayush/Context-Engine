# 🧠 Context-Engine — Memory-Aware LLM Orchestration & Chat System

> A modern, stateful AI chat application and orchestration platform built with **Next.js 16**, **Vercel AI SDK**, **OpenRouter**, **Drizzle ORM (PostgreSQL)**, and **NextAuth**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhaqorayush%2FContext-Engine)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-blue?style=flat&logo=vercel)](https://ce-aichat.vercel.app/)

---

## 📌 Overview

Most LLM applications today are simple prompt-and-response wrappers that struggle with context retention, multi-turn state, and multi-model flexibility. **Context-Engine** implements a system-first architecture:

- **Stateful Conversational History**: Seamless session memory and context injection across multi-turn interactions.
- **Unified Provider Abstraction via OpenRouter**: Route to cutting-edge models (`moonshotai/kimi-k2-0905`, `deepseek/deepseek-v3.2`, `mistral/codestral`, `xai/grok`, and more) through a single, reliable API.
- **Interactive Artifacts & Document Editing**: Real-time document generation, side-by-side editing, diffs, and version tracking.
- **Production-Ready Stack**: Built with Next.js Turbopack, Tailwind CSS, Radix UI, Drizzle ORM, and PostgreSQL.

---

## 🚀 Deploying to Vercel

Context-Engine is optimized for seamless zero-config deployment on **[Vercel](https://vercel.com/)**.

### 1. One-Click Deploy
Click the button below or import your repository directly from the Vercel dashboard:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhaqorayush%2FContext-Engine)

### 2. Configure Environment Variables in Vercel
In your Vercel Project Settings under **Environment Variables**, configure the following:

| Variable | Required | Description |
| :--- | :---: | :--- |
| `AUTH_SECRET` | **Yes** | 32-byte secret for NextAuth. Generate with `openssl rand -base64 32` or at [generate-secret.vercel.app](https://generate-secret.vercel.app/32). |
| `OPENROUTER_API_KEY` | **Yes** | Your API key from [OpenRouter](https://openrouter.ai/keys) (`sk-or-v1-...`). |
| `OPENROUTER_BASE_URL` | No | Defaults to `https://openrouter.ai/api/v1`. |
| `POSTGRES_URL` | **Yes** | Connection string for PostgreSQL (attach **Vercel Postgres**, **Neon**, or **Supabase**). |
| `REDIS_URL` | No | Optional Redis connection string for rate limiting (e.g. **Upstash Redis**). |
| `BLOB_READ_WRITE_TOKEN` | No | Optional token for file/attachment uploads via **Vercel Blob**. |

### 3. Apply Database Migrations
Once your database is linked:
```bash
pnpm db:migrate
```
*(Or run `npx tsx lib/db/migrate.ts` with your production `POSTGRES_URL` set).*

---

## 💻 Local Development

### Prerequisites
- [Node.js 18+](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (`corepack enable` or `npm i -g pnpm`)
- [Docker](https://www.docker.com/) (for local PostgreSQL & Redis)

### 1. Clone & Install
```bash
git clone https://github.com/haqorayush/Context-Engine.git
cd Context-Engine
pnpm install
```

### 2. Start Local Database & Redis
Start PostgreSQL 15 and Redis 7 in Docker:
```bash
docker compose up -d
```

### 3. Setup Environment Variables
Copy the example environment file:
```bash
cp .env.example .env.local
```
Update `.env.local` with your `OPENROUTER_API_KEY` and generated `AUTH_SECRET`:
```bash
# Generate secret
openssl rand -base64 32
```

### 4. Run Migrations & Start Server
```bash
# Apply schema to local Postgres
pnpm db:migrate

# Start Next.js development server
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Architecture & Processing Flow

```markdown
User Message
    ↓
Pre-processing & Token Budget Allocation
    ↓
Context Injection (Session & Database History)
    ↓
OpenRouter Provider Abstraction Layer
    ↓
Streamed Response (SSE) + Live Artifact Updates
    ↓
Post-processing & State Persistence (PostgreSQL)
```

### Key Modules
- **`lib/ai/providers.ts`**: Unified OpenRouter provider integration powered by `@ai-sdk/openai`.
- **`lib/ai/models.ts`**: Model registry, capabilities (tools, vision, reasoning), and fallback definitions.
- **`lib/db/`**: Drizzle ORM schema, migrations, and database queries for chats, messages, votes, and artifacts.
- **`app/(chat)/api/chat/route.ts`**: Streaming chat endpoint with tool calls and token budget controls.

---

## 🌐 Live Demo

Try the live application:
👉 **[https://ce-aichat.vercel.app/](https://ce-aichat.vercel.app/)**

---

## 👨‍💻 Author

**Ayush Dwivedy**
- GitHub: [@haqorayush](https://github.com/haqorayush)
- LinkedIn: [Ayush Dwivedy](https://www.linkedin.com/in/haqor-ayush/)
- Email: [ayushdwivedy32@gmail.com](mailto:ayushdwivedy32@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
