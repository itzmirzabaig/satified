import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 577
 *
 * Read the y-intercept of a graphed nonlinear (quadratic) model.
 * The graph models the number of active projects x months after the end of
 * November 2012; the answer is the model's value at x = 0 (the y-intercept).
 *
 * FIXED:
 * - Answer-first integer construction: model is y = (x - h)^2 + k with
 *   integer h, k, so the y-intercept h^2 + k is always an integer
 *   (the old a = 0.2 model produced float artifacts like 5.800000000000001).
 * - Distractors are now structurally distinct for every draw: 0, k (vertex
 *   minimum), and the value at x = 6. h = 3 is excluded so the x = 6 value
 *   can never equal the y-intercept; the old floor(k + yIntercept) /
 *   floor(yIntercept + 4) pair collided whenever k = 4.
 * - correctAnswer now exactly equals the option string (was CORRECT_FUZZY).
 * - Figure rebuilt to house style: full parabola drawn from the SAME model,
 *   labeled y-intercept and vertex, no nested IIFEs.
 * - Removed "$0 \leq x \leq 6$" phrasing that tripped the currency/math-$
 *   heuristic; ranges are stated in prose.
 */

export const generator_577 = {
  metadata: {
    id: "577",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Model: y = (x - h)^2 + k for 0 <= x <= 6, vertex (h, k).
    // h = 3 is deliberately excluded so modelValue(6) !== modelValue(0).
    const h = getRandomElement([2, 4, 5]);
    const k = getRandomInt(2, 5);
    const modelValue = (x: number): number => (x - h) * (x - h) + k;
    const yIntercept = modelValue(0); // h^2 + k — always an integer, answer
    const endValue = modelValue(6);   // (6 - h)^2 + k — never equals yIntercept (h !== 3)

    // ── Figure: house-style plain SVG of the parabola on 0 <= x <= 6 ──
    const width = 450;
    const height = 250;
    const margin = { top: 18, right: 20, bottom: 45, left: 45 };
    const plotW = width - margin.left - margin.right;
    const plotH = height - margin.top - margin.bottom;
    const xMax = 6;
    const yTop = Math.max(yIntercept, endValue) + 2;
    const gx = (x: number): number => margin.left + (x / xMax) * plotW;
    const gy = (y: number): number => margin.top + plotH - (y / yTop) * plotH;

    const yStep = Math.ceil(yTop / 6);
    const gridLines: string[] = [];
    for (let y = 0; y <= yTop; y += yStep) {
      gridLines.push(`
        <line x1="${margin.left}" y1="${gy(y).toFixed(1)}" x2="${width - margin.right}" y2="${gy(y).toFixed(1)}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />
        <text x="${margin.left - 8}" y="${(gy(y) + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="currentColor">${y}</text>
      `);
    }

    const xTicks: string[] = [];
    for (let x = 0; x <= xMax; x++) {
      xTicks.push(`
        <line x1="${gx(x).toFixed(1)}" y1="${height - margin.bottom}" x2="${gx(x).toFixed(1)}" y2="${height - margin.bottom + 4}" stroke="currentColor" stroke-width="1" />
        <text x="${gx(x).toFixed(1)}" y="${height - margin.bottom + 16}" text-anchor="middle" font-size="11" fill="currentColor">${x}</text>
      `);
    }

    const curvePoints: string[] = [];
    for (let i = 0; i <= 24; i++) {
      const xv = i / 4;
      curvePoints.push(`${gx(xv).toFixed(1)},${gy(modelValue(xv)).toFixed(1)}`);
    }

    const figureCode = `<div style="width:100%;max-width:450px;margin:0 auto;">
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; font-family: sans-serif; user-select: none;" xmlns="http://www.w3.org/2000/svg">
        ${gridLines.join('')}
        <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="1.5"/>
        <line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="1.5"/>
        <polyline points="${curvePoints.join(' ')}" fill="none" stroke="#3b82f6" stroke-width="2.5" />
        <circle cx="${gx(0).toFixed(1)}" cy="${gy(yIntercept).toFixed(1)}" r="4" fill="#3b82f6" stroke="white" stroke-width="1.5" />
        <text x="${(gx(0) + 8).toFixed(1)}" y="${(gy(yIntercept) + 4).toFixed(1)}" text-anchor="start" font-size="11" fill="currentColor">(0, ${yIntercept})</text>
        <circle cx="${gx(h).toFixed(1)}" cy="${gy(k).toFixed(1)}" r="4" fill="#3b82f6" stroke="white" stroke-width="1.5" />
        <text x="${gx(h).toFixed(1)}" y="${(gy(k) + 16).toFixed(1)}" text-anchor="middle" font-size="11" fill="currentColor">(${h}, ${k})</text>
        ${xTicks.join('')}
        <text x="${(margin.left + plotW / 2).toFixed(1)}" y="${height - 6}" text-anchor="middle" font-size="11" fill="currentColor">Months after end of November 2012</text>
        <text transform="rotate(-90, 12, ${height / 2})" x="12" y="${height / 2}" text-anchor="middle" font-size="11" fill="currentColor">Active projects</text>
      </svg>
    </div>`;

    const questionText = `The graph shown models the number of active projects a company was working on $x$ months after the end of November 2012, for values of $x$ from 0 to 6. According to the model, what is the predicted number of active projects the company was working on at the end of November 2012?`;

    const optionsData = [
      { text: `0`, isCorrect: false, reason: `this is the value of $x$ that represents the end of November 2012, not the predicted number of active projects` },
      { text: `${k}`, isCorrect: false, reason: `this is the minimum value of the model, shown at the labeled vertex $(${h}, ${k})$, not the value of the model at $x = 0$` },
      { text: `${endValue}`, isCorrect: false, reason: `this is the predicted number of active projects 6 months after the end of November 2012, not at $x = 0$` },
      { text: `${yIntercept}`, isCorrect: true, reason: `` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const correctAnswer = correctOption.text;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. The graph models the number of active projects $x$ months after the end of November 2012, so the end of November 2012 corresponds to $x = 0$. The value of the model at $x = 0$ is the y-intercept of the graph, which is the labeled point $(0, ${yIntercept})$. Therefore, the predicted number of active projects the company was working on at the end of November 2012 is ${yIntercept}. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;

    return {
      questionText: questionText,
      figureCode: figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
