import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 9bbce683
 * 
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Equations In Two Variables
 * - Format: Table -> Translation -> X-intercept.
 * - Logic: Find line h from table. Translate h down to get k. Find x-intercept of k.
 * - Fixes: Removed graph. Styled table (borders only, centered). 
 *          Improved fraction formatting for options.
 */

export const generator_9bbce683 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Generate Line h
    const slope = getRandomInt(3, 8); // Slope m
    
    // Pick a point (x1, y1)
    const x1 = getRandomInt(10, 20);
    const y1 = getRandomInt(50, 100);
    
    // Calculate y-intercept of line h: b_h = y1 - m*x1
    const b_h = y1 - (slope * x1);
    
    // Generate Table Points for h
    // (x1, y1)
    const x2 = x1 + getRandomInt(2, 5);
    const y2 = slope * x2 + b_h;
    
    const x3 = x2 + getRandomInt(2, 5);
    const y3 = slope * x3 + b_h;

    // 2. Transformation (Line k)
    // Translate down by 'trans' units
    const trans = getRandomInt(5, 15);
    // New y-intercept: b_k = b_h - trans
    const b_k = b_h - trans;
    
    // 3. Calculate x-intercept of Line k
    // Equation: y = mx + b_k
    // Set y = 0: 0 = mx + b_k  =>  mx = -b_k  =>  x = -b_k / m
    const num = -b_k;
    const den = slope;
    
    // Helper to format fraction (val/den)
    const formatFrac = (n: number, d: number) => {
        const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
        const common = Math.abs(gcd(n, d));
        const simpleN = n / common;
        const simpleD = d / common;
        
        if (simpleD === 1) return `${simpleN}`;
        if (simpleD === -1) return `${-simpleN}`;
        
        // Handle signs
        const sign = (simpleN < 0 !== simpleD < 0) ? "-" : "";
        return `${sign}\\frac{${Math.abs(simpleN)}}{${Math.abs(simpleD)}}`;
    };

    const xIntVal = formatFrac(num, den);
    const correctOption = `(${xIntVal}, 0)`;

    // 4. Distractors
    // A: X-intercept of original line h (forgot translation)
    const xIntH = formatFrac(-b_h, slope);
    const distA = `(${xIntH}, 0)`;
    
    // B: Y-intercept of line k (confusing x and y intercepts)
    const distB = `(0, ${b_k})`;
    
    // C: Wrong slope calculation or sign error (e.g. positive intercept instead of calculated)
    // Let's use a value close to correct but with sign flipped
    const xIntWrongSign = formatFrac(b_k, slope); 
    const distC = `(${xIntWrongSign}, 0)`;

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
      Equation of line $h$: $y = ${slope}x + ${b_h}$.
      <br/><br/>
      <strong>2. Find the equation of line $k$:</strong>
      Line $k$ is line $h$ translated down by ${trans} units.
      $$ b_k = b_h - ${trans} = ${b_h} - ${trans} = ${b_k} $$
      Equation of line $k$: $y = ${slope}x + ${b_k}$.
      <br/><br/>
      <strong>3. Find the x-intercept of line $k$:</strong>
      Set $y = 0$ and solve for $x$:
      $$ 0 = ${slope}x + ${b_k} $$
      $$ ${-b_k} = ${slope}x $$
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