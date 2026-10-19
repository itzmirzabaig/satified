import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 353
*
* ORIGINAL ANALYSIS:
* - Number ranges: [angle: 25-50, not 45]
* - Difficulty factors: [Parallel lines, same-side exterior angles, supplementary angles]
* - Distractor patterns: [Same angle, complementary assumption, subtracts from 360]
* - Constraints: [x + givenAngle = 180]
* - Question type: [Figure→Multiple Choice Text]
*
* FIXED:
* - Options are g, 90 - g, 360 - g, and the correct 180 - g. A given angle
*   of 45 is skipped because 90 - 45 = 45, so the four are always distinct.
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
    // 45 is skipped: its complement, 45, would repeat the given angle.
    let givenAngle = 45;
    while (givenAngle === 45) givenAngle = getRandomInt(25, 50);
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

    // Each wrong choice is a real slip; the old third choice was the answer
    // plus or minus a random amount. With g in [25, 50] and not 45, the values
    // g, 90 - g, 360 - g, and 180 - g never collide.
    const optionsData = [
      { text: givenAngle.toString(), isCorrect: false, reason: `it assumes the two angles are congruent; same-side exterior angles are supplementary, not congruent` },
      { text: (90 - givenAngle).toString(), isCorrect: false, reason: `it assumes the two angles are complementary, with measures that add to 90 degrees; same-side exterior angles are supplementary` },
      { text: (360 - givenAngle).toString(), isCorrect: false, reason: `it results from subtracting ${givenAngle} from 360 instead of 180` },
      { text: correctAnswer, isCorrect: true, reason: '' }
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
      explanation: `Choice ${correctOption.letter} is correct. When two parallel lines are cut by a transversal, same-side exterior angles are supplementary, so their measures add to 180 degrees. This gives $x + ${givenAngle} = 180$, so $x = 180 - ${givenAngle} = ${correctAnswer}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};