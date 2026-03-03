import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 46b2e169
 *
 * FIXES:
 * - Changed \\\\frac to \\frac
 * - Added local gcd function
 */

const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

export const generator_46b2e169 = {
  metadata: {
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

    // STEP 2: Calculate and simplify
    const g = gcd(redPens, totalPens);
    const simplifiedNum = redPens / g;
    const simplifiedDen = totalPens / g;

    // Determine decimal form for explanation context
    const decimalForm = (redPens / totalPens).toFixed(2).replace(/\.?0+$/, '');

    return {
      questionText: `A box contains ${redPens} red pens and ${bluePens} blue pens. If one of these pens is selected at random, what is the probability of selecting a red pen? (Express your answer as a decimal or fraction, not as a percent.)`,
      figureCode: null,
      options: [],
      correctAnswer: `\\frac{${simplifiedNum}}{${simplifiedDen}}`,
      explanation: `The correct answer is $\\frac{${simplifiedNum}}{${simplifiedDen}}$. The total number of pens is $${redPens} + ${bluePens} = ${totalPens}$. Since there are ${redPens} red pens, the probability is $\\frac{${redPens}}{${totalPens}} = \\frac{${simplifiedNum}}{${simplifiedDen}}$ (or ${decimalForm}).`
    };
  }
};