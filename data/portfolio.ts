// ============================================================
//  PORTFOLIO DATA — Filled from Aniruddh's CV
// ============================================================

export const portfolioData = {
  // ----------------------------------------------------------
  // PERSONAL INFO
  // ----------------------------------------------------------
  name: "Aniruddh Prajapati",
  title: "Full Stack Developer & Machine Learning Enthusiast",
  email: "aniruddhprajapati884@gmail.com",
  phone: "07767932699",
  location: "Beckenham, Kent, UK",
  bio: `I'm a motivated Computer Science graduate from Richmond, The American International University, with hands-on experience in full-stack development, machine learning, and database management.
I have a builder mindset with a proven ability to design, develop, and deploy end-to-end systems — demonstrated through SmartDine, an AI-enhanced restaurant management platform I built as my dissertation project.
I'm passionate about combining web development with machine learning to create intelligent, real-world applications.
I'm currently open to graduate roles and exciting projects in full-stack or ML engineering.`,

  // ----------------------------------------------------------
  // SOCIAL / CONTACT LINKS
  // ----------------------------------------------------------
  links: {
    github: "https://github.com/aniruddhprjpt",
    linkedin: "https://www.linkedin.com/in/anni-prajapati/",
    twitter: "",
    portfolio: "https://aniruddhprjpt.github.io",
  },

  // ----------------------------------------------------------
  // SKILLS
  // ----------------------------------------------------------
  skills: {
    languages: ["Python", "Java", "C", "SQL", "TypeScript", "JavaScript"],
    web_development: ["Next.js", "React", "React 19", "HTML", "CSS", "Tailwind CSS", "Django", "REST API"],
    databases: ["PostgreSQL", "MySQL", "SQLite", "Supabase"],
    ai_and_ml: ["Claude API", "Groq API", "LLaMA", "scikit-learn", "TensorFlow", "PyTorch"],
    auth_and_backend: ["Supabase Auth", "Google OAuth", "GitHub OAuth", "JWT", "Row-Level Security", "Supabase Realtime"],
    devops_tools: ["Docker", "Vercel", "Git", "GitHub", "Google Colab"],
    integrations: ["OCR.space", "WebGL (OGL)", "DiceBear", "Cloudflare Speed Test API", "postcodes.io"],
    data_analysis: ["IBM SPSS Statistics", "Microsoft Excel"],
    design_ux: ["Figma", "Glassmorphism UI", "Dark Mode / Light Mode Theming"],
    professional: [
      "Team Collaboration",
      "Time Management",
      "Fast Learner",
      "Communication",
      "Agile / Sprint Workflows",
      "Strong Work Ethic",
    ],
  },

  // ----------------------------------------------------------
  // WORK EXPERIENCE
  // ----------------------------------------------------------
  experience: [
    {
      company: "Orange Technolab",
      role: "Web Developer",
      duration: "Jun 2021 – Nov 2022",
      location: "On-site",
      description: [
        "Developed and maintained full-stack web applications using HTML, CSS, JavaScript, and backend frameworks, delivering responsive, cross-browser-compatible interfaces.",
        "Collaborated with design and product teams to translate client requirements into functional, scalable web solutions.",
        "Built and integrated RESTful APIs, improving data flow between frontend and backend services.",
        "Optimised existing codebases for performance and maintainability, reducing page load times and improving code readability.",
        "Participated in agile sprint cycles, contributing to planning, code reviews, and timely delivery of project milestones.",
      ],
    },
    {
      company: "McDonald's",
      role: "Maintenance Crew Member",
      duration: "Mar 2023 – Present",
      location: "Beckenham, Kent",
      description: [
        "Maintained cleanliness and safety standards in accordance with health code regulations, contributing to successful internal audits.",
        "Trained new team members on maintenance procedures and safety protocols, increasing team efficiency.",
        "Conducted daily stock checks and rotations (FIFO), minimising waste and ensuring optimal product freshness.",
        "Maintained strict temperature control for perishable items, ensuring food safety compliance and reducing spoilage.",
        "Collaborated with management and kitchen staff to ensure stock levels met daily operational needs.",
      ],
    },
  ],

  // ----------------------------------------------------------
  // EDUCATION
  // ----------------------------------------------------------
  education: [
    {
      institution: "Richmond, The American International University",
      degree: "Bachelor of Science in Computer Science",
      duration: "Jan 2023 – May 2026",
      grade: "Coursework in web development, machine learning, HCI/UX, and cybersecurity",
    },
    {
      institution: "Knowledge High School",
      degree: "High School",
      duration: "May 2020 – May 2021",
      grade: "A Grade",
    },
  ],

  // ----------------------------------------------------------
  // PROJECTS
  // ----------------------------------------------------------
  projects: [
    {
      name: "SmartDine — AI Restaurant Management System",
      description:
        "A full-stack AI-enhanced restaurant management platform built as my dissertation project. It uses machine learning for demand forecasting, menu recommendations, and sales prediction, with a complete management dashboard for restaurant staff.",
      tech: ["Django", "React", "PostgreSQL", "scikit-learn", "Docker", "JWT", "REST API"],
      github: "https://github.com/aniruddhprjpt",
      live: "https://smartdine.live/",
      highlights: [
        "Built full-stack system using Django (backend), React (frontend), and PostgreSQL",
        "Integrated ML models (scikit-learn) for demand forecasting, menu recommendation, and sales prediction",
        "Designed RESTful API with JWT authentication and role-based access control",
        "Containerised the entire application using Docker for consistent deployment",
        "Managed sprint-based development covering architecture design, ML evaluation, and UI/UX prototyping",
      ],
    },
    {
      name: "StudyMind AI — Study Smarter. Not Harder.",
      description:
        "A full-stack AI-powered study platform that transforms documents into interactive learning tools. Upload a PDF or DOCX and instantly get AI summaries, chat with your document, auto-generated flashcards, mind maps, quizzes, and a personalised study plan — all with a stunning dark glassmorphism UI and WebGL 3D animated backgrounds.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Groq API", "LLaMA", "Supabase", "Google OAuth", "WebGL", "Vercel"],
      github: "https://github.com/aniruddhprjpt/studymind-ai",
      live: "https://studymind-ai-mu.vercel.app",
      highlights: [
        "Upload PDF/DOCX and get instant AI summaries, flashcards, mind maps, and quizzes powered by LLaMA via Groq API",
        "AI Chat with your document — ask anything, get context-aware answers from your own notes",
        "Formula Extractor for STEM subjects, AI Study Plan generator, and Weak Area Tracker with Progress Dashboard",
        "Multi-tenant auth via Supabase (Google & GitHub OAuth) — every user has private document history; guest mode available",
        "3D WebGL animated UI (OGL Strands), MagicBento cursor-glow panels, onboarding modal with 3D step animations",
      ],
    },
    {
      name: "FlatFlow — Shared House Management App",
      description:
        "A full-stack shared-house management web app with chores, budget tracking, cooking rota, bin collection reminders, an anonymous feedback wall, and live Wi-Fi speed testing — all synced in real-time across the household. Built as the web companion to a React Native mobile app, sharing the same Supabase backend.",
      tech: ["Next.js", "React 19", "TypeScript", "Tailwind CSS v4", "Supabase", "PostgreSQL", "Supabase Realtime", "Google OAuth", "Vercel"],
      github: "https://github.com/aniruddhprjpt",
      live: "https://web-rho-ashy-33.vercel.app",
      highlights: [
        "Role-based auth (admin/member) enforced at the database level via Supabase RLS — not just the UI; invite-code house onboarding",
        "Chore & cooking rotas with gender-split rotation and consent-based swap requests — both parties must accept before a swap lands",
        "Budget tracker with receipt OCR scanning, admin-assigned contributions, real-time pot updates on member confirmation",
        "Reverse-engineered OCR API's label/price text ordering with a bounding-box algorithm to reconstruct real receipt rows before parsing",
        "Root-caused a React modal bug silently stealing keyboard focus mid-typing on iOS Safari — reproduced live in production before and after the fix",
      ],
    },
    {
      name: "AI Portfolio Assistant",
      description:
        "An interactive portfolio website with an embedded AI chatbot powered by Claude API. Visitors can ask questions about my experience, projects, and skills in natural language — no more reading static pages.",
      tech: ["Next.js", "TypeScript", "Claude API", "Tailwind CSS"],
      github: "https://github.com/aniruddhprjpt",
      live: "https://aniruddhprjpt.github.io",
      highlights: [
        "Built a dynamic system prompt that feeds portfolio data to Claude at runtime",
        "Floating chat widget with suggested questions and markdown rendering",
        "API key kept secure on the server — never exposed to visitors",
      ],
    },
  ],

  // ----------------------------------------------------------
  // LANGUAGES
  // ----------------------------------------------------------
  languages: [
    "Gujarati (Native)",
    "Hindi (Fluent)",
    "English (Fluent)",
    "Marathi (Basic)",
  ],

  // ----------------------------------------------------------
  // CERTIFICATIONS (add yours here if any)
  // ----------------------------------------------------------
  certifications: [
    "BSc Computer Science — Richmond, The American International University (Graduated May 2026)",
  ],

  // ----------------------------------------------------------
  // WHAT YOU'RE LOOKING FOR
  // ----------------------------------------------------------
  lookingFor:
    "I'm actively looking for graduate roles, internships, and exciting opportunities in full-stack development or machine learning engineering. Open to remote, hybrid, or on-site positions in the UK. I'm especially excited about companies building AI-powered or data-driven products.",
};
