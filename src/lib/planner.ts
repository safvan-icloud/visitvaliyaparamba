export interface Destination {
  id: string;
  name: string;
  type: string;
  description: string;
  tags: string[];
  image: string;
  area: string;
}

export interface Activity {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  location: string;
  tags: string[];
}

export interface Resort {
  id: string;
  name: string;
  rating: number;
  priceRange: string;
  description: string;
  image: string;
  tag: string;
}

export interface TripFormState {
  days: number;
  travelType: string;
  budget: string;
  interests: string[];
}

export interface ItineraryDay {
  title: string;
  items: string[];
  note: string;
}

export interface ItineraryResult {
  summary: string;
  days: ItineraryDay[];
  highlights: string[];
}

export const defaultTripForm: TripFormState = {
  days: 3,
  travelType: 'Couple',
  budget: 'Mid Range',
  interests: ['Beaches', 'Backwaters'],
};

function includesInterest(item: { tags?: string[]; category?: string; title?: string; type?: string }, selected: string[]) {
  if (!item.tags && !item.category && !item.title && !item.type) {
    return false;
  }

  const haystack = [
    ...(item.tags ?? []),
    item.category ?? '',
    item.title ?? '',
    item.type ?? '',
  ].map((value) => value.toLowerCase());

  return selected.some((interest) => haystack.some((value) => value.includes(interest.toLowerCase())));
}

export function generateItinerary(
  form: TripFormState,
  destinations: Destination[],
  activities: Activity[],
  resorts: Resort[],
): ItineraryResult {
  const selectedInterests = form.interests.length > 0 ? form.interests : ['Beaches'];

  const relevantDestinations = destinations.filter((destination) => includesInterest(destination, selectedInterests));
  const relevantActivities = activities.filter((activity) => includesInterest(activity, selectedInterests));

  const dayPlans: ItineraryDay[] = Array.from({ length: form.days }, (_, index) => {
    const destination = relevantDestinations[index % relevantDestinations.length] ?? destinations[0];
    const activityChoices = relevantActivities.slice(index, index + 2);
    const chosenActivities = activityChoices.length > 0 ? activityChoices : relevantActivities.slice(0, 2);

    const items = [
      destination.name,
      ...(chosenActivities.slice(0, 2).map((activity) => activity.title)),
      'Local seafood dinner',
    ];

    const note =
      index === 0
        ? `Start with a relaxed ${form.travelType.toLowerCase()}-friendly coastal day.`
        : index === form.days - 1
          ? 'Close the trip with a slow sunset and a final resort evening.'
          : `Continue with ${destination.area.toLowerCase()} experiences suited to your travel style.`;

    return {
      title: `Day ${index + 1}`,
      items,
      note,
    };
  });

  const highlights = [
    `${form.days}-day ${form.travelType.toLowerCase()} getaway`,
    `${form.budget} budget plan`,
    `${selectedInterests.slice(0, 3).join(', ')}`,
    `${resorts[0]?.name ?? 'Seaside resort'} recommendation`,
  ];

  return {
    summary: `A ${form.days}-day ${form.travelType.toLowerCase()} itinerary focused on ${selectedInterests.join(', ').toLowerCase()} and premium Kerala coastal experiences.`,
    days: dayPlans,
    highlights,
  };
}
