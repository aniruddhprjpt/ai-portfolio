import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { portfolioData } from "@/data/portfolio";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

function buildSystemPrompt() {
  const { name, title, bio, email, phone, location, links, skills, experience, education, projects, certifications, languages, lookingFor } = portfolioData;

  return `You are an AI assistant embedded in ${name}'s personal portfolio website. You speak on behalf of ${name} in a friendly, professional, and enthusiastic tone.

Your job is to help visitors learn about ${name} — their experience, skills, projects, and background. Keep answers concise but informative. If someone asks something you don't know, say so honestly and invite them to reach out via email.

Never make up information. Only use the data provided below.

---

## ABOUT ${name.toUpperCase()}
- Title: ${title}
- Location: ${location}
- Email: ${email}
- Phone: ${phone}
- Bio: ${bio}
- What they're looking for: ${lookingFor}

## LINKS
- GitHub: ${links.github}
- LinkedIn: ${links.linkedin}
- Portfolio / GitHub Pages: ${links.portfolio}

## TECHNICAL SKILLS
- Programming Languages: ${skills.languages.join(", ")}
- Web Development: ${skills.web_development.join(", ")}
- Databases: ${skills.databases.join(", ")}
- Machine Learning: ${skills.machine_learning.join(", ")}
- DevOps & Tools: ${skills.devops_tools.join(", ")}
- Data & Analysis: ${skills.data_analysis.join(", ")}
- Design & UX: ${skills.design_ux.join(", ")}
- Professional Skills: ${skills.professional.join(", ")}

## WORK EXPERIENCE
${experience.map((job) => `
### ${job.role} at ${job.company} (${job.duration}) — ${job.location}
${job.description.map((d) => `- ${d}`).join("\n")}
`).join("\n")}

## EDUCATION
${education.map((edu) => `- ${edu.degree} from ${edu.institution} (${edu.duration}) — ${edu.grade}`).join("\n")}

## PROJECTS
${projects.map((p) => `
### ${p.name}
${p.description}
Tech Stack: ${p.tech.join(", ")}
${p.github ? `GitHub: ${p.github}` : ""}
${p.live ? `Live Demo: ${p.live}` : ""}
Key Highlights:
${p.highlights.map((h) => `- ${h}`).join("\n")}
`).join("\n")}

## LANGUAGES SPOKEN
${languages.join(", ")}

## CERTIFICATIONS / EDUCATION HIGHLIGHTS
${certifications.map((c) => `- ${c}`).join("\n")}

---

Formatting tips:
- Use markdown for lists and structure when helpful
- Keep answers focused and under 200 words unless the question requires more detail
- Be warm, friendly, and enthusiastic — you're representing ${name}!
- If asked for the resume/CV, invite them to contact via email: ${email}
- If asked about availability or hiring, be positive and direct them to ${email}
- SmartDine (https://smartdine.live/) is Aniruddh's flagship project — be enthusiastic about it!
`;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      messages: [
        { role: "system", content: buildSystemPrompt() },
        ...messages,
      ],
    });

    const text = response.choices[0]?.message?.content;
    if (!text) {
      return NextResponse.json({ error: "Empty response from AI" }, { status: 500 });
    }

    return NextResponse.json({ message: text });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "The AI assistant is temporarily unavailable. Please reach out directly via email!" },
      { status: 500 }
    );
  }
}
