import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 345
*
* ORIGINAL ANALYSIS:
* - Number ranges: [dimensions 2-8]
* - Difficulty factors: [Volume of prism with figure]
* - Distractor patterns: [surface area, l×w, l+w+h]
* - Constraints: [Volume = l × w × h]
* - Question type: [Has Figure (SVG), Multiple Choice Text]
* - Figure generation: [3D rectangular prism representation]
*
* FIXED:
* - Original distractors D2 (base area = l·w) and D3 (l+w+h) collide for 5 of
*   the 80 draws (e.g. l=4,w=3,h=5 → both 12), which produced DUP_OPTIONS.
*   Added a bounded uniqueness retry (<=50) that redraws until the four option
*   values are distinct.
* - Replaced the Mafs prism (which drew off-scale and could overflow its
*   viewBox) with a plain, self-contained SVG prism drawn in proportion to
*   the draw so it always fits; the edge labels are interpolated from
*   the live draw values so the figure matches the question every time.
* - Volume is integer by construction; explanation numbers come from the same
*   live variables and the correct letter is read from the shuffled array.
*/

export const generator_345 = {
  metadata: {
    id: "345",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    let length = getRandomInt(4, 8);
    let width = getRandomInt(2, 5);
    let height = getRandomInt(3, 6);

    // Bounded retry: guarantee the four option values are all distinct.
    const optionVals = () => {
      const baseArea = length * width;
      return [
        length * width * height, // correct volume
        2 * (baseArea + width * height + length * height), // surface area
        baseArea,                // only the base area
        length + width + height  // adds the dimensions
      ];
    };
    let tries = 0;
    while (new Set(optionVals()).size < 4 && tries++ < 50) {
      length = getRandomInt(4, 8);
      width = getRandomInt(2, 5);
      height = getRandomInt(3, 6);
    }

    const volume = length * width * height;
    const baseArea = length * width;

    // Self-contained SVG of a right rectangular prism drawn in proportion to
    // the draw (length across, height up, width receding at 45 degrees). The
    // box used to be a fixed shape, so a length of 4 and a height of 6 drew
    // much wider than tall, and the width label sat on an edge.
    const u = 22;
    const L = length * u, H = height * u, d = Math.round(width * u * 0.45);
    const x0 = 56, yb = 15 + d + H;
    const xr = x0 + L, yt = yb - H;
    const vbW = xr + d + 64, vbH = yb + 32;
    const figureCode = `<div style="width:100%;max-width:${vbW + 20}px;margin:0 auto;"><svg viewBox="0 0 ${vbW} ${vbH}" style="width:100%;height:auto;display:block;font-family:sans-serif;" xmlns="http://www.w3.org/2000/svg">
  <!-- hidden edges -->
  <polyline points="${x0},${yb} ${x0 + d},${yb - d} ${xr + d},${yb - d}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.6"/>
  <line x1="${x0 + d}" y1="${yb - d}" x2="${x0 + d}" y2="${yt - d}" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.6"/>
  <!-- top and right faces -->
  <polygon points="${x0},${yt} ${x0 + d},${yt - d} ${xr + d},${yt - d} ${xr},${yt}" fill="#3b82f6" fill-opacity="0.06" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  <polygon points="${xr},${yt} ${xr + d},${yt - d} ${xr + d},${yb - d} ${xr},${yb}" fill="#3b82f6" fill-opacity="0.08" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  <!-- front face -->
  <rect x="${x0}" y="${yt}" width="${L}" height="${H}" fill="#3b82f6" fill-opacity="0.12" stroke="currentColor" stroke-width="2"/>
  <!-- labels -->
  <text x="${x0 + L / 2}" y="${yb + 22}" text-anchor="middle" font-size="14" fill="currentColor">${length} cm</text>
  <text x="${x0 - 8}" y="${yb - H / 2 + 5}" text-anchor="end" font-size="14" fill="currentColor">${height} cm</text>
  <text x="${xr + d / 2 + 10}" y="${yb - d / 2 + 14}" text-anchor="start" font-size="14" fill="currentColor">${width} cm</text>
</svg></div>`;

    const surfaceArea = 2 * (baseArea + width * height + length * height);
    const optionsData = [
      { text: volume.toString(), isCorrect: true, reason: '' },
      { text: surfaceArea.toString(), isCorrect: false, reason: `it is the surface area of the prism, $2(${length}(${width}) + ${width}(${height}) + ${length}(${height}))$, in square centimeters, not its volume` },
      { text: baseArea.toString(), isCorrect: false, reason: `it is the area of one face, $${length}(${width})$, in square centimeters; this area must also be multiplied by the height, ${height}` },
      { text: (length + width + height).toString(), isCorrect: false, reason: `it is the sum of the three dimensions, $${length} + ${width} + ${height}$, not their product` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The figure shows the lengths, in centimeters (cm), of the edges of a right rectangular prism. The volume $V$ of a right rectangular prism is $\\ell wh$, where $\\ell$ is the length of the prism, $w$ is the width of the prism, and $h$ is the height of the prism. What is the volume, in cubic centimeters, of the prism?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: volume.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The figure shows that the prism has a length of ${length} cm, a width of ${width} cm, and a height of ${height} cm. Substituting these values into $V = \\ell wh$ gives $V = (${length})(${width})(${height}) = ${volume}$. Therefore, the volume of the prism is ${volume} cubic centimeters. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
