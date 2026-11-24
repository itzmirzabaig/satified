import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1136
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = (x-h)^2 + k, h in [1,6], k in [-8,-2]]
 * - Difficulty factors: [Vertex form, minimum value]
 * - Distractor patterns: [k (correct), h (x of vertex), -k (sign slip), f(0) (y-intercept)]
 * - Constraints: [Minimum is k in (x-h)^2 + k]
 * - Question type: [Text->Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIXED:
 * - correctAnswer now equals the exact option string (was bare number -> CORRECT_FUZZY).
 * - The k+2 choice was answer plus an offset with no real slip behind it. It is
 *   replaced by f(0), the y-intercept, and every wrong choice now has a reason.
 * - Redraw until all four values are distinct.
 */

export const generator_1136 = {
  metadata: {
    id: "1136",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    let h = getRandomInt(1, 6);
    let k = -getRandomInt(2, 8);

    // The four option values must all be distinct (for example h=2, k=-2 makes
    // f(0) = 2 = -k), so redraw until they are.
    while (new Set([k, h * h + k, h, -k]).size !== 4) {
      h = getRandomInt(1, 6);
      k = -getRandomInt(2, 8);
    }

    const f0 = h * h + k;
    const correctText = `$${k}$`;

    const optionsData = [
      { text: correctText, isCorrect: true, reason: '' },
      { text: `$${f0}$`, isCorrect: false, reason: `$${f0}$ is $f(0)$, the $y$-coordinate of the $y$-intercept of the graph, not the minimum value` },
      { text: `$${h}$`, isCorrect: false, reason: `$${h}$ is the value of $x$ at which the minimum occurs, not the minimum value of $f$` },
      { text: `$${-k}$`, isCorrect: false, reason: `$${-k}$ is the opposite of the minimum value, which comes from dropping the negative sign on the constant term` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(x)=(x-${h})^2${k}$. What is the minimum value of $f(x)$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The expression $(x-${h})^2$ is a square, so it is never negative, and its least value is $0$, which occurs when $x=${h}$. Therefore, the minimum value of $f(x)$ is $0+(${k})=${k}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
