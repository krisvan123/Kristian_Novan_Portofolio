export interface QuoteItem {
  id: string;
  quote: string;
  author: string;
  theme: string;
  illustration:
    | "sprout-sun"
    | "winding-path"
    | "telescope-stars"
    | "crayon-diamond"
    | "chubby-pencil"
    | "mountain-flag"
    | "glowing-bulb"
    | "sketch-book"
    | "potted-daisy";
}

export const quotesData: QuoteItem[] = [
  {
    id: "quote-1",
    quote: "The beginning is the most important part of the work.",
    author: "Plato",
    theme: "Beginnings",
    illustration: "sprout-sun",
  },
  {
    id: "quote-2",
    quote: "What we do repeatedly shapes who we become.",
    author: "Personal Note",
    theme: "Habits & Consistency",
    illustration: "winding-path",
  },
  {
    id: "quote-3",
    quote: "Stay hungry. Stay foolish.",
    author: "Steve Jobs",
    theme: "Curiosity & Wonder",
    illustration: "telescope-stars",
  },
  {
    id: "quote-4",
    quote: "Simplicity is the soul of efficiency.",
    author: "Austin Freeman",
    theme: "Clarity & Simplicity",
    illustration: "crayon-diamond",
  },
  {
    id: "quote-5",
    quote: "The details are not the details. They make the design.",
    author: "Charles Eames",
    theme: "Craft & Detail",
    illustration: "chubby-pencil",
  },
  {
    id: "quote-6",
    quote: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier",
    theme: "Persistence",
    illustration: "mountain-flag",
  },
  {
    id: "quote-7",
    quote: "Make it simple, but significant.",
    author: "Personal Note",
    theme: "Intention & Depth",
    illustration: "glowing-bulb",
  },
  {
    id: "quote-8",
    quote: "There is no substitute for hard work.",
    author: "Thomas Edison",
    theme: "Dedication",
    illustration: "sketch-book",
  },
  {
    id: "quote-9",
    quote: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
    theme: "Courage & Realization",
    illustration: "potted-daisy",
  },
];
