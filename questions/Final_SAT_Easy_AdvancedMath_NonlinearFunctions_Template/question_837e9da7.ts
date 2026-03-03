import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';
import { shuffle } from '../../utils/math';

/**
 * Question ID: 837e9da7
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coeff: 4-8, x: 2-5]
 * - Difficulty factors: [Substitution into a rational function]
 * - Distractor patterns: [Addition instead of multiplication, ignoring substitution, using coefficient]
 * - Constraints: [Result should be simplified]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_837e9da7 = {
  metadata: {
    // id: "837e9da7",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(4, 8);

    const x = getRandomInt(2, 5);

    const result = coeff * x;

    const optionsData = [
      { text: `$\\frac{1}{${result}}$`, isCorrect: true },
      { text: `$\\frac{1}{${coeff + x}}$`, isCorrect: false, reason: "added instead of multiplied" },
      { text: `$\\frac{1}{${coeff}}$`, isCorrect: false, reason: "ignored the x substitution" },
      { text: `$\\frac{1}{${x}}$`, isCorrect: false, reason: "ignored the coefficient" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(x) = \\frac{1}{${coeff}x}$. What is the value of $f(x)$ when $x = ${x}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. To find $f(${x})$, substitute $${x}$ for $x$ in the equation $f(x) = \\frac{1}{${coeff}x}$: $f(${x}) = \\frac{1}{${coeff}(${x})} = \\frac{1}{${result}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: b5c43226
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base: 2-3, shift: 1-3]
 * - Difficulty factors: [Calculating y-intercept of an exponential growth function]
 * - Distractor patterns: [Origin, swapped coordinates, shift value]
 * - Constraints: [Result is an integer]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Exponential growth plot]
 */

