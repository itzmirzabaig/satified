import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1196
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fraction coefficients n/d with n in [1,4], d in [2,5]; rhs in [5,10]]
 * - Difficulty factors: [Matching a table of (x,y) values to a linear equation with fraction coefficients]
 * - Distractor patterns: [Three wrong tables: y shifted up, y shifted down, x shifted]
 * - Constraints: [All three points in the correct table must satisfy the equation]
 * - Question type: [Text -> Multiple Choice with table options]
 * - Figure generation: [NONE - tables live inside the options]
 *
 * FIXES:
 *  1. LETTER_MISMATCH: choice letters are now assigned AFTER shuffling by array
 *     position (A,B,C,D = index 0..3), and the correct letter / distractor
 *     letters are read back from the shuffled array. Option strings no longer
 *     embed a pre-shuffle letter (the app renders the position label itself),
 *     so the explanation's letters always agree with the displayed order.
 *  2. Distractors are now CONSTANT transformations of the correct table
 *     (y + s, y - t, x + 1) that are provably distinct from the correct table
 *     and from each other for every draw, so no bounded-retry is needed to
 *     avoid duplicate options.
 *  3. The old unbounded self-recursion when too few integer points were found
 *     is replaced by a bounded in-call re-draw loop (<=50) with a guaranteed
 *     fallback equation, so the render can never hang.
 *  4. Displayed coefficients are reduced to lowest terms and a coefficient of 1
 *     is dropped (renders "x" not "\frac{2}{2}x" or "1x").
 */

export const generator_1196 = {
  metadata: {
    id: "1196",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
    // Render a fraction n/d reduced to lowest terms as a plain number when the
    // reduced denominator is 1, else a LaTeX fraction.
    const redFracTex = (n: number, d: number): string => {
      const g = gcd(Math.abs(n), Math.abs(d)) || 1;
      const rn = n / g, rd = d / g;
      return rd === 1 ? `${rn}` : `\\frac{${rn}}{${rd}}`;
    };
    // Render a coefficient (n/d) times a variable, dropping a leading 1.
    const coeffVar = (n: number, d: number, v: string): string => {
      const g = gcd(Math.abs(n), Math.abs(d)) || 1;
      const rn = n / g, rd = d / g;
      if (rd === 1) return rn === 1 ? v : `${rn}${v}`;
      return `\\frac{${rn}}{${rd}}${v}`;
    };

    // STEP 1: Pick fraction coefficients that yield at least 3 integer (x, y)
    // points. Re-draw inside this call (fresh RNG each pass) up to 50 times;
    // fall back to a guaranteed-integer equation if that ever fails.
    let num1 = 1, den1 = 2, num2 = 1, den2 = 2, rhs = 6;
    let points: { x: number; y: number }[] = [];

    for (let tries = 0; tries < 50; tries++) {
      const n1 = getRandomInt(1, 4);
      const d1 = getRandomInt(2, 5);
      const n2 = getRandomInt(1, 4);
      const d2 = getRandomInt(2, 5);
      const r = getRandomInt(5, 10);

      // y = (d2/n2) * (rhs - (n1/d1) * x). Collect integer-y points for x = 0..10.
      const found: { x: number; y: number }[] = [];
      for (let x = 0; x <= 10 && found.length < 3; x++) {
        const yVal = (d2 / n2) * (r - (n1 / d1) * x);
        if (Number.isInteger(yVal)) found.push({ x, y: yVal });
      }

      if (found.length >= 3) {
        num1 = n1; den1 = d1; num2 = n2; den2 = d2; rhs = r;
        points = found.slice(0, 3);
        break;
      }
    }

    // Fallback: (1/2)x + (1/2)y = 6  <=>  y = 12 - x  (integer for every x).
    if (points.length < 3) {
      num1 = 1; den1 = 2; num2 = 1; den2 = 2; rhs = 6;
      points = [0, 1, 2].map(x => ({ x, y: 12 - x }));
    }

    // STEP 2: Build the correct table and three provably-distinct wrong tables.
    const s = getRandomInt(1, 3);   // D1 shifts every y up by s (>= 1)
    const t = getRandomInt(1, 3);   // D2 shifts every y down by t (>= 1)
    // Correct vs D1: differ by s in every row. Correct vs D2: differ by t.
    // D1 vs D2: one is +s, the other -t, so they never coincide. D3 changes the
    // x column (x+1), so it differs from all of the above. => 4 distinct tables.
    const correctPts = points;
    const d1Pts = points.map(p => ({ x: p.x, y: p.y + s }));
    const d2Pts = points.map(p => ({ x: p.x, y: p.y - t }));
    const d3Pts = points.map(p => ({ x: p.x + 1, y: p.y }));

    const formatY = (y: number): string => `${y}`; // all y-values are integers here

    const buildTable = (pts: { x: number; y: number }[]): string => {
      const rows = pts.map(p =>
        `<tr><td style="border: 1px solid currentColor; padding: 8px 16px; text-align: center;">${p.x}</td><td style="border: 1px solid currentColor; padding: 8px 16px; text-align: center;">${formatY(p.y)}</td></tr>`
      ).join('');
      return `<table style="border-collapse: collapse; margin: 10px auto; text-align: center;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px 16px; font-weight: bold;">x</th><th style="border: 1px solid currentColor; padding: 8px 16px; font-weight: bold;">y</th></tr></thead><tbody>${rows}</tbody></table>`;
    };

    // STEP 3: Assign choice letters AFTER shuffling, by final array position.
    const optionsData = [
      { table: buildTable(correctPts), isCorrect: true, reason: '' },
      { table: buildTable(d1Pts), isCorrect: false, reason: 'adds a constant to each $y$-value, so the points do not satisfy the equation' },
      { table: buildTable(d2Pts), isCorrect: false, reason: 'subtracts a constant from each $y$-value, so the points do not satisfy the equation' },
      { table: buildTable(d3Pts), isCorrect: false, reason: 'shifts each $x$-value, so the points do not satisfy the equation' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // STEP 4: Explanation — computed from the same live values, correct letter
    // and distractor letters read from the shuffled array.
    const [p0, p1, p2] = correctPts;
    // Multiplier (d2/n2) in front of the parentheses; drop it when it reduces to 1.
    const mult = redFracTex(den2, num2);
    const multStr = mult === '1' ? '' : mult;
    const solveForY = `y = ${multStr}\\left(${rhs} - ${coeffVar(num1, den1, 'x')}\\right)`;

    return {
      questionText: `$${coeffVar(num1, den1, 'x')} + ${coeffVar(num2, den2, 'y')} = ${rhs}$ Which table gives three values of $x$ and their corresponding values of $y$ for the given equation?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.table),
      correctAnswer: shuffledOptions.find(o => o.isCorrect)!.table,
      explanation: `Choice ${correctLetter} is correct. Solving the equation for $y$ gives $${solveForY}$. Substituting $x=${p0.x}$ gives $y=${p0.y}$, substituting $x=${p1.x}$ gives $y=${p1.y}$, and substituting $x=${p2.x}$ gives $y=${p2.y}$, which are the values in this table. Choice ${incorrectOptions[0].letter} is incorrect because it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect because it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect because it ${incorrectOptions[2].reason}.`
    };
  }
};
