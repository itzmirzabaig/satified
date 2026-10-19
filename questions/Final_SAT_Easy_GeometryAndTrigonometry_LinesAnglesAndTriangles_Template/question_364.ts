import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 364
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [given obtuse angle: 140-160]
 * - Difficulty factors: [Corresponding angles formed by a transversal of parallel lines]
 * - Distractor patterns: [Supplement, right angle, subtracts from 360]
 * - Question type: [Figure→Multiple Choice Text]
 *
 * FIXED:
 * - The old Mafs figure was a fixed sketch on a black box (n at about 22
 *   degrees for any draw), the explanation had no "Choice X is correct" and
 *   no reasons for the wrong choices, and one choice was the answer minus 15.
 * - The figure is now an SVG with n at the true angle. The given angle range
 *   is 140 to 160 (it was 150 to 170) so n is not nearly flat. Both marked
 *   angles are above their line and right of n.
 */

export const generator_364 = {
  metadata: {
    id: "364",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const givenAngle = getRandomInt(140, 160);
    const acute = 180 - givenAngle;

    // Pixel layout: r on top, s below; n falls to the right. Directions are in
    // degrees, counterclockwise with y up; n's upper ray points at givenAngle.
    const width = 450, height = 250, yTop = 80, yBot = 175, ext = 50;
    const dx = (yBot - yTop) / Math.tan((acute * Math.PI) / 180);
    const xTop = 225 - dx / 2, xBot = 225 + dx / 2;
    const r1 = (v: number) => Math.round(v * 10) / 10;
    const pt = (x: number, y: number, deg: number, d: number) =>
      [r1(x + d * Math.cos((deg * Math.PI) / 180)), r1(y - d * Math.sin((deg * Math.PI) / 180))];
    const arcPath = (x: number, y: number, span: number, r: number) => {
      const [sx, sy] = pt(x, y, 0, r);
      const [ex, ey] = pt(x, y, span, r);
      return `M ${sx} ${sy} A ${r} ${r} 0 0 0 ${ex} ${ey}`;
    };
    // Each marked angle is above its line and right of n: from the line's
    // right ray (0) around to n's upper ray (givenAngle).
    const [gx, gy] = pt(xTop, yTop, givenAngle / 2, 36);
    const [xx, xy] = pt(xBot, yBot, givenAngle / 2, 36);
    const [n1x, n1y] = pt(xTop, yTop, givenAngle, ext);
    const [n2x, n2y] = pt(xBot, yBot, givenAngle + 180, ext);
    const [nlx, nly] = pt(xTop, yTop, givenAngle, ext + 12);
    const figureCode = `
      <div style="text-align:center;">
        <svg viewBox="0 0 ${width} ${height}" style="width:100%; max-width:${width}px; height:auto; font-family:serif; user-select:none;">
          <line x1="30" y1="${yTop}" x2="420" y2="${yTop}" stroke="currentColor" stroke-width="2"/>
          <text x="428" y="${yTop + 5}" font-size="16" font-style="italic" fill="currentColor">r</text>
          <line x1="30" y1="${yBot}" x2="420" y2="${yBot}" stroke="currentColor" stroke-width="2"/>
          <text x="428" y="${yBot + 5}" font-size="16" font-style="italic" fill="currentColor">s</text>
          <line x1="${n1x}" y1="${n1y}" x2="${n2x}" y2="${n2y}" stroke="currentColor" stroke-width="2"/>
          <text x="${nlx}" y="${nly + 5}" text-anchor="middle" font-size="16" font-style="italic" fill="currentColor">n</text>
          <path d="${arcPath(xTop, yTop, givenAngle, 16)}" fill="none" stroke="currentColor" stroke-width="1.4"/>
          <text x="${gx}" y="${gy + 5}" text-anchor="middle" font-size="15" fill="currentColor">${givenAngle}&#176;</text>
          <path d="${arcPath(xBot, yBot, givenAngle, 16)}" fill="none" stroke="#3b82f6" stroke-width="1.4"/>
          <text x="${xx}" y="${xy + 5}" text-anchor="middle" font-size="15" font-style="italic" fill="#3b82f6">x&#176;</text>
        </svg>
      </div>
    `;

    // Each wrong choice is a real slip. The values g (140 to 160), 180 - g
    // (20 to 40), 90, and 360 - g (200 to 220) never collide.
    const correctAnswer = givenAngle.toString();
    const optionsData = [
      { text: correctAnswer, isCorrect: true, reason: '' },
      { text: (180 - givenAngle).toString(), isCorrect: false, reason: `${180 - givenAngle} is the measure of an angle supplementary to the ${givenAngle}° angle; corresponding angles are congruent, not supplementary` },
      { text: "90", isCorrect: false, reason: `it assumes line $n$ is perpendicular to lines $r$ and $s$, which the figure does not show` },
      { text: (360 - givenAngle).toString(), isCorrect: false, reason: `it results from subtracting ${givenAngle} from 360; corresponding angles are congruent, so $x$ equals ${givenAngle}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure, line $n$ intersects lines $r$ and $s$. Line $r$ is parallel to line $s$. What is the value of $x$?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. The angle with measure ${givenAngle}° and the angle with measure $x^{\\circ}$ are corresponding angles: each is above its line and to the right of line $n$. Since line $r$ is parallel to line $s$, corresponding angles are congruent. Therefore, $x = ${givenAngle}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
