import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1184
 *
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Equations In Two Variables
 * - Format: Table of values -> standard form equation.
 * - Logic: Points (-s, y0 + d), (0, y0), (s, y0 - d). Slope m = -d/s,
 *   y-intercept y0. Multiply y = (-d/s)x + y0 by s: dx + sy = s*y0.
 * - Review fixes:
 *   1. The stem said "where s is a constant" but s never appeared anywhere the
 *      student could see (the table shows plain numbers), so that clause was
 *      removed.
 *   2. The drop in y was always 3, so the answer always began "3x +"; the drop d
 *      is now random (coprime to s, d != s).
 *   3. The explanation had no reasons for the wrong choices and used bold
 *      headings with display math; it is now plain sentences with a reason for
 *      every wrong choice.
 *   4. The "both coefficients swapped and constant wrong" distractor was not a
 *      single real slip; it is replaced by the sign slip (positive slope).
 */

export const generator_1184 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

    // 1. Random values: run s (x step), drop d (y step), coprime and different
    //    so the swapped-coefficient distractor differs from the answer.
    let s = 2, d = 3, tries = 0;
    do {
      s = getRandomInt(2, 7);
      d = getRandomInt(2, 5);
      tries++;
    } while (tries < 100 && (s === d || gcd(s, d) !== 1));
    if (s === d || gcd(s, d) !== 1) { s = 4; d = 3; }

    const yInt = getRandomInt(12, 24);

    // 2. Table points (all on y = (-d/s)x + yInt)
    const y1 = yInt + d;
    const y2 = yInt;
    const y3 = yInt - d;

    const constantTerm = s * yInt;

    // 3. Options
    const correctEq = `${d}x + ${s}y = ${constantTerm}`;
    // Inverted slope: uses run over rise, slope -s/d
    const distA = `${s}x + ${d}y = ${constantTerm}`;
    // Forgot to multiply the y-intercept by s when clearing the fraction
    const distB = `${d}x + ${s}y = ${yInt}`;
    // Sign slip: slope +d/s instead of -d/s
    const distC = `${d}x - ${s}y = -${constantTerm}`;

    const optionsData = [
      { text: `$${correctEq}$`, isCorrect: true, reason: '' },
      { text: `$${distA}$`, isCorrect: false, reason: `$${distA}$ has slope $-\\frac{${s}}{${d}}$, which comes from dividing the change in $x$ by the change in $y$ instead of the change in $y$ by the change in $x$` },
      { text: `$${distB}$`, isCorrect: false, reason: `$${distB}$ comes from multiplying only the $x$ and $y$ terms by ${s} and forgetting to multiply the $y$-intercept ${yInt} by ${s}` },
      { text: `$${distC}$`, isCorrect: false, reason: `$${distC}$ has slope $\\frac{${d}}{${s}}$, which is positive, but $y$ decreases as $x$ increases in the table, so the slope must be negative` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // 4. Table HTML
    const cell = 'style="border: 1px solid currentColor; padding: 6px 15px;"';
    const tableHTML = `
      <table style="border-collapse: collapse; margin: 0 auto; text-align: center; font-size: 0.9em;">
        <thead>
          <tr>
            <th ${cell}>$x$</th>
            <th ${cell}>$y$</th>
          </tr>
        </thead>
        <tbody>
          <tr><td ${cell}>$-${s}$</td><td ${cell}>${y1}</td></tr>
          <tr><td ${cell}>$0$</td><td ${cell}>${y2}</td></tr>
          <tr><td ${cell}>$${s}$</td><td ${cell}>${y3}</td></tr>
        </tbody>
      </table>
    `;

    // 5. Explanation
    const explanation = `Choice ${correctOption.letter} is correct. Using the points $(-${s}, ${y1})$ and $(0, ${y2})$ from the table, the slope of the line is $\\frac{${y2} - ${y1}}{0 - (-${s})} = -\\frac{${d}}{${s}}$. The point $(0, ${y2})$ shows that the $y$-intercept is ${y2}. So the line is $y = -\\frac{${d}}{${s}}x + ${yInt}$. Multiplying both sides by ${s} gives $${s}y = -${d}x + ${constantTerm}$, and adding $${d}x$ to both sides gives $${correctEq}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `The table shows three values of $x$ and their corresponding values of $y$. Which equation represents the linear relationship between $x$ and $y$?`,
      figureCode: tableHTML,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation
    };
  }
};
