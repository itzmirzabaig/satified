import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 313
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -2 to -5, x-result: 10-20]
 * - Difficulty factors: [Substitution with negative coefficient]
 * - Distractor patterns: [1, 5, 45 - various miscalculations]
 * - Constraints: [Integer solution]
 * - Question type: [Direct Solve→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_313 = {
  metadata: {
    id: "313",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // m is a negative coefficient; exclude -4 so that (4 + m) is never 0
    // (which would degenerate the second equation to 0x = 0 with no unique solution).
    const m = getRandomElement([-2, -3, -5]);
    // x is a multiple of 4 - m so that dropping the negative sign of m
    // (substituting |m|x for y) also gives a whole number. The old choices
    // were 1, 5 and 3x, none from a real mistake.
    const step = 4 - m;
    const x = step * getRandomInt(1, Math.floor(24 / step));
    const coef = 4 + m;
    const total = coef * x;
    const dropped = total / step;
    const coefTex = coef === 1 ? '' : coef === -1 ? '-' : `${coef}`;

    const optionsData = [
      { text: (-x).toString(), isCorrect: false, reason: coef === 1
        ? `the second equation simplifies to $x = ${total}$, so the value of $x$ is ${x}, not $${-x}$`
        : `it has the wrong sign; dividing $${total}$ by $${coef}$ gives ${x}, not $${-x}$` },
      { text: (m * x).toString(), isCorrect: false, reason: `$${m * x}$ is the value of $y$, not $x$` },
      { text: x.toString(), isCorrect: true, reason: '' },
      { text: dropped.toString(), isCorrect: false, reason: `it results from substituting $${-m}x$ instead of $${m}x$ for $y$, which gives $${step}x = ${total}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Substitute $y = ${m}x$ into the second equation: $4x + (${m}x) = ${total}$. This simplifies to $${coefTex}x = ${total}$${coef === 1 ? '' : `, and dividing both sides by $${coef}$ gives $x = ${x}$`}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `The solution to the given system of equations is $(x, y)$. What is the value of $x$?$$\\begin{aligned} y &= ${m}x \\\\ 4x + y &= ${total} \\end{aligned}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: x.toString(),
      explanation: explanation
    };
  }
};
