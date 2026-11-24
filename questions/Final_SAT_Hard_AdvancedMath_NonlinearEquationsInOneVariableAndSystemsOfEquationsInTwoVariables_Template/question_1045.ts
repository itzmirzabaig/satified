import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1045
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [parabola y=x²-9, line through (1,a) and (5,b), find slope]
 * - Difficulty factors: [Find points on parabola, calculate slope]
 * - Distractor patterns: [run q-p, rise y2-y1, negated slope]
 * - Constraints: [Calculate y-values, use slope formula]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1045 = {
  metadata: {
    id: "1045",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Pattern: y = x^2 - k (k > 0), line through the parabola points at x = p
    // and x = q. Slope = (y2 - y1)/(q - p) = (q^2 - p^2)/(q - p) = p + q.

    let k = getRandomInt(5, 15); // y = x^2 - k
    const p = getRandomInt(1, 4);
    // Before: k = p^2 made a = 0, which showed "49 - 0" in the slope; redraw k.
    while (k === p * p) k = getRandomInt(5, 15);
    const q = p + getRandomInt(3, 6); // q > p, so q - p is in [3, 6]

    const y1 = p * p - k;
    const y2 = q * q - k; // q >= 4 and k <= 15, so y2 >= 1 (always positive)

    const slope = p + q; // (y2 - y1)/(q - p) = (q + p)(q - p)/(q - p)

    // Distractors are provably distinct from the answer and from each other:
    // run = q - p equals p + q only if p = 0 (p >= 1, impossible);
    // rise = (p + q)(q - p) equals p + q only if q - p = 1 (q - p >= 3),
    //   and equals q - p only if p + q = 1 (impossible);
    // -slope is negative while slope, run, rise are all positive.
    const run = q - p;
    const rise = y2 - y1;
    const negSlope = -slope;
    const y1p = y1 < 0 ? `(${y1})` : `${y1}`; // parenthesize only a negative y1

    // Before: reasons did not name the values and the explanation was split
    // over several lines. Now each reason states the number and the slip.
    const optionsData = [
      { text: `$${slope}$`, isCorrect: true, reason: "" },
      { text: `$${run}$`, isCorrect: false, reason: `${run} is the run, $${q} - ${p}$, the change in $x$ alone; the slope divides the change in $y$ by this number` },
      { text: `$${rise}$`, isCorrect: false, reason: `${rise} is the rise, $${y2} - ${y1p}$, the change in $y$ alone, without dividing by the change in $x$, $${run}$` },
      { text: `$${negSlope}$`, isCorrect: false, reason: `$${negSlope}$ results from subtracting the coordinates in opposite orders, $\\frac{${y1} - ${y2}}{${q} - ${p}} = \\frac{${-rise}}{${run}}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Both points lie on the parabola, so their $y$-coordinates come from the equation. At $x = ${p}$: $y = (${p})^2 - ${k} = ${y1}$, so $a = ${y1}$. At $x = ${q}$: $y = (${q})^2 - ${k} = ${y2}$, so $b = ${y2}$. The slope of line $p$ is $\\frac{${y2} - ${y1p}}{${q} - ${p}} = \\frac{${rise}}{${run}} = ${slope}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `In the $xy$-plane, the graph of $y = x^2 - ${k}$ intersects line $p$ at $(${p}, a)$ and $(${q}, b)$, where $a$ and $b$ are constants. What is the slope of line $p$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
