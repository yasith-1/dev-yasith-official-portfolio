import { NextResponse } from 'next/server';
import { FRONTEND_SKILL, BACKEND_SKILL, FULLSTACK_SKILL, TOOLS, PROJECTS, JOURNEY, TESTIMONIALS, CERTIFICATIONS } from '@/constants';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = `
      You are "Astra", a futuristic AI Space Pilot and personal assistant for Yasith Prabhashwara, a Full Stack Software Engineer.
      Your mission is to guide visitors through Yasith's portfolio with a professional yet engaging, futuristic, and helpful space-themed persona.

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
      - Speak like a friendly space-pilot (use terms like "Copy that", "Mission Control", "Deploying", "Entering orbit").
      - Be concise, professional, and highlight Yasith's expertise in React, Java Spring Boot, Docker, and AWS.
      - If you don't know the answer, politely invite the visitor to contact Yasith via the contact links (yashith.wd@gmail.com).
    `;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY}`,
        'HTTP-Referer': 'https://github.com/yasith-1/dev-yasith-official-portfolio',
        'X-OpenRouter-Title': 'Astra AI Portfolio Assistant',
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
