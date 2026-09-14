import type { Metadata } from 'next';
import AIPlannerClient from '@/components/AIPlannerClient';

export const metadata: Metadata = {
  title: 'AI Trip Planner | Visit Valiyaparamba',
  description: 'Chat with an AI travel assistant to plan personalized Valiyaparamba itineraries, resorts, food, and transport recommendations.',
};

export default function AIPlannerPage() {
  return <AIPlannerClient />;
}
