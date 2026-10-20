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
      tries++;
    } while (
      tries < 50 &&
      new Set([yValue, x, 90, angleBCA]).size !== 4
    );

    const correctAnswer = yValue.toString();

    // ── Figure: bowtie drawn to its true angles ───────────────────────────────
    // The old figure was a fixed symmetric bowtie, so the angle labeled x (90
    // to 110 degrees) drew at about 66 degrees. Now C is at the origin with CA
    // and CB making angle BCA, D and E on the rays opposite A and B (so the
    // angles at C are vertical angles), and the side lengths come from the law
    // of sines (CB = 1, CE = 1). The result is scaled to fit the box.
    type P = { x: number; y: number };
    const rad = (d: number) => (d * Math.PI) / 180;
    const dir = (deg: number, r: number): P => ({ x: r * Math.cos(rad(deg)), y: r * Math.sin(rad(deg)) });
    const half = angleBCA / 2;
    const C: P = { x: 0, y: 0 };
    const A = dir(180 - half, Math.sin(rad(angle1)) / Math.sin(rad(x)));
    const B = dir(180 + half, 1);
    const E = dir(half, 1);
    const D = dir(-half, Math.sin(rad(angle3)) / Math.sin(rad(yValue)));
    const pts = [A, B, C, D, E];
    const W = 450, H = 250, PAD = 34;
    const xmin = Math.min(...pts.map(p => p.x)), xmax = Math.max(...pts.map(p => p.x));
    const ymin = Math.min(...pts.map(p => p.y)), ymax = Math.max(...pts.map(p => p.y));
    const sc = Math.min((W - 2 * PAD) / (xmax - xmin), (H - 2 * PAD) / (ymax - ymin));
    const ox = (W - (xmax - xmin) * sc) / 2, oy = (H - (ymax - ymin) * sc) / 2;
    const r1 = (v: number) => Math.round(v * 10) / 10;
    const S = (p: P) => ({ x: r1(ox + (p.x - xmin) * sc), y: r1(H - (oy + (p.y - ymin) * sc)) });
    const [sA, sB, sC, sD, sE] = pts.map(S);
    // Unit vector from p to q in screen coordinates.
    const unit = (p: P, q: P) => { const dx = q.x - p.x, dy = q.y - p.y, l = Math.hypot(dx, dy); return { x: dx / l, y: dy / l }; };
    // Label inside the angle at vertex v (between rays to p and q), and the
    // vertex letter just outside it.
    const marks = (v: P, p: P, q: P, deg: number) => {
      const u1 = unit(v, p), u2 = unit(v, q);
      const bx = u1.x + u2.x, by = u1.y + u2.y, bl = Math.hypot(bx, by);
      const d = Math.max(24, 13 / Math.sin(rad(deg / 2)));
      return { lab: { x: r1(v.x + bx / bl * d), y: r1(v.y + by / bl * d) }, out: { x: r1(v.x - bx / bl * 14), y: r1(v.y - by / bl * 14) } };
    };
    const mA = marks(sA, sB, sC, x), mB = marks(sB, sA, sC, angle1), mE = marks(sE, sC, sD, angle3), mD = marks(sD, sC, sE, yValue);
    const cOut = { x: sC.x, y: r1(sC.y - 12) };
    const txt = (p: P, s: string, opts = '') => `<text x="${p.x}" y="${r1(p.y + 5)}" text-anchor="middle" font-size="14"${opts} fill="currentColor">${s}</text>`;
    const figureCode = `
      <div style="display:flex;justify-content:center;">
        <svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${W}px;height:auto;font-family:serif;" xmlns="http://www.w3.org/2000/svg">
          <line x1="${sA.x}" y1="${sA.y}" x2="${sD.x}" y2="${sD.y}" stroke="currentColor" stroke-width="2" />
          <line x1="${sB.x}" y1="${sB.y}" x2="${sE.x}" y2="${sE.y}" stroke="currentColor" stroke-width="2" />
          <line x1="${sA.x}" y1="${sA.y}" x2="${sB.x}" y2="${sB.y}" stroke="currentColor" stroke-width="2" />
          <line x1="${sD.x}" y1="${sD.y}" x2="${sE.x}" y2="${sE.y}" stroke="currentColor" stroke-width="2" />
          <circle cx="${sC.x}" cy="${sC.y}" r="3" fill="currentColor" />
          ${txt(mA.out, 'A', ' font-style="italic"')}${txt(mB.out, 'B', ' font-style="italic"')}${txt(cOut, 'C', ' font-style="italic"')}${txt(mD.out, 'D', ' font-style="italic"')}${txt(mE.out, 'E', ' font-style="italic"')}
          ${txt(mA.lab, 'x&#176;', ' font-style="italic"')}${txt(mB.lab, `${angle1}&#176;`)}${txt(mE.lab, `${angle3}&#176;`)}${txt(mD.lab, 'y&#176;', ' font-style="italic"')}
        </svg>
      </div>
    `;

    // The old fourth choice was the answer minus 20. The loop above keeps
    // y, x, 90, and angle BCA distinct.
    const optionsData = [
      { text: x.toString(), isCorrect: false, reason: `${x} is the given value of $x$, the measure of angle $A$, not the value of $y$` },
      { text: "90", isCorrect: false, reason: `it assumes angle $D$ is a right angle; the measure of angle $D$ must be found from the angle sum of triangle $CDE$` },
      { text: correctAnswer, isCorrect: true, reason: '' },
      { text: angleBCA.toString(), isCorrect: false, reason: `${angleBCA} is the measure of angle $BCA$, and of its vertical angle $DCE$, not the measure of angle $D$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure, $\\overline{AD}$ intersects $\\overline{BE}$ at $C$. If $x = ${x}$, what is the value of $y$?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. The sum of the measures of the angles of a triangle is $180^{\\circ}$. In triangle $ABC$, the measure of angle $BCA$ is $180^{\\circ} - ${x}^{\\circ} - ${angle1}^{\\circ} = ${angleBCA}^{\\circ}$. Angles $BCA$ and $DCE$ are vertical angles, so angle $DCE$ also measures $${angleBCA}^{\\circ}$. In triangle $CDE$, $y = 180 - ${angleBCA} - ${angle3} = ${correctAnswer}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
