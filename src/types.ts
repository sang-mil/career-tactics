export type RIASEC = {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
};

export type Career = {
  code: string;
  title: string;
  description: string;
  riasec: RIASEC;
  tags: string[];
  job_zone: number;
  skills: { name: string; level: number }[];
};

export type Choice = {
  eventId: string;
  selectedOption: string;
  traits: Partial<RIASEC>;
  weight: number;
};

export type UserPreferences = {
  mediaType: 'anime' | 'novel' | 'drama' | 'manga' | 'game' | 'movie';
  favoriteTitles: string[];
};

export type EducationLevel = 'elementary' | 'middle' | 'high' | 'university';

export type UserSession = {
  userId: string;
  choices: Choice[];
  level?: EducationLevel;
  riasecScores?: RIASEC;
  topCareers?: { code: string; title: string; score: number }[];
  aiReport?: {
    title: string;
    coreSummary: string;
    behaviorInsight: string;
    strengths: string[];
    weaknesses: string[];
    careerExplanations: { title: string; reason: string; originalTitle: string }[];
    growthAdvice: string[];
    closingInsight: string;
  };
  generatedWorld?: GeneratedWorld;
  prefetchedDetails?: Record<string, any>;
  createdAt: string;
};

export type GeneratedWorld = {
  name: string;
  description: string;
  core_mechanics: string[];
  events: GameEvent[];
};

export type GameEvent = {
  event_id: string;
  title: string;
  question: string;
  options: {
    id: string;
    text: string;
    traits: Partial<RIASEC>;
    weight?: number;
  }[];
};
