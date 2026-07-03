import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 797
 * 
 * ANALYSIS:
 * - Skill: Systems of Linear Equations
 * - Format: Graph -> Multiple Choice
 * - Logic: Visual intersection of two lines at (x, y)
 * - Visualization: Requires a coordinate grid showing the intersection clearly.
 */

export const generator_797 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate Solution (Intersection Point)
    // Keep it within a reasonable central range so it's clearly visible
    const xSol = getRandomInt(-4, 4);
    const ySol = getRandomInt(-4, 4);
    
    // STEP 2: Generate Two Distinct Lines passing through (xSol, ySol)
    // Line 1: Positive slope (integers for clean lattice points)
    const m1 = getRandomInt(1, 3); 
    const b1 = ySol - (m1 * xSol);
    
    // Line 2: Negative slope
    const m2 = getRandomInt(-3, -1);
    const b2 = ySol - (m2 * xSol);
    
    // STEP 3: SVG Visualization Configuration
    const xMin = -10, xMax = 10;
    const yMin = -10, yMax = 10;
    const width = 400, height = 400; // Square aspect ratio for -10 to 10 grid
    
    // Coordinate mapping functions
    const mapX = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
    const mapY = (y: number) => height - ((y - yMin) / (yMax - yMin)) * height;

    // Helper to generate line endpoints extending across the graph
    const getLineSVG = (m: number, b: number) => {
        // Calculate points at the left and right edges of the visible range
        const xStart = xMin;
        const yStart = m * xStart + b;
        const xEnd = xMax;
        const yEnd = m * xEnd + b;
        return `<line x1="${mapX(xStart)}" y1="${mapY(yStart)}" x2="${mapX(xEnd)}" y2="${mapY(yEnd)}" stroke="currentColor" stroke-width="2"/>`;
    };

    // Generate Grid Lines
    let gridSVG = '';
    for (let x = xMin; x <= xMax; x++) {
        if (x === 0) continue; // Skip axis
        const opacity = x % 5 === 0 ? "0.3" : "0.1";
        gridSVG += `<line x1="${mapX(x)}" y1="0" x2="${mapX(x)}" y2="${height}" stroke="currentColor" stroke-opacity="${opacity}" stroke-width="1"/>`;
    }
    for (let y = yMin; y <= yMax; y++) {
        if (y === 0) continue; // Skip axis
        const opacity = y % 5 === 0 ? "0.3" : "0.1";
        gridSVG += `<line x1="0" y1="${mapY(y)}" x2="${width}" y2="${mapY(y)}" stroke="currentColor" stroke-opacity="${opacity}" stroke-width="1"/>`;
    }

    // Generate Labels (every 2 units to prevent overcrowding)
    let labelsSVG = '';
    for (let x = xMin; x <= xMax; x += 2) {
        if (x === 0) continue;
        labelsSVG += `<text x="${mapX(x)}" y="${mapY(0) + 15}" text-anchor="middle" font-size="10" fill="currentColor">${x}</text>`;
        labelsSVG += `<line x1="${mapX(x)}" y1="${mapY(0) - 3}" x2="${mapX(x)}" y2="${mapY(0) + 3}" stroke="currentColor" stroke-width="1"/>`;
    }
    for (let y = yMin; y <= yMax; y += 2) {
        if (y === 0) continue;
        labelsSVG += `<text x="${mapX(0) - 5}" y="${mapY(y) + 3}" text-anchor="end" font-size="10" fill="currentColor">${y}</text>`;
        labelsSVG += `<line x1="${mapX(0) - 3}" y1="${mapY(y)}" x2="${mapX(0) + 3}" y2="${mapY(y)}" stroke="currentColor" stroke-width="1"/>`;
    }

    // Construct Final SVG
    const svgContent = `
<div style="width: 100%; max-width: 400px; margin: 0 auto;">
  <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; display: block; color: inherit; font-family: sans-serif; overflow: visible;">
    <!-- Grid -->
    ${gridSVG}
    
    <!-- Axes -->
    <line x1="${mapX(0)}" y1="0" x2="${mapX(0)}" y2="${height}" stroke="currentColor" stroke-width="2"/>
    <line x1="0" y1="${mapY(0)}" x2="${width}" y2="${mapY(0)}" stroke="currentColor" stroke-width="2"/>
    
    <!-- Ticks & Labels -->
    ${labelsSVG}
    
    <!-- Equations Lines -->
    ${getLineSVG(m1, b1)}
    ${getLineSVG(m2, b2)}
    
    <!-- Intersection Point -->
    <circle cx="${mapX(xSol)}" cy="${mapY(ySol)}" r="4" fill="currentColor" />
  </svg>
</div>
`;
    
    // STEP 4: Build Options
    // Track solution pairs so distractors never collide with the correct
    // answer or each other (which would otherwise clobber the correct flag or
    // trip DUP_OPTIONS when xSol===ySol, xSol===0, or ySol===0).
    const fmt = (x: number, y: number) => `$x = ${x}, y = ${y}$`;
    const usedPairs = new Set<string>();
    const pairKey = (x: number, y: number) => `${x},${y}`;

    const optionsData: { text: string; isCorrect: boolean }[] = [];
    const addOption = (x: number, y: number, isCorrect: boolean) => {
      const key = pairKey(x, y);
      if (usedPairs.has(key)) return false;
      usedPairs.add(key);
      optionsData.push({ text: fmt(x, y), isCorrect });
      return true;
    };

    // Correct answer first so its flag is never overwritten.
    addOption(xSol, ySol, true);

    // Candidate distractors from common misconceptions; each only added if it
    // does not collide with an already-used pair.
    addOption(-xSol, ySol, false); // Wrong sign on x
    addOption(xSol, -ySol, false); // Wrong sign on y
    addOption(ySol, xSol, false);  // Swapped coordinates

    // Backfill with nearby lattice points if misconception distractors collided.
    let tries = 0;
    while (optionsData.length < 4 && tries++ < 50) {
      const fx = getRandomInt(-6, 6);
      const fy = getRandomInt(-6, 6);
      addOption(fx, fy, false);
    }

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    
    // STEP 5: Return Data
    return {
      questionText: `Which of the following corresponds to the solution of the system of equations graphed above?`,
      figureCode: svgContent,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `The solution to a system of linear equations is the point where the lines intersect. Looking at the graph, the two lines cross at the point $(${xSol}, ${ySol})$. Therefore, the solution is $x = ${xSol}$ and $y = ${ySol}$.`
    };
  }
};