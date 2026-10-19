import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 284
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [intercept: 15-25]
 * - Difficulty factors: [Identifying constant function]
 * - Distractor patterns: [fits only f(1), fits only f(0), fits only f(0)]
 * - Constraints: [Slope is zero]
 * - Question type: [Find equation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_284 = {
  metadata: {
    id: "284",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const intercept = getRandomInt(15, 25);

    const correctEquation = `$f(x) = ${intercept}$`;

    // Each wrong choice fits one of the two given values but not the other.
    // The old choices were 1, the reciprocal of the constant, and twice the
    // constant, none of which comes from a real mistake.
    const optionsData = [
      { text: `$f(x) = ${intercept}x$`, isCorrect: false, reason: `this function gives $f(1) = ${intercept}$ but $f(0) = 0$, not ${intercept}` },
      { text: `$f(x) = x + ${intercept}$`, isCorrect: false, reason: `this function gives $f(0) = ${intercept}$ but $f(1) = ${intercept + 1}$, not ${intercept}` },
      { text: correctEquation, isCorrect: true, reason: '' },
      { text: `$f(x) = ${intercept}x + ${intercept}$`, isCorrect: false, reason: `this function gives $f(0) = ${intercept}$ but $f(1) = ${2 * intercept}$, not ${intercept}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `For the linear function $f$, $f(0) = ${intercept}$ and $f(1) = ${intercept}$. Which equation defines $f$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctOption.letter} is correct. Since $f(0) = ${intercept}$ and $f(1) = ${intercept}$, the value of $f(x)$ does not change when $x$ increases from 0 to 1, so the slope of the graph of $y = f(x)$ is 0. A linear function with slope 0 and $f(0) = ${intercept}$ is $f(x) = ${intercept}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
