import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1360
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [tan = √3/3]
 * - Difficulty factors: [Complementary angles in right triangle, reciprocal relationship of tangents]
 * - Constraints: [tan(A) × tan(90°-A) = 1, tan(30°) = 1/√3 = √3/3]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with acute angles labeled]
 *
 * FIXES (was RENDER + FIGURE_MISMATCH):
 * - Collapsed every quadruple-backslash LaTeX macro (\\\\frac, \\\\sqrt) to the
 *   single-rendered form. At runtime the old strings carried TWO backslashes,
 *   which KaTeX reads as a line break, so no fraction/root rendered anywhere
 *   (question text, all four options, correctAnswer, explanation).
 * - Rebuilt the figure. The old SVG drew NO triangle — only two axis lines and
 *   two floating labels that read literally "30^{°" / "60^{°" (a raw "^" and an
 *   unclosed brace are invalid in SVG <text>, so they printed verbatim) and
 *   overlapped for small base values. The new figure is an actual 30-60-90 right
 *   triangle with a right-angle marker and clean "30°"/"60°" vertex labels drawn
 *   with the degree entity, placed so they never overlap.
 */

export const generator_1360 = {
  metadata: {
    id: "1360",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // tan(one acute angle) = √3/3 = 1/√3 = tan(30°). The other acute angle is
    // its complement (60°); tangents of complementary angles are reciprocals,
    // so tan(60°) = 3/√3 = √3. The option values are fixed by this math; the
    // random draw only sets the figure's overall scale.
    getRandomInt(1, 5); // consume a draw so seeding stays consistent with siblings

    // Figure: a schematic 30-60-90 right triangle drawn with the true leg ratio
    // 1 : √3 (short vertical leg : long horizontal leg). Right angle at the
    // bottom-right vertex; the 30° angle sits at the bottom-left (opposite the
    // short leg) and the 60° angle at the top.
    const W = 420, H = 260;
    const leftX = 50, rightX = 360;          // long horizontal leg (adjacent to 30°)
    const baseY = 210;                       // bottom edge
    const legLen = rightX - leftX;           // on-screen long leg
    const shortLeg = legLen / Math.sqrt(3);  // vertical short leg, keeps 30-60-90 shape
    const topX = rightX;                     // right angle at bottom-right => vertical leg is on the right
    const topY = baseY - shortLeg;

    const figureCode = `
      <svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:420px;height:auto;display:block;margin:0 auto;font-family:sans-serif;">
        <polygon points="${leftX},${baseY} ${rightX},${baseY} ${topX},${topY}"
          fill="#3b82f6" fill-opacity="0.08" stroke="currentColor" stroke-width="2" />
        <polyline points="${rightX - 16},${baseY} ${rightX - 16},${baseY - 16} ${rightX},${baseY - 16}"
          fill="none" stroke="currentColor" stroke-width="1.2" />
        <text x="${leftX + 34}" y="${baseY - 8}" text-anchor="middle" font-size="15" fill="currentColor">30&#176;</text>
        <text x="${topX - 12}" y="${topY + 26}" text-anchor="end" font-size="15" fill="currentColor">60&#176;</text>
      </svg>
    `;

    const optionsData = [
      { text: `-\\frac{\\sqrt{3}}{3}`, isCorrect: false, reason: "keeps the original ratio but adds an incorrect negative sign" },
      { text: `-\\frac{3}{\\sqrt{3}}`, isCorrect: false, reason: "finds the reciprocal but adds an incorrect negative sign" },
      { text: `\\frac{\\sqrt{3}}{3}`, isCorrect: false, reason: "repeats the given tangent instead of using the complementary angle" },
      { text: `\\frac{3}{\\sqrt{3}}`, isCorrect: true, reason: "correct: the reciprocal of √3/3, which equals √3" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The two acute angles of a right triangle are complementary, and the tangents of complementary angles are reciprocals of each other. The reciprocal of $\\frac{\\sqrt{3}}{3}$ is $\\frac{3}{\\sqrt{3}}$, which simplifies to $\\sqrt{3}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `In a right triangle, the tangent of one of the two acute angles is $\\frac{\\sqrt{3}}{3}$. What is the tangent of the other acute angle?`,
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `\\frac{3}{\\sqrt{3}}`,
      explanation: explanation
    };
  }
};
