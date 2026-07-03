import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1136
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = (x-h)^2 + k, h in [1,6], k in [-8,-2]]
 * - Difficulty factors: [Vertex form, minimum value]
 * - Distractor patterns: [A: k (correct), B: k+2, C: h, D: -k]
 * - Constraints: [Minimum is k in (x-h)^2 + k]
 * - Question type: [Text->Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIXED:
 * - Guarded distractor collision h === -k (bounded retry over all 4 values).
 * - correctAnswer now equals the exact option string (was bare number -> CORRECT_FUZZY).
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

    // The four option values must all be distinct. With k in [-8,-2] and
    // h in [1,6] the only possible collision is h === -k (both can land in
    // [2,6]); regenerate until all four values are unique.
    let tries = 0;
    while (
      tries++ < 50 &&
      new Set([k, k + 2, h, -k]).size !== 4
    ) {
      h = getRandomInt(1, 6);
      k = -getRandomInt(2, 8);
    }

    const correctText = `$${k}$`;

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `$${k + 2}$`, isCorrect: false },
      { text: `$${h}$`, isCorrect: false },
      { text: `$${-k}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `What is the minimum value of $f(x)=(x-${h})^2${k}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. In vertex form $f(x)=(x-h)^2+k$, the graph opens upward with its vertex at $(h,k)$, so the minimum value is $k=${k}$.`
    };
  }
};
