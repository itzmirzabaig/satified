import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 78
 * FIXED:
 * - Escaped every currency dollar sign (\$) in options/explanation; the old
 *   bare $ produced an odd $-count per option (TEX_UNBALANCED / DOLLAR_RISK).
 * - Replaced the Mafs figure (whose y-range [initialValue-40, initialValue+20]
 *   cropped the decay curve out of view) with a house-style SVG whose axes
 *   contain the full curve for every draw, with the y-intercept marked.
 * - Explanation now explains each distractor using post-shuffle letters.
 */

export const generator_78 = {
  metadata: {
    id: "78",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const initialValue = getRandomInt(180, 280);
    const decayRate = getRandomInt(40, 90) / 1000; // 0.04 to 0.09 per month
    const monthlyPct = Math.round(decayRate * 100); // 4 to 9

    // ── Figure: value = initialValue * e^(-decayRate * months), months 0-12 ──
    const width = 450;
    const height = 250;
    const margin = { top: 20, right: 20, bottom: 45, left: 55 };
    const graphWidth = width - margin.left - margin.right;
    const graphHeight = height - margin.top - margin.bottom;
    const xMax = 12;
    const yMax = Math.ceil((initialValue + 20) / 50) * 50; // 200, 250, or 300

    const getX = (m: number) => margin.left + (m / xMax) * graphWidth;
    const getY = (v: number) => margin.top + graphHeight - (v / yMax) * graphHeight;

    // Sample the decay curve
    const curvePoints: string[] = [];
    for (let s = 0; s <= 48; s++) {
      const t = (s * xMax) / 48;
      const v = initialValue * Math.exp(-decayRate * t);
      curvePoints.push(`${getX(t).toFixed(1)},${getY(v).toFixed(1)}`);
    }

    // Horizontal grid lines + y labels every 50 dollars
    const gridLines: string[] = [];
    for (let v = 0; v <= yMax; v += 50) {
      const y = getY(v);
      gridLines.push(`
        <line x1="${margin.left}" y1="${y.toFixed(1)}" x2="${width - margin.right}" y2="${y.toFixed(1)}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />
        <text x="${margin.left - 8}" y="${(y + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="currentColor">${v}</text>
      `);
    }

    // X tick labels every 2 months
    const xLabels: string[] = [];
    for (let m = 0; m <= xMax; m += 2) {
      xLabels.push(`<text x="${getX(m).toFixed(1)}" y="${height - margin.bottom + 16}" text-anchor="middle" font-size="11" fill="currentColor">${m}</text>`);
    }

    const svgContent = `<div style="max-width: 480px;">
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; font-family: sans-serif; user-select: none;">
        ${gridLines.join('')}
        <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2"/>
        <line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2"/>
        <polyline points="${curvePoints.join(' ')}" fill="none" stroke="#3b82f6" stroke-width="3" />
        <circle cx="${getX(0).toFixed(1)}" cy="${getY(initialValue).toFixed(1)}" r="5" fill="#3b82f6" stroke="white" stroke-width="2" />
        <text x="${(getX(0) + 10).toFixed(1)}" y="${(getY(initialValue) - 8).toFixed(1)}" font-size="11" fill="currentColor">(0, ${initialValue})</text>
        ${xLabels.join('')}
        <text x="${(margin.left + graphWidth / 2).toFixed(1)}" y="${height - 6}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Months since purchase</text>
        <text transform="rotate(-90, 14, ${height / 2})" x="14" y="${height / 2}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Value (dollars)</text>
      </svg>
    </div>`;

    const optionsData = [
      {
        text: `The estimated value of the tablet was \\$${initialValue} when it was purchased.`,
        isCorrect: true,
        reason: ''
      },
      {
        text: `The estimated value of the tablet was \\$${initialValue} 24 months after it was purchased.`,
        isCorrect: false,
        reason: 'the y-intercept corresponds to 0 months after purchase, not 24 months'
      },
      {
        text: `The estimated value of the tablet decreased by \\$${initialValue} each month after it was purchased.`,
        isCorrect: false,
        reason: 'the y-intercept gives the value at a single moment in time; it does not describe a change from month to month'
      },
      {
        text: `The estimated value of the tablet decreased by approximately ${monthlyPct}% each month after it was purchased.`,
        isCorrect: false,
        reason: 'the y-intercept does not describe the rate at which the value decreases'
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The graph shown gives the estimated value, in dollars, of a tablet as a function of the number of months since it was purchased. What is the best interpretation of the y-intercept of the graph in this context?`,
      figureCode: svgContent,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The y-intercept of a graph is the point where the graph crosses the y-axis, which occurs when the number of months since purchase is 0. The graph shows that at 0 months the estimated value of the tablet is \\$${initialValue}. Therefore, the best interpretation of the y-intercept is that the estimated value of the tablet was \\$${initialValue} when it was purchased. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
