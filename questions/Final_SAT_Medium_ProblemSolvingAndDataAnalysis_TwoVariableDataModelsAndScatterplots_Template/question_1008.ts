import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1008
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x-values: 0.5-9.3, y-values: 0.9-10, line: y=x]
 * - Difficulty factors: [Counting points above line of best fit]
 * - Distractor patterns: [3, 4, 6 (correct), 7]
 * - Constraints: [Line y=x, count points where actual y > predicted y]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Scatterplot with y=x line]
 *
 * REBUILT:
 * - Root cause: the scatter points were computed but never drawn into the SVG
 *   (only axes, grid, and the y=x line were injected), so the student had no
 *   points to count. Figure rebuilt as a plain SVG template literal (house
 *   style, per question_1001) that plots every data point as a circle plus the
 *   y=x line, all on-screen.
 * - The correct answer is now a LIVE count of points strictly above y=x
 *   (aboveCount), which is exactly 6 for every draw by construction; the tiny
 *   +/-0.1 jitter never flips a point across the line.
 */

export const generator_1008 = {
  metadata: {
    id: "1008",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Six points comfortably above y=x, four on/below it.
    // Margins to the line are >= 0.3, so a +/-0.1 jitter can never flip them.
    const abovePoints = [
      { x: 0.5, y: 0.9 },
      { x: 1.2, y: 1.5 },
      { x: 2.1, y: 2.6 },
      { x: 4.3, y: 4.8 },
      { x: 6.3, y: 6.5 },
      { x: 9.3, y: 10.0 }
    ];
    const belowPoints = [
      { x: 3.1, y: 1.5 },
      { x: 4.0, y: 3.3 },
      { x: 5.1, y: 4.1 },
      { x: 7.5, y: 6.9 }
    ];

    // Small vertical jitter on three well-separated "above" points for variety.
    const allPoints = [
      { x: 0.5, y: Math.round((abovePoints[0].y + getRandomInt(-1, 1) * 0.1) * 10) / 10 },
      { x: 1.2, y: Math.round((abovePoints[1].y + getRandomInt(-1, 1) * 0.1) * 10) / 10 },
      { x: 2.1, y: Math.round((abovePoints[2].y + getRandomInt(-1, 1) * 0.1) * 10) / 10 },
      { x: 3.1, y: belowPoints[0].y },
      { x: 4.0, y: belowPoints[1].y },
      { x: 4.3, y: abovePoints[3].y },
      { x: 5.1, y: belowPoints[2].y },
      { x: 6.3, y: abovePoints[4].y },
      { x: 7.5, y: belowPoints[3].y },
      { x: 9.3, y: abovePoints[5].y }
    ];

    // STEP 2: Live count of points strictly above the line y=x (the answer).
    const aboveCount = allPoints.filter(p => p.y > p.x).length; // = 6 for every draw

    // STEP 3: Figure — plain SVG scatterplot with the y=x line (house style).
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 44 };
    const graphW = width - margin.left - margin.right;
    const graphH = height - margin.top - margin.bottom;

    const xMin = 0, xMax = 10;
    const yMin = 0, yMax = 11;
    const mapX = (x: number) => margin.left + ((x - xMin) / (xMax - xMin)) * graphW;
    const mapY = (y: number) => margin.top + graphH - ((y - yMin) / (yMax - yMin)) * graphH;

    // Vertical grid lines + x labels (every 1 unit).
    let gridX = '';
    for (let v = 1; v <= 10; v += 1) {
      const x = mapX(v);
      gridX += `<line x1="${x.toFixed(1)}" y1="${mapY(yMax).toFixed(1)}" x2="${x.toFixed(1)}" y2="${mapY(yMin).toFixed(1)}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1"/>`;
      gridX += `<text x="${x.toFixed(1)}" y="${(height - margin.bottom + 15)}" text-anchor="middle" font-size="9" fill="currentColor">${v}</text>`;
    }

    // Horizontal grid lines + y labels (every 1 unit).
    let gridY = '';
    for (let v = 1; v <= 10; v += 1) {
      const y = mapY(v);
      gridY += `<line x1="${mapX(xMin).toFixed(1)}" y1="${y.toFixed(1)}" x2="${mapX(xMax).toFixed(1)}" y2="${y.toFixed(1)}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1"/>`;
      gridY += `<text x="${(margin.left - 8)}" y="${(y + 3).toFixed(1)}" text-anchor="end" font-size="9" fill="currentColor">${v}</text>`;
    }

    // The line of best fit y = x, across the plotted range.
    const lineY1 = mapY(xMin); // at x=0, y=0
    const lineY2 = mapY(xMax); // at x=10, y=10

    // Data points.
    const circles = allPoints.map((p) =>
      `<circle cx="${mapX(p.x).toFixed(1)}" cy="${mapY(p.y).toFixed(1)}" r="4" fill="#3b82f6" stroke="white" stroke-width="1.5"/>`
    ).join('');

    const figureCode = `<div style="width:100%;max-width:450px;margin:0 auto;">
      <svg viewBox="0 0 ${width} ${height}" style="width:100%;height:auto;display:block;font-family:sans-serif;user-select:none;" xmlns="http://www.w3.org/2000/svg">
        <rect width="${width}" height="${height}" fill="transparent"/>
        ${gridX}
        ${gridY}
        <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="1.5"/>
        <line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="1.5"/>
        <line x1="${mapX(xMin).toFixed(1)}" y1="${lineY1.toFixed(1)}" x2="${mapX(xMax).toFixed(1)}" y2="${lineY2.toFixed(1)}" stroke="#ef4444" stroke-width="2"/>
        ${circles}
        <text x="${(margin.left + (width - margin.right)) / 2}" y="${height - 6}" text-anchor="middle" font-size="10" fill="currentColor">x</text>
        <text transform="rotate(-90, 12, ${height / 2})" x="12" y="${height / 2}" text-anchor="middle" font-size="10" fill="currentColor">y</text>
      </svg>
    </div>`;

    // STEP 4: Options — correct count plus three distinct nearby distractors.
    const distractorPool = [aboveCount - 3, aboveCount - 2, aboveCount + 1, aboveCount + 2];
    const distractors: number[] = [];
    for (const v of distractorPool) {
      if (v >= 0 && v <= 10 && v !== aboveCount && !distractors.includes(v)) distractors.push(v);
      if (distractors.length === 3) break;
    }

    const optionsData = [
      { text: `${aboveCount}`, isCorrect: true },
      ...distractors.map(v => ({ text: `${v}`, isCorrect: false }))
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: "For how many of the 10 data points is the actual $y$-value greater than the $y$-value predicted by the line of best fit?",
      figureCode: figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `${aboveCount}`,
      explanation: `Choice ${correctLetter} is correct. The actual $y$-value is greater than the predicted value for every point that lies above the line $y=x$. Counting the data points that sit above the line gives $${aboveCount}$ points. Choice ${incorrectOptions[0].letter}, Choice ${incorrectOptions[1].letter}, and Choice ${incorrectOptions[2].letter} are incorrect because they miscount the number of points lying above the line of best fit.`
    };
  }
};
