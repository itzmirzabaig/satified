import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 674
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fraction coefficient: 6/7, constant: 18, result: 54, answer: 294]
 * - Difficulty factors: [Working with fractions, solving for coefficient×variable]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Target den*p requires clearing the fraction after finding p]
 * - Question type: [Fill-in-the-blank]
 *
 * Intent: present a proper-fraction linear equation (num/den) p + c = d and ask
 * for the value of (den) p. Answer-first construction guarantees every displayed
 * number is an integer and the equation holds exactly for every draw.
 */

export const generator_674 = {
  metadata: {
    id: "674",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Proper fraction num/den with den > num, constructed directly (no loop).
    const num = getRandomInt(2, 8);
    const den = getRandomInt(num + 1, 9);

    // gcd so we can force num*p to be divisible by den => (num/den)p is an integer.
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const g = gcd(num, den);
    const pStep = den / g;            // p must be a multiple of this; pStep >= 2 since den > num

    // Keep p in a tidy SAT range (2..12) by scaling pStep by k.
    const kMax = Math.max(1, Math.floor(12 / pStep));
    const k = getRandomInt(1, kMax);
    const pValue = pStep * k;         // integer, 2..12

    const rhs = (num * pValue) / den; // = d - c, guaranteed integer by construction
    const c = getRandomInt(5, 20);
    const d = c + rhs;                 // integer

    const answer = den * pValue;      // the value of (den) p, integer

    return {
      questionText: `If \\( \\frac{${num}}{${den}} p+${c}=${d} \\), what is the value of \\( ${den}p \\) ?`,
      figureCode: null,
      options: [],
      correctAnswer: answer.toString(),
      explanation: `The correct answer is ${answer}. Subtracting ${c} from each side of the given equation yields \\( \\frac{${num}}{${den}} p=${rhs} \\). Multiplying each side of this equation by \\( \\frac{${den}}{${num}} \\) yields \\( p=${pValue} \\). Multiplying each side of this equation by ${den} yields \\( ${den}p=${answer} \\).`
    };
  }
};
