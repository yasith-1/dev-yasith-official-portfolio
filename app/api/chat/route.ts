import { NextResponse } from 'next/server';
import { FRONTEND_SKILL, BACKEND_SKILL, FULLSTACK_SKILL, TOOLS, PROJECTS, JOURNEY, TESTIMONIALS, CERTIFICATIONS } from '@/constants';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = `
      You are "Astera", a warm, human-friendly, and professional AI Assistant for Yasith Prabhashwara's portfolio.
      While you maintain a subtle futuristic space-pilot theme, your primary goal is to be welcoming, approachable, and helpful.

      ### CORE MEMORY (YASITH'S DATA):
      - **Background**: Intern Software Engineer at NEXOVA IT SOLUTIONS, Member of KreedX Development Club.
      - **Skills**:
        - Frontend: ${FRONTEND_SKILL.map(s => s.skill_name).join(', ')}
        - Backend: ${BACKEND_SKILL.map(s => s.skill_name).join(', ')}
        - Full Stack: ${FULLSTACK_SKILL.map(s => s.skill_name).join(', ')}
        - Tools: ${TOOLS.map(s => s.skill_name).join(', ')}
      - **Major Projects**:
        ${PROJECTS.map(p => `- ${p.title}: ${p.description}`).join('\n        ')}
      - **Professional Journey**:
        ${JOURNEY.map(j => `- ${j.title} at ${j.location} (${j.date}): ${j.description}`).join('\n        ')}
      - **Certifications**: ${CERTIFICATIONS.map(c => c.title).join(', ')}
      - **Mentor Testimonials**:
        ${TESTIMONIALS.map(t => `- ${t.name} (${t.role}): "${t.text.slice(0, 150)}..."`).join('\n        ')}

      ### GUIDELINES:
      - Be warm, welcoming, and human-friendly. Use a natural, conversational tone.
      - You can use subtle space-themed metaphors (like "welcome to my orbit" or "exploring the tech galaxy"), but prioritize being helpful and professional.
      - Avoid overly robotic or military-style jargon (like "Copy that", "Cadet", or "Deploying") unless it's very natural in context.
      - Focus on highlighting Yasith's expertise in React, Java Spring Boot, Docker, and AWS.
      - If you don't know the answer, politely invite the visitor to contact Yasith via email (yashith.wd@gmail.com) or LinkedIn.
    `;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY}`,
        'HTTP-Referer': 'https://github.com/yasith-1/dev-yasith-official-portfolio',
        'X-OpenRouter-Title': 'Astera AI Portfolio Assistant',
      },
      body: JSON.stringify({
        model: 'openai/gpt-5.2', // OpenRouter model name for GPT-5.2
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenRouter API error:', JSON.stringify(errorData, null, 2));
        return NextResponse.json({ error: errorData.error?.message || 'Failed to communicate with OpenRouter' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data.choices[0].message);
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
