import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 897
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Equilateral triangle sides even; altitude creates 30-60-90 triangles]
 * - Difficulty factors: [Equilateral triangle properties, altitude bisects base]
 * - Distractor patterns: [divide by 2 again, correct value, 45-45-90 confusion, 30-60-90 confusion]
 * - Constraints: [Must be equilateral, altitude must bisect base]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Equilateral triangle with altitude BD]
 *
 * FIXED:
 * - Rebuilt figure as a plain SVG template literal (was corrupted nested IIFEs
 *   that leaked "${side" into the output and drew no triangle).
 * - Figure now draws the full equilateral triangle with altitude BD, right-angle
 *   mark at D, both equal sides labeled with the live side length, and the base
 *   split at D.
 */

export const generator_897 = {
  metadata: {
    id: "897",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate equilateral triangle side length (even so half is integer).
    const side = getRandomInt(8, 20) * 2; // 16..40
    const halfSide = side / 2;
    const altitude = (side * Math.sqrt(3)) / 2; // for the figure only

    // STEP 2: Build SVG figure.
    // Place A at (-halfSide, 0), C at (halfSide, 0), B at (0, altitude),
    // D at (0, 0) = foot of the altitude on base AC.
    const W = 400, H = 320, P = 50;
    const xmin = -halfSide * 1.25, xmax = halfSide * 1.25;
    const ymin = -0.12 * altitude, ymax = altitude * 1.18;
    const mx = (x: number) => P + (x - xmin) / (xmax - xmin) * (W - 2 * P);
    const my = (y: number) => H - P - (y - ymin) / (ymax - ymin) * (H - 2 * P);

    const Ax = -halfSide, Ay = 0;
    const Cx = halfSide, Cy = 0;
    const Bx = 0, By = altitude;
    const Dx = 0, Dy = 0;

    // Right-angle marker at D (between the altitude and base, on the A side).
    const rk = halfSide * 0.12;
    const raMark = `M ${mx(Dx - rk)} ${my(Dy)} L ${mx(Dx - rk)} ${my(Dy + rk)} L ${mx(Dx)} ${my(Dy + rk)}`;

    const figureCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      `<polygon points="${mx(Ax)},${my(Ay)} ${mx(Bx)},${my(By)} ${mx(Cx)},${my(Cy)}" fill="#3b82f6" fill-opacity="0.10" stroke="#3b82f6" stroke-width="2" stroke-linejoin="round"/>` +
      `<line x1="${mx(Bx)}" y1="${my(By)}" x2="${mx(Dx)}" y2="${my(Dy)}" stroke="currentColor" stroke-width="1.6" stroke-dasharray="4 3"/>` +
      `<path d="${raMark}" fill="none" stroke="currentColor" stroke-width="1.3"/>` +
      `<circle cx="${mx(Ax)}" cy="${my(Ay)}" r="3" fill="currentColor"/>` +
      `<circle cx="${mx(Bx)}" cy="${my(By)}" r="3" fill="currentColor"/>` +
      `<circle cx="${mx(Cx)}" cy="${my(Cy)}" r="3" fill="currentColor"/>` +
      `<circle cx="${mx(Dx)}" cy="${my(Dy)}" r="2.5" fill="currentColor"/>` +
      `<text x="${mx(Ax) - 12}" y="${my(Ay) + 16}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">A</text>` +
      `<text x="${mx(Cx) + 12}" y="${my(Cy) + 16}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">C</text>` +
      `<text x="${mx(Bx)}" y="${my(By) - 8}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">B</text>` +
      `<text x="${mx(Dx)}" y="${my(Dy) + 18}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">D</text>` +
      `<text x="${mx(Ax / 2) - 8}" y="${my(altitude / 2) - 4}" text-anchor="middle" font-size="14" fill="currentColor">${side}</text>` +
      `<text x="${mx(Cx / 2) + 8}" y="${my(altitude / 2) - 4}" text-anchor="middle" font-size="14" fill="currentColor">${side}</text>` +
      `</svg></div>`;

    // STEP 3: Calculate answer (AD = side/2).
    const answer = halfSide;

    // STEP 4: Create options with tracking.
    const correctText = answer.toString();
    const distractorC = Math.round(answer * Math.sqrt(2)); // 45-45-90 confusion
    const distractorD = Math.round(answer * Math.sqrt(3)); // 30-60-90 confusion

    const optionsData = [
      { text: (answer / 2).toString(), isCorrect: false, reason: "incorrectly divides the half-base by 2 again" },
      { text: answer.toString(), isCorrect: true, reason: "" },
      { text: `${distractorC}`, isCorrect: false, reason: "uses a 45-45-90 relationship, which does not apply here" },
      { text: `${distractorD}`, isCorrect: false, reason: "gives the altitude length from the 30-60-90 relationship, not $AD$" }
    ];

    // STEP 5: Shuffle and assign letters.
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 6: Build explanation.
    const explanation = `Choice ${correctLetter} is correct. Triangle $ABC$ is equilateral with all sides equal to ${side}. The altitude $\\overline{BD}$ bisects the base $\\overline{AC}$, so $AD = \\frac{${side}}{2} = ${answer}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    // STEP 7: Return question data.
    return {
      questionText: "In equilateral $\\triangle ABC$ above, $\\overline{BD}$ is the altitude to base $\\overline{AC}$. What is the length of $\\overline{AD}$?",
      figureCode: figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
