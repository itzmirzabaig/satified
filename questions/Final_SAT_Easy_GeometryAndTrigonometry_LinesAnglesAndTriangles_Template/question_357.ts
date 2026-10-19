import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 357
 * ORIGINAL ANALYSIS:
 * Number ranges: [givenAngle: 120-140, not 135]
 * Difficulty factors: [Parallel lines, angle relationships]
 * Distractor patterns: [Given angle, subtracts 90, right angle]
 * Constraints: [Based on specific geometric configuration]
 * Question type: [Figure→Multiple Choice Text]
 *
 * Intent: two parallel lines m and n are cut by a transversal. The obtuse
 * same-side interior angle is the given angle; b is the acute same-side
 * interior angle. Since consecutive (same-side) interior angles are
 * supplementary, b = 180 - givenAngle.
 */
export const generator_357 = {
  metadata: {
    id: "357",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 135 is skipped: 135 - 90 would equal the answer, 45, and the old code
    // then fell back to a made-up "arithmetic error" choice.
    let givenAngle = 135;
    while (givenAngle === 135) givenAngle = getRandomInt(120, 140); // obtuse interior angle
    const correctAnswerVal = 180 - givenAngle; // b, acute interior angle (40-60)

    // --- Figure: two parallel horizontal lines cut by a transversal (plain SVG) ---
    // The transversal used to be fixed at about 47 degrees, and the b label sat
    // on it. It now rises at exactly b degrees, both angles have arcs, and each
    // label sits on its angle's bisector.
    const width = 450;
    const height = 250;
    const yTop = 80;
    const yBot = 175;
    const acuteRad = (correctAnswerVal * Math.PI) / 180;
    const dx = (yBot - yTop) / Math.tan(acuteRad);
    const xTopHit = 225 + dx / 2; // transversal crosses line m here
    const xBotHit = 225 - dx / 2; // transversal crosses line n here
    const ext = 60;
    const r1 = (v: number) => Math.round(v * 10) / 10;
    // Point at angle deg (degrees, counterclockwise, y up) and distance d from (x, y).
    const pt = (x: number, y: number, deg: number, d: number) =>
      [r1(x + d * Math.cos((deg * Math.PI) / 180)), r1(y - d * Math.sin((deg * Math.PI) / 180))];
    const arcPath = (x: number, y: number, from: number, span: number, r: number) => {
      const [sx, sy] = pt(x, y, from, r);
      const [ex, ey] = pt(x, y, from + span, r);
      return `M ${sx} ${sy} A ${r} ${r} 0 ${span > 180 ? 1 : 0} 0 ${ex} ${ey}`;
    };
    // Given angle: below m, right of t (from the down-left ray around to m's right ray).
    const gFrom = 180 + correctAnswerVal;
    const [gx, gy] = pt(xTopHit, yTop, gFrom + givenAngle / 2, 34);
    // Angle b: above n, right of t (from n's right ray to the up-right ray).
    const bDist = Math.max(32, 15 / Math.sin(acuteRad / 2));
    const [bx, by] = pt(xBotHit, yBot, correctAnswerVal / 2, bDist);
    const [t1x, t1y] = pt(xBotHit, yBot, 180 + correctAnswerVal, ext);
    const [t2x, t2y] = pt(xTopHit, yTop, correctAnswerVal, ext);
    const figureCode = `
      <div style="text-align:center;">
        <svg viewBox="0 0 ${width} ${height}" style="width:100%; max-width:${width}px; height:auto; font-family:serif; user-select:none;">
          <!-- Parallel line m -->
          <line x1="40" y1="${yTop}" x2="410" y2="${yTop}" stroke="currentColor" stroke-width="2"/>
          <text x="418" y="${yTop + 5}" font-size="16" font-style="italic" fill="currentColor">m</text>
          <!-- Parallel line n -->
          <line x1="40" y1="${yBot}" x2="410" y2="${yBot}" stroke="currentColor" stroke-width="2"/>
          <text x="418" y="${yBot + 5}" font-size="16" font-style="italic" fill="currentColor">n</text>
          <!-- Transversal -->
          <line x1="${t1x}" y1="${t1y}" x2="${t2x}" y2="${t2y}" stroke="currentColor" stroke-width="2"/>
          <!-- Given (obtuse) same-side interior angle at line m, lower right -->
          <path d="${arcPath(xTopHit, yTop, gFrom, givenAngle, 16)}" fill="none" stroke="currentColor" stroke-width="1.4"/>
          <text x="${gx}" y="${gy + 5}" text-anchor="middle" font-size="15" fill="currentColor">${givenAngle}&#176;</text>
          <!-- Unknown angle b at line n, upper right (same side) -->
          <path d="${arcPath(xBotHit, yBot, 0, correctAnswerVal, 18)}" fill="none" stroke="#3b82f6" stroke-width="1.4"/>
          <text x="${bx}" y="${by + 5}" text-anchor="middle" font-size="15" font-style="italic" fill="#3b82f6">b&#176;</text>
        </svg>
      </div>
    `;

    // --- Options: correct plus 3 real slips. With 135 skipped, the values
    // 180 - g, g, g - 90, and 90 never collide. ---
    const optionsData = [
      { text: `${correctAnswerVal}`, isCorrect: true, reason: "" },
      { text: `${givenAngle}`, isCorrect: false, reason: `${givenAngle} is the measure of the given angle; same-side interior angles are supplementary, not congruent` },
      { text: `${givenAngle - 90}`, isCorrect: false, reason: `it results from subtracting 90 from ${givenAngle}; same-side interior angles are supplementary, so ${givenAngle} must be subtracted from 180` },
      { text: "90", isCorrect: false, reason: `it assumes the angle with measure $b^{\\circ}$ is a right angle; the transversal is not perpendicular to the parallel lines` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure, lines $m$ and $n$ are parallel. What is the value of $b$?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The angle with measure ${givenAngle}° and the angle with measure $b^{\\circ}$ are same-side interior angles. Because lines $m$ and $n$ are parallel, same-side interior angles are supplementary, so $b + ${givenAngle} = 180$. Subtracting ${givenAngle} from both sides gives $b = ${correctAnswerVal}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
