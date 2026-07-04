import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1332
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [vertex angle QPR randomized, answer: half of it]
 * - Difficulty factors: [Isosceles triangles, vertical angles, straight-angle supplement]
 * - Distractor patterns: [N/A - fill in the blank]
 * - Constraints: [NP = QP and MP = PR create two isosceles triangles]
 * - Question type: [Figure -> Fill in the blank]
 *
 * FIXED (figure mismatch):
 * - The angle measure was the only quantitative input and it lived ONLY in the figure,
 *   but the figure printed the literal placeholder "$angleQPR^circ" (a single-quoted
 *   string with no interpolation), so the number appeared nowhere and the item was
 *   unsolvable.
 * - Rebuilt the figure with a single coordinate mapper: the two intersecting lines
 *   M-P-Q and N-P-R meeting at P, with the angle QPR drawn as an arc labelled with its
 *   actual value. Also stated the angle in the stem so the item is solvable from text.
 * - Constrained the angle to be even so the (half-angle) answer is an exact integer.
 */

export const generator_1332 = {
  metadata: {
    id: "1332",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Vertex angle QPR (even -> half-angle answer is an exact integer).
    const angleQPR = getRandomInt(25, 35) * 2; // 50..70, even
    const angleMPR = 180 - angleQPR;

    // STEP 2: angle QMR is a base angle of isosceles triangle MPR (MP = PR).
    //   base angle = (180 - angleMPR) / 2 = angleQPR / 2.
    const answer = angleQPR / 2;

    // STEP 3: Figure. Lines N-P-R (through origin, horizontal) and M-P-Q cross at P.
    //   Place R at 0deg, Q at angleQPR, so the drawn angle QPR equals angleQPR.
    const round2 = (v: number) => Math.round(v * 100) / 100;
    const W = 400, H = 320, PAD = 46;
    const L = 4; // half-length of each line in data units
    const span = L + 1.4;
    const xmin = -span, xmax = span, ymin = -span, ymax = span;
    const mx = (x: number) => round2(PAD + (x - xmin) / (xmax - xmin) * (W - 2 * PAD));
    const my = (y: number) => round2(H - PAD - (y - ymin) / (ymax - ymin) * (H - 2 * PAD));

    const rad = (deg: number) => (deg * Math.PI) / 180;
    const th = rad(angleQPR);
    // Endpoints (P at origin).
    const Rx = L, Ry = 0;                 // R: right
    const Nx = -L, Ny = 0;                // N: left
    const Qx = L * Math.cos(th), Qy = L * Math.sin(th);   // Q: upper-right
    const Mx = -L * Math.cos(th), My = -L * Math.sin(th); // M: lower-left

    // Arc for angle QPR at P, from ray PR (0deg) to ray PQ (angleQPR).
    const ar = 1.5; // arc radius in data units
    const a0x = ar * Math.cos(0), a0y = ar * Math.sin(0);
    const a1x = ar * Math.cos(th), a1y = ar * Math.sin(th);
    const largeArc = angleQPR > 180 ? 1 : 0;
    // SVG y is inverted, so sweep from PR up to PQ is a clockwise (sweep-flag 0) arc in screen space.
    const arc = `<path d="M ${mx(a0x)} ${my(a0y)} A ${round2((mx(ar) - mx(0)))} ${round2((my(0) - my(ar)))} 0 ${largeArc} 0 ${mx(a1x)} ${my(a1y)}" fill="none" stroke="#3b82f6" stroke-width="1.8"/>`;
    // Angle label placed just outside the arc, at the bisector direction.
    const lblR = 2.35;
    const lblx = lblR * Math.cos(th / 2), lbly = lblR * Math.sin(th / 2);

    const line = (x1: number, y1: number, x2: number, y2: number) =>
      `<line x1="${mx(x1)}" y1="${my(y1)}" x2="${mx(x2)}" y2="${my(y2)}" stroke="currentColor" stroke-width="2.5"/>`;
    const dot = (x: number, y: number) => `<circle cx="${mx(x)}" cy="${my(y)}" r="2.6" fill="currentColor"/>`;
    const lbl = (x: number, y: number, t: string) =>
      `<text x="${mx(x)}" y="${my(y)}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor">${t}</text>`;

    const figureCode = `<div style="width:100%;max-width:420px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      // The two full lines through P.
      line(Nx, Ny, Rx, Ry) +
      line(Mx, My, Qx, Qy) +
      arc +
      // Intersection point.
      dot(0, 0) +
      // Vertex labels (nudged outward from each endpoint).
      lbl(Nx - 0.5, Ny + 0.5, 'N') +
      lbl(Rx + 0.5, Ry + 0.4, 'R') +
      lbl(Qx + 0.5, Qy + 0.5, 'Q') +
      lbl(Mx - 0.5, My - 0.5, 'M') +
      `<text x="${mx(0.35)}" y="${my(-0.55)}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor">P</text>` +
      // Angle value label.
      `<text x="${mx(lblx)}" y="${my(lbly)}" text-anchor="middle" font-size="13" fill="#3b82f6">${angleQPR}°</text>` +
      `</svg></div>`;

    return {
      questionText: `In the figure above, $MQ$ and $NR$ intersect at point $P$, with $NP = QP$ and $MP = PR$. If the measure of $\\angle QPR$ is $${angleQPR}^\\circ$, what is the measure, in degrees, of $\\angle QMR$? (Disregard the degree symbol when gridding your answer.)`,
      figureCode: figureCode,
      options: [],
      correctAnswer: answer.toString(),
      explanation: `Since $MQ$ is a straight line, $\\angle MPR$ and $\\angle QPR$ are supplementary, so $\\angle MPR = 180 - ${angleQPR} = ${angleMPR}^\\circ$. In triangle $MPR$, the given $MP = PR$ makes it isosceles, so its base angles $\\angle PMR$ and $\\angle PRM$ are equal. They sum to $180 - ${angleMPR} = ${angleQPR}$, so each base angle is $\\frac{${angleQPR}}{2} = ${answer}^\\circ$. Since $\\angle QMR$ is the same angle as $\\angle PMR$, $\\angle QMR = ${answer}^\\circ$.`
    };
  }
};
