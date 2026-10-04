export interface QuoteItem {
  id: string;
  quote: string;
  author: string;
  theme: string;
  illustration:
    | "sprout"
    | "path"
    | "telescope"
    | "prism"
    | "pencil"
    | "mountain"
    | "lightbulb"
    | "notebook";
  note?: string;
}

export const quotesData: QuoteItem[] = [
  {
    id: "quote-1",
    quote: "The beginning is the most important part of the work.",
    author: "Plato",
    theme: "Beginnings & First Steps",
    illustration: "sprout",
    note: "Every ambitious system begins with a single line of code and the courage to start.",
  },
  {
    id: "quote-2",
    quote: "What we do repeatedly shapes who we become.",
    author: "Original note",
    theme: "Habits & Consistency",
    illustration: "path",
    note: "Craft isn't an overnight revelation. It's the cumulative rhythm of daily curiosity.",
  },
  {
    id: "quote-3",
    quote: "Stay hungry. Stay foolish.",
    author: "Steve Jobs",
    theme: "Curiosity & Wonder",
    illustration: "telescope",
    note: "Always retain the beginner's wide-eyed wonder, regardless of how much you learn.",
  },
  {
    id: "quote-4",
    quote: "Simplicity is the soul of efficiency.",
    author: "Austin Freeman",
    theme: "Clarity & Structure",
    illustration: "prism",
    note: "The cleanest solution rarely looks complex from the outside.",
  },
  {
    id: "quote-5",
    quote: "The details are not the details. They make the design.",
    author: "Charles Eames",
    theme: "Craft & Precision",
    illustration: "pencil",
    note: "Micro-interactions, spacing, and typographic weight define the soul of software.",
  },
  {
    id: "quote-6",
    quote: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier",
    theme: "Persistence",
    illustration: "mountain",
    note: "Step by step, commits turn into systems, and curiosities turn into mastery.",
  },
  {
    id: "quote-7",
    quote: "Make it simple, but significant.",
    author: "Original note",
    theme: "Impact & Depth",
    illustration: "lightbulb",
    note: "Create things that leave an impression not through noise, but through genuine utility and care.",
  },
  {
    id: "quote-8",
    quote: "There is no substitute for hard work.",
    author: "Thomas Edison",
    theme: "Dedication & Practice",
    illustration: "notebook",
    note: "Insight strikes when you're already deeply immersed in the practice.",
  },
];
