import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 8d63b6f1
 * 
 * FIXED ANALYSIS:
 * - Replaced broken Mafs code with semantic SVG.
 * - Context: Scatterplot of Wolf Weight (x) vs Number of Offspring (y).
 * - Task: Identify the y-value for a specific x-value.
 * - Constraints: Discrete integer values for offspring.
 */

export const generator_8d63b6f1 = {
  metadata: {
    id: "8d63b6f1",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Define Graph Boundaries
    const xMin = 30, xMax = 90; // Weight in pounds
    const yMin = 0, yMax = 10;  // Number of offspring

    // 2. Generate Target Data
    // We need a specific point to ask about: e.g., "The 65-pound wolf"
    // To ensure legibility, we pick a weight that aligns with a "nice" number or is just distinct.
    const targetWeight = getRandomInt(45, 75);
    const targetOffspring = getRandomInt(3, 8);

    // 3. Generate Distractor Data
    // Create ~12 other points. Ensure none have the exact same weight as target to avoid ambiguity.
    const pointsData = [{ x: targetWeight, y: targetOffspring }];
    const usedWeights = new Set([targetWeight]);

    while (pointsData.length < 12) {
      const w = getRandomInt(xMin + 5, xMax - 5);
      const o = getRandomInt(1, 9);
      
      // Ensure we don't have duplicate weights (vertical line test for this specific question context)
      // and keep points somewhat spread out (optional, just looks better)
      if (!usedWeights.has(w) && Math.abs(w - targetWeight) > 1) {
        pointsData.push({ x: w, y: o });
        usedWeights.add(w);
      }
    }

    // 4. SVG Configuration
    const width = 500;
    const height = 400;
    const padding = { left: 50, right: 20, top: 20, bottom: 50 };

    // Coordinate Mappers
    const mapX = (val: number) => padding.left + ((val - xMin) / (xMax - xMin)) * (width - padding.left - padding.right);
    const mapY = (val: number) => height - padding.bottom - ((val - yMin) / (yMax - yMin)) * (height - padding.top - padding.bottom);

    // 5. Build SVG Elements

    // Grid & Ticks (X-axis: Weight)
    const xTicks = [];
    for (let x = xMin; x <= xMax; x += 10) {
      const xPos = mapX(x);
      xTicks.push(`
        <line x1="${xPos}" y1="${mapY(yMin)}" x2="${xPos}" y2="${mapY(yMax)}" stroke="currentColor" stroke-opacity="0.1" />
        <text x="${xPos}" y="${height - padding.bottom + 20}" text-anchor="middle" font-size="12" fill="currentColor">${x}</text>
      `);
    }

    // Grid & Ticks (Y-axis: Offspring)
    const yTicks = [];
    for (let y = yMin; y <= yMax; y += 1) {
      const yPos = mapY(y);
      yTicks.push(`
        <line x1="${mapX(xMin)}" y1="${yPos}" x2="${mapX(xMax)}" y2="${yPos}" stroke="currentColor" stroke-opacity="0.1" />
        <text x="${padding.left - 10}" y="${yPos + 4}" text-anchor="end" font-size="12" fill="currentColor">${y}</text>
      `);
    }

    // Scatter Points
    const pointsSvg = pointsData.map(p => 
      `<circle cx="${mapX(p.x).toFixed(1)}" cy="${mapY(p.y).toFixed(1)}" r="5" fill="#3b82f6" stroke="white" stroke-width="1" />`
    ).join('');

    // Final SVG Assembly
    const svgCode = `
      <div style="width: 100%; max-width: 500px; margin: 0 auto; font-family: sans-serif;">
        <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; overflow: visible;">
          <!-- Axes Lines -->
          <line x1="${mapX(xMin)}" y1="${mapY(yMin)}" x2="${mapX(xMax)}" y2="${mapY(yMin)}" stroke="currentColor" stroke-width="2" />
          <line x1="${mapX(xMin)}" y1="${mapY(yMin)}" x2="${mapX(xMin)}" y2="${mapY(yMax)}" stroke="currentColor" stroke-width="2" />

          <!-- Grid & Ticks -->
          <g>${xTicks.join('')}</g>
          <g>${yTicks.join('')}</g>

          <!-- Axis Labels -->
          <text x="${width / 2}" y="${height - 10}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor">Wolf Weight (pounds)</text>
          <text x="15" y="${height / 2}" text-anchor="middle" transform="rotate(-90, 15, ${height / 2})" font-size="14" font-weight="bold" fill="currentColor">Number of Offspring</text>

          <!-- Data Points -->
          ${pointsSvg}
        </svg>
      </div>
    `;

    // 6. Generate Options
    // Correct Answer: The Y value of the target point
    const correctVal = targetOffspring;

    // Distractors
    // 1. A different Y value present in the graph (if possible)
    // 2. Y value + 2
    // 3. Y value - 2
    // 4. Random small integer
    const distractor1 = correctVal + 2;
    const distractor2 = Math.max(1, correctVal - 2); 
    const distractor3 = correctVal + 1 === 10 ? 8 : correctVal + 1; // Ensure valid range

    const optionsData = [
      { text: `${correctVal}`, isCorrect: true },
      { text: `${distractor1}`, isCorrect: false },
      { text: `${distractor2}`, isCorrect: false },
      { text: `${distractor3}`, isCorrect: false }
    ];

    // Remove duplicates from options if randomness created any
    const uniqueOptions = new Map();
    optionsData.forEach(o => uniqueOptions.set(o.text, o));
    // If we have fewer than 4 due to duplicates, fill with randoms
    while (uniqueOptions.size < 4) {
      const r = getRandomInt(1, 9);
      if (!uniqueOptions.has(`${r}`)) {
        uniqueOptions.set(`${r}`, { text: `${r}`, isCorrect: false });
      }
    }
    
    const finalOptionsList = Array.from(uniqueOptions.values());

    const shuffledOptions = shuffle(finalOptionsList).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `The scatterplot shows the weight, in pounds, and the number of offspring for a sample of ${pointsData.length} wolves. According to the scatterplot, how many offspring did the ${targetWeight}-pound wolf produce?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. To determine the number of offspring for the ${targetWeight}-pound wolf:
      
1. Locate ${targetWeight} on the horizontal axis (Wolf Weight).
2. Move vertically up to find the data point corresponding to that weight.
3. Move horizontally to the left to read the value on the vertical axis (Number of Offspring).

The point corresponds to ${targetOffspring} offspring.`
    };
  }
};