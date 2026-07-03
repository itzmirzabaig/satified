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
    const slope = getRandomInt(3, 6);
    const b = getRandomInt(20, 40);
    
    // 2. Generate Table Points
    const x1 = -getRandomInt(15, 25);
    const x2 = getRandomInt(5, 12);
    
    const y1 = slope * x1 + b;
    const y2 = slope * x2 + b;
    
    // 3. Generate Target Problem
    // Find 'a' when x = targetXNum / targetXDen
    const targetXNum = 1;
    const targetXDen = getRandomInt(3, 9);

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
    
    // 6. Explanation
    const explanation = `
      Choice ${correctOption.letter} is correct.
      <br/>
      First, find the slope ($m$) of the line using the table values $(${x1}, ${y1})$ and $(${x2}, ${y2})$:
      $$ m = \\frac{${y2} - (${y1})}{${x2} - (${x1})} = \\frac{${y2 - y1}}{${x2 - x1}} = ${slope} $$
      <br/>
      Next, find the equation of the line using the point-slope form $y - y_1 = m(x - x_1)$. Using $(${x2}, ${y2})$:
      $$ y - ${y2} = ${slope}(x - ${x2}) $$
      $$ y = ${slope}x - ${slope * x2} + ${y2} $$
      $$ y = ${slope}x + ${b} $$
      <br/>
      The question asks for the value of $a$ when the line passes through $\\left( \\frac{${targetXNum}}{${targetXDen}}, a \\right)$. Substitute $x = \\frac{${targetXNum}}{${targetXDen}}$ into the equation:
      $$ a = ${slope} \\left( \\frac{${targetXNum}}{${targetXDen}} \\right) + ${b} $$
      $$ a = \\frac{${slope * targetXNum}}{${targetXDen}} + \\frac{${b * targetXDen}}{${targetXDen}} = \\frac{${slope * targetXNum} + ${b * targetXDen}}{${denominator}} = \\frac{${numerator}}{${denominator}} $$
      <br/>
      So Choice ${correctOption.letter} is correct.
      <br/><br/>
      Choice ${letterD1} ($\\frac{${numD1}}{${denominator}}$) drops the constant $${b}$ and keeps only $\\frac{${slope}}{${denominator}}$.
      Choice ${letterD2} ($\\frac{${numD2}}{${denominator}}$) adds $${b}$ to the numerator without first writing it over $${denominator}$.
      Choice ${letterD3} ($\\frac{${numD3}}{${denominator}}$) uses the wrong sign for the slope term, computing $-\\frac{${slope}}{${denominator}} + ${b}$.
    `;
    
    return {
      questionText: `The table shows two values of $x$ and $y$. The graph of the line passes through $\\left( \\frac{${targetXNum}}{${targetXDen}}, a \\right)$. What is the value of $a$?`,
      figureCode: tableHTML, // HTML Table only, no Mafs
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};