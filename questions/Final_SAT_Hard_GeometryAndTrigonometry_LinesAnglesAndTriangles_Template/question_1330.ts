import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1330
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [3-4-5 right triangle scaled by 1-3, answer: NQ = altitude to hypotenuse]
 * - Difficulty factors: [Similar right triangles, geometric mean, altitude to hypotenuse]
 * - Distractor patterns: [close values +/- 0.1, +/- 0.2]
 * - Constraints: [Right triangle with altitude to hypotenuse creates similar triangles]
 * - Question type: [Figure -> Multiple Choice]
 *
 * FIXED (figure mismatch):
 * - The stem carried no numbers, so the whole question depended on the figure, but the
 *   old figure drew only the single segment N->Q (with Q off the hypotenuse) and no
 *   triangle, side labels, or right-angle mark, making it unsolvable.
 * - Rebuilt the figure with a single coordinate mapper: full right triangle M-N-P,
 *   labeled legs MN and NP, hypotenuse M-P, the altitude N-Q with Q as the true foot
 *   of the perpendicular on M-P, and right-angle marks at N and Q.
 */

export const generator_1330 = {
  metadata: {
    id: "1330",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Scaled 3-4-5 right triangle, right angle at N.
    const scale = getRandomInt(1, 3);
    const MN = 3 * scale; // vertical leg (N up to M)
    const NP = 4 * scale; // horizontal leg (N right to P)
    const MP = 5 * scale; // hypotenuse

    // STEP 2: NQ = altitude from N to hypotenuse MP = (leg * leg) / hypotenuse.
    const NQraw = (MN * NP) / MP;
    const NQ = Math.round(NQraw * 10) / 10;

    // STEP 3: Distractors close to the answer (guarded unique, all one-decimal).
    const optionSet = new Set<string>([NQ.toFixed(1)]);
    const offsets = [-0.2, -0.1, 0.1, 0.2, 0.3, -0.3];
    for (const off of offsets) {
      if (optionSet.size >= 4) break;
      const v = Math.round((NQ + off) * 10) / 10;
      if (v > 0) optionSet.add(v.toFixed(1));
    }
    const optionsData = Array.from(optionSet).map(text => ({
      text,
      isCorrect: text === NQ.toFixed(1)
    }));

    // STEP 4: Shuffle and assign letters.
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;

    // STEP 5: Figure. Data coords: N origin, P on +x, M on +y, Q = foot of altitude.
    const nX = 0, nY = 0;
    const pX = NP, pY = 0;
    const mX = 0, mY = MN;
    // Foot of perpendicular from N(0,0) to line MP:  Q = (MN*NP)*(MN, NP)/(MN^2+NP^2).
    const denom = MN * MN + NP * NP;
    const qX = Math.round(((MN * NP) * MN / denom) * 1000) / 1000;
    const qY = Math.round(((MN * NP) * NP / denom) * 1000) / 1000;

    const round2 = (v: number) => Math.round(v * 100) / 100;
    const W = 400, H = 340, PAD = 52;
    const xmin = -1, xmax = NP + 1;
    const ymin = -1, ymax = MN + 1;
    const mx = (x: number) => round2(PAD + (x - xmin) / (xmax - xmin) * (W - 2 * PAD));
    const my = (y: number) => round2(H - PAD - (y - ymin) / (ymax - ymin) * (H - 2 * PAD));

    // Right-angle square at N (between the two legs, opening up-right).
    const raN = `<path d="M ${mx(0.55)} ${my(0)} L ${mx(0.55)} ${my(0.55)} L ${mx(0)} ${my(0.55)}" fill="none" stroke="currentColor" stroke-width="1.2"/>`;

    // Small right-angle tick at Q where the altitude meets MP.
    const ux = (pX - mX), uy = (pY - mY); // direction along MP
    const ulen = Math.sqrt(ux * ux + uy * uy) || 1;
    const ex = ux / ulen, ey = uy / ulen;          // unit along hypotenuse
    const vx = (nX - qX), vy = (nY - qY);           // from Q toward N
    const vlen = Math.sqrt(vx * vx + vy * vy) || 1;
    const fx = vx / vlen, fy = vy / vlen;           // unit from Q toward N
    const t = 0.42;
    const raQ = `<path d="M ${mx(qX + ex * t)} ${my(qY + ey * t)} L ${mx(qX + ex * t + fx * t)} ${my(qY + ey * t + fy * t)} L ${mx(qX + fx * t)} ${my(qY + fy * t)}" fill="none" stroke="currentColor" stroke-width="1.2"/>`;

    const figureCode = `<div style="width:100%;max-width:420px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      // Triangle sides
      `<line x1="${mx(nX)}" y1="${my(nY)}" x2="${mx(pX)}" y2="${my(pY)}" stroke="currentColor" stroke-width="2"/>` +
      `<line x1="${mx(nX)}" y1="${my(nY)}" x2="${mx(mX)}" y2="${my(mY)}" stroke="currentColor" stroke-width="2"/>` +
      `<line x1="${mx(mX)}" y1="${my(mY)}" x2="${mx(pX)}" y2="${my(pY)}" stroke="currentColor" stroke-width="2"/>` +
      // Altitude N->Q
      `<line x1="${mx(nX)}" y1="${my(nY)}" x2="${mx(qX)}" y2="${my(qY)}" stroke="#3b82f6" stroke-width="2"/>` +
      raN + raQ +
      // Vertices
      `<circle cx="${mx(nX)}" cy="${my(nY)}" r="2.5" fill="currentColor"/>` +
      `<circle cx="${mx(pX)}" cy="${my(pY)}" r="2.5" fill="currentColor"/>` +
      `<circle cx="${mx(mX)}" cy="${my(mY)}" r="2.5" fill="currentColor"/>` +
      `<circle cx="${mx(qX)}" cy="${my(qY)}" r="2.5" fill="#3b82f6"/>` +
      // Vertex labels (placed clear of the triangle)
      `<text x="${mx(nX) - 12}" y="${my(nY) + 16}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor">N</text>` +
      `<text x="${mx(pX) + 12}" y="${my(pY) + 16}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor">P</text>` +
      `<text x="${mx(mX) - 14}" y="${my(mY) - 4}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor">M</text>` +
      `<text x="${mx(qX) + 16}" y="${my(qY) - 8}" text-anchor="middle" font-size="14" font-style="italic" fill="#3b82f6">Q</text>` +
      // Side-length labels
      `<text x="${mx(mX) - 20}" y="${my(mY / 2) + 4}" text-anchor="middle" font-size="13" fill="currentColor">${MN}</text>` +
      `<text x="${mx(pX / 2)}" y="${my(0) + 20}" text-anchor="middle" font-size="13" fill="currentColor">${NP}</text>` +
      `</svg></div>`;

    return {
      questionText: `In right triangle $MNP$ above, the right angle is at $N$, $MN = ${MN}$, and $NP = ${NP}$. Segment $NQ$ is drawn from $N$ perpendicular to the hypotenuse $MP$, meeting it at point $Q$. What is the length of $NQ$?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. In right $\\triangle MNP$, the hypotenuse is $MP = \\sqrt{${MN}^2 + ${NP}^2} = ${MP}$. The altitude $NQ$ to the hypotenuse creates $\\triangle NQP$ similar to $\\triangle MNP$, so $\\frac{NQ}{MN} = \\frac{NP}{MP}$. Solving $\\frac{NQ}{${MN}} = \\frac{${NP}}{${MP}}$ gives $NQ = \\frac{${MN} \\times ${NP}}{${MP}} = ${NQ.toFixed(1)}$.`
    };
  }
};
