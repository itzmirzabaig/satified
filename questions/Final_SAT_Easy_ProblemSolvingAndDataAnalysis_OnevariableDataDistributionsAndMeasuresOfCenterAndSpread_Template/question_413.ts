import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 413
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [counts: 3-20]
 * - Difficulty factors: [Reading bar graph, subtraction]
 * - Distractor patterns: [taller bar only, shorter bar only, sum instead of difference]
 * - Constraints: [Two specific categories to compare]
 * - Question type: [Bar Graph→Multiple Choice Text]
 * - Figure generation: [SVG bar chart]
 *
 * FIXED:
 * - Replaced legacy Mafs line-segment "bars" with a house-style SVG bar chart
 *   whose bar heights match the live counts every draw.
 * - Rebuilt distractors so no two options can ever collide: shorter-bar count,
 *   taller-bar count, and the sum (added instead of subtracted). A bounded
 *   retry guarantees the difference never equals the shorter-bar count.
 */

export const generator_413 = {
  metadata: {
    id: "413",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Draw the two counts. Guarantee the difference (correct answer) never
    // equals the shorter-bar count, so the "shorter bar only" distractor is
    // always distinct from the answer.
    let mandrill = getRandomInt(3, 10);
    let diff = getRandomInt(3, 10);
    let tries = 0;
    while (diff === mandrill && tries++ < 50) {
      diff = getRandomInt(3, 10);
    }
    const vervet = mandrill + diff;
    const total = mandrill + vervet;

    // Figure: two labeled bars whose heights are exactly mandrill and vervet.
    const width = 450;
    const height = 250;
    const margin = { top: 30, right: 20, bottom: 45, left: 45 };
    const plotHeight = height - margin.top - margin.bottom;
    const plotWidth = width - margin.left - margin.right;

    const yMax = Math.ceil(vervet / 5) * 5 + 5;
    const getY = (v: number) => margin.top + plotHeight - (v / yMax) * plotHeight;

    const gridLines: string[] = [];
    for (let v = 0; v <= yMax; v += 5) {
      const y = getY(v);
      gridLines.push(
        `<line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" />` +
        `<text x="${margin.left - 8}" y="${y + 4}" text-anchor="end" font-size="12" fill="currentColor">${v}</text>`
      );
    }

    const barData = [
      { label: "Mandrills", val: mandrill },
      { label: "Vervets", val: vervet }
    ];
    const barWidth = 70;
    const spacing = (plotWidth - barData.length * barWidth) / (barData.length + 1);

    const bars = barData.map((d, i) => {
      const x = margin.left + spacing + i * (barWidth + spacing);
      const y = getY(d.val);
      const h = getY(0) - y;
      return (
        `<rect x="${x}" y="${y}" width="${barWidth}" height="${h}" fill="#3b82f6" fill-opacity="0.9" />` +
        `<text x="${x + barWidth / 2}" y="${y - 8}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor">${d.val}</text>` +
        `<text x="${x + barWidth / 2}" y="${height - margin.bottom + 20}" text-anchor="middle" font-size="13" fill="currentColor">${d.label}</text>`
      );
    }).join('');

    const figureCode = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; font-family: sans-serif; user-select: none;">
        ${gridLines.join('')}
        <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2" />
        <line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2" />
        ${bars}
        <text x="${margin.left - 30}" y="${margin.top - 12}" text-anchor="start" font-size="12" font-weight="bold" fill="currentColor" style="opacity: 0.8;">Number of animals</text>
      </svg>
    `;

    // Distractors: shorter-bar count, taller-bar count, and the sum (added
    // instead of subtracted). All are provably distinct from the difference and
    // from each other because vervet = mandrill + diff and total = mandrill +
    // vervet, so total > vervet > mandrill and diff !== mandrill by construction.
    const optionsData = [
      { text: diff.toString(), isCorrect: true },
      { text: mandrill.toString(), isCorrect: false },
      { text: vervet.toString(), isCorrect: false },
      { text: total.toString(), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: "The bar graph shows the number of mandrills and vervets in a wildlife sanctuary. How many more vervets than mandrills are in the sanctuary?",
      figureCode: figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: diff.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The graph shows ${vervet} vervets and ${mandrill} mandrills, so there are ${vervet} - ${mandrill} = ${diff} more vervets than mandrills.`
    };
  }
};
