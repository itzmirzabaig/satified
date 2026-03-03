import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 9ff88bb5
 * 
 * FIXES:
 * - Implemented proper SVG graph showing a diver's parabolic trajectory.
 * - Logic: Parabola starts at positive height, goes up slightly to vertex, then down to x-intercept.
 * - Vertex (h, k) and x-intercept (xInt, 0).
 */

export const generator_9ff88bb5 = {
  metadata: {
    id: "9ff88bb5",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // 1. Math Setup
    // Vertex (h, k)
    // h is small positive (time to reach max height), e.g., 0.3s
    const h = getRandomInt(2, 5) / 10; 
    // Max height k, e.g., 10m
    const k = getRandomInt(8, 12);
    
    // X-intercept (time to hit water)
    // Must be greater than h. e.g., 1.5s
    const xInt = getRandomInt(14, 25) / 10;
    
    // Determine 'a' for y = a(x-h)^2 + k
    // 0 = a(xInt - h)^2 + k  =>  a = -k / (xInt - h)^2
    const a = -k / Math.pow(xInt - h, 2);
    
    // 2. SVG Configuration
    const width = 400;
    const height = 300;
    const padding = { left: 50, right: 30, top: 20, bottom: 50 };
    
    // Graph Bounds
    const xGraphMax = Math.ceil(xInt) + 0.5;
    const yGraphMax = k + 2;
    
    const mapX = (x: number) => padding.left + (x / xGraphMax) * (width - padding.left - padding.right);
    const mapY = (y: number) => height - padding.bottom - (y / yGraphMax) * (height - padding.top - padding.bottom);
    
    // Generate Parabola Path
    let pathD = `M ${mapX(0)} ${mapY(a * (-h) * (-h) + k)}`;
    const step = 0.05;
    for (let x = step; x <= xInt; x += step) {
      const y = Math.max(0, a * (x - h) * (x - h) + k);
      pathD += ` L ${mapX(x)} ${mapY(y)}`;
    }
    
    // Axes and Ticks
    const xTicks = [];
    for (let x = 0; x <= xGraphMax; x += 0.5) {
      xTicks.push(`
        <text x="${mapX(x)}" y="${height - padding.bottom + 20}" text-anchor="middle" font-size="12" fill="currentColor">${x}</text>
        <line x1="${mapX(x)}" y1="${height - padding.bottom}" x2="${mapX(x)}" y2="${height - padding.bottom + 5}" stroke="currentColor" />
      `);
    }
    
    const yTicks = [];
    for (let y = 0; y <= yGraphMax; y += 2) {
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
          
          <!-- Vertex Point -->
          <circle cx="${mapX(h)}" cy="${mapY(k)}" r="3" fill="#3b82f6" />
          
          <!-- X-Intercept Point -->
          <circle cx="${mapX(xInt)}" cy="${mapY(0)}" r="3" fill="#3b82f6" />
          
          <!-- Labels -->
          <text x="${width / 2}" y="${height - 10}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor">Time (seconds)</text>
          <text x="15" y="${height / 2}" text-anchor="middle" transform="rotate(-90, 15, ${height / 2})" font-size="14" font-weight="bold" fill="currentColor">Height (meters)</text>
        </svg>
      </div>
    `;
    
    // 3. Options
    // Correct: "The diver hits the water at xInt seconds."
    // Wrong: Max height at xInt, Hits water at h, Max height at h (true but not x-intercept interpretation)
    
    const optionsData = [
      { text: `The diver hits the water at ${xInt} seconds.`, isCorrect: true },
      { text: `The diver reaches a maximum height above the water at ${xInt} seconds.`, isCorrect: false },
      { text: `The diver hits the water at ${h} seconds.`, isCorrect: false },
      { text: `The diver reaches a maximum height of ${xInt} meters.`, isCorrect: false } 
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `A competitive diver dives from a platform. The graph shown gives the height above the water, in meters, of the diver $x$ seconds after diving from the platform. What is the best interpretation of the x-intercept of the graph?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1.  **Identify the X-Intercept:**
    The x-intercept is the point where the graph crosses the x-axis, meaning the height ($y$) is 0.
    In this context, $y=0$ means the diver is at water level.

2.  **Read the Graph:**
    The graph intersects the x-axis at $x = ${xInt}$.
    
3.  **Interpret:**
    This means the diver hits the water at ${xInt} seconds.`
    };
  }
};

/**
 * Question ID: 281a4f3b
 * 
 * ANALYSIS:
 * - Context: Exponential Decay.
 * - Equation: f(x) = Initial * (1 - rate)^x.
 * - Given: Initial value, rate %.
 * - Find: Correct equation.
 */
export const generator_281a4f3b = {
  metadata: {
    id: "281a4f3b",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    const initial = getRandomInt(1000, 5000); // e.g. 3000
    const percent = getRandomInt(2, 15); // e.g. 2%
    
    // Decay factor = 1 - p/100
    const factor = (1 - percent / 100).toFixed(2);
    
    // 2. Options
    const correctEq = `f(x) = ${initial}(${factor})^x`;
    
    // Distractor 1: Growth instead of decay
    const growthFactor = (1 + percent / 100).toFixed(2);
    const d1 = `f(x) = ${initial}(${growthFactor})^x`;
    
    // Distractor 2: Rate as base (extreme decay)
    const rateBase = (percent / 100).toFixed(2);
    const d2 = `f(x) = ${initial}(${rateBase})^x`;
    
    // Distractor 3: Subtracting percent linearly (not exponential base) or just weird algebra
    const d3 = `f(x) = ${initial}(1 - ${percent}x)`;

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

    return {
      questionText: `A population of ${initial} organisms decreases by ${percent}% each year. Which function $f$ models the population of the organisms $x$ years after the population starts decreasing?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1.  **Identify Model Type:**
    The population decreases by a fixed percentage each year, which indicates an exponential decay model: $f(x) = a(b)^x$.
    
2.  **Determine Constants:**
    - Initial amount ($a$) = ${initial}.
    - Decay rate = ${percent}%, so the decay factor ($b$) = $1 - \\frac{${percent}}{100} = ${factor}$.

3.  **Construct Equation:**
    Substituting these values gives $f(x) = ${initial}(${factor})^x$.`
    };
  }
};