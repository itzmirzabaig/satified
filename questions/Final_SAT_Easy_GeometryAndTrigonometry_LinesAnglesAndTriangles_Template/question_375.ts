import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 375
 *
 * Intent: Two parallel lines m and n are cut by a transversal. A given angle and
 * the angle w sit in matching (corresponding) positions, so corresponding angles
 * are congruent and w = givenAngle.
 *
 * FIX ANALYSIS:
 * - Old distractors {round(g/10), 180-g-12, 180-g} collided (round(g/10) equalled
 *   180-g-12 at g=153) and were pedagogically weak. Replaced with meaningful,
 *   pairwise-distinct distractors {180-g (supplementary error), 360-g,
 *   90 (right-angle assumption)} — verified collision-free over g in [110,160].
 * - Explanation letters read from the shuffled array; each distractor explained.
 * - Cleared DOLLAR_RISK: the given measure is written in prose with a degree sign
 *   so no math segment begins with a digit (no bare $number for MathJax to pair).
 * - Figure rebuilt as plain SVG (house style) with the two marked angles in
 *   matching upper-right corners of the two intersections.
 */

export const generator_375 = {
  metadata: {
    id: "375",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const givenAngle = getRandomInt(110, 160);

    // Distractors are constructed to be pairwise distinct from the answer and
    // from each other across the entire [110,160] range (verified exhaustively).
    const dSupp = 180 - givenAngle; // treats the pair as supplementary
    const dReflex = 360 - givenAngle; // subtracts from 360
    const dRight = 90; // assumes a right angle

    // Plain SVG figure (house style): two parallel lines cut by a transversal
    // that falls to the right at the true angle (it used to be fixed at about
    // 120 degrees for every given angle from 110 to 160). The corresponding
    // pair is drawn either above each line and right of the transversal, or
    // below each line and left of it; both wedges measure givenAngle.
    const acute = 180 - givenAngle;
    const upper = Math.random() < 0.5;
    const W = 460, H = 260, yTop = 80, yBot = 180, ext = 60;
    const dx = (yBot - yTop) / Math.tan((acute * Math.PI) / 180);
    const xTop = 230 - dx / 2, xBot = 230 + dx / 2;
    const r1 = (v: number) => Math.round(v * 10) / 10;
    const pt = (x: number, y: number, deg: number, d: number) =>
      [r1(x + d * Math.cos((deg * Math.PI) / 180)), r1(y - d * Math.sin((deg * Math.PI) / 180))];
    const arcPath = (x: number, y: number, from: number, r: number) => {
      const [sx, sy] = pt(x, y, from, r);
      const [ex, ey] = pt(x, y, from + givenAngle, r);
      return `M ${sx} ${sy} A ${r} ${r} 0 0 0 ${ex} ${ey}`;
    };
    const from = upper ? 0 : 180; // wedge start; each wedge spans givenAngle
    const [glx, gly] = pt(xTop, yTop, from + givenAngle / 2, 34);
    const [wlx, wly] = pt(xBot, yBot, from + givenAngle / 2, 34);
    const [t1x, t1y] = pt(xTop, yTop, givenAngle, ext);
    const [t2x, t2y] = pt(xBot, yBot, givenAngle + 180, ext);
    const figureCode = `
      <div style="display:flex;justify-content:center;">
      <svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${W}px;height:auto;font-family:serif;user-select:none;" role="img" aria-label="Two parallel lines cut by a transversal">
        <line x1="20" y1="${yTop}" x2="420" y2="${yTop}" stroke="currentColor" stroke-width="2" />
        <text x="428" y="${yTop + 5}" font-size="16" font-style="italic" fill="currentColor">m</text>
        <line x1="20" y1="${yBot}" x2="420" y2="${yBot}" stroke="currentColor" stroke-width="2" />
        <text x="428" y="${yBot + 5}" font-size="16" font-style="italic" fill="currentColor">n</text>
        <line x1="${t1x}" y1="${t1y}" x2="${t2x}" y2="${t2y}" stroke="currentColor" stroke-width="2" />
        <path d="${arcPath(xTop, yTop, from, 16)}" fill="none" stroke="currentColor" stroke-width="1.4"/>
        <text x="${glx}" y="${gly + 5}" text-anchor="middle" font-size="15" fill="currentColor">${givenAngle}&#176;</text>
        <path d="${arcPath(xBot, yBot, from, 16)}" fill="none" stroke="#3b82f6" stroke-width="1.4"/>
        <text x="${wlx}" y="${wly + 5}" text-anchor="middle" font-size="15" font-style="italic" fill="#3b82f6">w&#176;</text>
      </svg>
      </div>
    `;

    const correctAnswer = givenAngle.toString();

    // The old third choice was the given angle minus 10. With g from 110 to
    // 160, the values g, 180 - g, 360 - g, and 90 never collide.
    const optionsData = [
      { text: dSupp.toString(), isCorrect: false, reason: `${dSupp} is the measure of an angle supplementary to the ${givenAngle}° angle; corresponding angles are congruent, not supplementary` },
      { text: dReflex.toString(), isCorrect: false, reason: `it results from subtracting ${givenAngle} from 360; corresponding angles are congruent, so $w$ equals ${givenAngle}` },
      { text: dRight.toString(), isCorrect: false, reason: `it assumes the transversal is perpendicular to the parallel lines, which the figure does not show` },
      { text: correctAnswer, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure, line $m$ is parallel to line $n$ and both are cut by a transversal. What is the value of $w$?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. The ${givenAngle}° angle and the angle with measure $w^{\\circ}$ lie in matching positions at the two intersections: each is ${upper ? 'above its line and to the right of' : 'below its line and to the left of'} the transversal. So they are corresponding angles. When two parallel lines are cut by a transversal, corresponding angles are congruent, so $w = ${givenAngle}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
