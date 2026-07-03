import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 757
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [two points on a line, slope a reduced fraction, integer intercept]
 * - Difficulty factors: [Finding equation from two points with a fractional slope]
 * - Distractor patterns: [A = wrong-sign slope, B = reciprocal-magnitude slope, D = wrong intercept]
 * - Constraints: [Points must give a clean reduced fractional slope and integer intercept]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 *
 * REBUILT (generate internals):
 * - Answer-first, all-integer construction. Slope s*p/q with gcd(p,q)=1 and q>1
 *   (genuine, already-reduced fraction, never +/-1). x-coordinates are chosen as
 *   multiples of q so both points AND the y-intercept are integers -> the slope
 *   recomputed in the explanation, (y2-y1)/(x2-x1), reduces to exactly s*p/q.
 * - Distractors are constructed to differ from the answer and from each other
 *   (wrong sign, reciprocal magnitude, wrong intercept) and a bounded (<=50)
 *   retry re-rolls the draw if any two rendered option strings ever collide.
 * - Removed the old rounding of a non-integer intercept (source of DUP_OPTIONS,
 *   LETTER_MISMATCH and the "+--1" SIGN_GLITCH). Intercept terms are formatted
 *   with a helper so no "+-" ever appears.
 */

export const generator_757 = {
  metadata: {
    id: "757",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Format a slope value s*(p/q) as a LaTeX coefficient of x.
    // Handles integer slopes (p===q would be excluded, but p/q can be integer
    // only when q===1, which never happens here) and the sign cleanly.
    const slopeTerm = (sign: number, p: number, q: number): string => {
      const signStr = sign < 0 ? '-' : '';
      if (q === 1) return `${signStr}${p}`;
      return `${signStr}\\frac{${p}}{${q}}`;
    };
    // Format "+ b" / "- |b|" as an intercept term (b is a nonzero integer here).
    const interceptTerm = (b: number): string => (b < 0 ? `-${Math.abs(b)}` : `+${b}`);
    // Full function string f(x)=<slope>x<intercept>.
    const fnStr = (sign: number, p: number, q: number, b: number): string =>
      `f(x)=${slopeTerm(sign, p, q)}x${interceptTerm(b)}`;

    // Valid (p, q) fraction shapes: reduced, q>1, and not equal to 1.
    const fractionShapes = [
      { p: 1, q: 2 }, { p: 3, q: 2 },
      { p: 1, q: 3 }, { p: 2, q: 3 },
      { p: 1, q: 4 }, { p: 3, q: 4 }
    ];

    let attempt = 0;
    // These are assigned inside the loop; declared here for use after it.
    let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
    let sign = 1, p = 1, q = 2, b = 1;
    let correctText = '';
    let optionsData: { text: string; isCorrect: boolean; reason?: string }[] = [];

    do {
      attempt++;

      const shape = getRandomElement(fractionShapes);
      p = shape.p;
      q = shape.q;
      sign = Math.random() < 0.5 ? 1 : -1;

      // Integer y-intercept, nonzero, small.
      b = getRandomElement([-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6]);

      // x-coordinates as multiples of q so y-values are integers.
      // t1 negative, t2 positive, distinct -> x1 < 0 < x2.
      const t1 = getRandomInt(-2, -1);
      const t2 = getRandomInt(1, 2);
      x1 = q * t1;
      x2 = q * t2;
      // y = sign*p*(x/q) + b = sign*p*t + b  (integers)
      y1 = sign * p * t1 + b;
      y2 = sign * p * t2 + b;

      // Correct function and three distractors.
      correctText = fnStr(sign, p, q, b);

      // A: wrong-sign slope, same intercept.
      const distA = fnStr(-sign, p, q, b);
      // B: reciprocal-magnitude slope (q/p), same sign, same intercept.
      const distB = fnStr(sign, q, p, b);
      // D: correct slope, wrong intercept. Shift by a nonzero amount and avoid
      // landing on 0 so the intercept term never renders as "+0".
      let bWrong = b + getRandomElement([-3, -2, -1, 1, 2, 3]);
      if (bWrong === 0) bWrong = b > 0 ? b + 1 : b - 1;
      const distD = fnStr(sign, p, q, bWrong);

      optionsData = [
        { text: distA, isCorrect: false, reason: "uses the slope with the wrong sign" },
        { text: distB, isCorrect: false, reason: "inverts the slope fraction" },
        { text: correctText, isCorrect: true },
        { text: distD, isCorrect: false, reason: "uses the correct slope but the wrong $y$-intercept" }
      ];

      // Guard: all four rendered strings must be distinct.
      const texts = optionsData.map(o => o.text);
      const unique = new Set(texts).size === texts.length;
      // Also guard bWrong nonzero-shift already ensured != b; keep going if collision.
      if (unique) break;
    } while (attempt < 50);

    // Shuffle and assign letters (letters only known after shuffle).
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // Explanation slope, recomputed from the live integer points.
    const dy = y2 - y1;
    const dx = x2 - x1;
    const slopeStr = slopeTerm(sign, p, q);

    return {
      questionText: `In the $xy$-plane, the points $(${x1}, ${y1})$ and $(${x2}, ${y2})$ lie on the graph of which of the following linear functions?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The slope is $m = \\frac{${y2} - (${y1})}{${x2} - (${x1})} = \\frac{${dy}}{${dx}} = ${slopeStr}$. Using point-slope form with $(${x2}, ${y2})$ gives the $y$-intercept, so the function is $${correctText}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
