import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { buildFallbackTravelPlan, normalizeTravelPlan } from '@/lib/travelAssistant';

const SYSTEM_PROMPT = `You are Valiya Travel AI, a premium travel assistant for Valiyaparamba, Kerala.

Your job is to create customized, highly practical travel plans for visitors.

Always respond in valid JSON with this exact structure:
{
  "title": "Short trip title",
  "summary": "A concise overview of the trip and the travel style.",
  "overview": "A little more detail about the destination vibe and ideal fit.",
  "dayWiseItinerary": ["Day 1: ...", "Day 2: ..."],
  "attractions": ["..."],
  "resorts": ["..."],
  "foodRecommendations": ["..."],
  "travelTips": ["..."],
  "weatherTips": ["..."],
  "transportationSuggestions": ["..."],
  "bestFor": "Describe the ideal traveler profile"
}

Rules:
- Focus on Valiyaparamba, Kerala coastal attractions, beaches, backwaters, islands, local dining, and luxury or budget travel planning.
- Use realistic pricing guidance in INR when relevant.
- Recommend routes that fit the user's trip duration, travel type, and budget.
- Include day-wise itinerary, attractions, resorts, food, tips, weather guidance, and transportation suggestions.
- Keep the advice actionable, concise, and travel-ready.
- If the user asks for a specific style such as honeymoon, family, luxury, or budget, reflect that in tone and recommendations.
- Do not include markdown formatting or code fences.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    const tripProfile = typeof body?.tripProfile === 'string' ? body.tripProfile : '';

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      const fallbackPlan = buildFallbackTravelPlan(tripProfile || 'Plan a relaxed coastal trip in Valiyaparamba');
      return NextResponse.json({
        plan: fallbackPlan,
        raw: fallbackPlan,
        fallback: true,
      });
    }

    const client = new OpenAI({ apiKey });

    const chatHistory = messages.map((message: { role?: string; content?: string }) => ({
      role: message.role === 'user' ? 'user' : 'assistant',
      content: typeof message.content === 'string' ? message.content : '',
    }));

    const response = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
      temperature: 0.7,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...(tripProfile
          ? [{ role: 'user' as const, content: `Traveler profile context: ${tripProfile}` }]
          : []),
        ...chatHistory,
      ],
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: 'AI returned an empty response.' }, { status: 502 });
    }

    const parsed = JSON.parse(content);
    return NextResponse.json({
      plan: normalizeTravelPlan(parsed),
      raw: parsed,
      fallback: false,
    });
  } catch (error) {
    console.error('Travel assistant error:', error);
    const message = error instanceof Error ? error.message : 'Unknown server error';

    const fallbackPlan = buildFallbackTravelPlan(
      typeof (await request.clone().json?.()) === 'object' && (await request.clone().json?.())
        ? JSON.stringify((await request.clone().json?.()))
        : 'Plan a relaxed coastal trip in Valiyaparamba',
    );

    return NextResponse.json(
      {
        plan: fallbackPlan,
        raw: fallbackPlan,
        fallback: true,
        warning: `Using local fallback while AI is unavailable. ${message}`,
      },
      { status: 200 },
    );
  }
}
