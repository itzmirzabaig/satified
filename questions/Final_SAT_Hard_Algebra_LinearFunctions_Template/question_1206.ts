import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1206
 * 
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Functions
 * - Format: Table.
 * - Logic: Find x-intercept from linear data.
 * - Fixes: Replaced Mafs with SVG. Styled table (borders only, no fill).
 * - Removed the SVG graph from the figure per review — the figure is now the
 *   table only (the two table points still determine the line, so the
 *   x-intercept question remains fully answerable); the graph-building code
 *   went with it. Everything else is unchanged.
 */

export const generator_1206 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Generate Linear Function y = mx + b with an integer x-intercept.
    //    Let the x-intercept be xInt (where y = 0):
    //      y = m(x - xInt)  =>  b = -m*xInt.
    const slope = getRandomInt(2, 5);
    let m = getRandomElement([slope, -slope]);
    const xInt = getRandomInt(-8, -2); // Negative x-intercept (e.g., -5)

    // Guard against distractor collisions with the correct answer:
    //   distB = (m, 0) collides with correct (xInt, 0) when m === xInt.
    //   distC = (-xInt, 0) collides with distB (m, 0) when m === -xInt.
    // Both are avoided by keeping |m| != |xInt|. Resample m's sign/magnitude
    // (bounded) until that holds. |xInt| can be 6..8 which no |m|<=5 hits.
    let tries = 0;
    while (Math.abs(m) === Math.abs(xInt) && tries++ < 50) {
      const s = getRandomInt(2, 5);
      m = getRandomElement([s, -s]);
    }

    // b = -m * xInt
    const b = -m * xInt;

    // 2. Generate Table Points near (but not at) the intercept.
    const r1 = getRandomInt(2, 5);
    const x1 = xInt - r1;
    const y1 = m * (x1 - xInt); // = -m*r1

    const r2 = getRandomInt(2, 5);
    const x2 = xInt + r2;
    const y2 = m * (x2 - xInt); // = m*r2

    // Signed-term formatter: renders " + k" or " - |k|" for clean algebra,
    // avoiding "+ -" glitches in the worked explanation.
    const signed = (n: number) => (n < 0 ? `- ${Math.abs(n)}` : `+ ${n}`);
    // Parenthesized signed value for substitution, e.g. "(-8)" or "(3)".
    const paren = (n: number) => `(${n})`;

    // 3. Options
    const correctOption = `(${xInt}, 0)`;
    // Distractor A: mistakes the y-intercept (0, b) for the x-intercept.
    const distA = `(0, ${b})`;
    // Distractor B: reads the slope as the x-coordinate.
    const distB = `(${m}, 0)`;
    // Distractor C: sign error on the x-intercept.
    const distC = `(${-xInt}, 0)`;

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

    // 4. Build Table HTML
    // Borders only, transparent background, centered
    const tableHTML = `
      <table style="border-collapse: collapse; margin: 0 auto 20px auto; text-align: center; font-size: 0.9em;">
        <thead>
          <tr>
            <th style="border: 1px solid currentColor; padding: 6px 20px;">$x$</th>
            <th style="border: 1px solid currentColor; padding: 6px 20px;">$f(x)$</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid currentColor; padding: 6px 20px;">${x1}</td>
            <td style="border: 1px solid currentColor; padding: 6px 20px;">${y1}</td>
          </tr>
          <tr>
            <td style="border: 1px solid currentColor; padding: 6px 20px;">${x2}</td>
            <td style="border: 1px solid currentColor; padding: 6px 20px;">${y2}</td>
          </tr>
        </tbody>
      </table>
    `;

    // 5. Explanation — every displayed number comes from the live variables,
    //    and signed terms use signed()/paren() to avoid "+ -" artifacts.
    const explanation = `
      Choice ${finalCorrect.letter} is correct.
      <br/><br/>
      <strong>1. Find the slope ($m$):</strong>
      Using the points $(${x1}, ${y1})$ and $(${x2}, ${y2})$ from the table,
      $$ m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{${y2} - ${paren(y1)}}{${x2} - ${paren(x1)}} = \\frac{${y2 - y1}}{${x2 - x1}} = ${m}. $$       <br/>
      <strong>2. Find the equation of the line:</strong>
      Using point-slope form with $(${x1}, ${y1})$,
      $$ y - ${paren(y1)} = ${m}\\,(x - ${paren(x1)}), $$       $$ y = ${m}x ${signed(-m * x1)} ${signed(y1)}, $$       $$ y = ${m}x ${signed(b)}. $$       <br/>
      <strong>3. Find the $x$-intercept:</strong>
      The $x$-intercept occurs where $y = 0$:
      $$ 0 = ${m}x ${signed(b)}, $$       $$ ${m}x = ${-b}, $$       $$ x = \\frac{${-b}}{${m}} = ${xInt}. $$       <br/>
      The $x$-intercept is $(${xInt}, 0)$.
    `;

    return {
      questionText: `The table above shows some values of $x$ and their corresponding values $f(x)$ for the linear function $f$. What is the $x$-intercept of the graph of $y=f(x)$ in the $xy$-plane?`,
      figureCode: tableHTML,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption,
      explanation: explanation
    };
  }
};