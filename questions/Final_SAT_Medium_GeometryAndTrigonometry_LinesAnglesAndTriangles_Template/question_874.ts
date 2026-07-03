import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 874
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [scale factor: 2-5, angle: 45-65 degrees]
 * - Difficulty factors: [Similar triangles, corresponding angles equal]
 * - Distractor patterns: [A: multiplied angle by scale, B: added values, D: used scale as angle]
 * - Constraints: [Corresponding angles in similar triangles are congruent]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Nested similar triangles sharing vertex C]
 */

export const generator_874 = {
  metadata: {
    id: "874",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const scaleFactor = getRandomInt(2, 5);
    const angleCBD = getRandomInt(45, 65);

    // STEP 2: Build a plain-SVG figure (house style).
    // Two nested similar triangles sharing apex C: large triangle CAE with
    // inner triangle CBD, where B lies on CA and D lies on CE so that BD is
    // parallel to AE. That makes triangle CAE ~ triangle CBD (AA), and angle
    // CBD corresponds to angle CAE. Coordinates are schematic; the angle
    // measure shown at B always matches the question's value angleCBD.
    const C = { x: 225, y: 30 };
    const A = { x: 60, y: 250 };
    const E = { x: 390, y: 250 };
    const t = 0.55; // B and D at 55% from C along CA and CE
    const B = { x: C.x + t * (A.x - C.x), y: C.y + t * (A.y - C.y) };
    const D = { x: C.x + t * (E.x - C.x), y: C.y + t * (E.y - C.y) };

    const figureCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 450 290" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">
  <polygon points="${C.x},${C.y} ${A.x},${A.y} ${E.x},${E.y}" fill="none" stroke="currentColor" stroke-width="2"/>
  <line x1="${B.x}" y1="${B.y}" x2="${D.x}" y2="${D.y}" stroke="#3b82f6" stroke-width="2"/>
  <circle cx="${B.x}" cy="${B.y}" r="3" fill="#3b82f6"/>
  <circle cx="${D.x}" cy="${D.y}" r="3" fill="#3b82f6"/>
  <text x="${C.x}" y="${C.y - 8}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor">C</text>
  <text x="${A.x - 12}" y="${A.y + 6}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor">A</text>
  <text x="${E.x + 12}" y="${E.y + 6}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor">E</text>
  <text x="${B.x - 14}" y="${B.y + 4}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor">B</text>
  <text x="${D.x + 14}" y="${D.y + 4}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor">D</text>
  <text x="${B.x + 30}" y="${B.y - 6}" text-anchor="middle" font-size="13" fill="#3b82f6">${angleCBD}&#176;</text>
</svg></div>`;

    // STEP 3: Create options. Each renders as a self-contained "$...$" string so
    // correctAnswer can equal the correct option's text exactly.
    const correctText = `$${angleCBD}^{\\circ}$`;

    const optionsData = [
      { text: `$(${scaleFactor} \\cdot ${angleCBD})^{\\circ}$`, isCorrect: false, reason: "incorrectly multiplies the scale factor by the angle measure" },
      { text: `$(${scaleFactor} + ${angleCBD})^{\\circ}$`, isCorrect: false, reason: "incorrectly adds the scale factor to the angle measure" },
      { text: correctText, isCorrect: true },
      { text: `$${scaleFactor}^{\\circ}$`, isCorrect: false, reason: "confuses the scale factor with the angle measure" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      // "$m\angle CBD = 57^{\circ}$" — no math segment begins with "$<digit>".
      questionText: `In the figure shown, triangle $CAE$ is similar to triangle $CBD$, with $m\\angle CBD = ${angleCBD}^{\\circ}$ and $AE = ${scaleFactor}(BD)$. What is the measure of angle $CAE$?`,
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Since $\\triangle CAE \\sim \\triangle CBD$, corresponding angles are congruent. Angle $CBD$ corresponds to angle $CAE$, so $m\\angle CAE = m\\angle CBD = ${angleCBD}^{\\circ}$. The relationship $AE = ${scaleFactor}(BD)$ scales the side lengths but leaves the angle measures unchanged. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
