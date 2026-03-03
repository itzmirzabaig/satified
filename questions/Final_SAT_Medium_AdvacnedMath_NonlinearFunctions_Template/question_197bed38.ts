import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 197bed38
 * 
 * FIXES:
 * - Implemented proper SVG graph showing a parabola.
 * - Adjusted math to ensure launch height is positive.
 * - Fixed options return type.
 */

export const generator_197bed38 = {
  metadata: {
    id: "197bed38",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // 1. Math Setup
    // Parabola: y = a(x-h)^2 + k
    // a = -4 (gravity-ish)
    const a = -4;
    
    // Vertex (h, k)
    // h = time of max height. Let's make it 2, 3, or 4 seconds.
    const h = getRandomInt(2, 4);
    
    // Max height k.
    // We need y(0) > 0 => a(-h)^2 + k > 0 => -4h^2 + k > 0 => k > 4h^2.
    // If h=2, 4h^2=16. k must be > 16.
    // If h=4, 4h^2=64. k must be > 64.
    const minK = 4 * h * h + 5;
    const k = getRandomInt(minK, minK + 20);
    
    // Calculate root (when it hits ground)
    // -4(x-h)^2 + k = 0 => (x-h)^2 = k/4 => x = h + sqrt(k/4)
    const xEnd = h + Math.sqrt(k / 4);
    
    // 2. SVG Configuration
    const width = 400;
    const height = 300;
    const padding = { left: 50, right: 30, top: 20, bottom: 50 };
    
    // Graph Bounds
    const xGraphMax = Math.ceil(xEnd) + 1;
    const yGraphMax = k + 10;
    
    const mapX = (x: number) => padding.left + (x / xGraphMax) * (width - padding.left - padding.right);
    const mapY = (y: number) => height - padding.bottom - (y / yGraphMax) * (height - padding.top - padding.bottom);
    
    // Generate Parabola Path
    // Plot points from x=0 to x=xEnd
    let pathD = `M ${mapX(0)} ${mapY(a * (-h) * (-h) + k)}`;
    const step = 0.1;
    for (let x = step; x <= xEnd; x += step) {
      const y = a * (x - h) * (x - h) + k;
      pathD += ` L ${mapX(x)} ${mapY(y)}`;
    }
    
    // Axes and Ticks
    const xTicks = [];
    for (let x = 0; x <= xGraphMax; x += 1) {
      xTicks.push(`
        <text x="${mapX(x)}" y="${height - padding.bottom + 20}" text-anchor="middle" font-size="12" fill="currentColor">${x}</text>
        <line x1="${mapX(x)}" y1="${height - padding.bottom}" x2="${mapX(x)}" y2="${height - padding.bottom + 5}" stroke="currentColor" />
      `);
    }
    
    const yTicks = [];
    const yStep = 10;
    for (let y = 0; y <= yGraphMax; y += yStep) {
      yTicks.push(`
        <text x="${padding.left - 10}" y="${mapY(y) + 4}" text-anchor="end" font-size="12" fill="currentColor">${y}</text>
        <line x1="${padding.left}" y1="${mapY(y)}" x2="${padding.left - 5}" y2="${mapY(y)}" stroke="currentColor" />
      `);
    }

    const svgCode = `
      <div style="width: 100%; max-width: 450px; margin: 0 auto; font-family: sans-serif;">
        <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; overflow: visible;">
          <!-- Axes -->
          <line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="currentColor" stroke-width="2" />
          <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${height - padding.bottom}" stroke="currentColor" stroke-width="2" />
          
          <!-- Ticks -->
          <g>${xTicks.join('')}</g>
          <g>${yTicks.join('')}</g>
          
          <!-- Parabola -->
          <path d="${pathD}" fill="none" stroke="#3b82f6" stroke-width="2" />
          
          <!-- Labels -->
          <text x="${width / 2}" y="${height - 10}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor">Time (seconds)</text>
          <text x="15" y="${height / 2}" text-anchor="middle" transform="rotate(-90, 15, ${height / 2})" font-size="14" font-weight="bold" fill="currentColor">Height (meters)</text>
        </svg>
      </div>
    `;
    
    // 3. Options
    const correctOptionText = `From $x=0$ to $x=${h}$`;
    
    const optionsData = [
      { text: correctOptionText, isCorrect: true },
      { text: `From $x=0$ to $x=${h + 2}$`, isCorrect: false },
      { text: `From $x=${h}$ to $x=${Math.ceil(xEnd)}$`, isCorrect: false },
      { text: `From $x=${h + 1}$ to $x=${Math.ceil(xEnd)}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    
    return {
      questionText: `An object was launched upward from a platform. The graph shown models the height above ground, $y$, in meters, of the object $x$ seconds after it was launched. For which of the following intervals of time was the height of the object increasing for the entire interval?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1.  **Analyze the Graph:**
    The graph is a parabola opening downward.
    The height increases until it reaches the vertex (the maximum height) and decreases thereafter.

2.  **Identify the Vertex:**
    The vertex occurs at $x = ${h}$. This corresponds to the peak of the curve shown in the graph.

3.  **Determine Increasing Interval:**
    The function is increasing from the launch time ($x=0$) up to the vertex ($x=${h}$).
    Therefore, the height was increasing for the entire interval from $x=0$ to $x=${h}$.`
    };
  }
};