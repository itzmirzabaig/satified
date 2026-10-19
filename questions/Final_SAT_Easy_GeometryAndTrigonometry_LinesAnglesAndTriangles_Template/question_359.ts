import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 359
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [obtuse angle: 120-150]
 * - Difficulty factors: [Corresponding angles, linear pair, supplementary angles]
 * - Distractor patterns: [Given angle, right angle, subtracts from 360]
 * - Constraints: [x + givenAngle = 180]
 * - Question type: [Figure→Multiple Choice] (Converted from Fill-in-the-blank to match interface)
 *
 * FIXED:
 * - The old Mafs figure was a gridded black box with t drawn at a fixed angle,
 *   and both marked angles sat at line j, so the parallel lines played no
 *   part. The explanation had raw ** markdown and newlines, explained only two
 *   of the three wrong choices, and called the given angle "the vertical
 *   angle"; one choice was the given angle plus 10.
 * - The figure is now an SVG with t falling to the right at the true angle.
 *   The given obtuse angle is above j and right of t; x is above k and left
 *   of t, the corresponding angle of the given angle's linear-pair partner.
 */

export const generator_359 = {
  metadata: {
    id: "359",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const givenAngle = getRandomInt(120, 150);
    const correctVal = 180 - givenAngle; // acute angle between t and each line

    // Pixel layout: j on top, k below; t falls to the right, crossing j at
    // (xTopHit, yTop) and k at (xBotHit, yBot). Directions are in degrees,
    // counterclockwise with y up; t's upper ray points at 180 - correctVal.
    const width = 450, height = 250, yTop = 80, yBot = 175, ext = 55;
    const acuteRad = (correctVal * Math.PI) / 180;
    const dx = (yBot - yTop) / Math.tan(acuteRad);
    const xTopHit = 225 - dx / 2, xBotHit = 225 + dx / 2;
    const r1 = (v: number) => Math.round(v * 10) / 10;
    const pt = (x: number, y: number, deg: number, d: number) =>
      [r1(x + d * Math.cos((deg * Math.PI) / 180)), r1(y - d * Math.sin((deg * Math.PI) / 180))];
    const arcPath = (x: number, y: number, from: number, span: number, r: number) => {
      const [sx, sy] = pt(x, y, from, r);
      const [ex, ey] = pt(x, y, from + span, r);
      return `M ${sx} ${sy} A ${r} ${r} 0 0 0 ${ex} ${ey}`;
    };
    const upDir = 180 - correctVal;
    // Given angle: above j, right of t (from j's right ray to t's upper ray).
    const [glx, gly] = pt(xTopHit, yTop, givenAngle / 2, 36);
    // x: above k, left of t (from t's upper ray to k's left ray).
    const [xlx, xly] = pt(xBotHit, yBot, upDir + correctVal / 2, Math.max(32, 15 / Math.sin(acuteRad / 2)));
    const [t1x, t1y] = pt(xTopHit, yTop, upDir, ext);
    const [t2x, t2y] = pt(xBotHit, yBot, upDir + 180, ext);
    const [tlx, tly] = pt(xBotHit, yBot, upDir + 180, ext + 12);
    const figureCode = `
      <div style="text-align:center;">
        <svg viewBox="0 0 ${width} ${height}" style="width:100%; max-width:${width}px; height:auto; font-family:serif; user-select:none;">
          <line x1="40" y1="${yTop}" x2="410" y2="${yTop}" stroke="currentColor" stroke-width="2"/>
          <text x="418" y="${yTop + 5}" font-size="16" font-style="italic" fill="currentColor">j</text>
          <line x1="40" y1="${yBot}" x2="410" y2="${yBot}" stroke="currentColor" stroke-width="2"/>
          <text x="418" y="${yBot + 5}" font-size="16" font-style="italic" fill="currentColor">k</text>
          <line x1="${t1x}" y1="${t1y}" x2="${t2x}" y2="${t2y}" stroke="currentColor" stroke-width="2"/>
          <text x="${tlx}" y="${tly + 5}" text-anchor="middle" font-size="16" font-style="italic" fill="currentColor">t</text>
          <path d="${arcPath(xTopHit, yTop, 0, givenAngle, 16)}" fill="none" stroke="currentColor" stroke-width="1.4"/>
          <text x="${glx}" y="${gly + 5}" text-anchor="middle" font-size="15" fill="currentColor">${givenAngle}&#176;</text>
          <path d="${arcPath(xBotHit, yBot, upDir, correctVal, 18)}" fill="none" stroke="#3b82f6" stroke-width="1.4"/>
          <text x="${xlx}" y="${xly + 5}" text-anchor="middle" font-size="15" font-style="italic" fill="#3b82f6">x&#176;</text>
        </svg>
      </div>
    `;

    // Each wrong choice is a real slip. The values 180 - g (30 to 60), g
    // (120 to 150), 90, and 360 - g (210 to 240) never collide.
    const optionsData = [
      { text: correctVal.toString(), isCorrect: true, reason: '' },
      { text: givenAngle.toString(), isCorrect: false, reason: `${givenAngle} is the measure of the given angle; the angle with measure $x^{\\circ}$ is supplementary to it, not congruent to it` },
      { text: "90", isCorrect: false, reason: `it assumes the angle with measure $x^{\\circ}$ is a right angle; line $t$ is not perpendicular to lines $j$ and $k$` },
      { text: (360 - givenAngle).toString(), isCorrect: false, reason: `it results from subtracting ${givenAngle} from 360 instead of 180` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure, line $j$ is parallel to line $k$, and line $t$ intersects both lines. What is the value of $x$?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctVal.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The ${givenAngle}° angle, above line $j$ and to the right of line $t$, forms a linear pair with the angle above line $j$ and to the left of line $t$, so that angle measures $180 - ${givenAngle} = ${correctVal}$ degrees. Since lines $j$ and $k$ are parallel, the angle with measure $x^{\\circ}$, above line $k$ and to the left of line $t$, corresponds to that angle, so the two angles are congruent. Therefore, $x = ${correctVal}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
