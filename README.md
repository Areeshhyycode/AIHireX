# AIHireX — AI-powered Job Portal

> An Indeed × LinkedIn-style job platform where **AI does the boring half** of hiring — resume analysis, scam detection, mock interviews, vector-based job matching, voice TTS, and more.

[Live demo](https://ai-hire-x.vercel.app) · [Repo](https://github.com/Areeshhyycode/AIHireX)

---

## ✨ Overview

AIHireX is a full-stack SaaS portal with three distinct flows:

### Candidate workflow
1. Sign up (Clerk + Google OAuth)
2. Multi-step onboarding — upload resume → AI analysis → set career preferences
3. Get AI-matched jobs across multiple career tracks (Frontend, MERN, etc.)
4. Apply with a guided 3-step modal (questions → resume → review)
5. Practice with a voice-driven AI mock interview (ElevenLabs TTS)
6. Track applications + receive email updates (Resend)

### Recruiter workflow
1. Sign up → role = recruiter
2. Submit company for verification (AI + admin review)
3. Once verified, post jobs — AI drafts the description, scam-checks the post
4. Receive applicants ranked by AI match, manage them through hiring funnel
5. Status changes auto-email candidates + push in-app notifications

### Admin workflow
1. Review pending company verifications (verify / flag / reject)
2. Handle community-reported jobs/users (resolve / dismiss)
3. Monitor platform metrics (users, jobs, reports)

---

## 🛠️ Tech stack

| Layer | Tech |
|-------|------|
| Framework | **Next.js 14** (App Router, Server Components) |
| Styling | Tailwind CSS + Inter / Plus Jakarta Sans |
| Auth | **Clerk** (Google + email) with role metadata |
| Database | **MongoDB Atlas** (Mongoose) |
| LLM | **Groq** (LLaMA 3.3 70B + 3.1 8B) |
| Embeddings | **Hugging Face** (MiniLM-L6-v2) |
| Vector DB | **Pinecone** for semantic job matching |
| File storage | **Cloudinary** for resume PDFs |
| Email | **Resend** for transactional emails |
| Voice (TTS) | **ElevenLabs** for mock interview |
| Cache (planned) | **Upstash Redis** |
| Deployment | **Vercel** |

---

## 🚀 Setup

### Prerequisites
- Node.js 22+
- npm 10+
- Accounts on: MongoDB Atlas, Clerk, Groq, Pinecone, Cloudinary, Resend, HuggingFace, ElevenLabs

### Install

```bash
git clone https://github.com/Areeshhyycode/AIHireX.git
cd AIHireX
npm install --legacy-peer-deps
```

### Environment variables

Copy `.env.example` to `.env.local` and fill in keys. Required at minimum:

- `MONGODB_URI`
- `GROQ_API_KEY`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding/role`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding/role`

> **Network note:** if your local DNS blocks TXT lookups, use the non-SRV MongoDB form (`mongodb://...:27017,...:27017,...:27017/...?ssl=true&authSource=admin`).

### Run locally

```bash
npm run dev          # http://localhost:3000
```

### Build for production

```bash
npm run build
npm start
```

---

## 🤖 AI features

| Feature | Endpoint | Powered by |
|--------|----------|-----------|
| Resume ATS analysis | `POST /api/ai/resume/analyze` | Groq 70B |
| Resume enhancer (full rewrite) | `POST /api/ai/resume/enhance` | Groq 70B |
| Resume authenticity check | `POST /api/ai/resume/authenticity` | Groq 70B |
| AI resume builder | `POST /api/ai/resume/build` | Groq 70B |
| Job description draft | `POST /api/ai/jobs/draft` | Groq 70B |
| Job scam check | `POST /api/ai/jobs/scam-check` | Groq 70B |
| Adaptive interview questions | `POST /api/ai/interview/next` | Groq 8B |
| Voice TTS | `POST /api/ai/tts` | ElevenLabs |
| Career chat | `POST /api/ai/chat` | Groq 70B |
| Semantic job match | `GET /api/recommendations` | HF embeddings + Pinecone |

---

## 🏗️ Architecture

```
src/
├─ app/                       # Next.js App Router
│  ├─ (auth)/                 # /login, /register, /onboarding
│  ├─ (candidate)/            # /candidate/* (sidebar + topbar)
│  ├─ (recruiter)/            # /recruiter/*
│  ├─ (admin)/                # /admin/*
│  └─ api/                    # REST endpoints
├─ components/                # UI (each < 100 LOC, server by default)
├─ lib/
│  ├─ ai/                     # Groq client + prompts + chat helper
│  ├─ pinecone.ts             # vector index helper
│  ├─ embeddings.ts           # HuggingFace MiniLM
│  ├─ cloudinary.ts           # signed upload helper
│  ├─ email/                  # Resend templates
│  ├─ auth.ts                 # getMe / getRole
│  └─ auth-guard.ts           # requireRole()
└─ models/                    # Mongoose schemas (user, job, application, ...)
```

### Data flow highlights
- **Auth** — Clerk middleware protects every `/candidate`, `/recruiter`, `/admin`, and `/api/*` route; layouts call `requireRole()` for fine-grained checks.
- **Resume → match** — PDF → Cloudinary + pdf-parse → Mongo (`user.resume`) → embedded → Pinecone → ranked vs job vectors.
- **Apply** — Mongo `Application` doc (unique on `candidateClerkId+jobId`) → Resend email + in-app notifications for both sides.
- **Verification gate** — `POST /api/jobs` rejects unless the recruiter has `Company.status === "verified"`.

---

## 📂 Project conventions

- **File size:** strictly < 100 LOC per file
- **Components:** server components by default; only opt into `"use client"` for stateful UI
- **Mock data:** lives under `src/lib/mock/*` — replaced by real data in Phase 2
- **All env config:** validated via Zod in `src/lib/env.ts`

---

## 🔮 Future improvements

- [ ] Upstash Redis caching for job lists + recommendations
- [ ] Real-time chat between recruiter ↔ candidate (Pusher / Ably)
- [ ] Video resume + AI personality analysis
- [ ] Stripe billing for recruiter premium tier
- [ ] Browser extension to apply from external job boards
- [ ] LangChain-based agent flows for compound recruiter ops
- [ ] Whisper STT to caption mock interview answers

---

## 🤝 Contributing

PRs welcome. Open an issue first for anything non-trivial.

## 📄 License

MIT.

---

Built by [Areesha](https://github.com/Areeshhyycode) · Made with AI 🤖
