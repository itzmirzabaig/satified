import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 5907e072
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [intercept: 25-40]
 * - Difficulty factors: [Evaluating constant parameter]
 * - Distractor patterns: [incorrect sign, negative reciprocal, reciprocal]
 * - Constraints: [None]
 * - Question type: [Find parameter→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_5907e072 = {
  metadata: {
    // id: "5907e072",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const intercept = getRandomInt(25, 40);

    const optionsData = [
      { text: `-${intercept}`, isCorrect: false, reason: "has incorrect sign" },
      { text: `-\\frac{1}{${intercept}}`, isCorrect: false, reason: "uses negative reciprocal" },
      { text: `\\frac{1}{${intercept}}`, isCorrect: false, reason: "uses reciprocal" },
      { text: `${intercept}`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `For the linear function $f(x) = x + b$, $b$ is a constant. When $x = 0, f(x) = ${intercept}$. What is the value of $b$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: intercept.toString(),
      explanation: `Choice ${correctOption.letter} is correct. When $x=0$, $f(0) = 0 + b = b$. Since $f(0) = ${intercept}$, we have $b = ${intercept}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: a73a5c22
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 8-12, intercept: 5-10, x: 6-10]
 * - Difficulty factors: [Simple evaluation]
 * - Distractor patterns: [zero, input value, slope]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

