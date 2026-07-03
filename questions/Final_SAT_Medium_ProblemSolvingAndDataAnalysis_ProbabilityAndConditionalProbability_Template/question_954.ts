import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 954
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [numSides: 10-20]
 * - Difficulty factors: [Simple probability with geometry context, fill-in-blank]
 * - Constraints: [Answer is 1/n; one vertex bears the letter D]
 * - Question type: [Word Problem->Fill in the Blank]
 */

export const generator_954 = {
  metadata: {
    id: "954",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // numSides in [10,20] guarantees at least 4 vertices, so a vertex labeled D
    // always exists. Exactly one vertex bears the letter D, so P(D) = 1/n and
    // the fraction 1/n is already fully reduced (gcd(1, n) = 1).
    const numSides = getRandomInt(10, 20);
    const lastLetter = String.fromCharCode(64 + numSides); // 'A' + (numSides-1)

    // Fill-in answer must be a plain number or a/b fraction (students type it).
    const correctAnswer = `1/${numSides}`;

    return {
      questionText: `Each vertex of a ${numSides}-sided polygon is labeled with one of the letters A through ${lastLetter}, with a different letter at each vertex. If one vertex is selected at random, what is the probability that the letter D will be at the selected vertex? (Express your answer as a fraction or decimal, not as a percent.)`,
      figureCode: null,
      options: [],
      correctAnswer: correctAnswer,
      explanation: `The correct answer is $\\frac{1}{${numSides}}$. The probability that the selected vertex bears the letter D equals the number of vertices labeled D divided by the total number of vertices. Because each vertex is labeled with a different letter, exactly 1 of the ${numSides} vertices is labeled D, so the probability is $\\frac{1}{${numSides}}$.`
    };
  }
};
