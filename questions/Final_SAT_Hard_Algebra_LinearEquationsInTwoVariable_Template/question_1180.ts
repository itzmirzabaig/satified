import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1180
 * 
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Equations In Two Variables
 * - Format: Table of values.
 * - Logic: Find equation from table, then evaluate at a fractional x.
 * - Fixes: Removed line graph. Moved table to figureCode. 
 *          Table styled with borders only, centered, no fill.
 */

export const generator_1180 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Generate Linear Function
    // y = mx + b
    // FIXED (review): when the slope shared a factor with the denominator
    // (slope 3, x = 1/3) the answer printed as an unreduced fraction such as
    // 66/3, and choice (m + b)/den could reduce while the others did not.
    // Redraw until every choice is already in lowest terms.
    const gcd = (p: number, q: number): number => (q === 0 ? p : gcd(q, p % q));
    let slope = 0, b = 0, targetXDen = 0;
    do {
      slope = getRandomInt(3, 6);
      b = getRandomInt(20, 40);
      targetXDen = getRandomInt(3, 9);
    } while (gcd(slope, targetXDen) !== 1 || gcd(slope + b, targetXDen) !== 1);

    // 2. Generate Table Points
    const x1 = -getRandomInt(15, 25);
    const x2 = getRandomInt(5, 12);

    const y1 = slope * x1 + b;
    const y2 = slope * x2 + b;

    // 3. Generate Target Problem
    // Find 'a' when x = targetXNum / targetXDen
    const targetXNum = 1;

    // Calculate correct answer (fraction arithmetic).
    // a = m(1/den) + b = (m + b*den) / den   [answer-first, exact integers]
    const numerator = slope * targetXNum + b * targetXDen;
    const denominator = targetXDen;

    const correctFraction = `\\frac{${numerator}}{${denominator}}`;

    // 4. Distractors — all fractions over the SAME denominator `den`, one per
    //    common student error. With a shared positive denominator, numeric
    //    equality reduces to numerator equality, and the four numerators below
    //    are pairwise distinct for every draw in the declared ranges
    //    (slope 3-6, b 20-40, den 3-9): each pair differs by at least 6.
    //    D1 dropped the intercept b (used a = m/den).
    //    D2 added b without scaling ((m + b)/den).
    //    D3 flipped the sign of the slope term ((b*den - m)/den).
    const numD1 = slope;                        // forgot to add b
    const numD2 = slope + b;                     // added b un-scaled
    const numD3 = b * targetXDen - slope;        // sign error on slope term

    const distA = `\\frac{${numD1}}{${denominator}}`;
    const distB = `\\frac{${numD2}}{${denominator}}`;
    const distC = `\\frac{${numD3}}{${denominator}}`;

    const optionsData = [
      { text: `$${distA}$`, isCorrect: false },
      { text: `$${distB}$`, isCorrect: false },
      { text: `$${distC}$`, isCorrect: false },
      { text: `$${correctFraction}$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    // Letters for each distractor (only known after the shuffle).
    const letterOf = (t: string) => shuffledOptions.find(o => o.text === t)!.letter;
    const letterD1 = letterOf(`$${distA}$`);
    const letterD2 = letterOf(`$${distB}$`);
    const letterD3 = letterOf(`$${distC}$`);

    // 5. Build Table HTML (Figure Code Only)
    // Borders only, no fill, centered via margin: 0 auto
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
        </tbody>
      </table>
    `;
    
    // 6. Explanation. FIXED (review): it was built from <br/> breaks and
    // display math, ended with "So Choice X is correct" a second time, and
    // listed the wrong choices as "Choice X (...) drops" instead of the
    // standard "Choice X is incorrect because" sentences. The stem never said
    // the table's values lie on the line or that a is a constant.
    const reasons: Record<string, string> = {
      [letterD1]: `$\\frac{${numD1}}{${denominator}}$ is only the slope term $${slope}\\left(\\frac{1}{${targetXDen}}\\right)$; it leaves out the constant $${b}$`,
      [letterD2]: `$\\frac{${numD2}}{${denominator}}$ comes from adding $${b}$ to the numerator without first rewriting $${b}$ as $\\frac{${b * targetXDen}}{${targetXDen}}$`,
      [letterD3]: `$\\frac{${numD3}}{${denominator}}$ comes from subtracting the slope term instead of adding it, which gives $${b} - \\frac{${slope}}{${targetXDen}}$`
    };
    const explanation = `Choice ${correctOption.letter} is correct. Using the points $(${x1}, ${y1})$ and $(${x2}, ${y2})$ from the table, the slope of the line is $\\frac{${y2} - (${y1})}{${x2} - (${x1})} = \\frac{${y2 - y1}}{${x2 - x1}} = ${slope}$. So an equation of the line has the form $y = ${slope}x + c$, where $c$ is a constant. Substituting the point $(${x2}, ${y2})$ gives $${y2} = ${slope}(${x2}) + c$, or $${y2} = ${slope * x2} + c$, so $c = ${b}$. An equation of the line is therefore $y = ${slope}x + ${b}$. Since the point $\\left(\\frac{1}{${targetXDen}}, a\\right)$ lies on the line, substituting $\\frac{1}{${targetXDen}}$ for $x$ gives $a = ${slope}\\left(\\frac{1}{${targetXDen}}\\right) + ${b} = \\frac{${slope}}{${targetXDen}} + \\frac{${b * targetXDen}}{${targetXDen}} = \\frac{${numerator}}{${denominator}}$. ${[letterD1, letterD2, letterD3].sort().map(l => `Choice ${l} is incorrect because ${reasons[l]}.`).join(' ')}`;

    return {
      questionText: `The table shows the coordinates of two points on a line in the $xy$-plane. The line also passes through the point $\\left(\\frac{1}{${targetXDen}}, a\\right)$, where $a$ is a constant. What is the value of $a$?`,
      figureCode: tableHTML, // HTML Table only, no Mafs
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
