import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1181
 * 
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Equations In Two Variables
 * - Format: Standard Form Ax + By = C.
 * - Logic: Match a graph (given by intercepts) to its standard form equation.
 * - Fixes: Enforced integer arithmetic for A, B, C. Converted graph to SVG. 
 *          Removed floating point math that caused "long decimals".
 */

export const generator_1181 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Generate Coefficients for Ax + By = C
    // To ensure nice integer intercepts, C must be a multiple of A and B.
    // A and B MUST differ: the "swapped coefficients" distractor (Bx + Ay = C)
    // becomes identical to the correct equation when A === B, so resample B
    // (bounded) until it differs from A.
    const A = getRandomInt(2, 6);
    let B = getRandomInt(2, 6);
    let tries = 0;
    while (B === A && tries++ < 50) B = getRandomInt(2, 6);
    if (B === A) B = A === 6 ? 2 : A + 1; // deterministic fallback, still in [2,6]
    const factor = getRandomInt(2, 4);
    const C = A * B * factor; // e.g. if A=3, B=4, factor=2 -> C=24.

    // Intercepts
    const xInt = C / A; // 24/3 = 8
    const yInt = C / B; // 24/4 = 6

    // 2. Options
    // Correct Equation
    const correctEq = `${A}x + ${B}y = ${C}`;
    
    // Distractor 1: Sign Error (Ax - By = C)
    const dist1 = `${A}x - ${B}y = ${C}`;
    
    // Distractor 2: Swapped Coefficients (Bx + Ay = C) - common mistake
    const dist2 = `${B}x + ${A}y = ${C}`;
    
    // Distractor 3: Wrong Constant or Slope Sign
    const dist3 = `${A}x + ${B}y = ${C * 2}`; 

    const optionsData = [
      { text: `$${correctEq}$`, isCorrect: true },
      { text: `$${dist1}$`, isCorrect: false },
      { text: `$${dist2}$`, isCorrect: false },
      { text: `$${dist3}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    // Letters for each distractor (only known after the shuffle).
    const letterOf = (t: string) => shuffledOptions.find(o => o.text === t)!.letter;
    const letter1 = letterOf(`$${dist1}$`);
    const letter2 = letterOf(`$${dist2}$`);
    const letter3 = letterOf(`$${dist3}$`);

    // 3. Build SVG Graph
    // Define bounds
    const xMax = xInt + 2;
    const yMax = yInt + 2;
    
    // SVG Dimensions
    const width = 300;
    const height = 300;
    const margin = 40;
    
    const scaleX = (x: number) => margin + (x / xMax) * (width - 2*margin);
    const scaleY = (y: number) => (height - margin) - (y / yMax) * (height - 2*margin);

    // Grid Lines
    let gridHTML = '';
    // Vertical lines
    for(let i = 0; i <= xMax; i++) {
        const xPos = scaleX(i);
        const yTop = scaleY(yMax);
        const yBot = scaleY(0);
        gridHTML += `<line x1="${xPos}" y1="${yTop}" x2="${xPos}" y2="${yBot}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />`;
        if (i % 2 === 0) { // Label every 2 units
            gridHTML += `<text x="${xPos}" y="${yBot + 15}" text-anchor="middle" font-size="12" fill="currentColor">${i}</text>`;
        }
    }
    // Horizontal lines
    for(let i = 0; i <= yMax; i++) {
        const yPos = scaleY(i);
        const xLeft = scaleX(0);
        const xRight = scaleX(xMax);
        gridHTML += `<line x1="${xLeft}" y1="${yPos}" x2="${xRight}" y2="${yPos}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />`;
        if (i % 2 === 0) { // Label every 2 units
            gridHTML += `<text x="${xLeft - 10}" y="${yPos + 4}" text-anchor="end" font-size="12" fill="currentColor">${i}</text>`;
        }
    }

    // Axes (Thicker)
    const axesHTML = `
        <line x1="${scaleX(0)}" y1="${scaleY(0)}" x2="${scaleX(xMax)}" y2="${scaleY(0)}" stroke="currentColor" stroke-width="2" />
        <line x1="${scaleX(0)}" y1="${scaleY(0)}" x2="${scaleX(0)}" y2="${scaleY(yMax)}" stroke="currentColor" stroke-width="2" />
    `;

    // The Line
    // We extend it slightly past the intercepts for visual style
    // Line eq: y = -(A/B)x + yInt
    // Start x = 0, End x = xInt
    const lineX1 = 0;
    const lineY1 = yInt;
    const lineX2 = xInt;
    const lineY2 = 0;
    
    const graphLine = `<line x1="${scaleX(lineX1)}" y1="${scaleY(lineY1)}" x2="${scaleX(lineX2)}" y2="${scaleY(lineY2)}" stroke="currentColor" stroke-width="3" />`;

    // Points at intercepts
    // FIXED (review): the axes had no x and y letters, and an odd intercept
    // such as 9 or 15 fell between the labels (every 2 units on a grid up to 26
    // wide), so it could not be read exactly. The axes are now lettered and
    // each intercept point carries its coordinates. The viewBox is 40 units
    // wider so the x-intercept label is not clipped.
    const pointsHTML = `
        <circle cx="${scaleX(0)}" cy="${scaleY(yInt)}" r="5" fill="currentColor" />
        <circle cx="${scaleX(xInt)}" cy="${scaleY(0)}" r="5" fill="currentColor" />
        <text x="${scaleX(0) + 9}" y="${scaleY(yInt) - 7}" font-size="12" fill="currentColor">(0, ${yInt})</text>
        <text x="${scaleX(xInt) + 6}" y="${scaleY(0) - 9}" font-size="12" fill="currentColor">(${xInt}, 0)</text>
        <text x="${scaleX(xMax) + 8}" y="${scaleY(0) + 4}" font-size="13" font-style="italic" fill="currentColor">x</text>
        <text x="${scaleX(0)}" y="${scaleY(yMax) - 8}" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">y</text>
    `;

    const svgContent = `
    <div style="width: 100%; max-width: 400px; margin: 0 auto;">
      <svg viewBox="0 0 ${width + 40} ${height}" style="width: 100%; height: auto; display: block; color: inherit;">
        ${gridHTML}
        ${axesHTML}
        ${graphLine}
        ${pointsHTML}
      </svg>
    </div>
    `;

    // 4. Explanation
    // FIXED (review): the explanation used line breaks and display math with
    // "Choice X (...) flips" sentences instead of the standard "Choice X is
    // incorrect because" format.
    const reasons: Record<string, string> = {
      [letter1]: `$${dist1}$ has the wrong sign on the $y$ term; substituting the $y$-intercept $(0, ${yInt})$ gives $${A}(0) - ${B}(${yInt}) = ${-(B * yInt)}$, not $${C}$`,
      [letter2]: `$${dist2}$ swaps the coefficients of $x$ and $y$; substituting the $x$-intercept $(${xInt}, 0)$ gives $${B}(${xInt}) + ${A}(0) = ${B * xInt}$, not $${C}$`,
      [letter3]: `$${dist3}$ doubles the constant; substituting $(0, ${yInt})$ gives $${A}(0) + ${B}(${yInt}) = ${C}$, not $${C * 2}$`
    };
    const explanation = `Choice ${correctOption.letter} is correct. The graph shows a line through the $y$-intercept $(0, ${yInt})$ and the $x$-intercept $(${xInt}, 0)$, so the equation of the line must be true for both points. Substituting $(0, ${yInt})$ into $${correctEq}$ gives $${A}(0) + ${B}(${yInt}) = ${C}$, which is true. Substituting $(${xInt}, 0)$ gives $${A}(${xInt}) + ${B}(0) = ${C}$, which is also true. Both points satisfy $${correctEq}$, so it represents the line. ${[letter1, letter2, letter3].sort().map(l => `Choice ${l} is incorrect because ${reasons[l]}.`).join(' ')}`;
    
    return {
      questionText: `The graph shows a linear relationship between $x$ and $y$. Which equation represents this line?`,
      figureCode: svgContent,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};