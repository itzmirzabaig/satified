import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 295a41f0
 * 
 * FIXES:
 * - Replaced broken SVG code with a proper line graph showing y = f(x) - 11.
 * - Logic: Graph is y = transSlope * x + transIntercept.
 *   f(x) = y + 11 = transSlope * x + (transIntercept + 11).
 */
export const generator_295a41f0 = {
  metadata: {
    id: "295a41f0",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // 1. Math Setup
    // Transformed Graph: y = mx + b (where y = f(x) - 11)
    const m = -getRandomInt(1, 4); // Slope (e.g. -2)
    const b = -getRandomInt(2, 6); // y-intercept of the graph (e.g. -4)
    
    // Points on the graph
    const x1 = -1;
    const y1 = m * x1 + b;
    const x2 = 0;
    const y2 = b;
    
    // Function f(x)
    // f(x) - 11 = mx + b
    // f(x) = mx + (b + 11)
    const fIntercept = b + 11;
    
    // 2. SVG Configuration
    const width = 400;
    const height = 300;
    const padding = { left: 60, right: 30, top: 20, bottom: 50 };
    
    // Graph bounds
    const xMin = -4, xMax = 4;
    const yMin = Math.min(y1, y2) - 4, yMax = Math.max(y1, y2) + 2;
    
    const mapX = (x: number) => padding.left + ((x - xMin) / (xMax - xMin)) * (width - padding.left - padding.right);
    const mapY = (y: number) => height - padding.bottom - ((y - yMin) / (yMax - yMin)) * (height - padding.top - padding.bottom);
    
    // Line
    const lineX1 = xMin;
    const lineY1 = m * xMin + b;
    const lineX2 = xMax;
    const lineY2 = m * xMax + b;
    
    const lineSvg = `
      <line x1="${mapX(lineX1)}" y1="${mapY(lineY1)}" 
            x2="${mapX(lineX2)}" y2="${mapY(lineY2)}" 
            stroke="#3b82f6" stroke-width="2" />
    `;
    
    // Points
    const pointsSvg = `
      <circle cx="${mapX(x1)}" cy="${mapY(y1)}" r="4" fill="#ef4444" stroke="white" stroke-width="1.5" />
      <text x="${mapX(x1) - 10}" y="${mapY(y1) - 10}" font-size="12" fill="currentColor">(${x1}, ${y1})</text>
      
      <circle cx="${mapX(x2)}" cy="${mapY(y2)}" r="4" fill="#ef4444" stroke="white" stroke-width="1.5" />
      <text x="${mapX(x2) + 10}" y="${mapY(y2) - 10}" font-size="12" fill="currentColor">(${x2}, ${y2})</text>
    `;
    
    // Axes
    const xAxisY = mapY(0);
    const yAxisX = mapX(0);
    
    // 3. Options
    const correctEq = `f(x) = ${m}x + ${fIntercept}`;
    const d1 = `f(x) = ${m}x + ${b}`; // Forgot +11
    const d2 = `f(x) = ${m - 11}x + ${fIntercept}`; // Nonsense slope
    const d3 = `f(x) = ${m}x - ${11}`; // Just -11

    const optionsData = [
      { text: correctEq, isCorrect: true },
      { text: d1, isCorrect: false },
      { text: d2, isCorrect: false },
      { text: d3, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const svgCode = `
      <div style="width: 100%; max-width: 450px; margin: 0 auto; font-family: sans-serif;">
        <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; overflow: visible;">
          <!-- Axes -->
          <line x1="${padding.left}" y1="${xAxisY}" x2="${width - padding.right}" y2="${xAxisY}" stroke="currentColor" stroke-width="1.5" />
          <line x1="${yAxisX}" y1="${height - padding.bottom}" x2="${yAxisX}" y2="${padding.top}" stroke="currentColor" stroke-width="1.5" />
          
          <!-- Graph -->
          ${lineSvg}
          ${pointsSvg}
          
          <!-- Labels -->
          <text x="${width - 10}" y="${xAxisY - 5}" text-anchor="end" font-size="12" fill="currentColor">x</text>
          <text x="${yAxisX + 5}" y="${padding.top + 10}" text-anchor="start" font-size="12" fill="currentColor">y</text>
        </svg>
      </div>
    `;

    return {
      questionText: `The graph of $y = f(x) - 11$ is shown in the $xy$-plane. Which equation defines the linear function $f$?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1.  **Find Equation of Graph:**
    The graph shows a line passing through $(${x1}, ${y1})$ and $(${x2}, ${y2})$.
    Slope $m = \\frac{${y2} - (${y1})}{${x2} - (${x1})} = ${m}$.
    Y-intercept is $${y2}$ (at $x=0$).
    So the equation of the graph is $y = ${m}x ${b < 0 ? '-' : '+'} ${Math.abs(b)}$.

2.  **Relate to f(x):**
    We are given $y = f(x) - 11$.
    Substituting the graph's equation:
    $${m}x ${b < 0 ? '-' : '+'} ${Math.abs(b)} = f(x) - 11$
    $f(x) = ${m}x ${b < 0 ? '-' : '+'} ${Math.abs(b)} + 11$
    $f(x) = ${m}x + (${b} + 11)$
    $f(x) = ${m}x + ${fIntercept}$.`
    };
  }
};

/**
 * Question ID: 1f0966db
 * 
 * ANALYSIS:
 * - Context: Linear Equation Solving.
 * - Function: f(x) = mx + b.
 * - Task: Given f(x) = k, find x.
 * - Logic: k = mx + b => x = (k - b) / m.
 */
export const generator_1f0966db = {
  metadata: {
    id: "1f0966db",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    const mNum = getRandomInt(2, 9);
    const mDen = getRandomInt(2, 9);
    const bNum = getRandomInt(1, 15);
    const bDen = mDen; // Keep denominators same for simplicity
    
    // f(x) = (mNum/mDen)x + (bNum/bDen)
    // Solve f(x) = k
    // Let's choose k such that x is an integer.
    // k = (mNum/mDen)x + (bNum/mDen)
    // k * mDen = mNum * x + bNum
    // x = (k * mDen - bNum) / mNum
    
    // Pick integer x
    const xSol = getRandomInt(1, 10);
    const kNum = mNum * xSol + bNum;
    const kVal = kNum / mDen; 
    
    // We display kVal. If integer, great. If fraction, display fraction?
    // Usually "f(x) = 5".
    // Let's ensure kVal is integer.
    // This requires (mNum * x + bNum) is divisible by mDen.
    
    // Retry logic if not integer (or just construct it backwards)
    // Let k be integer.
    // k * mDen - bNum must be divisible by mNum.
    // This is getting complex. Let's just pick integer coefficients.
    
    // Simpler: f(x) = m*x + b.
    // But analysis says fractions "9/7 x + 8/7".
    // Let's stick to the fraction form but ensure x is integer.
    
    // f(x) = \frac{A}{B}x + \frac{C}{B}
    // f(x) = Target
    // A/B x + C/B = Target
    // Ax + C = Target * B
    // Ax = Target * B - C
    // x = (Target * B - C) / A
    
    const A = getRandomInt(2, 9);
    const B = getRandomInt(2, 9);
    const C = getRandomInt(1, 15);
    const xTarget = getRandomInt(1, 8);
    
    const numerator = A * xTarget + C;
    // We need numerator / B = Target (integer).
    // So Target * B = A * x + C.
    // This means Target = (A*x + C)/B.
    // We need (Ax+C) to be divisible by B.
    
    // Let's force it:
    // Calculate raw value, if not integer, adjust C.
    // We want (A*x + C) % B === 0.
    const remainder = (A * xTarget + C) % B;
    const C_adjusted = C + (B - remainder) % B; // Add difference to make it divisible
    const targetVal = (A * xTarget + C_adjusted) / B;
    
    return {
      questionText: `The function $f$ is defined by $f(x) = \\frac{${A}}{${B}}x + \\frac{${C_adjusted}}{${B}}$. For what value of $x$ is $f(x) = ${targetVal}$?`,
      figureCode: null,
      options: null, // Fill in blank
      correctAnswer: xTarget.toString(),
      explanation: `Set $f(x) = ${targetVal}$:
      
$\\frac{${A}}{${B}}x + \\frac{${C_adjusted}}{${B}} = ${targetVal}$

Multiply the entire equation by ${B} to clear the denominators:
$${A}x + ${C_adjusted} = ${targetVal * B}$

Subtract ${C_adjusted} from both sides:
$${A}x = ${targetVal * B} - ${C_adjusted}$
$${A}x = ${A * xTarget}$

Divide by ${A}:
$x = ${xTarget}$`
    };
  }
};