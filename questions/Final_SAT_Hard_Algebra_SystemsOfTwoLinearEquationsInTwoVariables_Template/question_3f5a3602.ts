import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 3f5a3602
 * Skill: Systems Of Two Linear Equations In Two Variables
 * Difficulty: Hard
 * 
 * Description: Identify the system of equations from a graph of two intersecting lines.
 * Fixes:
 * - Fixed broken SVG plotting logic (lines were not rendering).
 * - Proper Standard Form conversion (Ax + By = C) with integer coefficients.
 */
export const generator_3f5a3602 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // ----------------------------------------------------------------------
    // 1. GENERATE LINES (Slope-Intercept -> Standard)
    // ----------------------------------------------------------------------
    // Line 1: y = (num1/den1)x + b1
    const num1 = getRandomElement([-3, -2, -1, 1, 2, 3]);
    const den1 = getRandomInt(1, 3);
    const m1 = num1 / den1;
    const b1 = getRandomInt(-3, 3);
    
    // Line 2: y = (num2/den2)x + b2 (Different slope)
    let num2 = getRandomElement([-3, -2, -1, 1, 2, 3]);
    let den2 = getRandomInt(1, 3);
    let m2 = num2 / den2;
    const b2 = getRandomInt(-3, 3);

    // Ensure distinct slopes
    while (Math.abs(m1 - m2) < 0.5) {
      num2 = getRandomElement([-4, 4]);
      den2 = 1;
      m2 = num2 / den2;
    }

    // Convert to Standard Form: Ax + By = C
    // y = (n/d)x + b  =>  -nx + dy = db  =>  nx - dy = -db (or similar)
    // We want A > 0 usually for standard form options
    const toStandard = (n: number, d: number, b: number) => {
      // y = (n/d)x + b
      // d*y = n*x + d*b
      // -n*x + d*y = d*b
      // If we want A positive:
      let A = -n;
      let B = d;
      let C = d * b;
      
      if (A < 0) {
        A *= -1;
        B *= -1;
        C *= -1;
      }
      
      return { A, B, C };
    };

    const L1 = toStandard(num1, den1, b1);
    const L2 = toStandard(num2, den2, b2);

    // Format equation string "Ax + By = C"
    const formatEq = (A: number, B: number, C: number) => {
      const B_str = B >= 0 ? `+ ${B}y` : `- ${Math.abs(B)}y`;
      return `${A}x ${B_str} = ${C}`;
    };

    const eq1_str = formatEq(L1.A, L1.B, L1.C);
    const eq2_str = formatEq(L2.A, L2.B, L2.C);

    // ----------------------------------------------------------------------
    // 2. SVG VISUALIZATION
    // ----------------------------------------------------------------------
    // Intersection point for centering/checking bounds
    const xInt = (b2 - b1) / (m1 - m2);
    const yInt = m1 * xInt + b1;

    // ViewBox bounds (ensure intersection is visible, plus some margin)
    const span = 8;
    const cx = Math.round(xInt);
    const cy = Math.round(yInt);
    const xMin = cx - span, xMax = cx + span;
    const yMin = cy - span, yMax = cy + span;

    const width = 300;
    const height = 300;
    const padding = 20;

    const mapX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
    const mapY = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

    // Generate line points
    const lineCoords = (m: number, b: number) => {
      // Calculate y at xMin and xMax
      const y_xMin = m * xMin + b;
      const y_xMax = m * xMax + b;
      return {
        x1: mapX(xMin), y1: mapY(y_xMin),
        x2: mapX(xMax), y2: mapY(y_xMax)
      };
    };

    const coords1 = lineCoords(m1, b1);
    const coords2 = lineCoords(m2, b2);

    const svgContent = `
    <div style="width: 100%; max-width: 350px; margin: 0 auto;">
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; display: block; font-family: sans-serif;">
        <!-- Axes -->
        ${xMin <= 0 && xMax >= 0 ? `<line x1="${mapX(0)}" y1="${padding}" x2="${mapX(0)}" y2="${height-padding}" stroke="currentColor" stroke-width="1.5" />` : ''}
        ${yMin <= 0 && yMax >= 0 ? `<line x1="${padding}" y1="${mapY(0)}" x2="${width-padding}" y2="${mapY(0)}" stroke="currentColor" stroke-width="1.5" />` : ''}
        
        <!-- Grid/Ticks (Simple) -->
        <text x="${mapX(xMax)-10}" y="${mapY(0)+15}" font-size="10" fill="currentColor">x</text>
        <text x="${mapX(0)+5}" y="${mapY(yMax)+10}" font-size="10" fill="currentColor">y</text>

        <!-- Lines -->
        <line x1="${coords1.x1}" y1="${coords1.y1}" x2="${coords1.x2}" y2="${coords1.y2}" stroke="currentColor" stroke-width="2" />
        <line x1="${coords2.x1}" y1="${coords2.y1}" x2="${coords2.x2}" y2="${coords2.y2}" stroke="currentColor" stroke-width="2" stroke-dasharray="5,5" />
      </svg>
    </div>
    `;

    // ----------------------------------------------------------------------
    // 3. OPTIONS
    // ----------------------------------------------------------------------
    // Correct Option
    const optCorrect = `
\\begin{cases}
${eq1_str} \\\\
${eq2_str}
\\end{cases}
    `.trim();

    // Distractor 1: Swapped slopes/intercepts logic or sign flip
    const optSignError = `
\\begin{cases}
${formatEq(L1.A, -L1.B, L1.C)} \\\\
${formatEq(L2.A, -L2.B, L2.C)}
\\end{cases}
    `.trim();

    // Distractor 2: Swapped constants (Equation with wrong intercept)
    const optWrongInt = `
\\begin{cases}
${formatEq(L1.A, L1.B, L1.C + 5)} \\\\
${formatEq(L2.A, L2.B, L2.C - 5)}
\\end{cases}
    `.trim();

    // Distractor 3: Completely wrong coefficients
    const optWrongSlope = `
\\begin{cases}
${formatEq(L2.A, L2.B, L1.C)} \\\\
${formatEq(L1.A, L1.B, L2.C)}
\\end{cases}
    `.trim();

    const optionsData = [
      { text: `$$${optCorrect}$$`, isCorrect: true },
      { text: `$$${optSignError}$$`, isCorrect: false },
      { text: `$$${optWrongInt}$$`, isCorrect: false },
      { text: `$$${optWrongSlope}$$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)?.letter;

    // ----------------------------------------------------------------------
    // 4. RETURN DATA
    // ----------------------------------------------------------------------
    return {
      questionText: `Which system of linear equations is represented by the lines shown in the graph?`,
      figureCode: svgContent,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `
        Choice ${correctLetter} is correct.
        <br/><br/>
        1. <b>Identify the features of the lines:</b>
        <br/>
        One line (solid) has a slope of roughly $${m1.toFixed(2)}$ and a y-intercept near $${b1}$.
        Equation: $y = ${m1 >= 0 ? '' : '-'}${Math.abs(num1) === 1 && den1 === 1 ? '' : Math.abs(num1) + (den1 === 1 ? '' : '/'+den1)}x ${b1 >= 0 ? '+' : '-'} ${Math.abs(b1)}$.
        Converting to standard form ($Ax + By = C$):
        $${eq1_str}$
        <br/><br/>
        The other line (dashed) has a slope of roughly $${m2.toFixed(2)}$ and a y-intercept near $${b2}$.
        Equation: $y = ${m2 >= 0 ? '' : '-'}${Math.abs(num2) === 1 && den2 === 1 ? '' : Math.abs(num2) + (den2 === 1 ? '' : '/'+den2)}x ${b2 >= 0 ? '+' : '-'} ${Math.abs(b2)}$.
        Converting to standard form:
        $${eq2_str}$
        <br/><br/>
        The system matching these equations is in choice ${correctLetter}.
      `
    };
  }
};