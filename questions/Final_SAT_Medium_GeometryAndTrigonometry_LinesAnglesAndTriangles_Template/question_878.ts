import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 878
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angles: 55-65 and 60-70 degrees]
 * - Difficulty factors: [Parallel lines, triangle sum, corresponding angles]
 * - Distractor patterns: [A: took angle BDC directly, C: took angle ACE directly, D: sum of two angles]
 * - Constraints: [AE || BD, triangle ACE sum = 180]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Triangle with parallel line segment]
 *
 * FIXED:
 * - Rebuilt corrupted nested-IIFE figure as a plain SVG template literal that
 *   draws the actual triangle ACE, the parallel chord BD, and the two given
 *   angle labels (values match the live variables every draw).
 * - Collapsed \\\\ backslash runs to \\ so MathJax renders \circ/\parallel/etc.
 * - Bounded retry guarantees the four option values are pairwise distinct.
 * - correctAnswer now equals the correct option's text exactly (was "N°").
 */

export const generator_878 = {
  metadata: {
    id: "878",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate angles so the four option values are all distinct.
    // AE || BD => angle AEC = angle BDC (corresponding). Triangle ACE sum = 180
    // => angle CAE = 180 - angle ACE - angle BDC.
    let angleBDC = 0, angleACE = 0, angleCAE = 0;
    let tries = 0;
    do {
      angleBDC = getRandomInt(55, 65);
      angleACE = getRandomInt(60, 70);
      angleCAE = 180 - angleACE - angleBDC;
      tries++;
    } while (
      tries < 50 &&
      // reject when any two of {correct, distractorA, distractorC} coincide
      (angleCAE === angleBDC ||
        angleCAE === angleACE ||
        angleBDC === angleACE)
    );
    // distractorD = angleBDC + angleACE is always >= 115, so it never collides.

    // STEP 2: Build a plain SVG figure. Triangle A(0,0) C(3,4) E(6,0); the chord
    // BD is parallel to AE with B on CA and D on CE. Data-space -> pixel mapping.
    const W = 420, H = 300, P = 40;
    const xmin = -0.5, xmax = 6.5, ymin = -0.5, ymax = 4.8;
    const mx = (x: number) => P + ((x - xmin) / (xmax - xmin)) * (W - 2 * P);
    const my = (y: number) => H - P - ((y - ymin) / (ymax - ymin)) * (H - 2 * P);

    const A = { x: 0, y: 0 };
    const C = { x: 3, y: 4 };
    const E = { x: 6, y: 0 };
    // B on CA and D on CE at 45% up from the base (so BD sits between AE and C).
    const t = 0.55;
    const B = { x: A.x + (C.x - A.x) * t, y: A.y + (C.y - A.y) * t };
    const D = { x: E.x + (C.x - E.x) * t, y: E.y + (C.y - E.y) * t };

    const figureCode = `<div style="width:100%;max-width:420px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">
      <polygon points="${mx(A.x)},${my(A.y)} ${mx(C.x)},${my(C.y)} ${mx(E.x)},${my(E.y)}" fill="none" stroke="currentColor" stroke-width="2"/>
      <line x1="${mx(B.x)}" y1="${my(B.y)}" x2="${mx(D.x)}" y2="${my(D.y)}" stroke="#3b82f6" stroke-width="2"/>
      <text x="${mx(A.x) - 12}" y="${my(A.y) + 14}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor">A</text>
      <text x="${mx(C.x)}" y="${my(C.y) - 8}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor">C</text>
      <text x="${mx(E.x) + 12}" y="${my(E.y) + 14}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor">E</text>
      <text x="${mx(B.x) - 12}" y="${my(B.y)}" text-anchor="middle" font-size="14" font-style="italic" fill="#3b82f6">B</text>
      <text x="${mx(D.x) + 12}" y="${my(D.y)}" text-anchor="middle" font-size="14" font-style="italic" fill="#3b82f6">D</text>
      <text x="${mx(D.x) - 16}" y="${my(D.y) + 16}" text-anchor="middle" font-size="12" fill="currentColor">${angleBDC}&#176;</text>
      <text x="${mx(C.x) - 2}" y="${my(C.y) + 26}" text-anchor="middle" font-size="12" fill="currentColor">${angleACE}&#176;</text>
    </svg></div>`;

    // STEP 3: Create options (values guaranteed distinct by the retry above).
    const distractorA = angleBDC;              // took angle BDC directly
    const distractorC = angleACE;              // took angle ACE directly
    const distractorD = angleBDC + angleACE;   // added the two given angles

    const optionsData = [
      { text: `$${distractorA}^\\circ$`, isCorrect: false, reason: "incorrectly assumes angle CAE equals angle BDC" },
      { text: `$${angleCAE}^\\circ$`, isCorrect: true },
      { text: `$${distractorC}^\\circ$`, isCorrect: false, reason: "incorrectly uses angle ACE as the answer" },
      { text: `$${distractorD}^\\circ$`, isCorrect: false, reason: "incorrectly adds the two given angles" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `In the figure above, segments $AE$ and $BD$ are parallel. If angle $BDC$ measures $${angleBDC}^{\\circ}$ and angle $ACE$ measures $${angleACE}^{\\circ}$, what is the measure of angle $CAE$?`,
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Since $AE \\parallel BD$, corresponding angles are equal, so $m\\angle AEC = m\\angle BDC = ${angleBDC}^{\\circ}$. In $\\triangle ACE$, the sum of the angles is $180^{\\circ}$: $m\\angle CAE + m\\angle ACE + m\\angle AEC = 180^{\\circ}$. Substituting the known values gives $m\\angle CAE + ${angleACE} + ${angleBDC} = 180$, so $m\\angle CAE + ${angleACE + angleBDC} = 180$ and $m\\angle CAE = ${angleCAE}^{\\circ}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
