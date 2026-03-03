import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 29fa7970
 *
 * FIXED:
 * - Replaced Mafs <Coordinates> and <Line.Segment> with custom SVG Bar Graph.
 * - Uses the robust SVG structure from previous fixes (currentColor, clear margins).
 * - Visualizes frequency of battery charges (0-4 kWh).
 */

export const generator_29fa7970 = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Generate Data
    const freq0 = getRandomInt(4, 8);
    const freq1 = getRandomInt(1, 4);
    const freq2 = getRandomInt(2, 6);
    const freq3 = getRandomInt(3, 7);
    const freq4 = getRandomInt(1, 5);

    const data = [
      { label: "0", val: freq0 },
      { label: "1", val: freq1 },
      { label: "2", val: freq2 },
      { label: "3", val: freq3 },
      { label: "4", val: freq4 }
    ];

    const totalDays = data.reduce((acc, d) => acc + d.val, 0);

    // 2. Setup SVG Dimensions
    const width = 500;
    const height = 350;
    // Adequate bottom margin for labels and axis title
    const margin = { top: 40, bottom: 70, left: 50, right: 20 };

    const plotHeight = height - margin.top - margin.bottom;
    const plotWidth = width - margin.left - margin.right;

    // Scale Y-Axis
    const maxFreq = Math.max(...data.map(d => d.val));
    // Round up to nearest even number + 2 for headroom
    const yMax = Math.ceil(maxFreq / 2) * 2 + 2;

    const getY = (v: number) => margin.top + plotHeight - (v / yMax) * plotHeight;

    // 3. Generate Grid Lines & Y-Axis Labels
    const gridLines = [];
    // Step by 2 for cleaner y-axis if max is large, or 1 if small. 
    // Given range approx 0-10, step of 2 is good.
    const step = 2;
    for (let v = 0; v <= yMax; v += step) {
      const y = getY(v);
      gridLines.push(`
        <line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="currentColor" stroke-opacity="0.2" stroke-width="1" />
        <text x="${margin.left - 10}" y="${y + 5}" text-anchor="end" font-size="12" fill="currentColor" style="font-family: sans-serif; opacity: 0.8;">${v}</text>
      `);
    }

    // 4. Generate Bars & X-Axis Labels
    const barWidth = 50;
    const totalBarSpace = data.length * barWidth;
    const totalSpacing = plotWidth - totalBarSpace;
    const spacing = totalSpacing / (data.length + 1);

    const bars = data.map((d, i) => {
      const x = margin.left + spacing + i * (barWidth + spacing);
      const y = getY(d.val);
      const h = getY(0) - y;

      // Label Y position: just below axis
      const labelY = height - margin.bottom + 25;

      return `
        <!-- Bar: Blue 500 -->
        <rect x="${x}" y="${y}" width="${barWidth}" height="${h}" fill="#3b82f6" fill-opacity="0.9" />
        
        <!-- Value Label (Top of bar) -->
        <text x="${x + barWidth / 2}" y="${y - 8}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor" style="font-family: sans-serif">${d.val}</text>
        
        <!-- Category Label (Bottom - kWh) -->
        <text x="${x + barWidth / 2}" y="${labelY}" text-anchor="middle" font-size="14" fill="currentColor" style="font-family: sans-serif">${d.label}</text>
      `;
    }).join('');

    // 5. Construct Final SVG String
    const figureCode = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; user-select: none; overflow: visible;">
        <!-- Grid -->
        ${gridLines.join('')}
        
        <!-- X Axis Line -->
        <line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2" />
        
        <!-- Bars and Labels -->
        ${bars}
        
        <!-- Axis Titles -->
        <text x="${margin.left - 30}" y="${margin.top - 20}" text-anchor="start" font-size="12" font-weight="bold" fill="currentColor" style="font-family: sans-serif; opacity: 0.7;">Number of Days</text>
        <text x="${width / 2 + margin.left / 2}" y="${height - 15}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor" style="font-family: sans-serif; opacity: 0.7;">Charge (kWh)</text>
      </svg>
    `;

    // 6. Options
    const optionsData = [
      { text: "0", isCorrect: false }, // Common confusion with the label
      { text: "1", isCorrect: false },
      { text: (freq0 > 2 ? freq0 - 2 : freq0 + 1).toString(), isCorrect: false },
      { text: freq0.toString(), isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `The bar graph shows the daily battery charge (in kWh) recorded over ${totalDays} days. For how many of these days did the battery receive a charge of 0 kWh?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: freq0.toString(),
      explanation: `Choice ${correctOption.letter} is correct. In the bar graph, the horizontal axis represents the charge in kWh, and the vertical axis represents the number of days. The bar labeled "0" (representing 0 kWh) has a height corresponding to ${freq0} on the vertical axis. Therefore, the battery received a charge of 0 kWh on ${freq0} days.`
    };
  }
};