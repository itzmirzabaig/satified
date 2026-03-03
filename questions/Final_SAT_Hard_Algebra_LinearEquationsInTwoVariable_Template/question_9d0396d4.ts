import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 9d0396d4
 * 
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Equations In Two Variables
 * - Logic: Given line y = mx + b (via graph/intercepts), find x (d) for a specific y.
 * - Math: 
 *    Slope m = -rise / run (where rise, run > 0)
 *    Equation: y = -(rise/run)x + yInt
 *    Given point (d, targetY). Solve for d:
 *    targetY = -(rise/run)d + yInt
 *    (rise/run)d = yInt - targetY
 *    d = (yInt - targetY) * (run / rise)
 * - Fixes: 
 *    1. Removed brittle logic that forced denominator to be 7.
 *    2. Used precise fraction arithmetic.
 *    3. Replaced Mafs with SVG.
 */

export const generator_9d0396d4 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Randomize Parameters
    // We want a negative slope: m = -A/B
    // A = rise (magnitude), B = run
    const A = getRandomInt(3, 9); 
    const B = getRandomInt(4, 10);
    
    // Y-intercept (C)
    const C = getRandomInt(6, 12);
    
    // Target Y value (must be less than C to keep d positive)
    // We pick Y such that C - Y is small, keeping d within graph bounds usually
    const targetY = getRandomInt(2, C - 2);

    // 2. Solve for d
    // y = -(A/B)x + C
    // targetY = -(A/B)d + C
    // (A/B)d = C - targetY
    // d = (C - targetY) * (B / A)
    // d = [ (C - targetY) * B ] / A
    
    const numRaw = (C - targetY) * B;
    const denRaw = A;

    // Helper to format fraction
    const formatFrac = (n: number, d: number) => {
        const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
        const common = Math.abs(gcd(n, d));
        const simpleN = n / common;
        const simpleD = d / common;
        
        if (simpleD === 1) return `${simpleN}`;
        return `\\frac{${simpleN}}{${simpleD}}`;
    };

    const correctAns = formatFrac(numRaw, denRaw);

    // 3. Distractors
    // Distractor 1: Inverted slope application (multiplying by A/B instead of B/A)
    // Wrong d = (C - targetY) * (A / B)
    const dist1 = formatFrac((C - targetY) * A, B);
    
    // Distractor 2: Sign error (adding Y and C)
    // Wrong d = (C + targetY) * (B / A)
    const dist2 = formatFrac((C + targetY) * B, A);

    // Distractor 3: Simple integer guess (half of y-intercept or similar)
    const dist3 = formatFrac(C, 2);

    const optionsData = [
      { text: `$${correctAns}$`, isCorrect: true },
      { text: `$${dist1}$`, isCorrect: false },
      { text: `$${dist2}$`, isCorrect: false },
      { text: `$${dist3}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    // 4. Build SVG Graph
    // Calculate intercepts for plotting
    // y-intercept: (0, C)
    // x-intercept: Set y=0 => 0 = -A/B x + C => x = B*C/A
    const xInt = (B * C) / A;
    
    // Viewbox dimensions
    const xMax = Math.ceil(xInt) + 2;
    const yMax = C + 2;
    
    const width = 350;
    const height = 300;
    const margin = 40;
    
    const scaleX = (x: number) => margin + (x / xMax) * (width - 2*margin);
    const scaleY = (y: number) => (height - margin) - (y / yMax) * (height - 2*margin);

    // Grid
    let gridHTML = '';
    // Vertical
    for (let i = 0; i <= xMax; i += 2) { // Step 2 for clarity
        const xPos = scaleX(i);
        gridHTML += `<line x1="${xPos}" y1="${scaleY(0)}" x2="${xPos}" y2="${scaleY(yMax)}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />`;
        if (i !== 0) gridHTML += `<text x="${xPos}" y="${scaleY(0) + 15}" text-anchor="middle" font-size="12" fill="currentColor">${i}</text>`;
    }
    // Horizontal
    for (let i = 0; i <= yMax; i += 2) {
        const yPos = scaleY(i);
        gridHTML += `<line x1="${scaleX(0)}" y1="${yPos}" x2="${scaleX(xMax)}" y2="${yPos}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />`;
        if (i !== 0) gridHTML += `<text x="${scaleX(0) - 10}" y="${yPos + 4}" text-anchor="end" font-size="12" fill="currentColor">${i}</text>`;
    }

    // Axes
    const axesHTML = `
        <line x1="${scaleX(0)}" y1="${scaleY(0)}" x2="${scaleX(xMax)}" y2="${scaleY(0)}" stroke="currentColor" stroke-width="2" />
        <line x1="${scaleX(0)}" y1="${scaleY(0)}" x2="${scaleX(0)}" y2="${scaleY(yMax)}" stroke="currentColor" stroke-width="2" />
        <text x="${scaleX(xMax) - 5}" y="${scaleY(0) - 5}" text-anchor="end" font-size="12" font-weight="bold" fill="currentColor">x</text>
        <text x="${scaleX(0) + 5}" y="${scaleY(yMax) + 15}" text-anchor="start" font-size="12" font-weight="bold" fill="currentColor">y</text>
    `;

    // Line
    const lineHTML = `<line x1="${scaleX(0)}" y1="${scaleY(C)}" x2="${scaleX(xInt)}" y2="${scaleY(0)}" stroke="currentColor" stroke-width="2.5" />`;

    // Points (Intercepts)
    const pointsHTML = `
        <circle cx="${scaleX(0)}" cy="${scaleY(C)}" r="4" fill="currentColor" />
        <circle cx="${scaleX(xInt)}" cy="${scaleY(0)}" r="4" fill="currentColor" />
    `;

    const svgContent = `
    <div style="width: 100%; max-width: 400px; margin: 0 auto;">
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; display: block; color: inherit;">
        ${gridHTML}
        ${axesHTML}
        ${lineHTML}
        ${pointsHTML}
      </svg>
    </div>
    `;

    // 5. Explanation
    const explanation = `
      Choice ${correctOption.letter} is correct.
      <br/><br/>
      <strong>1. Find the Equation of the Line:</strong>
      Identify the intercepts from the graph:
      <ul>
        <li>y-intercept: $(0, ${C})$</li>
        <li>x-intercept: $(\\approx ${xInt.toFixed(1)}, 0)$. Exact: $\\frac{${B*C}}{${A}}$.</li>
      </ul>
      Calculate slope $m$:
      $$ m = \\frac{\\text{change in } y}{\\text{change in } x} = \\frac{0 - ${C}}{${formatFrac(B*C, A)} - 0} = \\frac{-${C}}{\\frac{${B*C}}{${A}}} = -${C} \\cdot \\frac{${A}}{${B*C}} = -\\frac{${A}}{${B}} $$
      Equation: $y = -\\frac{${A}}{${B}}x + ${C}$.
      <br/><br/>
      <strong>2. Find $d$ when $y = ${targetY}$:</strong>
      Substitute $y = ${targetY}$ and $x = d$:
      $$ ${targetY} = -\\frac{${A}}{${B}}d + ${C} $$
      Subtract ${C}:
      $$ ${targetY} - ${C} = -\\frac{${A}}{${B}}d $$
      $$ -${C - targetY} = -\\frac{${A}}{${B}}d $$
      Multiply by $-\\frac{${B}}{${A}}$:
      $$ d = (${C - targetY}) \\cdot \\frac{${B}}{${A}} $$
      $$ d = \\frac{${numRaw}}{${denRaw}} = ${correctAns} $$
    `;

    return {
      questionText: `The point with coordinates $(d, ${targetY})$ lies on the line shown. What is the value of $d$?`,
      figureCode: svgContent,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};