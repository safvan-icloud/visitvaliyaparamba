export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: string;
}

export interface TravelAssistantPlan {
  title: string;
  summary: string;
  overview?: string;
  dayWiseItinerary?: string[];
  attractions?: string[];
  resorts?: string[];
  foodRecommendations?: string[];
  travelTips?: string[];
  weatherTips?: string[];
  transportationSuggestions?: string[];
  bestFor?: string;
}

export interface SavedTripPlan {
  id: string;
  title: string;
  summary: string;
  createdAt: string;
}

export const DEFAULT_ASSISTANT_MESSAGE = {
  id: 'assistant-welcome',
  role: 'assistant' as const,
  content:
    'Hi! I can plan a family stay, honeymoon escape, luxury retreat, or budget-friendly route across Valiyaparamba. Tell me your trip length, style, and budget, and I will turn it into a personalized travel plan.',
  timestamp: new Date().toISOString(),
};

export const EXAMPLE_PROMPTS = [
  'Plan a 3 day family trip with beach and food stops.',
  'Plan a honeymoon trip with luxury stays and sunset experiences.',
  'Budget under ₹10000 for a 2 day vacation in Valiyaparamba.',
  'Luxury vacation for 5 days with resorts, cruises and spa moments.',
];

export function normalizeTravelPlan(value: unknown): TravelAssistantPlan {
  const source = (value ?? {}) as Record<string, unknown>;

  const asArray = (field: string) => {
    const entry = source[field];
    if (Array.isArray(entry)) {
      return entry.filter((item): item is string => typeof item === 'string');
    }
    if (typeof entry === 'string') {
      return [entry];
    }
    return [];
  };

  return {
    title: typeof source.title === 'string' ? source.title : 'Valiyaparamba Travel Plan',
    summary:
      typeof source.summary === 'string'
        ? source.summary
        : typeof source.overview === 'string'
          ? source.overview
          : 'A personalized Valiyaparamba itinerary tailored to your travel style.',
    overview: typeof source.overview === 'string' ? source.overview : undefined,
    dayWiseItinerary: asArray('dayWiseItinerary'),
    attractions: asArray('attractions'),
    resorts: asArray('resorts'),
    foodRecommendations: asArray('foodRecommendations'),
    travelTips: asArray('travelTips'),
    weatherTips: asArray('weatherTips'),
    transportationSuggestions: asArray('transportationSuggestions'),
    bestFor: typeof source.bestFor === 'string' ? source.bestFor : undefined,
  };
}

export function formatPlanForChat(plan: TravelAssistantPlan): string {
  const sections: string[] = [];

  sections.push(`Trip: ${plan.title}`);
  sections.push(`Overview: ${plan.summary}`);

  if (plan.bestFor) {
    sections.push(`Best for: ${plan.bestFor}`);
  }

  const addSection = (heading: string, values: string[] | undefined) => {
    if (!values || values.length === 0) return;
    sections.push(`\n${heading}:`);
    values.forEach((item, index) => {
      sections.push(`${index + 1}. ${item}`);
    });
  };

  addSection('Day-wise itinerary', plan.dayWiseItinerary);
  addSection('Attractions', plan.attractions);
  addSection('Resorts', plan.resorts);
  addSection('Food recommendations', plan.foodRecommendations);
  addSection('Travel tips', plan.travelTips);
  addSection('Weather tips', plan.weatherTips);
  addSection('Transportation suggestions', plan.transportationSuggestions);

  return sections.join('\n');
}

export function buildFallbackTravelPlan(profile: string): TravelAssistantPlan {
  const prompt = (profile || '').toLowerCase();
  const rawDays = Number((prompt.match(/(\d+)\s*day/) ?? [])[1] ?? '3');
  const days = Number.isFinite(rawDays) && rawDays > 0 ? rawDays : 3;

  const travelType = prompt.includes('honeymoon')
    ? 'honeymoon'
    : prompt.includes('family')
      ? 'family'
      : prompt.includes('luxury')
        ? 'luxury'
        : prompt.includes('budget')
          ? 'budget-friendly'
          : 'coastal';

  const budgetText = prompt.includes('10000') || prompt.includes('under ₹10000') || prompt.includes('under 10000')
    ? 'under ₹10,000'
    : prompt.includes('luxury')
      ? 'premium luxury budget'
      : 'mid-range';

  const title = `${days}-day ${travelType} Valiyaparamba escape`;

  return {
    title,
    summary: `A ${travelType} trip across Valiyaparamba with comfortable stays, scenic coastal experiences, and food stops tailored for ${budgetText}.`,
    overview: 'This plan balances beach time, lighter travel, local Kerala dining, and access to quiet backwater experiences without rushing the trip.',
    dayWiseItinerary: [
      `Day 1: Arrive in Valiyaparamba, check in to a beach or backwater stay, relax by the shore, and enjoy a sunset walk with seafood dinner.`,
      `Day 2: Explore the coast with a boat ride, local fishing village visit, water activity, and a slower evening at a resort or café.`,
      `Day 3: Visit the backwaters or mangrove area, taste local specialties, and finish with an easy sunset stop before departure.`,
      ...(days > 3 ? [`Day 4: Take a relaxed local food and photography day with hidden beaches, island views, and a spa or wellness session.`] : []),
      ...(days > 4 ? [`Day 5: Wind down with a final resort morning, local market browse, and a scenic coastal breakfast before leaving.`] : []),
    ],
    attractions: [
      'Valiyaparamba Beach for sunrise and sunset walks',
      'Backwater and mangrove boat rides for a calm Kerala experience',
      'Local fishing villages for authentic coastal culture',
      'Sunset-view points and hidden coastal lookout spots',
      'Beachside cafés and family-friendly relaxation points',
    ],
    resorts: [
      'Beachfront boutique stay with sea-view rooms and local food options',
      'Backwater resort with peaceful verandas and family-friendly amenities',
      'Luxury property with spa access, private dining, and sunset experiences',
    ],
    foodRecommendations: [
      'Fresh Kerala fish curry with rice',
      'Appam and stew for a relaxed breakfast',
      'Prawns, crab, and grilled seafood near the shore',
      'Traditional sadya-style meals for a local food experience',
    ],
    travelTips: [
      'Book stays close to the beach or backwaters to reduce daily travel time.',
      'Carry cash for smaller local restaurants and ferry rides.',
      'Start early for beaches and boat rides to avoid heat and crowds.',
      'Keep light cotton clothing and sunscreen for daily coastal comfort.',
    ],
    weatherTips: [
      'Best for winter and shoulder-season travel when the weather is cooler and calmer.',
      'Plan outdoor activities for early morning or sunset to avoid the midday heat.',
      'Carry a light rain layer during monsoon months and keep extra footwear handy.',
    ],
    transportationSuggestions: [
      'Use a private cab or pre-booked transfer from Kochi or nearby hubs for comfort.',
      'Add a local boat or auto-rickshaw plan for short coastal transfers.',
      'For a luxury trip, arrange a resort pickup and a dedicated driver for flexibility.',
    ],
    bestFor: `Travelers looking for a ${travelType} Valiyaparamba getaway with practical ${budgetText} planning and an easy coastal rhythm.`,
  };
}
