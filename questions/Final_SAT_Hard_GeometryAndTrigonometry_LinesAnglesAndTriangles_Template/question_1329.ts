import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question <ID> — ⚠ set the real id in the export name + metadata below.
 *
 * AC = CD, ∠ACD = a°, ∠EBC = e° (a, e randomized) → find x.
 * Figure: A, D, E collinear; C, D, B collinear; sides A–C and E–B.
 *
 * DESIGN RULE: the SVG must never contain numeric angle values — they
 * regenerate on every call. Numbers are interpolated into questionText /
 * explanation / options only. The figure shows: tick marks (AC = CD, true in
 * every generation), unlabeled arcs on the two given angles (C and B), and
 * x° at E (the unknown, in the accent blue).
 *
 * Math: △ACD isosceles ⇒ ∠CDA = (180−a)/2; ∠BDE = ∠CDA (vertical angles);
 * △BDE ⇒ x = 180 − (180−a)/2 − e.
 */

type Pt = { x: number; y: number };

export const generator_XXXX = {                  // ⚠ e.g. generator_1187
  metadata: {
    id: "XXXX",                                  // ⚠ e.g. "1187"
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"                         // keep whatever the bank had
  },

  generate: (): QuestionData => {
    // STEP 1 — randomized givens (fresh values on every generation).
    const beta = getRandomInt(34, 42);   // base angle of isosceles △ACD
    const acd = 180 - 2 * beta;          // GIVEN ∠ACD (even, 96–112; classic 104 occurs)
    const ebc = getRandomInt(55, 63);    // GIVEN ∠EBC (classic 59 occurs)
    const xAns = 180 - beta - ebc;       // ANSWER (75–91, always an integer)

    // STEP 2 — geometry computed from the generated angles (y up, D at origin).
    const rad = (d: number) => (d * Math.PI) / 180;
    const L = 1.5;                        // AC = CD
    const DB = 1.7;
    const DE = (DB * Math.sin(rad(ebc))) / Math.sin(rad(xAns));
    const D: Pt = { x: 0, y: 0 };
    const C: Pt = { x: L * Math.cos(rad(180 - beta)), y: L * Math.sin(rad(180 - beta)) };
    const A: Pt = { x: -2 * L * Math.cos(rad(beta)), y: 0 };                      // A, D, E collinear
    const B: Pt = { x: DB * Math.cos(rad(-beta)), y: DB * Math.sin(rad(-beta)) }; // C, D, B collinear
    const E: Pt = { x: DE, y: 0 };

    // STEP 3 — uniform-scale mapper (angles must render true for every variant).
    const round2 = (v: number) => Math.round(v * 100) / 100;
    const W = 440, H = 250, PAD = 30;
    const xmin = A.x - 0.15, xmax = E.x + 0.15;
    const ymin = B.y - 0.15, ymax = C.y + 0.15;
    const sc = Math.min((W - 2 * PAD) / (xmax - xmin), (H - 2 * PAD) / (ymax - ymin));
    const ox = (W - (xmax - xmin) * sc) / 2;
    const oy = (H - (ymax - ymin) * sc) / 2;
    const mx = (x: number) => round2(ox + (x - xmin) * sc);
    const my = (y: number) => round2(oy + (ymax - y) * sc);

    // STEP 4 — figure pieces (house style, NO numeric labels).
    const line = (P: Pt, Q: Pt, color = "currentColor") =>
      `<line x1="${mx(P.x)}" y1="${my(P.y)}" x2="${mx(Q.x)}" y2="${my(Q.y)}" stroke="${color}" stroke-width="2"/>`;

    const tick = (P: Pt, Q: Pt) => {      // equal-length mark (AC = CD holds in every generation)
      const M: Pt = { x: (P.x + Q.x) / 2, y: (P.y + Q.y) / 2 };
      const dx = Q.x - P.x, dy = Q.y - P.y, Ln = Math.hypot(dx, dy) || 1, h = 0.09;
      const a: Pt = { x: M.x - (dy / Ln) * h, y: M.y + (dx / Ln) * h };
      const b: Pt = { x: M.x + (dy / Ln) * h, y: M.y - (dx / Ln) * h };
      return `<line x1="${mx(a.x)}" y1="${my(a.y)}" x2="${mx(b.x)}" y2="${my(b.y)}" stroke="currentColor" stroke-width="2"/>`;
    };

    // Arc on the interior angle at V between rays V→P and V→Q. Text only for x° —
    // never a number, since the values regenerate.
    const angleMark = (V: Pt, P: Pt, Q: Pt, r: number, text?: string, rText = 0, color = "currentColor") => {
      const a1 = Math.atan2(P.y - V.y, P.x - V.x);
      const a2 = Math.atan2(Q.y - V.y, Q.x - V.x);
      let diff = a2 - a1;
      while (diff <= -Math.PI) diff += 2 * Math.PI;
      while (diff > Math.PI) diff -= 2 * Math.PI;
      let d = "";
      for (let i = 0; i <= 14; i++) {
        const t = a1 + (diff * i) / 14;
        d += `${i === 0 ? "M " : "L "}${mx(V.x + r * Math.cos(t))} ${my(V.y + r * Math.sin(t))} `;
      }
      let out = `<path d="${d}" fill="none" stroke="${color}" stroke-width="1.4"/>`;
      if (text) {
        const mid = a1 + diff / 2;
        out += `<text x="${mx(V.x + rText * Math.cos(mid))}" y="${my(V.y + rText * Math.sin(mid))}" text-anchor="middle" font-size="13" fill="${color}">${text}</text>`;
      }
      return out;
    };

    const dot = (P: Pt) => `<circle cx="${mx(P.x)}" cy="${my(P.y)}" r="2.5" fill="currentColor"/>`;
    const vlabel = (P: Pt, text: string, dx: number, dy: number) =>
      `<text x="${mx(P.x) + dx}" y="${my(P.y) + dy}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor">${text}</text>`;

    const figureCode = `<div style="width:100%;max-width:440px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      line(A, E) + line(C, B) +            // the two straight lines through D
      line(A, C) + line(E, B) +            // the two sides
      tick(A, C) + tick(C, D) +            // GIVEN: AC = CD
      dot(A) + dot(C) + dot(D) + dot(E) + dot(B) +
      vlabel(A, "A", -16, 18) +
      vlabel(C, "C", 0, -10) +
      vlabel(D, "D", -14, 18) +
      vlabel(E, "E", 14, 5) +
      vlabel(B, "B", 14, 5) +
      angleMark(C, A, D, 0.40) +                             // given ∠ACD — arc only, value lives in the stem
      angleMark(B, E, C, 0.38) +                             // given ∠EBC — arc only, value lives in the stem
      angleMark(E, D, B, 0.38, "x\u00B0", 0.60, "#3b82f6") + // asked: x° at E
      `</svg></div>`;

    // STEP 5 — options, distractors computed from THIS generation's values.
    const correctText = String(xAns);
    const distractors = [
      180 - xAns,              // supplement of x
      acd - ebc,               // used (180−acd) as the angle at D
      180 - acd - ebc,         // used acd itself as the angle at D
      beta                     // stopped at the base angle
    ];
    const optionSet = new Set<string>([correctText]);
    for (const d of distractors) {
      if (optionSet.size >= 4) break;
      if (d > 0) optionSet.add(String(d));
    }
    const optionsData = Array.from(optionSet).map(text => ({ text, isCorrect: text === correctText }));
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;

    return {
      questionText: `In the figure above, $AC = CD$, $m\\angle EBC = ${ebc}^\\circ$, and $m\\angle ACD = ${acd}^\\circ$. What is the value of $x$?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. Since $AC = CD$, triangle $ACD$ is isosceles with vertex angle $m\\angle ACD = ${acd}^\\circ$, so $m\\angle CDA = m\\angle CAD = \\frac{180 - ${acd}}{2} = ${beta}^\\circ$. Because $A$, $D$, $E$ are collinear and $C$, $D$, $B$ are collinear, $\\angle BDE$ is vertical to $\\angle CDA$, so $m\\angle BDE = ${beta}^\\circ$; and since $D$ lies on $\\overline{BC}$, $m\\angle DBE = m\\angle EBC = ${ebc}^\\circ$. In triangle $BDE$, $x = 180 - ${ebc} - ${beta} = ${xAns}$.`
    };
  }
};