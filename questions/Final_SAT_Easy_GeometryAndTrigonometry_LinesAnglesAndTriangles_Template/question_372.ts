import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 372
 *
 * Intent: A triangle is formed with its apex on one of two parallel lines and
 * its base on the other. Given two interior angles (y and z), find the third
 * interior angle x using the triangle angle-sum theorem: x + y + z = 180.
 *
 * FIX ANALYSIS:
 * - Distractors could collide with the correct answer and with each other
 *   (e.g. when y+z=90 the answer x=90 equaled the fixed "90" distractor and the
 *   "180-x" distractor; when y=z the two supplement distractors matched). Now
 *   the draw is retried (bounded, <=50) until the answer and all three
 *   distractors are pairwise distinct.
 * - Explanation letters are read from the shuffled array; each distractor is
 *   explained by its live reason.
 * - Figure rebuilt as a plain, self-contained SVG (house style) whose angle
 *   labels sit at the correct vertices.
 */

export const generator_372 = {
  metadata: {
    id: "372",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Draw two interior angles; retry (bounded) until the answer and all three
    // distractors are pairwise distinct across the full declared ranges.
    let y = 0, z = 0, x = 0;
    let dSuppZ = 0, dSuppY = 0, dSum = 0;
    let tries = 0;
    do {
      y = getRandomInt(15, 40);
      z = getRandomInt(40, 70);
      x = 180 - y - z;               // correct: third interior angle
      dSuppZ = 180 - z;              // supplement of z (common error)
      dSuppY = 180 - y;              // supplement of y (common error)
      dSum = y + z;                  // 180 - x: "forgot to subtract from 180"
      tries++;
    } while (
      tries < 50 &&
      new Set([x, dSuppZ, dSuppY, dSum]).size !== 4
    );

    // Plain SVG figure (house style): two parallel lines with a triangle whose
    // apex is on the top line and whose base sits on the bottom line. The
    // triangle used to be a fixed isosceles shape (base angles near 51
    // degrees whatever y and z were). It is now built in units with the
    // lines 1 apart and base angles y and z, then scaled to fit the box.
    const rad = (d: number) => (d * Math.PI) / 180;
    const left = 1 / Math.tan(rad(y)), right = 1 / Math.tan(rad(z));
    const W = 460, H = 240, PADX = 40;
    const span = left + right + 0.7;              // triangle plus 0.35 units of line on each side
    const sc = Math.min((W - 2 * PADX) / span, 150);
    const top = (H - sc) / 2, bot = top + sc;
    const x0 = (W - span * sc) / 2;
    const Bx = x0 + 0.35 * sc, Ax = Bx + left * sc, Cx = Ax + right * sc;
    const r1 = (v: number) => Math.round(v * 10) / 10;
    const at = (px: number, py: number, deg: number, d: number) => [r1(px + d * Math.cos(rad(deg))), r1(py - d * Math.sin(rad(deg)))];
    const [ylx, yly] = at(Bx, bot, y / 2, Math.max(30, 14 / Math.sin(rad(y / 2))));
    const [zlx, zly] = at(Cx, bot, 180 - z / 2, Math.max(30, 14 / Math.sin(rad(z / 2))));
    const [xlx, xly] = at(Ax, top, (180 + y + 360 - z) / 2, Math.max(26, 14 / Math.sin(rad(x / 2))));
    const figureCode = `
      <div style="display:flex;justify-content:center;">
      <svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${W}px;height:auto;font-family:serif;user-select:none;" role="img" aria-label="Triangle formed between two parallel lines">
        <line x1="${r1(x0)}" y1="${r1(top)}" x2="${r1(x0 + span * sc)}" y2="${r1(top)}" stroke="currentColor" stroke-width="2" />
        <text x="${r1(x0 + span * sc + 10)}" y="${r1(top + 5)}" font-size="16" font-style="italic" fill="currentColor">&#8467;</text>
        <line x1="${r1(x0)}" y1="${r1(bot)}" x2="${r1(x0 + span * sc)}" y2="${r1(bot)}" stroke="currentColor" stroke-width="2" />
        <text x="${r1(x0 + span * sc + 10)}" y="${r1(bot + 5)}" font-size="16" font-style="italic" fill="currentColor">m</text>
        <line x1="${r1(Ax)}" y1="${r1(top)}" x2="${r1(Bx)}" y2="${r1(bot)}" stroke="currentColor" stroke-width="2" />
        <line x1="${r1(Ax)}" y1="${r1(top)}" x2="${r1(Cx)}" y2="${r1(bot)}" stroke="currentColor" stroke-width="2" />
        <text x="${xlx}" y="${xly + 5}" text-anchor="middle" font-size="16" font-style="italic" fill="currentColor">x&#176;</text>
        <text x="${ylx}" y="${yly + 5}" text-anchor="middle" font-size="16" font-style="italic" fill="currentColor">y&#176;</text>
        <text x="${zlx}" y="${zly + 5}" text-anchor="middle" font-size="16" font-style="italic" fill="currentColor">z&#176;</text>
      </svg>
      </div>
    `;

    const correctAnswer = x.toString();

    const optionsData = [
      { text: dSuppZ.toString(), isCorrect: false, reason: "finds the supplement of z instead of using the triangle angle sum" },
      { text: correctAnswer, isCorrect: true },
      { text: dSuppY.toString(), isCorrect: false, reason: "finds the supplement of y instead of using the triangle angle sum" },
      { text: dSum.toString(), isCorrect: false, reason: "adds y and z but forgets to subtract that sum from 180" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure, lines $\\ell$ and $m$ are parallel. The triangle has interior angles $x^{\\circ}$, $y^{\\circ}$, and $z^{\\circ}$, where $y=${y}$ and $z=${z}$. What is the value of $x$?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. The three angles $x^{\\circ}$, $y^{\\circ}$, and $z^{\\circ}$ are the interior angles of the triangle, so by the triangle angle-sum theorem $x + y + z = 180$. Substituting the given values, $x = 180 - (${y} + ${z}) = ${correctAnswer}$. Choice ${incorrectOptions[0].letter} is incorrect because it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect because it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect because it ${incorrectOptions[2].reason}.`
    };
  }
};
