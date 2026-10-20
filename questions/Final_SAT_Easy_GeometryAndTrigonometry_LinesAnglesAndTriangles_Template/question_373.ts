import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 373
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [given acute angle: 20-40]
 * - Difficulty factors: [Same-side interior angles are supplementary]
 * - Distractor patterns: [Given angle, complement, subtracts from 360]
 * - Question type: [Figure→Multiple Choice Text]
 *
 * FIXED:
 * - The old Mafs figure was a fixed sketch on a black box (the transversal
 *   at about 27 degrees for any draw), the x label had no degree mark, and
 *   two wrong choices were half the given angle (rounded) and twice it.
 * - The figure is now an SVG with the transversal at the true angle. The
 *   given angle is below line m and left of the transversal; x is above
 *   line n and left of the transversal (same-side interior angles).
 */

export const generator_373 = {
  metadata: {
    id: "373",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const givenAngle = getRandomInt(20, 40);
    const xValue = 180 - givenAngle;

    // Pixel layout: m on top, n below; the transversal rises to the right at
    // the given angle. Directions are in degrees, counterclockwise with y up.
    const width = 450, height = 250, yTop = 80, yBot = 175, ext = 50;
    const dx = (yBot - yTop) / Math.tan((givenAngle * Math.PI) / 180);
    const xTop = 225 + dx / 2, xBot = 225 - dx / 2;
    const r1 = (v: number) => Math.round(v * 10) / 10;
    const pt = (x: number, y: number, deg: number, d: number) =>
      [r1(x + d * Math.cos((deg * Math.PI) / 180)), r1(y - d * Math.sin((deg * Math.PI) / 180))];
    const arcPath = (x: number, y: number, from: number, span: number, r: number) => {
      const [sx, sy] = pt(x, y, from, r);
      const [ex, ey] = pt(x, y, from + span, r);
      return `M ${sx} ${sy} A ${r} ${r} 0 0 0 ${ex} ${ey}`;
    };
    // Given: below m, left of the transversal (from m's left ray to the lower ray).
    const [glx, gly] = pt(xTop, yTop, 180 + givenAngle / 2, Math.max(34, 15 / Math.sin((givenAngle / 2) * Math.PI / 180)));
    // x: above n, left of the transversal (from the upper ray to n's left ray).
    const [xlx, xly] = pt(xBot, yBot, givenAngle + xValue / 2, 32);
    const [t1x, t1y] = pt(xTop, yTop, givenAngle, ext);
    const [t2x, t2y] = pt(xBot, yBot, 180 + givenAngle, ext);
    const figureCode = `
      <div style="text-align:center;">
        <svg viewBox="0 0 ${width} ${height}" style="width:100%; max-width:${width}px; height:auto; font-family:serif; user-select:none;">
          <line x1="30" y1="${yTop}" x2="420" y2="${yTop}" stroke="currentColor" stroke-width="2"/>
          <text x="428" y="${yTop + 5}" font-size="16" font-style="italic" fill="currentColor">m</text>
          <line x1="30" y1="${yBot}" x2="420" y2="${yBot}" stroke="currentColor" stroke-width="2"/>
          <text x="428" y="${yBot + 5}" font-size="16" font-style="italic" fill="currentColor">n</text>
          <line x1="${t1x}" y1="${t1y}" x2="${t2x}" y2="${t2y}" stroke="currentColor" stroke-width="2"/>
          <path d="${arcPath(xTop, yTop, 180, givenAngle, 22)}" fill="none" stroke="currentColor" stroke-width="1.4"/>
          <text x="${glx}" y="${gly + 5}" text-anchor="middle" font-size="15" fill="currentColor">${givenAngle}&#176;</text>
          <path d="${arcPath(xBot, yBot, givenAngle, xValue, 16)}" fill="none" stroke="#3b82f6" stroke-width="1.4"/>
          <text x="${xlx}" y="${xly + 5}" text-anchor="middle" font-size="15" font-style="italic" fill="#3b82f6">x&#176;</text>
        </svg>
      </div>
    `;

    // Each wrong choice is a real slip. The values 180 - g (140 to 160), g
    // (20 to 40), 90 - g (50 to 70), and 360 - g (320 to 340) never collide.
    const correctAnswer = xValue.toString();
    const optionsData = [
      { text: (90 - givenAngle).toString(), isCorrect: false, reason: `it assumes the two angles are complementary, with measures that add to 90; same-side interior angles are supplementary` },
      { text: givenAngle.toString(), isCorrect: false, reason: `${givenAngle} is the measure of the given angle; same-side interior angles are supplementary, not congruent` },
      { text: (360 - givenAngle).toString(), isCorrect: false, reason: `it results from subtracting ${givenAngle} from 360 instead of 180` },
      { text: correctAnswer, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure shown, line $m$ is parallel to line $n$. What is the value of $x$?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. The angle with measure $x^{\\circ}$ and the angle with measure ${givenAngle}° are same-side interior angles: both are between lines $m$ and $n$ and on the same side of the transversal. When two parallel lines are cut by a transversal, same-side interior angles are supplementary, so $x + ${givenAngle} = 180$. Therefore, $x = 180 - ${givenAngle} = ${correctAnswer}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
