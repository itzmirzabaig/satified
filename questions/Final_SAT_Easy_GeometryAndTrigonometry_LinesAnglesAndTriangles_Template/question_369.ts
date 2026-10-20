import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 369
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [given acute angle: 55-75]
 * - Difficulty factors: [Same-side interior angles are supplementary]
 * - Distractor patterns: [Given angle, complement, subtracts from 360]
 * - Question type: [Figure→Multiple Choice Text]
 *
 * FIXED:
 * - The old Mafs figure was a fixed sketch on a black box (the transversal
 *   at about 56 degrees for any draw), the stem said "the figure above", and
 *   one reason read "it calculation error" for the choice 90 + g.
 * - The figure is now an SVG with the transversal at the true angle. The
 *   angle a is below line l and left of the transversal; the given angle is
 *   above line k and left of the transversal (same-side interior angles).
 */

export const generator_369 = {
  metadata: {
    id: "369",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const givenAngle = getRandomInt(55, 75);
    const aValue = 180 - givenAngle;

    // Pixel layout: l on top, k below; the transversal falls to the right.
    // Directions are in degrees, counterclockwise with y up; its upper ray
    // points at 180 - givenAngle and its lower ray at 360 - givenAngle.
    const width = 450, height = 250, yTop = 80, yBot = 175, ext = 55;
    const dx = (yBot - yTop) / Math.tan((givenAngle * Math.PI) / 180);
    const xTop = 225 - dx / 2, xBot = 225 + dx / 2;
    const r1 = (v: number) => Math.round(v * 10) / 10;
    const pt = (x: number, y: number, deg: number, d: number) =>
      [r1(x + d * Math.cos((deg * Math.PI) / 180)), r1(y - d * Math.sin((deg * Math.PI) / 180))];
    const arcPath = (x: number, y: number, from: number, span: number, r: number) => {
      const [sx, sy] = pt(x, y, from, r);
      const [ex, ey] = pt(x, y, from + span, r);
      return `M ${sx} ${sy} A ${r} ${r} 0 0 0 ${ex} ${ey}`;
    };
    // a: below l, left of the transversal (from l's left ray around to the lower ray).
    const [alx, aly] = pt(xTop, yTop, 180 + aValue / 2, 34);
    // Given: above k, left of the transversal (from the upper ray to k's left ray).
    const [glx, gly] = pt(xBot, yBot, 180 - givenAngle / 2, 38);
    const [t1x, t1y] = pt(xTop, yTop, 180 - givenAngle, ext);
    const [t2x, t2y] = pt(xBot, yBot, 360 - givenAngle, ext);
    const figureCode = `
      <div style="text-align:center;">
        <svg viewBox="0 0 ${width} ${height}" style="width:100%; max-width:${width}px; height:auto; font-family:serif; user-select:none;">
          <line x1="40" y1="${yTop}" x2="410" y2="${yTop}" stroke="currentColor" stroke-width="2"/>
          <text x="418" y="${yTop + 5}" font-size="16" font-style="italic" fill="currentColor">ℓ</text>
          <line x1="40" y1="${yBot}" x2="410" y2="${yBot}" stroke="currentColor" stroke-width="2"/>
          <text x="418" y="${yBot + 5}" font-size="16" font-style="italic" fill="currentColor">k</text>
          <line x1="${t1x}" y1="${t1y}" x2="${t2x}" y2="${t2y}" stroke="currentColor" stroke-width="2"/>
          <path d="${arcPath(xTop, yTop, 180, aValue, 16)}" fill="none" stroke="#3b82f6" stroke-width="1.4"/>
          <text x="${alx}" y="${aly + 5}" text-anchor="middle" font-size="15" font-style="italic" fill="#3b82f6">a&#176;</text>
          <path d="${arcPath(xBot, yBot, 180 - givenAngle, givenAngle, 18)}" fill="none" stroke="currentColor" stroke-width="1.4"/>
          <text x="${glx}" y="${gly + 5}" text-anchor="middle" font-size="15" fill="currentColor">${givenAngle}&#176;</text>
        </svg>
      </div>
    `;

    // Each wrong choice is a real slip. The values 180 - g (105 to 125), g
    // (55 to 75), 90 - g (15 to 35), and 360 - g (285 to 305) never collide.
    const correctAnswer = aValue.toString();
    const optionsData = [
      { text: (90 - givenAngle).toString(), isCorrect: false, reason: `it assumes the two angles are complementary, with measures that add to 90; same-side interior angles are supplementary` },
      { text: givenAngle.toString(), isCorrect: false, reason: `${givenAngle} is the measure of the given angle; same-side interior angles are supplementary, not congruent` },
      { text: correctAnswer, isCorrect: true, reason: '' },
      { text: (360 - givenAngle).toString(), isCorrect: false, reason: `it results from subtracting ${givenAngle} from 360 instead of 180` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure, lines $\\ell$ and $k$ are parallel. What is the value of $a$?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. The angle with measure $a^{\\circ}$ and the angle with measure ${givenAngle}° are same-side interior angles: both are between lines $\\ell$ and $k$ and on the same side of the transversal. When two parallel lines are cut by a transversal, same-side interior angles are supplementary, so $a + ${givenAngle} = 180$. Therefore, $a = 180 - ${givenAngle} = ${correctAnswer}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
