import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1001
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x-values: ~1400-6100, y-values: ~76-96, slope: ~0.0017, intercept: ~78]
 * - Difficulty factors: [Reading scatterplot with scaled axes, finding highest point, calculating residual]
 * - Distractor patterns: [values near the correct residual]
 * - Constraints: [The highest data point must be strictly the greatest y-value]
 * - Question type: [Figure -> Multiple Choice Text]
 * - Figure generation: [Scatterplot with positive trend + line of best fit]
 *
 * REBUILT:
 * - Answer-first construction: residual (correct answer) is a chosen integer; the
 *   highest point's actual y = round(predicted) + residual, so actual - predicted
 *   is exactly the residual (no float artifacts).
 * - Every other data point is clamped strictly below the highest point, so the
 *   "greatest percent" charity is unambiguous for every draw.
 * - Distractors are distinct integers clustered around the residual, guaranteed
 *   never to equal the correct answer or each other.
 * - Choice letters read from the shuffled array; explanation numbers come from the
 *   same live variables.
 * - Figure rebuilt as a plain SVG template literal (house style); plotted points
 *   exactly match the generated data and the drawn line matches slope/intercept.
 */

export const generator_1001 = {
  metadata: {
    id: "1001",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Line of best fit parameters (positive trend, gentle slope).
    const slopeNum = getRandomInt(15, 20);       // slope = slopeNum / 10000  (~0.0015-0.0020)
    const slope = slopeNum / 10000;
    const intercept = getRandomInt(76, 80);

    // STEP 2: The highest (greatest-percent) charity — answer-first construction.
    const highestX = getRandomInt(3400, 3900);
    const predictedAtHighest = Math.round(slope * highestX + intercept); // integer predicted value
    const residual = getRandomInt(3, 8);                                  // correct answer (integer %)
    const highestY = predictedAtHighest + residual;                      // integer actual value

    // STEP 3: The remaining charities — scattered near the line but strictly below
    // the highest point so it is unambiguously the greatest.
    const otherXs = [1400, 1700, 2000, 2600, 3000, 4200, 4600, 5200, 6100];
    const otherPoints = otherXs.map((x) => {
      const base = slope * x + intercept;
      let y = Math.round(base + getRandomInt(-2, 2));
      if (y > highestY - 1) y = highestY - 1; // enforce strictly below the highest
      return { x, y };
    });

    const points = [...otherPoints, { x: highestX, y: highestY }].sort((a, b) => a.x - b.x);

    // STEP 4: Distractors — distinct integers clustered around the correct residual,
    // none equal to the residual or to each other, all >= 1.
    const offsets = shuffle([-2, -1, 1, 2, 3, -3, 4]);
    const distractorValues: number[] = [];
    const used = new Set<number>([residual]);
    for (const off of offsets) {
      const v = residual + off;
      if (v >= 1 && !used.has(v)) {
        used.add(v);
        distractorValues.push(v);
      }
      if (distractorValues.length === 3) break;
    }

    // STEP 5: Options (correct + 3 distractors), then shuffle and assign letters.
    const optionsData = [
      { text: `${residual}%`, isCorrect: true },
      ...distractorValues.map((v) => ({ text: `${v}%`, isCorrect: false }))
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 6: Figure — plain SVG scatterplot with the line of best fit.
    const width = 450;
    const height = 260;
    const margin = { top: 20, right: 24, bottom: 44, left: 52 };
    const graphW = width - margin.left - margin.right;
    const graphH = height - margin.top - margin.bottom;

    const xMin = 1000, xMax = 6500;
    const yMin = 70, yMax = 100;
    const mapX = (x: number) => margin.left + ((x - xMin) / (xMax - xMin)) * graphW;
    const mapY = (y: number) => margin.top + graphH - ((y - yMin) / (yMax - yMin)) * graphH;

    // Horizontal grid lines + y labels (every 5%).
    let gridY = '';
    for (let v = yMin; v <= yMax; v += 5) {
      const y = mapY(v);
      gridY += `<line x1="${mapX(xMin)}" y1="${y.toFixed(1)}" x2="${mapX(xMax)}" y2="${y.toFixed(1)}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1"/>`;
      gridY += `<text x="${(margin.left - 8)}" y="${(y + 3).toFixed(1)}" text-anchor="end" font-size="10" fill="currentColor">${v}</text>`;
    }

    // Vertical grid lines + x labels (every 1000 spent).
    let gridX = '';
    for (let v = 2000; v <= 6000; v += 1000) {
      const x = mapX(v);
      gridX += `<line x1="${x.toFixed(1)}" y1="${mapY(yMax).toFixed(1)}" x2="${x.toFixed(1)}" y2="${mapY(yMin).toFixed(1)}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1"/>`;
      gridX += `<text x="${x.toFixed(1)}" y="${(height - margin.bottom + 16)}" text-anchor="middle" font-size="10" fill="currentColor">${v}</text>`;
    }

    // Line of best fit across the plotted x-range.
    const lineX1 = xMin, lineX2 = xMax;
    const lineY1 = slope * lineX1 + intercept;
    const lineY2 = slope * lineX2 + intercept;

    // Data points (highest one emphasized).
    const circles = points.map((p) => {
      const isHighest = p.x === highestX && p.y === highestY;
      const r = isHighest ? 5.5 : 4;
      return `<circle cx="${mapX(p.x).toFixed(1)}" cy="${mapY(p.y).toFixed(1)}" r="${r}" fill="#3b82f6" stroke="white" stroke-width="1.5"/>`;
    }).join('');

    const figureCode = `<div style="width:100%;max-width:450px;margin:0 auto;">
      <svg viewBox="0 0 ${width} ${height}" style="width:100%;height:auto;display:block;font-family:sans-serif;user-select:none;" xmlns="http://www.w3.org/2000/svg">
        <rect width="${width}" height="${height}" fill="transparent"/>
        ${gridY}
        ${gridX}
        <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="1.5"/>
        <line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="1.5"/>
        <line x1="${mapX(lineX1).toFixed(1)}" y1="${mapY(lineY1).toFixed(1)}" x2="${mapX(lineX2).toFixed(1)}" y2="${mapY(lineY2).toFixed(1)}" stroke="#ef4444" stroke-width="2"/>
        ${circles}
        <text x="${(margin.left + (width - margin.right)) / 2}" y="${height - 6}" text-anchor="middle" font-size="11" fill="currentColor">Total expenses (dollars)</text>
        <text transform="rotate(-90, 14, ${height / 2})" x="14" y="${height / 2}" text-anchor="middle" font-size="11" fill="currentColor">Percent on programs</text>
      </svg>
    </div>`;

    return {
      questionText: "The scatterplot shows data for ten charities along with the line of best fit. For the charity with the greatest percent of total expenses spent on programs, which of the following is closest to the difference of the actual percent and the percent predicted by the line of best fit?",
      figureCode: figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `${residual}%`,
      explanation: `Choice ${correctLetter} is correct. The charity with the greatest percent spent on programs is the highest point, at $(${highestX}, ${highestY})$. The line of best fit predicts about $${predictedAtHighest}$ at that spending level, so the difference between the actual percent and the predicted percent is $${highestY} - ${predictedAtHighest} = ${residual}$, which is closest to $${residual}\\%$. Choice ${incorrectOptions[0].letter}, Choice ${incorrectOptions[1].letter}, and Choice ${incorrectOptions[2].letter} are incorrect because they do not match the vertical distance between the highest data point and the line of best fit.`
    };
  }
};
