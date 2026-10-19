import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 275
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: non-zero, intercept: 5-15]
 * - Difficulty factors: [Evaluating at zero - y-intercept]
 * - Distractor patterns: [g(1), the input 0, x-intercept]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_275 = {
  metadata: {
    id: "275",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // The slope used to be drawn from -3 to 3, so it could be 0 ("0x + 8") or
    // plus or minus 1. It is now 2 or 3 in size, with either sign, and divides
    // the intercept so the x-intercept choice is a whole number. The old
    // choices included "approximately half the correct value" and a made-up
    // sign error.
    let slope = -2, intercept = 8;
    do {
      slope = (Math.random() < 0.5 ? -1 : 1) * getRandomInt(2, 3);
      intercept = getRandomInt(5, 15);
    } while (intercept % slope !== 0 || new Set([intercept, 0, -intercept / slope, slope + intercept]).size < 4);
    const xIntercept = -intercept / slope;

    const optionsData = [
      { text: (slope + intercept).toString(), isCorrect: false, reason: `it is the value of $g(1)$, not $g(0)$` },
      { text: '0', isCorrect: false, reason: `0 is the input, not the output; $g(0)$ is the value of $g(x)$ when $x = 0$` },
      { text: xIntercept.toString(), isCorrect: false, reason: `it is the value of $x$ for which $g(x) = 0$, not the value of $g(0)$` },
      { text: intercept.toString(), isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $g$ is defined by $g(x) = ${slope}x + ${intercept}$. What is the value of $g(0)$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: intercept.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting 0 for $x$ in the given function yields $g(0) = ${slope}(0) + ${intercept}$, or $g(0) = ${intercept}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
