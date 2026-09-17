import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 353
*
* ORIGINAL ANALYSIS:
* - Number ranges: [angle: 25-50]
* - Difficulty factors: [Parallel lines, same-side exterior angles, supplementary angles]
* - Distractor patterns: [Same angle, complementary assumption, calculation error]
* - Constraints: [x + givenAngle = 180]
* - Question type: [Figure→Multiple Choice Text]
*
* FIXED:
* - Old distractors collided at givenAngle = 45: (90 - g) equaled g, and
*   (90 + g) equaled the correct answer (180 - g), causing DUP_OPTIONS and the
*   downstream LETTER_MISMATCH. Rebuilt so all four options are distinct for
*   every draw in [25, 50]:
*     correct = 180 - g            (in [130, 155])
*     d1      = g                  (congruent misconception, in [25, 50])
*     d2      = 90 - g             (complementary misconception, in [40, 65];
*                                   nudged if it equals d1 at g = 45)
*     d3      = arithmetic slip on the correct answer, kept >= 100 so it can
*               never collide with d1/d2, and != correct.
*
* FIXED (figure — given-angle label sat on the transversal):
* - The old Mafs figure placed the given-angle label exactly ON the transversal
*   (Text at (2.5, 2) lies on the drawn line y = x - 0.5) and drew no arcs, so
*   neither marked angle showed which of the four wedges it named.
* - Two hidden defects besides: the transversal had a FIXED 45-degree slope
*   while givenAngle ranges over [25, 50] (drawn wedge = label only at 45), and
*   x° sat interior-left of t — not the same-side EXTERIOR pair the
*   explanation cites.
* - Rebuilt as a self-contained SVG derived from givenAngle: the transversal's
*   direction is exactly givenAngle°, so every drawn wedge equals its label by
*   construction. Both angles get arcs with labels inside their wedges:
*   givenAngle above line m, x° below line n, both RIGHT of the transversal —
*   a true same-side exterior (supplementary) pair. Lines labeled m, n, t.
* - Generation logic untouched.
*/

type Pt = { x: number; y: number };
const rad = (d: number) => (d * Math.PI) / 180;
// CCW span from direction a1 to a2, normalized into [0, 360).
const ccwSpan = (a1: number, a2: number) => (((a2 - a1) % 360) + 360) % 360;

