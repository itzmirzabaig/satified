import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 956
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [redPens 10-20, bluePens 30-45]
 * - Difficulty factors: [Simple probability, simplify a fraction, fill-in-blank]
 * - Constraints: [Answer is red/(red+blue), fully reduced]
 * - Question type: [Word Problem->Fill in the Blank]
 */

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

export const generator_956 = {
  metadata: {
    id: "956",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate counts
    const redPens = getRandomInt(10, 20);
    const bluePens = getRandomInt(30, 45);
    const totalPens = redPens + bluePens;

    // STEP 2: Reduce red/total to lowest terms
    const g = gcd(redPens, totalPens);
    const simplifiedNum = redPens / g;
    const simplifiedDen = totalPens / g;

    // Fill-in answer must be a plain number or a/b fraction (students type it).
    const correctAnswer = `${simplifiedNum}/${simplifiedDen}`;

    // Show the reduction step only when the fraction actually reduces.
    const reduces = g > 1;
    const reductionText = reduces
      ? `, which reduces to $\\frac{${simplifiedNum}}{${simplifiedDen}}$`
      : ` (already in lowest terms)`;

    return {
      questionText: `A box contains ${redPens} red pens and ${bluePens} blue pens. If one of these pens is selected at random, what is the probability of selecting a red pen? (Express your answer as a fraction or decimal, not as a percent.)`,
      figureCode: null,
      options: [],
      correctAnswer: correctAnswer,
      explanation: `The correct answer is $\\frac{${simplifiedNum}}{${simplifiedDen}}$. The total number of pens is ${redPens} + ${bluePens} = ${totalPens}. Since ${redPens} of them are red, the probability of selecting a red pen is $\\frac{${redPens}}{${totalPens}}$${reductionText}.`
    };
  }
};
