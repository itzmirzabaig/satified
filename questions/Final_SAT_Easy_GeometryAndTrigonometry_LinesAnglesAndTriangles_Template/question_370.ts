import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 370
 *
 * FIX ANALYSIS:
 * - Added <Mafs> wrapper with viewBox.
 * - Replaced broken <Line.ThroughPoints> with <Line.Segment>.
 * - Replaced <LaTeX> with <Text> to fix double-labeling.
 * - Explicitly calculated coordinates for intersections to ensure labels are placed correctly.
 * - Setup:
 *   - Line j (top) parallel to Line k (bottom).
 *   - Transversal intersects both.
 *   - 'baseAngle' is Top-Right (Acute) at top intersection.
 *   - 'w' is Top-Right (Acute) at bottom intersection. (Corresponding -> Equal).
 *   - 'x' is Top-Left (Obtuse). (Same-side interior -> Supplementary).
 *   - 'y' is Bottom-Left (Acute). (Alternate Exterior -> Equal).
 *   - 'z' is Bottom-Right (Obtuse). (Vertical to Same-Side Interior -> Supplementary).
 * - Distractors updated to be unambiguously false for the visual provided.
 *
 * FIXED (figure — given angle AND all four variables floated with no arcs):
 * - The old figure drew five bare text labels with no arcs, so nothing tied a
 *   label to its wedge: the given-angle label sat ~0.3 units from BOTH of its
 *   boundary lines, and w, x, y, z crowded the bottom intersection with no
 *   indication which wedge each named. The ℓ label was also placed at y = 3.5,
 *   outside the declared [-3, 3] viewBox, so the transversal was unlabeled.
 * - Hidden defect: the transversal had a FIXED slope of 1.5 (~56.3°) while
 *   baseAngle ranges over [35, 55], so the drawn given-angle wedge never
 *   matched its label in any generation.
 * - Rebuilt as a self-contained SVG derived from baseAngle: the transversal's
 *   direction is exactly baseAngle°, so every drawn wedge equals its true
 *   measure. All five angles get arcs with labels on their wedge bisectors;
 *   acute and obtuse arcs at the bottom vertex use different radii so the four
 *   marks read as separate angles rather than one circle. Lines labeled j, k,
 *   and ℓ. No color accent on any variable — the correct option concerns w,
 *   and highlighting it would leak the answer.
 * - Generation logic untouched.
 */

type Pt = { x: number; y: number };
const rad = (d: number) => (d * Math.PI) / 180;
// CCW span from direction a1 to a2, normalized into [0, 360).
const ccwSpan = (a1: number, a2: number) => (((a2 - a1) % 360) + 360) % 360;

