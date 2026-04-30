# 🤖 AI Portfolio — Setup Guide

A beautiful Next.js portfolio website with an embedded AI chatbot powered by Claude.

---

## 📁 Project Structure

```
ai-portfolio/
├── app/
│   ├── api/chat/route.ts   ← Claude API endpoint (backend)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx            ← Main portfolio page
├── components/
│   └── Chatbot.tsx         ← Floating AI chatbot widget
├── data/
│   └── portfolio.ts        ← ⭐ YOUR INFO GOES HERE
├── .env.example
├── package.json
└── SETUP.md
```

---

## 🚀 Step-by-Step Setup

### Step 1 — Fill in your info

Open `data/portfolio.ts` and replace all the placeholder content with YOUR:
- Name, title, bio, location
- GitHub, LinkedIn, Twitter links
- Work experience
- Education
- Projects
- Skills

Every field has a `👈 Replace` comment to guide you.

---

### Step 2 — Get your Anthropic API Key

1. Go to **https://console.anthropic.com**
2. Sign up / Log in
3. Click **"API Keys"** in the sidebar
4. Click **"Create Key"**
5. Copy the key (starts with `sk-ant-...`)

---

### Step 3 — Set up your environment

In the project folder, create a file called `.env.local`:

```bash
cp .env.example .env.local
```

Then open `.env.local` and paste your API key:

```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

> ⚠️ Never commit `.env.local` to GitHub! It's already in `.gitignore`.

---

### Step 4 — Install & Run

Make sure you have **Node.js 18+** installed, then:

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open **http://localhost:3000** in your browser. You should see your portfolio!

Click the **chat bubble** in the bottom-right corner to talk to your AI assistant.

---

## 🌐 Deploy to Vercel (Free)

1. Push your project to GitHub
2. Go to **https://vercel.com** and sign in with GitHub
3. Click **"New Project"** → import your repo
4. In **Environment Variables**, add:
   - Key: `ANTHROPIC_API_KEY`
   - Value: your API key
5. Click **Deploy** 🚀

Your portfolio will be live at `https://your-project.vercel.app`!

---

## 🎨 Customization Tips

- **Change colors**: Search for `indigo` in the code and replace with any Tailwind color (e.g., `violet`, `blue`, `emerald`)
- **Add a profile photo**: Replace the avatar letter div in `page.tsx` with an `<Image>` component
- **Add more projects**: Just add more objects to the `projects` array in `data/portfolio.ts`
- **Change suggested questions**: Edit the `SUGGESTED_QUESTIONS` array in `components/Chatbot.tsx`

---

## 🧠 How the AI Works

1. Visitor types a question in the chat widget
2. The chatbot sends the conversation to `/api/chat`
3. The API route builds a **system prompt** from all your portfolio data
4. Claude reads the context and replies as your AI assistant
5. The response appears in the chat

Your API key is kept **secret** on the server — visitors never see it.

---

Built with Next.js, Tailwind CSS, and Claude API 🤖
