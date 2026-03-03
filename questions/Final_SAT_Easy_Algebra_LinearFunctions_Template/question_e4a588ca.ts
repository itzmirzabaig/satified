import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: e4a588ca
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [xValue: 3-8, result: 3-8, constant: calculated]
 * - Difficulty factors: [Fraction evaluation, order of operations]
 * - Distractor patterns: [wrong order ops, forgot 1/2, forgot coefficient]
 * - Constraints: [Ensure integer result]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_e4a588ca = {
  metadata: {
    // id: "e4a588ca",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const xValue = getRandomInt(3, 8);

    const result = getRandomInt(3, 8);

    const sumInside = result * 2;

    const constant = sumInside - xValue;

    const optionsData = [
      { text: (result * 4).toString(), isCorrect: false, reason: "multiplies by 4 instead of following order of operations" },
      { text: (sumInside).toString(), isCorrect: false, reason: "forgets to multiply by 1/2" },
      { text: result.toString(), isCorrect: true },
      { text: (xValue + constant).toString(), isCorrect: false, reason: "forgets to multiply by 1/2" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(x)=\\frac{1}{2}(x+${constant})$. What is the value of $f(${xValue})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$: $f(${xValue}) = \\frac{1}{2}(${xValue} + ${constant}) = \\frac{1}{2}(${sumInside}) = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 2e379126
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 3-6, intercept: 5-10 negative, x: 5-10 negative]
 * - Difficulty factors: [Negative input evaluation]
 * - Distractor patterns: [arithmetic error, sign error, fractional format]
 * - Constraints: [Ensure negative input]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

