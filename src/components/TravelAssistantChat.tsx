'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  DEFAULT_ASSISTANT_MESSAGE,
  EXAMPLE_PROMPTS,
  formatPlanForChat,
  normalizeTravelPlan,
  type ChatMessage,
  type SavedTripPlan,
} from '@/lib/travelAssistant';

const CHAT_STORAGE_KEY = 'valiyaparamba-chat-history';
const TRIP_STORAGE_KEY = 'valiyaparamba-saved-trips';

const buildTimestamp = () => new Date().toISOString();

export function TravelAssistantChat({ compact = false }: { compact?: boolean }) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [DEFAULT_ASSISTANT_MESSAGE]);
  const [savedTrips, setSavedTrips] = useState<SavedTripPlan[]>([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setHydrated(true);

    try {
      const storedMessages = window.localStorage.getItem(CHAT_STORAGE_KEY);
      const storedTrips = window.localStorage.getItem(TRIP_STORAGE_KEY);

      if (storedMessages) {
        const parsed = JSON.parse(storedMessages) as ChatMessage[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }

      if (storedTrips) {
        const parsed = JSON.parse(storedTrips) as SavedTripPlan[];
        if (Array.isArray(parsed)) {
          setSavedTrips(parsed);
        }
      }
    } catch {
      // ignore invalid persisted data and fall back to defaults
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  }, [hydrated, messages]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(TRIP_STORAGE_KEY, JSON.stringify(savedTrips));
  }, [hydrated, savedTrips]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (promptOverride?: string) => {
    const prompt = (promptOverride ?? input).trim();
    if (!prompt || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: prompt,
      timestamp: buildTimestamp(),
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/travel-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages,
          tripProfile: prompt,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error ?? 'Unable to generate a travel plan right now.');
      }

      const plan = normalizeTravelPlan(payload?.plan ?? payload?.raw ?? {});
      const responseText = formatPlanForChat(plan);

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: responseText,
        timestamp: buildTimestamp(),
      };

      const updatedMessages = [...nextMessages, assistantMessage];
      setMessages(updatedMessages);

      setSavedTrips((existing) => {
        const trip: SavedTripPlan = {
          id: `${Date.now()}`,
          title: plan.title,
          summary: plan.summary,
          createdAt: buildTimestamp(),
        };

        return [trip, ...existing].slice(0, 6);
      });
    } catch (caughtError) {
      const reason = caughtError instanceof Error ? caughtError.message : 'Something went wrong.';
      setError(reason);
      setMessages((current) => [
        ...current,
        {
          id: `assistant-error-${Date.now()}`,
          role: 'assistant',
          content:
            'I hit a temporary issue while generating your trip. Please try a shorter prompt or refresh and try again.',
          timestamp: buildTimestamp(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const recentTrips = useMemo(() => savedTrips.slice(0, 4), [savedTrips]);

  return (
    <div className={compact ? 'assistant-chat-shell compact' : 'assistant-chat-shell'}>
      <div className="assistant-chat-panel glass-card">
        <div className="assistant-chat-header">
          <div>
            <span className="eyebrow">AI Travel Assistant</span>
            <h3>Valiyaparamba trip concierge</h3>
          </div>
          <span className="ai-status">Live</span>
        </div>

        <div className="example-pills">
          {EXAMPLE_PROMPTS.map((prompt) => (
            <button key={prompt} type="button" className="example-pill" onClick={() => handleSubmit(prompt)}>
              {prompt}
            </button>
          ))}
        </div>

        <div className="assistant-chat-list" ref={scrollRef}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={message.role === 'assistant' ? 'chat-message assistant' : 'chat-message user'}
            >
              <div className="message-bubble">
                {message.content.split('\n').map((line, index) => (
                  <p key={`${message.id}-${index}`}>{line || ' '}</p>
                ))}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="chat-message assistant">
              <div className="message-bubble typing-bubble" aria-live="polite">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}
        </div>

        {error && <div className="chat-error">{error}</div>}

        <form
          className="chat-input-row"
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit();
          }}
        >
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={3}
            placeholder="Ask for a family trip, honeymoon, luxury stay, or festival plan..."
            aria-label="Travel plan request"
          />
          <button type="submit" className="btn btn-primary" disabled={isLoading || !input.trim()}>
            {isLoading ? 'Planning...' : 'Generate Plan'}
          </button>
        </form>
      </div>

      <div className="trip-library-panel glass-card">
        <div className="trip-library-header">
          <span className="eyebrow">Saved plans</span>
          <h3>Recent trips</h3>
        </div>

        {recentTrips.length === 0 ? (
          <p className="empty-state">Your recent Valiyaparamba trip ideas will appear here.</p>
        ) : (
          <div className="trip-library-grid">
            {recentTrips.map((trip) => (
              <article key={trip.id} className="trip-library-card">
                <span className="trip-time">{new Date(trip.createdAt).toLocaleDateString()}</span>
                <h4>{trip.title}</h4>
                <p>{trip.summary}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
