import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 530
 *
 * FIXED ANALYSIS:
 * - Replaced broken Mafs code with semantic SVG.
 * - Context: Scatterplot of Wolf Weight (x) vs Number of Offspring (y).
 * - Task: Identify the y-value for a specific x-value.
 * - Constraints: Discrete integer values for offspring.
 *
 * FIXED (review):
 * - The target weight was any integer 45..75 with gridlines only every 10
 *   pounds and other wolves as close as 2 pounds away, so the point asked about
 *   could not be told apart from its neighbors. The target is now a multiple of
 *   5 sitting on a gridline (gridlines every 5 pounds), and no other wolf is
 *   within 3 pounds of it.
 * - Distractors were correct +2, -2, +1 and random fillers with no reasons.
 *   They are now the offspring counts of the nearest wolf on each side and of
 *   the wolf two gridlines (10 pounds) away, each with its reason.
 * - "65-pound wolf" and the numbered list with literal newlines removed.
 */

export const generator_530 = {
  metadata: {
    id: "530",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Define Graph Boundaries
    const xMin = 30, xMax = 90; // Weight in pounds
    const yMin = 0, yMax = 10;  // Number of offspring

    // 2. Target wolf on a gridline (multiple of 5)
    const targetWeight = 5 * getRandomInt(9, 15); // 45..75
    // Three distinct offspring counts for the slip points, all different from the target's
    const ys = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const targetOffspring = ys.find(v => v >= 3 && v <= 8)!;
    const [leftY, rightY, gridY] = ys.filter(v => v !== targetOffspring).slice(0, 3);

    const leftWeight = targetWeight - getRandomInt(3, 6);
    const rightWeight = targetWeight + getRandomInt(3, 6);
    const gridSide = Math.random() < 0.5 ? -1 : 1;
    const gridWeight = targetWeight + 10 * gridSide;

    const pointsData = [
      { x: targetWeight, y: targetOffspring },
      { x: leftWeight, y: leftY },
      { x: rightWeight, y: rightY },
      { x: gridWeight, y: gridY }
    ];
    const usedWeights = new Set(pointsData.map(p => p.x));

    // 3. Other wolves: farther than 6 pounds from the target (so the left and
    // right points above stay the nearest neighbors) and not on the same
    // weight as any other wolf.
    while (pointsData.length < 12) {
      const w = getRandomInt(xMin + 4, xMax - 4);
      const o = getRandomInt(1, 9);
      if (!usedWeights.has(w) && Math.abs(w - targetWeight) > 6 && Math.abs(w - gridWeight) >= 2) {
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

    // Grid every 5 pounds, labels every 10 (X-axis: Weight)
    const xTicks = [];
    for (let x = xMin; x <= xMax; x += 5) {
      const xPos = mapX(x);
      const label = x % 10 === 0
        ? `<text x="${xPos}" y="${height - padding.bottom + 20}" text-anchor="middle" font-size="12" fill="currentColor">${x}</text>`
        : '';
      xTicks.push(`
        <line x1="${xPos}" y1="${mapY(yMin)}" x2="${xPos}" y2="${mapY(yMax)}" stroke="currentColor" stroke-opacity="${x % 10 === 0 ? 0.15 : 0.08}" />
        ${label}
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

    // 6. Options: each wrong choice is a point a student could misread as the target
    const optionsData = [
      { text: `${targetOffspring}`, isCorrect: true, reason: '' },
      { text: `${leftY}`, isCorrect: false, reason: `${leftY} is the number of offspring of the nearest wolf to the left, which weighs a few pounds less than ${targetWeight} pounds` },
      { text: `${rightY}`, isCorrect: false, reason: `${rightY} is the number of offspring of the nearest wolf to the right, which weighs a few pounds more than ${targetWeight} pounds` },
      { text: `${gridY}`, isCorrect: false, reason: `${gridY} is the number of offspring of the wolf that weighs ${gridWeight} pounds, two gridlines ${gridSide > 0 ? 'to the right of' : 'to the left of'} ${targetWeight}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The scatterplot shows the weight, in pounds, and the number of offspring for a sample of ${pointsData.length} wolves. According to the scatterplot, how many offspring did the wolf that weighs ${targetWeight} pounds produce?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Find ${targetWeight} on the horizontal axis, which is labeled Wolf Weight (pounds), and move straight up along that gridline to the data point there. Then move horizontally to the left to read the vertical axis, which is labeled Number of Offspring. The point lies at ${targetOffspring}, so the wolf that weighs ${targetWeight} pounds produced ${targetOffspring} offspring. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
