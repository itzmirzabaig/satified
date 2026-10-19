import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 358
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [obtuse angle: 135-150]
 * - Difficulty factors: [Corresponding angles, linear pair, supplementary angles]
 * - Distractor patterns: [Finds x instead of sum, assumes right angle, chooses given angle]
 * - Constraints: [x + givenAngle = 180]
 * - Question type: [Figure→Multiple Choice Text]
 */

export const generator_358 = {
  metadata: {
    id: "358",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const givenAngle = getRandomInt(135, 150);
    const acute = 180 - givenAngle; // the value of x

    // Geometric setup: parallel lines p (top) and q (bottom) cut by t, which
    // rises at exactly the acute angle. x is above p and right of t; the
    // given obtuse angle is above q and left of t. The old Mafs figure put both
    // angles at line p as a linear pair, so the parallel lines played no part,
    // and it drew t at about 49 degrees on a gridded black box.
    const width = 450, height = 250, yTop = 80, yBot = 175, ext = 55;
    const acuteRad = (acute * Math.PI) / 180;
    const dx = (yBot - yTop) / Math.tan(acuteRad);
    const xTopHit = 225 + dx / 2, xBotHit = 225 - dx / 2;
    const r1 = (v: number) => Math.round(v * 10) / 10;
    const pt = (x: number, y: number, deg: number, d: number) =>
      [r1(x + d * Math.cos((deg * Math.PI) / 180)), r1(y - d * Math.sin((deg * Math.PI) / 180))];
    const arcPath = (x: number, y: number, from: number, span: number, r: number) => {
      const [sx, sy] = pt(x, y, from, r);
      const [ex, ey] = pt(x, y, from + span, r);
      return `M ${sx} ${sy} A ${r} ${r} 0 0 0 ${ex} ${ey}`;
    };
    const [xlx, xly] = pt(xTopHit, yTop, acute / 2, Math.max(32, 15 / Math.sin(acuteRad / 2)));
    const [glx, gly] = pt(xBotHit, yBot, acute + givenAngle / 2, 36);
    const [t1x, t1y] = pt(xBotHit, yBot, 180 + acute, ext);
    const [t2x, t2y] = pt(xTopHit, yTop, acute, ext);
    // The t label goes at the lower end, clear of the x label at the top.
    const [tlx, tly] = pt(xBotHit, yBot, 180 + acute, ext + 12);
    const figureCode = `
      <div style="text-align:center;">
        <svg viewBox="0 0 ${width} ${height}" style="width:100%; max-width:${width}px; height:auto; font-family:serif; user-select:none;">
          <line x1="40" y1="${yTop}" x2="410" y2="${yTop}" stroke="currentColor" stroke-width="2"/>
          <text x="418" y="${yTop + 5}" font-size="16" font-style="italic" fill="currentColor">p</text>
          <line x1="40" y1="${yBot}" x2="410" y2="${yBot}" stroke="currentColor" stroke-width="2"/>
          <text x="418" y="${yBot + 5}" font-size="16" font-style="italic" fill="currentColor">q</text>
          <line x1="${t1x}" y1="${t1y}" x2="${t2x}" y2="${t2y}" stroke="currentColor" stroke-width="2"/>
          <text x="${tlx}" y="${tly + 5}" text-anchor="middle" font-size="16" font-style="italic" fill="currentColor">t</text>
          <path d="${arcPath(xTopHit, yTop, 0, acute, 18)}" fill="none" stroke="#3b82f6" stroke-width="1.4"/>
          <text x="${xlx}" y="${xly + 5}" text-anchor="middle" font-size="15" font-style="italic" fill="#3b82f6">x&#176;</text>
          <path d="${arcPath(xBotHit, yBot, acute, givenAngle, 16)}" fill="none" stroke="currentColor" stroke-width="1.4"/>
          <text x="${glx}" y="${gly + 5}" text-anchor="middle" font-size="15" fill="currentColor">${givenAngle}&#176;</text>
        </svg>
      </div>
    `;

    // x + givenAngle is 180 for every draw; the wrong choices are real slips
    // and never collide (x is at most 45, the given angle at least 135).
    const correctAnswer = "180";

    const optionsData = [
      { text: acute.toString(), isCorrect: false, reason: `${acute} is the value of $x$, not the value of $x + ${givenAngle}$` },
      { text: "90", isCorrect: false, reason: `it assumes the two angles are complementary; the transversal is not perpendicular to the parallel lines` },
      { text: givenAngle.toString(), isCorrect: false, reason: `it assumes the angle with measure $x^{\\circ}$ is congruent to the ${givenAngle}° angle, which gives the value of $x$, not $x + ${givenAngle}$; the two angles are supplementary` },
      { text: correctAnswer, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure, line $p$ is parallel to line $q$, and line $t$ intersects both lines. What is the value of $x + ${givenAngle}$?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. Since lines $p$ and $q$ are parallel, the angle with measure $x^{\\circ}$, above line $p$ and to the right of line $t$, is congruent to its corresponding angle above line $q$ and to the right of line $t$. That corresponding angle and the ${givenAngle}° angle form a linear pair, so their measures add to 180. Therefore, $x + ${givenAngle} = 180$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};