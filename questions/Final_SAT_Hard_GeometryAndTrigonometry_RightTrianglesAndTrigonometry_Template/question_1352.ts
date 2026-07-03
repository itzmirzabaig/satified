import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1352
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [30-60-90 triangle, hypotenuse a random even multiple]
 * - Difficulty factors: [Special right triangle ratios, tangent calculation, angle identification]
 * - Constraints: [Must use 30-60-90 triangle ratios: 1 : sqrt(3) : 2]
 * - Question type: [Figure -> Multiple Choice Text]
 * - Figure generation: [30-60-90 triangle with vertices/angles labeled]
 *
 * FIXES:
 * - Rebuilt the figure as a plain SVG template literal (old nested-IIFE figure
 *   emitted a raw `${hypotenuse` leftover and malformed `B (30^{deg)` labels).
 * - Corrected LaTeX escaping to house convention (`\\sqrt`, `\\frac`, `\\circ`
 *   -> single backslash at runtime); the old file used `\\\\` runs that broke
 *   MathJax and produced an odd/unbalanced `$` count in the explanation.
 * - correctAnswer now exactly equals the correct option string ("\\sqrt{3}").
 * - Distractors rebuilt as distinct trig constants that can never collide with
 *   the answer or each other (no random denominators).
 *
 * MATH: In a 30-60-90 right triangle with the right angle at C, angle B = 30 deg
 * and angle A = 60 deg. tan A = tan 60 deg = (leg opposite A)/(leg adjacent A)
 * = (H/2 * sqrt(3)) / (H/2) = sqrt(3), independent of the hypotenuse H. H is
 * randomized only to vary the figure's side labels.
 */

export const generator_1352 = {
  metadata: {
    id: "1352",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Hypotenuse as an even multiple so the short leg (H/2) is a whole number.
    const half = getRandomInt(2, 9);        // short leg = H/2
    const hypotenuse = half * 2;            // 4, 6, ..., 18
    const shortLeg = half;                  // opposite 30 deg (= AC, adjacent to A)
    // long leg (opposite 60 deg = BC, opposite A) = shortLeg * sqrt(3) -> "half√3"

    // ── Figure: 30-60-90 triangle, right angle at C (bottom-left) ──────────────
    // Legs drawn in true ratio BC : AC = sqrt(3) : 1 so the angles look correct.
    const W = 420, H = 250;
    const cx = 60, cyBase = 200;            // vertex C (right angle)
    const legShortPx = 120;                 // vertical leg AC (short, opp 30 deg at B)
    const legLongPx = Math.round(legShortPx * Math.sqrt(3)); // horizontal leg BC
    const Cpt = { x: cx, y: cyBase };                 // C: right angle
    const Apt = { x: cx, y: cyBase - legShortPx };    // A: 60 deg (top-left)
    const Bpt = { x: cx + legLongPx, y: cyBase };     // B: 30 deg (bottom-right)

    const figureCode = `
      <div style="width:100%;max-width:420px;margin:0 auto;">
        <svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:sans-serif;" xmlns="http://www.w3.org/2000/svg">
          <polygon points="${Apt.x},${Apt.y} ${Bpt.x},${Bpt.y} ${Cpt.x},${Cpt.y}"
            fill="none" stroke="currentColor" stroke-width="2"/>
          <!-- right-angle marker at C -->
          <polyline points="${Cpt.x + 14},${Cpt.y} ${Cpt.x + 14},${Cpt.y - 14} ${Cpt.x},${Cpt.y - 14}"
            fill="none" stroke="currentColor" stroke-width="1.5"/>
          <!-- angle arc at A (60 deg) -->
          <path d="M ${Apt.x + 26},${Apt.y} A 26 26 0 0 1 ${Apt.x + 13},${Apt.y + 22}"
            fill="none" stroke="currentColor" stroke-width="1.4"/>
          <!-- angle arc at B (30 deg) -->
          <path d="M ${Bpt.x - 34},${Bpt.y} A 34 34 0 0 1 ${Bpt.x - 30},${Bpt.y - 17}"
            fill="none" stroke="currentColor" stroke-width="1.4"/>
          <!-- vertex labels -->
          <text x="${Apt.x - 12}" y="${Apt.y - 6}" font-size="15" font-weight="bold" fill="currentColor">A</text>
          <text x="${Bpt.x + 8}" y="${Bpt.y + 6}" font-size="15" font-weight="bold" fill="currentColor">B</text>
          <text x="${Cpt.x - 16}" y="${Cpt.y + 16}" font-size="15" font-weight="bold" fill="currentColor">C</text>
          <!-- angle measures -->
          <text x="${Apt.x + 16}" y="${Apt.y + 24}" font-size="12" fill="currentColor">60&#176;</text>
          <text x="${Bpt.x - 48}" y="${Bpt.y - 8}" font-size="12" fill="currentColor">30&#176;</text>
          <!-- hypotenuse label (AB) -->
          <text x="${(Apt.x + Bpt.x) / 2 + 6}" y="${(Apt.y + Bpt.y) / 2 - 6}" font-size="13" font-weight="bold" fill="currentColor">${hypotenuse}</text>
          <!-- short leg label (AC, opposite 30 deg) -->
          <text x="${Apt.x - 26}" y="${(Apt.y + Cpt.y) / 2 + 4}" font-size="13" fill="currentColor">${shortLeg}</text>
        </svg>
      </div>`;

    const optionsData = [
      { text: `\\sqrt{3}`, isCorrect: true, reason: "correctly applies $\\tan 60^{\\circ} = \\sqrt{3}$" },
      { text: `\\frac{\\sqrt{3}}{3}`, isCorrect: false, reason: "gives $\\tan 30^{\\circ}$, the tangent of the wrong angle" },
      { text: `\\frac{\\sqrt{3}}{2}`, isCorrect: false, reason: "gives $\\sin 60^{\\circ}$, confusing tangent with sine" },
      { text: `\\frac{1}{2}`, isCorrect: false, reason: "gives $\\sin 30^{\\circ}$, using the wrong ratio and wrong angle" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Angle $B = 30^{\\circ}$ and angle $C = 90^{\\circ}$, so angle $A = 60^{\\circ}$. In this 30-60-90 triangle the hypotenuse is $AB = ${hypotenuse}$, the leg opposite $B$ is $AC = ${shortLeg}$, and the leg opposite $A$ is $BC = ${shortLeg}\\sqrt{3}$. For angle $A$, side $BC$ is opposite and side $AC$ is adjacent, so $\\tan A = \\tan 60^{\\circ} = \\frac{\\text{opposite}}{\\text{adjacent}} = \\frac{${shortLeg}\\sqrt{3}}{${shortLeg}} = \\sqrt{3}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `Right triangle $ABC$ is shown, with the right angle at $C$ and angle $B = 30^{\\circ}$. What is the value of $\\tan A$?`,
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `\\sqrt{3}`,
      explanation
    };
  }
};
