import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 679
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: -17/3 (specific fraction), constant: 5 (single digit)]
 * - Difficulty factors: [Finding negative reciprocal of a fraction slope]
 * - Distractor patterns: [Not applicable - fill in blank, but could include sign errors, reciprocal without negative, etc.]
 * - Constraints: [Perpendicular slopes are negative reciprocals]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - conceptual question]
 */

export const generator_679 = {
  metadata: {
    id: "679",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values - use medium difficulty numbers similar to original
    // Original: -17/3, so use medium-sized numerators (10-30) and denominators (2-8)
    const numerator = getRandomInt(10, 30);
    const denominator = getRandomInt(2, 8);
    const yIntercept = getRandomInt(1, 9);
    
    // Make slope negative half the time for variety
    const slopeSign = getRandomElement([-1, 1]);
    const slopeNumerator = numerator * slopeSign;
    
    // STEP 2: Calculate perpendicular slope (negative reciprocal)
    // If original slope is -a/b, perpendicular is b/a
    // If original slope is a/b, perpendicular is -b/a
    const perpNumerator = -denominator * slopeSign;
    const perpDenominator = numerator;
    
    // Simplify the perpendicular slope. Keep the sign on the numerator so the
    // typed answer is a clean "a/b" (or a plain integer when the denominator
    // reduces to 1). perpDenominator = numerator > 0, so divisor > 0 and the
    // sign lives entirely on finalNum.
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(Math.abs(perpNumerator), perpDenominator);
    const finalNum = perpNumerator / divisor;
    const finalDen = perpDenominator / divisor;

    // Fill-in answer: plain number or a/b fraction only (students type it).
    const correctAnswer = finalDen === 1 ? `${finalNum}` : `${finalNum}/${finalDen}`;
    // LaTeX-rendered forms for use inside the explanation's $...$ math only.
    const slopeKTex = `${slopeSign === -1 ? '-' : ''}\\frac{${numerator}}{${denominator}}`;
    const answerTex = finalDen === 1 ? `${finalNum}` : `\\frac{${finalNum}}{${finalDen}}`;

    return {
      questionText: `Line $k$ is defined by $y=${slopeKTex} x+${yIntercept}$. Line $j$ is perpendicular to line $k$ in the $xy$-plane. What is the slope of line $j$? Enter your answer as a fraction or decimal.`,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `The slope of line $j$ is the negative reciprocal of the slope of line $k$. The slope of line $k$ is $${slopeKTex}$. To find the negative reciprocal, flip the fraction and change its sign, which gives $${answerTex}$.`
    };
  }
};
