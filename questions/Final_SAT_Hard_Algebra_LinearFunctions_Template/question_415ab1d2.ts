import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 415ab1d2
 * 
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Functions
 * - Concept: Function Transformation.
 * - Problem: Given graph of y = f(x) + V.
 * - Logic: Graph shows a line with negative slope and y-intercept < V.
 *          Equation y = -cx + (V - d) corresponds to f(x) = -cx - d.
 * - Fixes: Converted to SVG, removed text labels on graph, ensured clear intercepts.
 */

export const generator_415ab1d2 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Generate Constants
    const verticalShift = getRandomInt(12, 25); // The "+ V" in y = f(x) + V
    const c = getRandomInt(1, 4);  // Slope magnitude (positive constant)
    const d = getRandomInt(3, 8);  // Intercept adjustment (positive constant)
    
    // The transformed line equation:
    // y = f(x) + verticalShift
    // Correct f(x) is -d - cx
    // So y = (-d - cx) + verticalShift
    // y = -cx + (verticalShift - d)
    
    const slope = -c;
    const yInt = verticalShift - d; // This will be strictly less than verticalShift
    const xInt = yInt / c;

    // 2. Options
    // A: f(x) = -d - cx (Correct). Slope -c, Intercept V - d.
    const optCorrect = `f(x) = -d - cx`;
    
    // B: f(x) = d - cx (Incorrect). Slope -c, Intercept V + d (would be higher than V).
    const optHighInt = `f(x) = d - cx`;
    
    // C: f(x) = -d + cx (Incorrect). Slope +c (Positive).
    const optPosSlope1 = `f(x) = -d + cx`;
    
    // D: f(x) = d + cx (Incorrect). Slope +c (Positive).
    const optPosSlope2 = `f(x) = d + cx`;

    const optionsData = [
      { text: `$${optCorrect}$`, isCorrect: true },
      { text: `$${optHighInt}$`, isCorrect: false },
      { text: `$${optPosSlope1}$`, isCorrect: false },
      { text: `$${optPosSlope2}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    // 3. Build SVG Graph
    // Define bounds
    const xMax = Math.ceil(xInt) + 2;
    const yMax = verticalShift + 2;
    
    const width = 350;
    const height = 350;
    const margin = 40;
    
    const scaleX = (x: number) => margin + (x / xMax) * (width - 2*margin);
    const scaleY = (y: number) => (height - margin) - (y / yMax) * (height - 2*margin);

    // Grid Lines
    let gridHTML = '';
    // Vertical
    for (let i = 0; i <= xMax; i++) {
        const xPos = scaleX(i);
        gridHTML += `<line x1="${xPos}" y1="${scaleY(0)}" x2="${xPos}" y2="${scaleY(yMax)}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />`;
        if (i % 2 === 0) gridHTML += `<text x="${xPos}" y="${scaleY(0) + 15}" text-anchor="middle" font-size="12" fill="currentColor">${i}</text>`;
    }
    // Horizontal
    for (let i = 0; i <= yMax; i += 2) {
        const yPos = scaleY(i);
        gridHTML += `<line x1="${scaleX(0)}" y1="${yPos}" x2="${scaleX(xMax)}" y2="${yPos}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />`;
        if (i > 0) gridHTML += `<text x="${scaleX(0) - 10}" y="${yPos + 4}" text-anchor="end" font-size="12" fill="currentColor">${i}</text>`;
    }

    // Axes
    const axesHTML = `
        <line x1="${scaleX(0)}" y1="${scaleY(0)}" x2="${scaleX(xMax)}" y2="${scaleY(0)}" stroke="currentColor" stroke-width="2" />
        <line x1="${scaleX(0)}" y1="${scaleY(0)}" x2="${scaleX(0)}" y2="${scaleY(yMax)}" stroke="currentColor" stroke-width="2" />
        <text x="${scaleX(xMax) - 5}" y="${scaleY(0) - 5}" text-anchor="end" font-size="12" font-weight="bold" fill="currentColor">x</text>
        <text x="${scaleX(0) + 5}" y="${scaleY(yMax) + 15}" text-anchor="start" font-size="12" font-weight="bold" fill="currentColor">y</text>
    `;

    // The Line
    const lineHTML = `<line x1="${scaleX(0)}" y1="${scaleY(yInt)}" x2="${scaleX(xInt)}" y2="${scaleY(0)}" stroke="currentColor" stroke-width="3" />`;

    // Points
    const pointsHTML = `
        <circle cx="${scaleX(0)}" cy="${scaleY(yInt)}" r="5" fill="currentColor" />
        <circle cx="${scaleX(xInt)}" cy="${scaleY(0)}" r="5" fill="currentColor" />
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

    // 4. Explanation
    const explanation = `
      Choice ${correctLetter} is correct.
      <br/><br/>
      The problem states that the graph shows $y = f(x) + ${verticalShift}$.
      <br/>
      1. <strong>Analyze the Slope:</strong>
      The graph shows a line sloping downwards, so the slope is negative.
      If $f(x) = -d - cx$, the slope is $-c$. Since $c$ is positive, $-c$ is negative. This matches.
      (Options C and D have positive slope $c$, so they are incorrect).
      <br/>
      2. <strong>Analyze the Y-Intercept:</strong>
      The y-intercept of the graph is clearly less than ${verticalShift} (visible as ${yInt} on the graph).
      The equation for the graph is $y = f(x) + ${verticalShift}$.
      Substitute option A ($f(x) = -d - cx$):
      $$ y = (-d - cx) + ${verticalShift} $$
      $$ y = -cx + (${verticalShift} - d) $$
      The y-intercept is ${verticalShift} - d. Since $d$ is positive, ${verticalShift} - d < ${verticalShift}. This matches the graph.
      <br/>
      (Option B would result in an intercept of ${verticalShift} + d, which would be greater than ${verticalShift}).
    `;

    return {
      questionText: `The graph of the linear function $y = f(x) + ${verticalShift}$ is shown. If $c$ and $d$ are positive constants, which equation could define $f$?`,
      figureCode: svgContent,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};