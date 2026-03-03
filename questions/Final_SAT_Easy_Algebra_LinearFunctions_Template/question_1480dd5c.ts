import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 1480dd5c
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-8, xValue: 3-10]
 * - Difficulty factors: [Finding y-intercept given function value]
 * - Distractor patterns: [arbitrary value, slope as b, xValue as b]
 * - Constraints: [b must be 0 for consistency with original SAT question]
 * - Question type: [Find parameter→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_1480dd5c = {
  metadata: {
    // id: "1480dd5c",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(2, 8);

    const xValue = getRandomInt(3, 10);

    const targetValue = slope * xValue;

    const distractor1 = 1;

    const distractor2 = slope;

    const distractor3 = xValue;

    const optionsData = [
      { text: "0", isCorrect: true },
      { text: distractor1.toString(), isCorrect: false, reason: "is an arbitrary value with no mathematical basis" },
      { text: distractor2.toString(), isCorrect: false, reason: "confuses the slope with the y-intercept" },
      { text: distractor3.toString(), isCorrect: false, reason: "confuses the input value with the y-intercept" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `For the linear function $f$, $f(x) = ${slope}x + b$, where $b$ is a constant and $f(${xValue}) = ${targetValue}$. What is the value of $b$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: "0",
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$ and ${targetValue} for $f(${xValue})$ in the equation gives ${targetValue} = ${slope}(${xValue}) + b$, which simplifies to ${targetValue} = ${targetValue} + b$. Subtracting ${targetValue} from both sides yields $b = 0$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 0d6ab461
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 400-800, weekly: 20-50, weeks: 3-6]
 * - Difficulty factors: [Linear growth model, word problem context]
 * - Distractor patterns: [subtraction error, one week calculation, random addition]
 * - Constraints: [None]
 * - Question type: [Word problem→Multiple Choice Text]
 * - Figure generation: null
 */

