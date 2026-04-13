import { RIASEC, Career } from '../types';

function cosineSimilarity(vecA: number[], vecB: number[]): number {
  let dotProduct = 0;
  let mA = 0;
  let mB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    mA += vecA[i] * vecA[i];
    mB += vecB[i] * vecB[i];
  }
  mA = Math.sqrt(mA);
  mB = Math.sqrt(mB);
  if (mA === 0 || mB === 0) return 0;
  return dotProduct / (mA * mB);
}

export function matchCareers(userRiasec: RIASEC, careers: Career[]) {
  const userVec = [userRiasec.R, userRiasec.I, userRiasec.A, userRiasec.S, userRiasec.E, userRiasec.C];

  const results = careers.map(career => {
    const careerVec = [
      career.riasec.R,
      career.riasec.I,
      career.riasec.A,
      career.riasec.S,
      career.riasec.E,
      career.riasec.C
    ];

    const similarity = cosineSimilarity(userVec, careerVec);
    
    // Simple skill overlap (mocked for now as we don't have user skills)
    const skillOverlap = 0.5; 
    
    // Tag match
    const topTraits = Object.entries(userRiasec)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([trait]) => trait);
    
    const tagMatch = career.tags.filter(tag => topTraits.includes(tag)).length / 3;

    const finalScore = (0.7 * similarity) + (0.2 * skillOverlap) + (0.1 * tagMatch);

    return {
      code: career.code,
      title: career.title,
      score: Math.round(finalScore * 100)
    };
  });

  return results.sort((a, b) => b.score - a.score).slice(0, 5);
}
