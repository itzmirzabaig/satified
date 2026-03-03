import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 2df8f293
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [numSides: 10-20]
 * - Difficulty factors: [Simple probability with geometry context, fill-in-blank]
 * - Constraints: [Answer must be 1/n or equivalent decimal]
 * - Question type: [Word Problem→Fill in the Blank]
 */

// GCD function using while loop (no recursion)
function gcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

export const generator_2df8f293 = {
  metadata: {
    // id: "2df8f293",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Generate random number of sides (10-20)
    const numSides = getRandomInt(10, 20);
    const targetCount = 1; // One specific letter (D)

    // Calculate simplified fraction
    const g = gcd(targetCount, numSides);
    const simplifiedNum = targetCount / g;
    const simplifiedDen = numSides / g;

    const correctAnswer = `\\frac{${simplifiedNum}}{${simplifiedDen}}`;
    const decimalAnswer = (targetCount / numSides).toFixed(4).replace(/\.?0+$/, '');

    return {
      questionText: `Each vertex of a ${numSides}-sided polygon is labeled with one of the letters A through ${String.fromCharCode(64 + numSides)}, with a different letter at each vertex. If one vertex is selected at random, what is the probability that the letter D will be at the selected vertex? (Express your answer as a decimal or fraction, not as a percent.)`,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `The correct answer is ${correctAnswer}. If one vertex of the polygon is selected at random, the probability that the letter D will be at the selected vertex is equal to the number of vertices labeled with the letter D divided by the total number of vertices. Since each vertex is labeled with a different letter, there is 1 vertex labeled with D. With ${numSides} vertices total, the probability is ${correctAnswer}. Note that ${decimalAnswer} is an acceptable decimal form.`
    };
  }
};

/**
 * Question ID: 912cd125
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [weeks 12, days 84, rain days 20, no rain 64]
 * - Difficulty factors: [Two-way table, conditional probability given subset]
 */