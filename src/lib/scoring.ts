import { Choice, RIASEC } from '../types';

export function calculateRIASEC(choices: Choice[]): RIASEC {
  const scores: RIASEC = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  
  choices.forEach(choice => {
    Object.entries(choice.traits).forEach(([trait, value]) => {
      const key = trait as keyof RIASEC;
      scores[key] += (value || 0) * choice.weight;
    });
  });

  // Find max score to normalize
  const maxScore = Math.max(...Object.values(scores), 1);
  
  // Normalize to 0-100 scale
  const normalized: RIASEC = {
    R: Math.round((scores.R / maxScore) * 100),
    I: Math.round((scores.I / maxScore) * 100),
    A: Math.round((scores.A / maxScore) * 100),
    S: Math.round((scores.S / maxScore) * 100),
    E: Math.round((scores.E / maxScore) * 100),
    C: Math.round((scores.C / maxScore) * 100),
  };

  return normalized;
}