export const generator_370 = {
  metadata: {
    id: "370",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const baseAngle = getRandomInt(35, 55); // Acute angle
    const supplementaryAngle = 180 - baseAngle;

    // ---- Figure, derived from baseAngle so the drawing cannot contradict the
    // labels. Math coords, y up. Lines j (y = 1) and k (y = -1); transversal ℓ
    // has direction exactly baseAngle° and crosses j at P and k at Q.
    const cotT = Math.cos(rad(baseAngle)) / Math.sin(rad(baseAngle));
    const dirL: Pt = { x: Math.cos(rad(baseAngle)), y: Math.sin(rad(baseAngle)) };
    const P: Pt = { x: cotT, y: 1 };    // ℓ ∩ j — given angle marked NE of P
    const Q: Pt = { x: -cotT, y: -1 };  // ℓ ∩ k — w NE, x NW, y SW, z SE of Q
    const halfLen = cotT + 1.6;
    const j1: Pt = { x: -halfLen, y: 1 }, j2: Pt = { x: halfLen, y: 1 };
    const k1: Pt = { x: -halfLen, y: -1 }, k2: Pt = { x: halfLen, y: -1 };
    const lTop: Pt = { x: P.x + 1.15 * dirL.x, y: P.y + 1.15 * dirL.y };
    const lBot: Pt = { x: Q.x - 1.15 * dirL.x, y: Q.y - 1.15 * dirL.y };

    // Point at direction a°, distance r from V — every angle label sits on
    // its wedge bisector.
    const at = (V: Pt, a: number, r: number): Pt =>
      ({ x: V.x + r * Math.cos(rad(a)), y: V.y + r * Math.sin(rad(a)) });

    const givenLbl = at(P, baseAngle / 2, 0.95);
    const wLbl = at(Q, baseAngle / 2, 0.78);        // NE wedge bisector
    const xLbl = at(Q, 90 + baseAngle / 2, 0.78);   // NW wedge bisector
    const yLbl = at(Q, 180 + baseAngle / 2, 0.78); // SW wedge bisector
    const zLbl = at(Q, 270 + baseAngle / 2, 0.78); // SE wedge bisector
    const jLbl: Pt = { x: -halfLen - 0.3, y: 1 };
    const kLbl: Pt = { x: -halfLen - 0.3, y: -1 };
    const lLbl: Pt = { x: lTop.x - 0.25 * Math.sin(rad(baseAngle)), y: lTop.y + 0.25 * Math.cos(rad(baseAngle)) };

    // ---- uniform-scale mapper (angles must render true) ----
    const round2 = (v: number) => Math.round(v * 100) / 100;
    const W = 460, H = 310, PAD = 12;
    const xs = [j1.x, j2.x, k1.x, k2.x, lTop.x, lBot.x, jLbl.x, kLbl.x, lLbl.x, givenLbl.x, wLbl.x, xLbl.x, yLbl.x, zLbl.x];
    const ys = [lTop.y, lBot.y, lLbl.y, givenLbl.y, wLbl.y, xLbl.y, yLbl.y, zLbl.y];
    const xmin = Math.min(...xs) - 0.35, xmax = Math.max(...xs) + 0.35;
    const ymin = Math.min(...ys) - 0.35, ymax = Math.max(...ys) + 0.35;
    const sc = Math.min((W - 2 * PAD) / (xmax - xmin), (H - 2 * PAD) / (ymax - ymin));
    const ox = PAD + ((W - 2 * PAD) - (xmax - xmin) * sc) / 2;
    const oy = PAD + ((H - 2 * PAD) - (ymax - ymin) * sc) / 2;
    const mx = (v: number) => round2(ox + (v - xmin) * sc);
    const my = (v: number) => round2(H - (oy + (v - ymin) * sc));

    // ---- SVG pieces ----
    const line = (A: Pt, B: Pt) =>
      `<line x1="${mx(A.x)}" y1="${my(A.y)}" x2="${mx(B.x)}" y2="${my(B.y)}" stroke="currentColor" stroke-width="2"/>`;

    // CCW arc from direction a1 to a2 (span normalized — all directions here
    // are symbolic multiples of baseAngle, no atan2, so the Q1341 branch-cut
    // bug class cannot occur).
    const arc = (V: Pt, a1: number, a2: number, r: number) => {
      const span = ccwSpan(a1, a2);
      let d = "";
      for (let i = 0; i <= 16; i++) {
        const t = rad(a1 + (span * i) / 16);
        d += `${i === 0 ? "M" : "L"}${mx(V.x + r * Math.cos(t))} ${my(V.y + r * Math.sin(t))} `;
      }
      return `<path d="${d}" fill="none" stroke="currentColor" stroke-width="1.4"/>`;
    };

    const text = (p: Pt, s: string, italic: boolean, size = 13) =>
      `<text x="${mx(p.x)}" y="${my(p.y) + 4}" text-anchor="middle" font-size="${size}"${italic ? ' font-style="italic"' : ""} fill="currentColor">${s}</text>`;

    const dot = (p: Pt) => `<circle cx="${mx(p.x)}" cy="${my(p.y)}" r="2.5" fill="currentColor"/>`;

    const figureCode =
      `<div style="width:100%;max-width:460px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      line(j1, j2) + line(k1, k2) + line(lBot, lTop) +   // lines j, k and transversal ℓ
      dot(P) + dot(Q) +
      arc(P, 0, baseAngle, 0.42) +                      // GIVEN: NE of the top intersection
      arc(Q, 0, baseAngle, 0.36) +                      // w: NE (corresponding to the given angle)
      arc(Q, baseAngle, 180, 0.46) +                    // x: NW (obtuse)
      arc(Q, 180, 180 + baseAngle, 0.36) +              // y: SW (acute)
      arc(Q, 180 + baseAngle, 360, 0.46) +              // z: SE (obtuse)
      text(givenLbl, `${baseAngle}\u00B0`, false) +
      text(wLbl, "w", true) + text(xLbl, "x", true) + text(yLbl, "y", true) + text(zLbl, "z", true) +
      text(jLbl, "j", true, 14) + text(kLbl, "k", true, 14) + text(lLbl, "\u2113", true, 14) +
      `</svg></div>`;

    // Correct Condition: Corresponding angles are equal
    const correctCondition = `w = ${baseAngle}`;

    // Distractors
    // x is Obtuse. Claiming x = baseAngle is False.
    // y is Acute. Claiming y = supplementaryAngle is False.
    // z is Obtuse. Claiming z = baseAngle is False.

    const optionsData = [
      { text: correctCondition, isCorrect: true },
      { text: `x = ${baseAngle}`, isCorrect: false, reason: "x is obtuse while the given angle is acute" },
      { text: `y = ${supplementaryAngle}`, isCorrect: false, reason: "y is acute while the supplementary angle is obtuse" },
      { text: `z = ${baseAngle}`, isCorrect: false, reason: "z is obtuse while the given angle is acute" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure shown, line $\\ell$ intersects lines $j$ and $k$. Which additional piece of information is sufficient to prove that lines $j$ and $k$ are parallel?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctCondition,
      explanation: `Choice ${correctOption.letter} is correct. If $w = ${baseAngle}$, then $w$ and the angle measuring $${baseAngle}^{\\circ}$ are congruent corresponding angles. The converse of the Corresponding Angles Postulate states that if two lines are cut by a transversal so that corresponding angles are congruent, then the lines are parallel. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};