export const generator_353 = {
  metadata: {
    id: "353",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const givenAngle = getRandomInt(25, 50);
    const xValue = 180 - givenAngle; // correct answer, in [130, 155]

    // STEP 3 — figure, derived from givenAngle so the drawing cannot contradict
    // the labels. Math coords, y up. Parallel lines m (y = 1) and n (y = -1);
    // the transversal has direction exactly givenAngle° (up-right) and crosses
    // m at M and n at N, passing through the origin (M and N are symmetric).
    const cotG = Math.cos(rad(givenAngle)) / Math.sin(rad(givenAngle));
    const dirT: Pt = { x: Math.cos(rad(givenAngle)), y: Math.sin(rad(givenAngle)) };
    const M: Pt = { x: cotG, y: 1 };    // t ∩ m — given angle marked here (above m, right of t)
    const N: Pt = { x: -cotG, y: -1 }; // t ∩ n — x marked here (below n, right of t)
    const halfLen = cotG + 1.6;
    const m1: Pt = { x: -halfLen, y: 1 }, m2: Pt = { x: halfLen, y: 1 };
    const n1: Pt = { x: -halfLen, y: -1 }, n2: Pt = { x: halfLen, y: -1 };
    const tTop: Pt = { x: M.x + 1.15 * dirT.x, y: M.y + 1.15 * dirT.y };
    const tBot: Pt = { x: N.x - 1.15 * dirT.x, y: N.y - 1.15 * dirT.y };

    // Label anchors: angle labels sit on their wedge bisectors, clear of both
    // boundary lines; line labels sit just past the ends of their lines.
    const gLbl: Pt = { x: M.x + 0.9 * Math.cos(rad(givenAngle / 2)), y: M.y + 0.9 * Math.sin(rad(givenAngle / 2)) };
    const xLbl: Pt = { x: N.x + 0.8 * Math.cos(rad(xValue / 2)), y: N.y - 0.8 * Math.sin(rad(xValue / 2)) };
    const mLbl: Pt = { x: -halfLen - 0.3, y: 1 };
    const nLbl: Pt = { x: -halfLen - 0.3, y: -1 };
    const tLbl: Pt = { x: tTop.x - 0.22 * Math.sin(rad(givenAngle)), y: tTop.y + 0.22 * Math.cos(rad(givenAngle)) };

    // STEP 4 — uniform-scale mapper (angles must render true).
    const round2 = (v: number) => Math.round(v * 100) / 100;
    const W = 460, H = 310, PAD = 12;
    const xs = [m1.x, m2.x, n1.x, n2.x, tTop.x, tBot.x, mLbl.x, nLbl.x, tLbl.x, gLbl.x, xLbl.x];
    const ys = [1, -1, tTop.y, tBot.y, tLbl.y, gLbl.y, xLbl.y];
    const xmin = Math.min(...xs) - 0.35, xmax = Math.max(...xs) + 0.35;
    const ymin = Math.min(...ys) - 0.35, ymax = Math.max(...ys) + 0.35;
    const sc = Math.min((W - 2 * PAD) / (xmax - xmin), (H - 2 * PAD) / (ymax - ymin));
    const ox = PAD + ((W - 2 * PAD) - (xmax - xmin) * sc) / 2;
    const oy = PAD + ((H - 2 * PAD) - (ymax - ymin) * sc) / 2;
    const mx = (v: number) => round2(ox + (v - xmin) * sc);
    const my = (v: number) => round2(H - (oy + (v - ymin) * sc));

    // STEP 5 — SVG pieces.
    const line = (A: Pt, B: Pt) =>
      `<line x1="${mx(A.x)}" y1="${my(A.y)}" x2="${mx(B.x)}" y2="${my(B.y)}" stroke="currentColor" stroke-width="2"/>`;

    // CCW arc from direction a1 to a2 (span normalized — no atan2 anywhere in
    // this figure, so the Q1341 branch-cut bug class cannot occur).
    const arc = (V: Pt, a1: number, a2: number, r: number, color = "currentColor") => {
      const span = ccwSpan(a1, a2);
      let d = "";
      for (let i = 0; i <= 16; i++) {
        const t = rad(a1 + (span * i) / 16);
        d += `${i === 0 ? "M" : "L"}${mx(V.x + r * Math.cos(t))} ${my(V.y + r * Math.sin(t))} `;
      }
      return `<path d="${d}" fill="none" stroke="${color}" stroke-width="1.4"/>`;
    };

    const text = (p: Pt, s: string, italic: boolean, color = "currentColor", size = 13) =>
      `<text x="${mx(p.x)}" y="${my(p.y) + 4}" text-anchor="middle" font-size="${size}"${italic ? ' font-style="italic"' : ""} fill="${color}">${s}</text>`;

    const figureCode =
      `<div style="width:100%;max-width:460px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      line(m1, m2) + line(n1, n2) + line(tBot, tTop) +   // lines m, n and transversal t
      arc(M, 0, givenAngle, 0.42) +                     // GIVEN: above m, right of t
      arc(N, givenAngle - 180, 0, 0.42, "#3b82f6") +     // ASKED: below n, right of t (same-side exterior)
      text(gLbl, `${givenAngle}\u00B0`, false) +
      text(xLbl, "x\u00B0", true, "#3b82f6") +
      text(mLbl, "m", true, "currentColor", 14) +
      text(nLbl, "n", true, "currentColor", 14) +
      text(tLbl, "t", true, "currentColor", 14) +
      `</svg></div>`;

    const correctAnswer = xValue.toString();

    // Concept distractors (both always < correct).
    const dCongruent = givenAngle;          // thinks the angles are congruent
    let dComplement = 90 - givenAngle;      // wrongly assumes a complementary pair
    if (dComplement === dCongruent) dComplement += 5; // only at g = 45; stays in range and distinct

    // Arithmetic-slip distractor near the correct answer, guaranteed distinct
    // from correct and kept >= 100 so it cannot collide with the two concept
    // distractors (which are <= 65).
    const used = new Set<number>([xValue, dCongruent, dComplement]);
    let dSlip = 0;
    let tries = 0;
    while (tries++ < 50) {
      const delta = getRandomInt(1, 9) * (Math.random() < 0.5 ? -1 : 1);
      const candidate = xValue + delta;
      if (candidate >= 100 && candidate < 180 && !used.has(candidate)) { dSlip = candidate; break; }
    }
    if (dSlip === 0) {
      let filler = 1;
      while (used.has(xValue + filler)) filler++;
      dSlip = xValue + filler;
    }

    const optionsData = [
      { text: dCongruent.toString(), isCorrect: false, reason: "uses the given angle, assuming the two angles are congruent rather than supplementary" },
      { text: dComplement.toString(), isCorrect: false, reason: "incorrectly assumes the two angles are complementary" },
      { text: dSlip.toString(), isCorrect: false, reason: "makes an arithmetic error when subtracting from 180" },
      { text: correctAnswer, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure, line $m$ is parallel to line $n$, and line $t$ intersects both lines. What is the value of $x$?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. When two parallel lines are cut by a transversal, same-side exterior angles are supplementary, so their measures add to 180 degrees. This gives $x + ${givenAngle} = 180$, so $x = 180 - ${givenAngle} = ${correctAnswer}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};