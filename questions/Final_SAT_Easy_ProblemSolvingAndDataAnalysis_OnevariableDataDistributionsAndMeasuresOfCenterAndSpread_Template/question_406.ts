import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 406
 *
 * FIXED:
 * - Replaced Mafs <Coordinates> and <Line.Segment> with custom SVG Bar Graph.
 * - Uses the robust SVG structure from previous fixes (currentColor, clear margins).
 * - Visualizes frequency of battery charges (0-4 kWh).
 *
 * FIXED (x-axis cut off — figure taller than the question's figure area):
 * - The SVG's own content was fine (axis line at y=280, category labels at
 *   305, title at 335 — all inside the 350-tall viewBox), but it was the
 *   tallest figure in the bank and the only one missing the house-style
 *   wrapper: no max-width container div and no display:block, so it rendered
 *   inline at the full container width and the oversized bottom got clipped —
 *   hiding the x-axis line, the 0-4 category labels, and the axis title.
 * - Now matches every working figure: wrapper div with max-width, display
 *   block, xmlns, and a compact 460x300 layout with tightened margins so the
 *   full bottom stack (axis line -> category labels -> title) sits well
 *   inside the viewBox. Bars, value labels, gridlines, y-labels, titles, and
 *   colors are unchanged.
 */

export const generator_406 = {
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

    // 2. Setup SVG Dimensions (compact so the whole figure fits the figure area)
    const width = 460;
    const height = 300;
    // Bottom margin still fits axis line + category labels + axis title
    const margin = { top: 26, bottom: 54, left: 46, right: 16 };

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
    const barWidth = 44;
    const totalBarSpace = data.length * barWidth;
    const totalSpacing = plotWidth - totalBarSpace;
    const spacing = totalSpacing / (data.length + 1);

    const bars = data.map((d, i) => {
      const x = margin.left + spacing + i * (barWidth + spacing);
      const y = getY(d.val);
      const h = getY(0) - y;

      // Label Y position: just below axis
      const labelY = height - margin.bottom + 20;

      return `
        <!-- Bar: Blue 500 -->
        <rect x="${x}" y="${y}" width="${barWidth}" height="${h}" fill="#3b82f6" fill-opacity="0.9" />
        
        <!-- Value Label (Top of bar) -->
        <text x="${x + barWidth / 2}" y="${y - 8}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor" style="font-family: sans-serif">${d.val}</text>
        
        <!-- Category Label (Bottom - kWh) -->
        <text x="${x + barWidth / 2}" y="${labelY}" text-anchor="middle" font-size="14" fill="currentColor" style="font-family: sans-serif">${d.label}</text>
      `;
    }).join('');

    // 5. Construct Final SVG String — house-style wrapper caps the rendered
    // size; display:block removes the inline-SVG baseline gap that was also
    // pushing the figure down into the clip.
    const figureCode = `
      <div style="width:100%;max-width:${width}px;margin:0 auto;">
        <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: auto; display: block; user-select: none;">
          <!-- Grid -->
          ${gridLines.join('')}
          
          <!-- X Axis Line -->
          <line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2" />
          
          <!-- Bars and Labels -->
          ${bars}
          
          <!-- Axis Titles -->
          <text x="${margin.left - 32}" y="${margin.top - 10}" text-anchor="start" font-size="12" font-weight="bold" fill="currentColor" style="font-family: sans-serif; opacity: 0.7;">Number of Days</text>
          <text x="${width / 2 + margin.left / 2}" y="${height - 14}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor" style="font-family: sans-serif; opacity: 0.7;">Charge (kWh)</text>
        </svg>
      </div>
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

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `The bar graph shows the daily battery charge (in kWh) recorded over ${totalDays} days. For how many of these days did the battery receive a charge of 0 kWh?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: freq0.toString(),
      explanation: `Choice ${correctOption.letter} is correct. In the bar graph, the horizontal axis represents the charge in kWh, and the vertical axis represents the number of days. The bar labeled "0" (representing 0 kWh) has a height corresponding to ${freq0} on the vertical axis. Therefore, the battery received a charge of 0 kWh on ${freq0} days.`
    };
  }
};