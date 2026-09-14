'use client';

import { TravelAssistantChat } from './TravelAssistantChat';

const plannerHighlights = [
  'Tailored family, luxury, honeymoon, and budget itineraries',
  'Real-time chat with Valiyaparamba-specific recommendations',
  'Built for future Supabase login and saved trip experiences',
];

const platformModules = [
  {
    title: 'Supabase-ready schema',
    description: 'Plans are already structured for future persistence, user accounts, and saved trip records.',
  },
  {
    title: 'User login architecture',
    description: 'The assistant is isolated behind a reusable API boundary that can connect to auth and profile data.',
  },
  {
    title: 'Reviews & bookings',
    description: 'Each trip response is shaped to support add-ons like property reviews, booking requests, and vendor flows.',
  },
  {
    title: 'Production-ready API layer',
    description: 'OpenAI calls are server-side only, with validation and error handling for safer deployment.',
  },
];

export default function AIPlannerClient() {
  return (
    <div className="ai-planner-page">
      <section className="planner-hero">
        <div className="container planner-hero-inner">
          <div className="planner-copy reveal">
            <span className="eyebrow light">AI Trip Planner</span>
            <h1>Plan Your Perfect Valiyaparamba Trip</h1>
            <p>
              Chat naturally with an AI travel assistant for beach escapes, backwater villas, local food spots,
              luxury stays, and route planning across Kerala’s coastline.
            </p>
            <div className="planner-pill-row">
              {plannerHighlights.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="planner-metrics reveal">
            <div className="metric-card">
              <strong>3–5 days</strong>
              <span>Typical trip lengths</span>
            </div>
            <div className="metric-card">
              <strong>₹10K+</strong>
              <span>Flexible budget planning</span>
            </div>
            <div className="metric-card">
              <strong>AI live</strong>
              <span>Personalized guidance</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing planner-assistant-wrap">
        <div className="container planner-content-grid">
          <aside className="planner-side-panel glass-card reveal">
            <p className="eyebrow">Ask the assistant</p>
            <h2>Travel ideas built for real plans.</h2>
            <ul className="planner-feature-list">
              <li>Plan a 3 day family trip</li>
              <li>Plan a honeymoon trip</li>
              <li>Budget under ₹10000</li>
              <li>Luxury vacation for 5 days</li>
            </ul>
            <div className="mini-callout">
              <strong>What the AI includes</strong>
              <span>Day-wise itinerary, attractions, resorts, food, travel tips, weather guidance, and transport ideas.</span>
            </div>
          </aside>

          <TravelAssistantChat />
        </div>
      </section>

      <section className="section-spacing alt-panel">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Future-ready architecture</p>
            <h2>Built to scale beyond a simple itinerary.</h2>
          </div>

          <div className="platform-grid">
            {platformModules.map((module) => (
              <article key={module.title} className="platform-card glass-card reveal">
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
