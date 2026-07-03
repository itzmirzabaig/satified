import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 99
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [vertexX: 500-1500, vertexY: 8000-15000]
 * - Difficulty factors: [Identifying the x-coordinate of the vertex in context]
 * - Distractor patterns: [Vertex y-coordinate, lowest table x-coordinate, unrelated x-coordinate]
 * - Constraints: [Function is a downward-opening parabola]
 * - Question type: [Figure+Table -> Multiple Choice Text]
 * - Figure generation: [Plain SVG parabola + HTML data table]
 *
 * FIX NOTES:
 * The previous version rendered the graph through a <script> block that
 * waited for global Mafs/React/ReactDOM objects; the literal "undefined"
 * checks and the script itself tripped the NAN_OUTPUT / FIGURE_BAD audit,
 * and the figure could never render in the app. Rebuilt as a self-contained
 * SVG template literal (house exemplar style): downward parabola drawn from
 * the SAME live vertexX/vertexY/aCoeff values, tick labels at the table's
 * elevation values, and the data table below it. Distractor collisions were
 * verified impossible across the full ranges; explanation now covers every
 * distractor using letters taken from the shuffled array.
 */

export const generator_99 = {
  metadata: {
    id: "99",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const vertexX = getRandomInt(10, 30) * 50;    // 500-1500, multiple of 50
    const vertexY = getRandomInt(80, 150) * 100;  // 8000-15000, multiple of 100
    const aCoeff = 0.0035;

    // Table data (offsets -875 and -3500 are exact integers for these inputs)
    const xValues = [vertexX - 1000, vertexX - 500, vertexX, vertexX + 500, vertexX + 1000].filter(x => x >= 0);
    const tableRows = xValues.map(x => ({
      x,
      y: Math.round(-aCoeff * Math.pow(x - vertexX, 2) + vertexY)
    }));

    // ---------- Figure: plain SVG parabola + data table ----------
    const width = 460;
    const height = 260;
    const margin = { top: 15, right: 20, bottom: 45, left: 70 };
    const graphWidth = width - margin.left - margin.right;
    const graphHeight = height - margin.top - margin.bottom;

    // Plot domain (real units) always contains every table point and the vertex
    const xPlotMin = Math.max(0, vertexX - 1250);
    const xPlotMax = vertexX + 1250;
    const yPlotMin = vertexY - 6000;
    const yPlotMax = vertexY + 800;

    const sx = (x: number) => margin.left + ((x - xPlotMin) / (xPlotMax - xPlotMin)) * graphWidth;
    const sy = (y: number) => margin.top + graphHeight - ((y - yPlotMin) / (yPlotMax - yPlotMin)) * graphHeight;

    // Parabola sampled across the plot domain (always inside the y-domain:
    // max deviation 0.0035 * 1250^2 = 5468.75 < 6000)
    const curvePts: string[] = [];
    for (let i = 0; i <= 100; i++) {
      const x = xPlotMin + (i / 100) * (xPlotMax - xPlotMin);
      const y = -aCoeff * Math.pow(x - vertexX, 2) + vertexY;
      curvePts.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`);
    }

    // X ticks at the table's elevation values; Y ticks at clean offsets from the vertex
    const xTicks = tableRows.map(r => r.x);
    const yTicks = [vertexY - 5000, vertexY - 2500, vertexY];

    const xTickMarkup = xTicks.map(x => {
      const px = sx(x).toFixed(1);
      return `
        <line x1="${px}" y1="${margin.top}" x2="${px}" y2="${height - margin.bottom}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />
        <line x1="${px}" y1="${height - margin.bottom}" x2="${px}" y2="${height - margin.bottom + 5}" stroke="currentColor" stroke-width="1" />
        <text x="${px}" y="${height - margin.bottom + 18}" text-anchor="middle" font-size="11" fill="currentColor">${x.toLocaleString()}</text>`;
    }).join('');

    const yTickMarkup = yTicks.map(y => {
      const py = sy(y).toFixed(1);
      return `
        <line x1="${margin.left}" y1="${py}" x2="${width - margin.right}" y2="${py}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />
        <text x="${margin.left - 8}" y="${(sy(y) + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="currentColor">${y.toLocaleString()}</text>`;
    }).join('');

    const figureCode = `<div>
  <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; font-family: sans-serif; user-select: none;">
    ${xTickMarkup}
    ${yTickMarkup}
    <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2"/>
    <line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2"/>
    <polyline points="${curvePts.join(' ')}" fill="none" stroke="#3b82f6" stroke-width="2.5" />
    <circle cx="${sx(vertexX).toFixed(1)}" cy="${sy(vertexY).toFixed(1)}" r="4.5" fill="#3b82f6" stroke="white" stroke-width="2" />
    <text x="${margin.left + graphWidth / 2}" y="${height - 6}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Elevation (meters)</text>
    <text transform="rotate(-90, 14, ${margin.top + graphHeight / 2})" x="14" y="${margin.top + graphHeight / 2}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Plant diversity</text>
  </svg>
  <table border="1" cellpadding="6" cellspacing="0" style="margin-top:16px;border-collapse:collapse;font-family:inherit;width:100%;max-width:520px;">
    <thead>
      <tr style="background:#f5f5f5;">
        <th style="border:1px solid #ddd;padding:8px 12px;">Elevation (meters)</th>
        <th style="border:1px solid #ddd;padding:8px 12px;">Measure of plant diversity</th>
      </tr>
    </thead>
    <tbody>
      ${tableRows.map(row => `<tr>
        <td style="border:1px solid #ddd;padding:8px 12px;text-align:center;">${row.x.toLocaleString()}</td>
        <td style="border:1px solid #ddd;padding:8px 12px;text-align:center;">${row.y.toLocaleString()}</td>
      </tr>`).join('')}
    </tbody>
  </table>
</div>`;

    // ---------- Options ----------
    const firstX = tableRows[0].x;
    const altX = Math.round(vertexX * 0.8); // multiple of 40; never collides with the others in-range

    const optionsData = [
      {
        text: `${vertexX.toLocaleString()}`,
        isCorrect: true,
        reason: ''
      },
      {
        text: `${vertexY.toLocaleString()}`,
        isCorrect: false,
        reason: `${vertexY.toLocaleString()} is the greatest measure of plant diversity itself, not the elevation at which it occurs`
      },
      {
        text: `${firstX.toLocaleString()}`,
        isCorrect: false,
        reason: `${firstX.toLocaleString()} meters is the smallest elevation shown in the table, where the measure of diversity is less than its maximum`
      },
      {
        text: `${altX.toLocaleString()}`,
        isCorrect: false,
        reason: `the model does not reach its greatest measure of diversity at an elevation of ${altX.toLocaleString()} meters`
      }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctOption = shuffled.find(o => o.isCorrect)!;
    const incorrectOptions = shuffled.filter(o => !o.isCorrect);

    return {
      questionText: `The graph and table above model a particular measure of plant diversity as a function of the elevation, in meters, in a region of Switzerland. According to the model, which of the following is closest to the elevation, in meters, at which the measure of plant diversity is greatest?`,
      figureCode: figureCode,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The model is a downward-opening parabola, so the measure of plant diversity is greatest at the vertex of the graph. The table shows the greatest measure of diversity, ${vertexY.toLocaleString()}, occurs at an elevation of ${vertexX.toLocaleString()} meters. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
