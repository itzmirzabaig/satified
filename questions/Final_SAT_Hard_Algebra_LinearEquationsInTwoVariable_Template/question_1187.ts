import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1187
 *
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Equations In Two Variables
 * - Format: Table -> Translation -> X-intercept.
 * - Logic: Find line h from table. Translate h down to get k. Find x-intercept of k.
 * - Fixes: Removed graph. Styled table (borders only, centered).
 *          Improved fraction formatting for options.
 *          Sign-aware equation formatting (no "+ -49").
 *          Bounded retry guarantees all four options are distinct for every draw.
 */

export const generator_1187 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

    // Format a fraction n/d in lowest terms as a LaTeX string (or a bare integer).
    const formatFrac = (n: number, d: number): string => {
      const common = Math.abs(gcd(n, d)) || 1;
      let sn = n / common;
      let sd = d / common;
      if (sd < 0) { sn = -sn; sd = -sd; } // keep denominator positive
      if (sd === 1) return `${sn}`;
      const sign = sn < 0 ? "-" : "";
      return `${sign}\\frac{${Math.abs(sn)}}{${sd}}`;
    };

    // Sign-aware "+ b" / "- |b|" for slope-intercept display.
    const addTerm = (b: number): string => (b < 0 ? `- ${Math.abs(b)}` : `+ ${b}`);

    // --- Draw parameters with a bounded retry so all four options are distinct ---
    let slope = 0, x1 = 0, y1 = 0, b_h = 0, x2 = 0, y2 = 0, x3 = 0, y3 = 0;
    let trans = 0, b_k = 0;
    let correctOption = '', distA = '', distB = '', distC = '';
    let tries = 0;
    do {
      // 1. Generate Line h
      slope = getRandomInt(3, 8);              // Slope m
      x1 = getRandomInt(10, 20);
      y1 = getRandomInt(50, 100);
      b_h = y1 - slope * x1;                    // y-intercept of h

      // Table points for h (all satisfy y = slope*x + b_h)
      x2 = x1 + getRandomInt(2, 5);
      y2 = slope * x2 + b_h;
      x3 = x2 + getRandomInt(2, 5);
      y3 = slope * x3 + b_h;

      // 2. Line k = line h translated down `trans` units
      trans = getRandomInt(5, 15);
      b_k = b_h - trans;

      // 3. Options
      // Correct: x-intercept of k -> x = -b_k / slope
      correctOption = `(${formatFrac(-b_k, slope)}, 0)`;
      // A: x-intercept of h (forgot the translation)
      distA = `(${formatFrac(-b_h, slope)}, 0)`;
      // B: y-intercept of k (confused x- and y-intercepts)
      distB = `(0, ${b_k})`;
      // C: sign error on the intercept -> x = b_k / slope
      distC = `(${formatFrac(b_k, slope)}, 0)`;

      tries++;
    } while (
      tries < 50 &&
      (b_k === 0 ||
        new Set([correctOption, distA, distB, distC]).size !== 4)
    );

    const optionsData = [
      { text: correctOption, isCorrect: true },
      { text: distA, isCorrect: false },
      { text: distB, isCorrect: false },
      { text: distC, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const finalCorrect = shuffledOptions.find(o => o.isCorrect)!;

    // 5. Build Table HTML (Figure Code Only)
    const tableHTML = `
      <table style="border-collapse: collapse; margin: 0 auto; text-align: center; font-size: 0.9em;">
        <thead>
          <tr>
            <th style="border: 1px solid currentColor; padding: 6px 15px;">$x$</th>
            <th style="border: 1px solid currentColor; padding: 6px 15px;">$y$</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid currentColor; padding: 6px 15px;">${x1}</td>
            <td style="border: 1px solid currentColor; padding: 6px 15px;">${y1}</td>
          </tr>
          <tr>
            <td style="border: 1px solid currentColor; padding: 6px 15px;">${x2}</td>
            <td style="border: 1px solid currentColor; padding: 6px 15px;">${y2}</td>
          </tr>
          <tr>
            <td style="border: 1px solid currentColor; padding: 6px 15px;">${x3}</td>
            <td style="border: 1px solid currentColor; padding: 6px 15px;">${y3}</td>
          </tr>
        </tbody>
      </table>
    `;

    // 6. Explanation
    const xIntVal = formatFrac(-b_k, slope);
    const explanation = `
      Choice ${finalCorrect.letter} is correct.
      <br/><br/>
      <strong>1. Find the equation of line $h$:</strong>
      Calculate the slope ($m$) using the first two points $(${x1}, ${y1})$ and $(${x2}, ${y2})$:
      $$ m = \\frac{${y2} - ${y1}}{${x2} - ${x1}} = \\frac{${y2 - y1}}{${x2 - x1}} = ${slope} $$
      <br/>
      Find the $y$-intercept ($b_h$) using $y = mx + b$:
      $$ ${y1} = ${slope}(${x1}) + b_h $$
      $$ b_h = ${y1} - ${slope * x1} = ${b_h} $$
      Equation of line $h$: $y = ${slope}x ${addTerm(b_h)}$.
      <br/><br/>
      <strong>2. Find the equation of line $k$:</strong>
      Line $k$ is line $h$ translated down ${trans} units.
      $$ b_k = b_h - ${trans} = ${b_h} - ${trans} = ${b_k} $$
      Equation of line $k$: $y = ${slope}x ${addTerm(b_k)}$.
      <br/><br/>
      <strong>3. Find the x-intercept of line $k$:</strong>
      Set $y = 0$ and solve for $x$:
      $$ 0 = ${slope}x ${addTerm(b_k)} $$
      $$ ${slope}x = ${-b_k} $$
      $$ x = \\frac{${-b_k}}{${slope}} = ${xIntVal} $$
      <br/>
      The $x$-intercept is $(${xIntVal}, 0)$.
    `;

    return {
      questionText: `For line $h$, the table shows three values of $x$ and their corresponding values of $y$. Line $k$ is the result of translating line $h$ down ${trans} units in the $xy$-plane. What is the $x$-intercept of line $k$?`,
      figureCode: tableHTML,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: finalCorrect.text,
      explanation: explanation
    };
  }
};
