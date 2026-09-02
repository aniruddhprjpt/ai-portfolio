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
    languages: ["Python", "Java", "C", "SQL"],
    web_development: ["HTML", "CSS", "JavaScript", "React", "Django"],
    databases: ["PostgreSQL", "MySQL", "SQLite"],
    machine_learning: ["TensorFlow", "PyTorch", "scikit-learn"],
    devops_tools: ["Docker", "Git", "GitHub", "Google Colab"],
    data_analysis: ["IBM SPSS Statistics", "Microsoft Excel"],
    design_ux: ["Figma"],
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
