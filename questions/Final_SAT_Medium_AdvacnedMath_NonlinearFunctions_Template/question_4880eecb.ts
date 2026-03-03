import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 4880eecb
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Quadratic equation from product condition
 * - Number ranges: [difference: 5-12, targetProduct: 150-250]
 * - Difficulty: Medium - setting up and solving quadratic
 */

export const generator_4880eecb = {
  metadata: {
    // id: "4880eecb",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Generate values that give a nice solution
    // x(x+d) = p => x² + dx - p = 0
    // We want x to be a positive integer
    const solution = getRandomInt(8, 15);
    const difference = getRandomInt(5, 12);
    const targetProduct = solution * (solution + difference);

    const questionText = `The product of a positive number $x$ and the number that is $${difference}$ more than $x$ is $${targetProduct}$. What is the value of $x$?`;

    const correctAnswer = solution.toString();

    const optionsData = [
      { text: (solution - 3).toString(), isCorrect: false, reason: "results from calculation error" },
      { text: solution.toString(), isCorrect: true },
      { text: (solution + difference).toString(), isCorrect: false, reason: "returns the larger number instead of x" },
      { text: (solution * 2).toString(), isCorrect: false, reason: "returns twice x" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    return {
      questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer,
      explanation: `Choice ${correctLetter} is correct. Set up the equation: $x(x+${difference}) = ${targetProduct}$. This becomes $x^2 + ${difference}x - ${targetProduct} = 0$. Factoring: $(x+${solution+difference})(x-${solution}) = 0$. Since $x$ is positive, $x = ${solution}$.`
    };
  }
};

/**
 * Question ID: 5c00c2c1
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential growth from percentage rate
 * - Number ranges: [initialPop: 20-30, growthPercent: 12-20%]
 * - Difficulty: Medium - creating exponential model from percentage
 */
