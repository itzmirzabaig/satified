import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 354
*
* ORIGINAL ANALYSIS:
* - Number ranges: [angle: 115-160, not 135]
* - Difficulty factors: [Parallel lines, congruent angle pairs, transversal properties]
* - Distractor patterns: [supplementary angle, subtracts from 360, subtracts 90]
* - Constraints: [Obtuse angle, lines must be parallel]
* - Question type: [Figure→Multiple Choice Text]
*
* FIXED:
* - The old Mafs figure was a fixed sketch on a black box with no line labels,
*   and the explanation called the marked angles corresponding when they were
*   alternate exterior angles. Two wrong choices were "drops the hundreds
*   digit" and "divides by 10".
* - The figure is now an SVG drawn to the true angle, with lines m, n, and t
*   labeled. The marked pair is chosen at random from the four pairs of
*   congruent obtuse angles, and the explanation names the pair.
* - The given angle runs from 115 to 160 so the transversal is not nearly
*   flat, and skips 135, where 180 - g would equal g - 90.
*/

type Pt = { x: number; y: number };
const rad = (d: number) => (d * Math.PI) / 180;

export const generator_354 = {
  metadata: {
    id: "354",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    let givenAngle = 135;
    while (givenAngle === 135) givenAngle = getRandomInt(115, 160); // obtuse; correct answer = givenAngle
    const acute = 180 - givenAngle; // angle between the transversal and each parallel line

    // Each intersection has two obtuse angles: above the line and left of t
    // ("LA"), and below the line and right of t ("RB").
    const pair = getRandomElement([
      { top: 'LA', bottom: 'LA', name: 'corresponding angles' },
      { top: 'RB', bottom: 'RB', name: 'corresponding angles' },
      { top: 'LA', bottom: 'RB', name: 'alternate exterior angles' },
      { top: 'RB', bottom: 'LA', name: 'alternate interior angles' }
    ]);

    // Math coords, y up. Line m is y = 1 and line n is y = -1; the transversal
    // rises at the acute angle and crosses m at M and n at N.
    const cotA = Math.cos(rad(acute)) / Math.sin(rad(acute));
    const dirT: Pt = { x: Math.cos(rad(acute)), y: Math.sin(rad(acute)) };
    const M: Pt = { x: cotA, y: 1 };
    const N: Pt = { x: -cotA, y: -1 };
    const halfLen = cotA + 1.8;
    const m1: Pt = { x: -halfLen, y: 1 }, m2: Pt = { x: halfLen, y: 1 };
    const n1: Pt = { x: -halfLen, y: -1 }, n2: Pt = { x: halfLen, y: -1 };
    const tTop: Pt = { x: M.x + 1.2 * dirT.x, y: M.y + 1.2 * dirT.y };
    const tBot: Pt = { x: N.x - 1.2 * dirT.x, y: N.y - 1.2 * dirT.y };

    // Start direction of each obtuse wedge (it spans givenAngle degrees CCW).
    const startDir = (pos: string) => (pos === 'LA' ? acute : 180 + acute);
    const bisector = (V: Pt, pos: string, r: number): Pt => {
      const t = rad(startDir(pos) + givenAngle / 2);
      return { x: V.x + r * Math.cos(t), y: V.y + r * Math.sin(t) };
    };
    const gLbl = bisector(M, pair.top, 0.72);
    const wLbl = bisector(N, pair.bottom, 0.72);
    const mLbl: Pt = { x: -halfLen - 0.3, y: 1 };
    const nLbl: Pt = { x: -halfLen - 0.3, y: -1 };
    const tLbl: Pt = { x: tTop.x + 0.22 * dirT.x, y: tTop.y + 0.22 * dirT.y };

    // Uniform-scale mapper so angles render true.
    const round2 = (v: number) => Math.round(v * 100) / 100;
    const W = 460, H = 300, PAD = 12;
    const xs = [m1.x, m2.x, tTop.x, tBot.x, mLbl.x, tLbl.x];
    const ys = [1, -1, tTop.y, tBot.y, tLbl.y, gLbl.y, wLbl.y];
    const xmin = Math.min(...xs) - 0.3, xmax = Math.max(...xs) + 0.3;
    const ymin = Math.min(...ys) - 0.3, ymax = Math.max(...ys) + 0.3;
    const sc = Math.min((W - 2 * PAD) / (xmax - xmin), (H - 2 * PAD) / (ymax - ymin));
    const ox = PAD + ((W - 2 * PAD) - (xmax - xmin) * sc) / 2;
    const oy = PAD + ((H - 2 * PAD) - (ymax - ymin) * sc) / 2;
    const mx = (v: number) => round2(ox + (v - xmin) * sc);
    const my = (v: number) => round2(H - (oy + (v - ymin) * sc));

    const line = (A: Pt, B: Pt) =>
      `<line x1="${mx(A.x)}" y1="${my(A.y)}" x2="${mx(B.x)}" y2="${my(B.y)}" stroke="currentColor" stroke-width="2"/>`;
    const arc = (V: Pt, pos: string, r: number, color: string) => {
      const a1 = startDir(pos);
      let d = '';
      for (let i = 0; i <= 20; i++) {
        const t = rad(a1 + (givenAngle * i) / 20);
        d += `${i === 0 ? 'M' : 'L'}${mx(V.x + r * Math.cos(t))} ${my(V.y + r * Math.sin(t))} `;
      }
      return `<path d="${d}" fill="none" stroke="${color}" stroke-width="1.4"/>`;
    };
    const text = (p: Pt, s: string, italic: boolean, color = 'currentColor', size = 14) =>
      `<text x="${mx(p.x)}" y="${my(p.y) + 5}" text-anchor="middle" font-size="${size}" font-family="serif"${italic ? ' font-style="italic"' : ''} fill="${color}">${s}</text>`;

    const figureCode =
      `<div style="width:100%;max-width:460px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      line(m1, m2) + line(n1, n2) + line(tBot, tTop) +
      arc(M, pair.top, 0.32, 'currentColor') +
      arc(N, pair.bottom, 0.32, '#3b82f6') +
      text(gLbl, `${givenAngle}°`, false) +
      text(wLbl, 'w°', true, '#3b82f6') +
      text(mLbl, 'm', true) + text(nLbl, 'n', true) + text(tLbl, 't', true) +
      `</svg></div>`;

    const correctAnswer = givenAngle.toString();

    // Each wrong choice is a real slip. With g in [115, 160] and not 135, the
    // values g, 180 - g, 360 - g, and g - 90 never collide.
    const optionsData = [
      { text: (180 - givenAngle).toString(), isCorrect: false, reason: `${180 - givenAngle} is the measure of an angle supplementary to the ${givenAngle}° angle; ${pair.name} are congruent, not supplementary` },
      { text: (360 - givenAngle).toString(), isCorrect: false, reason: `it results from subtracting ${givenAngle} from 360; ${pair.name} are congruent, so $w$ equals ${givenAngle}` },
      { text: correctAnswer, isCorrect: true, reason: '' },
      { text: (givenAngle - 90).toString(), isCorrect: false, reason: `it results from subtracting 90 from ${givenAngle}; ${pair.name} are congruent, so $w$ equals ${givenAngle}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure, line $m$ is parallel to line $n$, and line $t$ intersects both lines. What is the value of $w$?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. Lines $m$ and $n$ are parallel and line $t$ is a transversal. The angle with measure ${givenAngle}° and the angle with measure $w^{\\circ}$ are ${pair.name}. When two parallel lines are cut by a transversal, ${pair.name} are congruent, so $w = ${givenAngle}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
