import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: ebe4bde0
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [vertexX: 500-1500, vertexY: 8000-15000]
 * - Difficulty factors: [Identifying the x-coordinate of the vertex in context]
 * - Distractor patterns: [Vertex y-coordinate, lowest table x-coordinate, unrelated x-coordinate]
 * - Constraints: [Function is a downward-opening parabola]
 * - Question type: [Figure+Table→Multiple Choice Text]
 * - Figure generation: [Mafs with coordinate scaling to handle high-value ranges cleanly]
 *
 * FIX NOTES:
 * The original Mafs code clustered labels because values are in the 500–15000 range.
 * The custom SVG replacement from Kimi broke entirely.
 *
 * Solution: Divide all coordinates by a SCALE factor (100) before passing to Mafs.
 * Mafs then works in the range ~5–150 (no clustering), and we override the axis
 * label formatter to multiply back by SCALE so the displayed numbers are correct.
 */

export const generator_ebe4bde0 = {
  metadata: {
    // id: "ebe4bde0",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const vertexX = getRandomInt(10, 30) * 50;       // 500–1500
    const vertexY = getRandomInt(80, 150) * 100;      // 8000–15000
    const aCoeff = 0.0035;

    // The coordinate scale factor: divide real values by this before passing to Mafs
    // so Mafs works in a small numeric range and doesn't cluster axis labels.
    const SCALE = 100;

    // Scaled values for Mafs
    const svx = vertexX / SCALE;   // scaled vertex x (5–15)
    const svy = vertexY / SCALE;   // scaled vertex y (80–150)
    // Scaled parabola: f(sx) = -aCoeff * SCALE^2 * (sx - svx)^2 + svy
    // Because if x = sx*SCALE, then -aCoeff*(x-vx)^2+vy = -aCoeff*SCALE^2*(sx-svx)^2+vy/SCALE... wait:
    // Real: y = -aCoeff * (x - vx)^2 + vy
    // Scaled x: sx = x/SCALE => x = sx*SCALE
    // Scaled y: sy = y/SCALE
    // sy = [-aCoeff * (sx*SCALE - vx)^2 + vy] / SCALE
    //    = -aCoeff * SCALE * (sx - svx)^2 + svy
    const scaledA = aCoeff * SCALE; // = 0.35

    // Viewport: show ~2500 units on each side of vertex in real coords = 25 scaled
    const xViewHalf = 2500 / SCALE;  // 25
    const yViewHalf = svy * 0.4;     // ~40% of vertex height above/below

    const xMin = svx - xViewHalf;
    const xMax = svx + xViewHalf;
    const yMin = svy - yViewHalf;
    const yMax = svy + yViewHalf * 0.4; // a bit more room above vertex

    // Nice tick step for x axis: real range is 5000, want ~5 ticks = 1000 real = 10 scaled
    const xTickStep = 10;   // scaled = 1000 real
    const yTickStep = Math.round(yViewHalf / 4) || 20; // scaled

    const graphId = `graph-${Math.random().toString(36).substr(2, 9)}`;

    // Table data (real values, not scaled)
    const xValues = [vertexX - 1000, vertexX - 500, vertexX, vertexX + 500, vertexX + 1000].filter(x => x >= 0);
    const tableRows = xValues.map(x => ({
      x,
      y: Math.round(-aCoeff * Math.pow(x - vertexX, 2) + vertexY)
    }));

    const figureCode = `
<div id="${graphId}-root"></div>

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

<script>
(function() {
  // Wait for Mafs to be available (it's loaded as a global in the host page)
  function tryRender() {
    if (typeof Mafs === 'undefined' || typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
      setTimeout(tryRender, 100);
      return;
    }

    const SCALE = ${SCALE};
    const svx   = ${svx};
    const svy   = ${svy};
    const scaledA = ${scaledA};

    const xMin = ${xMin};
    const xMax = ${xMax};
    const yMin = ${yMin};
    const yMax = ${yMax};
    const xTickStep = ${xTickStep};
    const yTickStep = ${yTickStep};

    // Label formatter: multiply scaled value back by SCALE for display
    const fmtX = (v) => (Math.round(v * SCALE)).toLocaleString();
    const fmtY = (v) => (Math.round(v * SCALE)).toLocaleString();

    const el = React.createElement;

    // The parabola function in scaled coords
    const f = (sx) => -scaledA * Math.pow(sx - svx, 2) + svy;

    const chart = el(Mafs.Mafs,
      {
        viewBox: { x: [xMin, xMax], y: [yMin, yMax] },
        preserveAspectRatio: false,
        height: 320,
      },
      el(Mafs.Coordinates.Cartesian, {
        xAxis: {
          lines: xTickStep,
          labels: fmtX,
        },
        yAxis: {
          lines: yTickStep,
          labels: fmtY,
        },
      }),
      el(Mafs.Plot.OfX, {
        y: f,
        color: '#2563eb',
        strokeWidth: 2.5,
      }),
      // Mark the vertex with a point
      el(Mafs.Point, {
        x: svx,
        y: svy,
        color: '#dc2626',
      })
    );

    const root = document.getElementById('${graphId}-root');
    if (root) {
      ReactDOM.render(chart, root);
    }
  }

  tryRender();
})();
</script>
`;

    const firstX = tableRows.length > 0 ? tableRows[0].x : vertexX - 1000;

    const optionsData = [
      { text: `${vertexX.toLocaleString()}`, isCorrect: true },
      { text: `${vertexY.toLocaleString()}`, isCorrect: false },
      { text: `${firstX.toLocaleString()}`, isCorrect: false },
      { text: `${Math.round(vertexX * 0.8).toLocaleString()}`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The table above models a particular measure of plant diversity as a function of the elevation in a region of Switzerland. According to the model, which of the following is closest to the elevation, in meters, at which plant diversity is greatest?`,
      figureCode: figureCode,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The greatest plant diversity corresponds to the highest point (vertex) of the parabola. The greatest y-coordinate is $y=${vertexY.toLocaleString()}$, which occurs at an elevation of $x=${vertexX.toLocaleString()}$ meters.`
    };
  }
};