import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 378
 *
 * Intent: Transversal c cuts parallel lines s and t. The angle x and the given
 * angle are consecutive interior (same-side interior) angles, so they are
 * supplementary: x + givenAngle = 180, giving x = 180 - givenAngle.
 *
 * FIX ANALYSIS:
 * - Old options {180-g, g, g-20, 90} collided: (180-g)==(g-20) at g=100 and
 *   (g-20)==90 at g=110. The set is now
 *   {180-g, g, 90, 360-g}, collision-free over g in [100,140].
 * - Rebuilt the explanation to name the correct choice by its shuffled LETTER
 *   and to explain each distractor (previously it used the option's number and
 *   gave no distractor reasoning).
 * - Cleared DOLLAR_RISK: the given measure appears in prose with a degree sign,
 *   so no math segment begins with a digit.
 * - Figure rebuilt as plain SVG (house style) with both marked angles on the
 *   same side of the transversal in the interior strip between s and t.
 */

export const generator_378 = {
  metadata: {
    id: "378",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const givenAngle = getRandomInt(100, 140);
    const xValue = 180 - givenAngle; // consecutive interior angles are supplementary

    // Distractors constructed pairwise-distinct from the answer and each other
    // across the entire [100,140] range (verified exhaustively).
    const dGiven = givenAngle;          // uses the given angle directly (thinks equal)
    const dRight = 90;                  // assumes a right angle
    const dReflex = 360 - givenAngle;   // subtracts from 360

    // Plain SVG figure (house style): transversal c cutting parallel lines s
    // and t at the true angle (it used to be fixed at about 56 degrees, and the
    // c label sat on the line). The given angle is below s and left of c; x is
    // above t and left of c (same-side interior angles). Directions are in
    // degrees, counterclockwise with y up; c's upper ray points at 180 - x.
    const W = 460, H = 260, yTop = 80, yBot = 180, ext = 55;
    const dx = (yBot - yTop) / Math.tan((xValue * Math.PI) / 180);
    const xTop = 230 - dx / 2, xBot = 230 + dx / 2;
    const r1 = (v: number) => Math.round(v * 10) / 10;
    const pt = (px: number, py: number, deg: number, d: number) =>
      [r1(px + d * Math.cos((deg * Math.PI) / 180)), r1(py - d * Math.sin((deg * Math.PI) / 180))];
    const arcPath = (px: number, py: number, from: number, span: number, r: number) => {
      const [sx, sy] = pt(px, py, from, r);
      const [ex, ey] = pt(px, py, from + span, r);
      return `M ${sx} ${sy} A ${r} ${r} 0 0 0 ${ex} ${ey}`;
    };
    const [glx, gly] = pt(xTop, yTop, 180 + givenAngle / 2, 34);
    const [xlx, xly] = pt(xBot, yBot, 180 - xValue / 2, 36);
    const [c1x, c1y] = pt(xTop, yTop, 180 - xValue, ext);
    const [c2x, c2y] = pt(xBot, yBot, 360 - xValue, ext);
    const [clx, cly] = pt(xBot, yBot, 360 - xValue, ext + 13);
    const figureCode = `
      <div style="display:flex;justify-content:center;">
      <svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${W}px;height:auto;font-family:serif;user-select:none;" role="img" aria-label="Transversal cutting two parallel lines">
        <line x1="20" y1="${yTop}" x2="420" y2="${yTop}" stroke="currentColor" stroke-width="2" />
        <text x="428" y="${yTop + 5}" font-size="16" font-style="italic" fill="currentColor">s</text>
        <line x1="20" y1="${yBot}" x2="420" y2="${yBot}" stroke="currentColor" stroke-width="2" />
        <text x="428" y="${yBot + 5}" font-size="16" font-style="italic" fill="currentColor">t</text>
        <line x1="${c1x}" y1="${c1y}" x2="${c2x}" y2="${c2y}" stroke="currentColor" stroke-width="2" />
        <text x="${clx}" y="${cly + 5}" text-anchor="middle" font-size="16" font-style="italic" fill="currentColor">c</text>
        <path d="${arcPath(xTop, yTop, 180, givenAngle, 16)}" fill="none" stroke="currentColor" stroke-width="1.4"/>
        <text x="${glx}" y="${gly + 5}" text-anchor="middle" font-size="15" fill="currentColor">${givenAngle}&#176;</text>
        <path d="${arcPath(xBot, yBot, 180 - xValue, xValue, 18)}" fill="none" stroke="#3b82f6" stroke-width="1.4"/>
        <text x="${xlx}" y="${xly + 5}" text-anchor="middle" font-size="15" font-style="italic" fill="#3b82f6">x&#176;</text>
      </svg>
      </div>
    `;

    const correctAnswer = xValue.toString();

    // The old third choice was the answer minus 10. The values 180 - g (40 to
    // 80), g (100 to 140), 90, and 360 - g (220 to 260) never collide.
    const optionsData = [
      { text: correctAnswer, isCorrect: true, reason: '' },
      { text: dGiven.toString(), isCorrect: false, reason: `${givenAngle} is the measure of the given angle; same-side interior angles are supplementary, not congruent` },
      { text: dRight.toString(), isCorrect: false, reason: `it assumes line $c$ is perpendicular to lines $s$ and $t$, which the figure does not show` },
      { text: dReflex.toString(), isCorrect: false, reason: `it results from subtracting ${givenAngle} from 360 instead of 180` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure shown, line $c$ intersects parallel lines $s$ and $t$. What is the value of $x$?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. The angle with measure $x^{\\circ}$ and the ${givenAngle}° angle are same-side interior angles: both are between lines $s$ and $t$ and on the same side of line $c$. When parallel lines are cut by a transversal, same-side interior angles are supplementary, so $x + ${givenAngle} = 180$, which gives $x = ${xValue}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
