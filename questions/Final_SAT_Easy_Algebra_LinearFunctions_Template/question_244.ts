import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 244
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [intercept: 25-40]
 * - Difficulty factors: [Evaluating constant parameter]
 * - Distractor patterns: [incorrect sign, negative reciprocal, reciprocal]
 * - Constraints: [None]
 * - Question type: [Find parameter→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_244 = {
  metadata: {
    id: "244",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const intercept = getRandomInt(25, 40);
    const B = intercept;

    // Each wrong value is checked by substituting it back: it gives the wrong
    // value of f(0). The old reasons were fragments ("has incorrect sign").
    const optionsData = [
      { text: `$-${B}$`, isCorrect: false, reason: `if $b = -${B}$, then $f(0) = 0 + (-${B}) = -${B}$, not ${B}` },
      { text: `$-\\frac{1}{${B}}$`, isCorrect: false, reason: `if $b = -\\frac{1}{${B}}$, then $f(0) = -\\frac{1}{${B}}$, not ${B}` },
      { text: `$\\frac{1}{${B}}$`, isCorrect: false, reason: `if $b = \\frac{1}{${B}}$, then $f(0) = \\frac{1}{${B}}$, not ${B}` },
      { text: `$${B}$`, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `For the linear function $f(x) = x + b$, $b$ is a constant. When $x = 0$, $f(x) = ${B}$. What is the value of $b$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${B}$`,
      explanation: `Choice ${correctOption.letter} is correct. Substituting 0 for $x$ in the given function yields $f(0) = 0 + b$, or $f(0) = b$. Since $f(0) = ${B}$, the value of $b$ is ${B}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
