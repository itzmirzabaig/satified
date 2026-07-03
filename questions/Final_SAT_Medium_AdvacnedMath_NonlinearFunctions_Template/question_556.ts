import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 556
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Quadratic equation from product condition
 * - Number ranges: [difference: 5-12, targetProduct: 150-250]
 * - Difficulty: Medium - setting up and solving quadratic
 */

export const generator_556 = {
  metadata: {
    id: "556",
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
    let difference = getRandomInt(5, 12);
    // Guard: if difference === solution, the distractors solution + difference
    // and 2 * solution would collide. Shift difference down by 1 (collision is
    // only possible for difference >= 8, so the result stays within [5, 12]).
    if (difference === solution) difference -= 1;
    const targetProduct = solution * (solution + difference);

    const questionText = `The product of a positive number $x$ and the number that is ${difference} more than $x$ is ${targetProduct}. What is the value of $x$?`;

    const correctAnswer = solution.toString();

    const optionsData = [
      { text: (solution - 3).toString(), isCorrect: false, reason: `results from a calculation error when solving the quadratic` },
      { text: solution.toString(), isCorrect: true, reason: `` },
      { text: (solution + difference).toString(), isCorrect: false, reason: `gives the larger of the two numbers, $x + ${difference} = ${solution + difference}$, instead of $x$` },
      { text: (solution * 2).toString(), isCorrect: false, reason: `gives twice the value of $x$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Set up the equation: $x(x+${difference}) = ${targetProduct}$. This becomes $x^2 + ${difference}x - ${targetProduct} = 0$. Factoring: $(x+${solution + difference})(x-${solution}) = 0$. Since $x$ is positive, $x = ${solution}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer,
      explanation
    };
  }
};
