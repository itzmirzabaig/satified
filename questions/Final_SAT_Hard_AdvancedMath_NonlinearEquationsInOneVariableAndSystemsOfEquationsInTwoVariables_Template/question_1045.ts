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

    const k = getRandomInt(5, 15); // y = x^2 - k
    const p = getRandomInt(1, 4);
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

    const optionsData = [
      { text: `$${slope}$`, isCorrect: true, reason: "" },
      { text: `$${run}$`, isCorrect: false, reason: "is the difference of the $x$-coordinates (the run), not the slope" },
      { text: `$${rise}$`, isCorrect: false, reason: "is the difference of the $y$-coordinates (the rise) without dividing by the difference of the $x$-coordinates" },
      { text: `$${negSlope}$`, isCorrect: false, reason: "results from subtracting the coordinates in opposite orders in the numerator and the denominator" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Both points lie on the parabola, so their $y$-coordinates come from the equation. At $x = ${p}$: $y = (${p})^2 - ${k} = ${y1}$, so $a = ${y1}$. At $x = ${q}$: $y = (${q})^2 - ${k} = ${y2}$, so $b = ${y2}$. The slope of line $p$ is $\\frac{${y2} - (${y1})}{${q} - ${p}} = \\frac{${rise}}{${run}} = ${slope}$.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `In the $xy$-plane, the graph of $y = x^2 - ${k}$ intersects line $p$ at $(${p}, a)$ and $(${q}, b)$, where $a$ and $b$ are constants. What is the slope of line $p$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
