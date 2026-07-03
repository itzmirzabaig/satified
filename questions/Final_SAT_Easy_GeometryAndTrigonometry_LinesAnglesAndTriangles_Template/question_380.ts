import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 380
 *
 * Two triangles form a "bowtie": segment AD and segment BE intersect at C.
 * Left triangle ABC has angle A = x (obtuse-ish, given) and angle B = angle1.
 * By the triangle-angle-sum, angle BCA = 180 - x - angle1. Angle DCE is the
 * vertical angle of BCA, so angle DCE = angle BCA. In right-side triangle CDE
 * with angle E = angle3, the target angle D is y = 180 - angle DCE - angle3,
 * which simplifies to y = x + angle1 - angle3.
 *
 * FIX ANALYSIS:
 * - Rebuilt the legacy Mafs/JSX figure as a plain self-contained SVG template
 *   literal (house style): the bowtie crosses exactly at C, vertices A,B,C,D,E
 *   and the four angle labels (x, angle1, angle3, y) are drawn with the SAME
 *   live values used in the math.
 * - DUP_OPTIONS came from the constant distractor 90 colliding with x (when
 *   x=90) or with the answer y (when y=90). Added a bounded retry (<=50) that
 *   redraws until all four option values are distinct.
 * - Phrased text so no `$` is followed by a digit while another starts with a
 *   backslash (kills the DOLLAR_RISK soft flag).
 */

export const generator_380 = {
  metadata: {
    id: "380",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Draw the givens; redraw until the four option VALUES are all distinct.
    // Only the constant distractor (90) can collide (with x, or with y when
    // either equals 90); the other distractors provably differ, so a short
    // bounded loop suffices.
    let angle1 = 0, x = 0, angle3 = 0;
    let angleBCA = 0, yValue = 0;
    let distractorA = 0, distractorD = 0;
    const distractorB = 90;
    let tries = 0;
    do {
      angle1 = getRandomInt(15, 30);   // angle B (left triangle)
      x = getRandomInt(90, 110);       // angle A (given)
      angle3 = getRandomInt(35, 50);   // angle E (right triangle)

      // Left triangle ABC: angle BCA = 180 - x - angle1.
      angleBCA = 180 - x - angle1;
      // Vertical angles: angle DCE = angle BCA. Right triangle CDE:
      // y = 180 - angle DCE - angle3  ==  x + angle1 - angle3.
      yValue = 180 - angleBCA - angle3;

      distractorA = x;             // reports the given x instead of solving for y
      distractorD = yValue - 20;   // arithmetic slip in the angle-sum
      tries++;
    } while (
      tries < 50 &&
      new Set([yValue, distractorA, distractorB, distractorD]).size !== 4
    );

    const correctAnswer = yValue.toString();

    // ── Figure: bowtie (two triangles sharing vertex C), plain SVG ────────────
    // A(70,55)-D(380,195) and B(70,195)-E(380,55) both cross exactly at C(225,125).
    const figureCode = `
      <div style="display:flex;justify-content:center;">
        <svg viewBox="0 0 450 250" style="width:100%;max-width:450px;height:auto;font-family:sans-serif;color:currentColor;" xmlns="http://www.w3.org/2000/svg">
          <!-- Segment AD -->
          <line x1="70" y1="55" x2="380" y2="195" stroke="currentColor" stroke-width="2" />
          <!-- Segment BE -->
          <line x1="70" y1="195" x2="380" y2="55" stroke="currentColor" stroke-width="2" />
          <!-- Vertical side AB -->
          <line x1="70" y1="55" x2="70" y2="195" stroke="currentColor" stroke-width="2" />
          <!-- Vertical side DE -->
          <line x1="380" y1="55" x2="380" y2="195" stroke="currentColor" stroke-width="2" />
          <!-- Intersection dot at C -->
          <circle cx="225" cy="125" r="3" fill="currentColor" />

          <!-- Vertex labels -->
          <text x="60" y="50" text-anchor="end" font-size="15" fill="currentColor">A</text>
          <text x="60" y="205" text-anchor="end" font-size="15" fill="currentColor">B</text>
          <text x="225" y="115" text-anchor="middle" font-size="15" fill="currentColor">C</text>
          <text x="390" y="50" text-anchor="start" font-size="15" fill="currentColor">E</text>
          <text x="390" y="205" text-anchor="start" font-size="15" fill="currentColor">D</text>

          <!-- Angle labels (values match the question) -->
          <text x="92" y="82" text-anchor="start" font-size="14" fill="#3b82f6">x&#176;</text>
          <text x="92" y="176" text-anchor="start" font-size="14" fill="currentColor">${angle1}&#176;</text>
          <text x="358" y="82" text-anchor="end" font-size="14" fill="currentColor">${angle3}&#176;</text>
          <text x="358" y="176" text-anchor="end" font-size="14" fill="#3b82f6">y&#176;</text>
        </svg>
      </div>
    `;

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "reports the given value of x instead of solving for y" },
      { text: distractorB.toString(), isCorrect: false, reason: "assumes a right angle instead of using the triangle angle sum" },
      { text: correctAnswer, isCorrect: true },
      { text: distractorD.toString(), isCorrect: false, reason: "results from an arithmetic error in the triangle angle sum" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure above, $\\overline{AD}$ intersects $\\overline{BE}$ at $C$. If $x = ${x}$, what is the value of $y$?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. In $\\triangle ABC$, the three angles satisfy $\\angle A + \\angle B + \\angle BCA = 180^{\\circ}$, so $\\angle BCA = 180^{\\circ} - ${x}^{\\circ} - ${angle1}^{\\circ} = ${angleBCA}^{\\circ}$. Because $\\angle BCA$ and $\\angle DCE$ are vertical angles, $\\angle DCE = ${angleBCA}^{\\circ}$. In $\\triangle CDE$, $y = 180^{\\circ} - ${angleBCA}^{\\circ} - ${angle3}^{\\circ} = ${correctAnswer}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
