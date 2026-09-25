import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 892
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Triangle coordinates: [0,0], [3,0], [0,3] roughly - simple single-digit]
 * - Difficulty factors: [Right triangle trigonometry, cofunction identity, visual recognition]
 * - Distractor patterns: [tan X (wrong ratio), tan Y (wrong angle), cos X (wrong cofunction)]
 * - Constraints: [Must show right triangle with right angle at Z, X and Y are acute angles]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Static right triangle with labeled vertices]
 *
 * FIXED (no triangle visible): the old figure's "sides" were two hardcoded
 * segments spanning (0,0.3)-(0.3,0.3)-(0.3,0) — a 0.3x0.3 square corner at
 * the origin — while the generated legX/legY were never drawn. The figure
 * now draws the ACTUAL right triangle: Z at the origin (right angle), Y at
 * (legX, 0), X at (0, legY), with a right-angle mark at Z, arcs marking
 * angles X and Y, and vertex labels at the real vertices. No coordinate
 * axes (a pure geometry figure). Question logic unchanged.
 *
 * FIXED (literal "\\" in the options): the four option texts contained
 * LaTeX commands with no $...$ delimiters, so they displayed as raw
 * "\\tan X". Now wrapped in $...$. correctAnswer shares the same wrapped
 * string form. No question logic changed.
 *
 * FIXED (round 2 — the X label was invisible): the triangle was sized to
 * the full plot height, so the top vertex landed at y = 0 — the viewBox's
 * top edge — and the X label, drawn 8px above it, sat at y = -8, clipped
 * outside the canvas in most draws. The layout now reserves real margins
 * (bottom vertex at y = 270, height budget 230 with a 40px top reserve),
 * so the apex never rises above y = 40 and every vertex label is inside
 * the viewBox in every draw.
 */

export const generator_892 = {
  metadata: {
    id: "892",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate right triangle dimensions
    // Simple right triangle with legs of different lengths
    const legX = getRandomInt(2, 5); // Horizontal leg
    const legY = getRandomInt(2, 5); // Vertical leg
    const hypotenuse = Math.sqrt(legX * legX + legY * legY);
    
    // STEP 2: Figure — the actual right triangle (pixel coords, y down).
    // Z at bottom-left (right angle), Y at bottom-right, X at top-left.
    // Margins: Z at y=270 (30px bottom), and the vertical budget keeps the
    // apex at y >= 40 so the X label (8px above the apex) always fits.
    const D2R = Math.PI / 180;
    const W = 450, H = 300;
    const sx = 70, sy = 270;
    const pxPerUnit = Math.min((W - sx - 40) / legX, (sy - 40) / legY);
    const Zp = { x: sx, y: sy };
    const Yp = { x: sx + legX * pxPerUnit, y: sy };
    const Xp = { x: sx, y: sy - legY * pxPerUnit };

    const r1 = (v: number) => Math.round(v * 10) / 10;
    const line = (a: { x: number; y: number }, b: { x: number; y: number }) =>
      `<line x1="${r1(a.x)}" y1="${r1(a.y)}" x2="${r1(b.x)}" y2="${r1(b.y)}" stroke="currentColor" stroke-width="2"/>`;
    const label = (p: { x: number; y: number }, t: string, dx = 0, dy = 0, size = 14) =>
      `<text x="${r1(p.x + dx)}" y="${r1(p.y + dy)}" text-anchor="middle" font-size="${size}" font-style="italic" fill="currentColor">${t}</text>`;

    // Right-angle square at Z (legs along +x and up).
    const rm = 16;
    const rightMark = `<path d="M ${r1(Zp.x + rm)} ${Zp.y} L ${r1(Zp.x + rm)} ${r1(Zp.y - rm)} L ${Zp.x} ${r1(Zp.y - rm)}" fill="none" stroke="currentColor" stroke-width="1.4"/>`;

    // Arcs on angles X (top vertex) and Y (bottom-right vertex), each between
    // the hypotenuse ray and the leg. Screen angles (y down): ray X->Z points
    // straight down (90°), ray X->Y down-right; ray Y->Z points left (180°),
    // ray Y->X up-left. Arcs span exactly those wedges.
    const angHypFromX = Math.atan2(Yp.y - Xp.y, Yp.x - Xp.x) * 180 / Math.PI;
    const angHypFromY = Math.atan2(Xp.y - Yp.y, Xp.x - Yp.x) * 180 / Math.PI;
    const arc = (vx: number, vy: number, a1: number, a2: number, rPx: number) => {
      let d = "";
      for (let i = 0; i <= 12; i++) {
        const t = (a1 + ((a2 - a1) * i) / 12) * D2R;
        d += `${i === 0 ? "M" : "L"}${r1(vx + rPx * Math.cos(t))} ${r1(vy + rPx * Math.sin(t))} `;
      }
      return `<path d="${d}" fill="none" stroke="currentColor" stroke-width="1.4"/>`;
    };
    const rArc = 30;

    const figureCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      line(Zp, Yp) +   // leg ZY (horizontal)
      line(Zp, Xp) +   // leg ZX (vertical)
      line(Xp, Yp) +   // hypotenuse XY
      rightMark +
      arc(Xp.x, Xp.y, angHypFromX, 90, rArc) +
      arc(Yp.x, Yp.y, angHypFromY, 180, rArc) +
      label(Zp, "Z", -14, 18) +
      label(Xp, "X", -12, -8) +
      label(Yp, "Y", 14, 16) +
      `</svg></div>`;
    
    // STEP 3: The answer is cos(Y) due to cofunction identity: sin(X) = cos(Y)
    const correctText = "$\\cos Y$";
    
    // STEP 4: Create options with tracking — wrapped in $...$ so they render.
    const optionsData = [
      { text: "$\\tan X$", isCorrect: false, reason: "uses tangent instead of sine/cosine relationship" },
      { text: "$\\tan Y$", isCorrect: false, reason: "uses wrong angle and wrong ratio" },
      { text: "$\\cos X$", isCorrect: false, reason: "uses same angle instead of complementary angle" },
      { text: correctText, isCorrect: true, reason: "" }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 6: Build explanation
    const explanation = `Choice ${correctLetter} is correct. In a right triangle, $\\sin(X) = \\frac{\\text{opposite}}{\\text{hypotenuse}} = \\frac{${legX}}{${hypotenuse.toFixed(2)}}$ and $\\cos(Y) = \\frac{\\text{adjacent to Y}}{\\text{hypotenuse}} = \\frac{${legX}}{${hypotenuse.toFixed(2)}}$. Since angles $X$ and $Y$ are complementary (add to $90^{\\circ}$), $\\sin(X) = \\cos(Y)$ by the cofunction identity. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    // STEP 7: Return question data
    return {
      questionText: "Triangle $XYZ$ shown is a right triangle. Which of the following has the same value as $\\sin X$?",
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};