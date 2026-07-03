import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 891
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [BC=136, cos A=3/5, AB=102 (3-4-5 triangle scaled by 34)]
 * - Difficulty factors: [3-4-5 triangle ratios, solving for side using cosine, multi-step]
 * - Distractor patterns: [34 (scale factor), 136 (given side), 170 (hypotenuse)]
 * - Constraints: [Must be 3-4-5 triangle relationship, BC is leg opposite A]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with right angle at B]
 *
 * FIXED:
 * - Rebuilt figure as a plain SVG template literal (was corrupted nested IIFEs
 *   that leaked "${BC" into the output and drew no triangle).
 * - Figure now draws the actual right triangle with the given side BC labeled
 *   with its live value and the unknown AB labeled x; right-angle mark at B.
 */

export const generator_891 = {
  metadata: {
    id: "891",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate 3-4-5 triangle with medium scale
    // Original: scale=34, sides 102-136-170, cos A=3/5
    const scale = getRandomInt(20, 50); // Medium scale for medium difficulty

    // Use 3-4-5 ratio. Right angle at B, angle A at vertex A.
    // cos A = adjacent leg / hypotenuse = AB / AC = 3/5.
    const ratioAdjacent = 3;   // AB
    const ratioOpposite = 4;   // BC (opposite angle A)
    const ratioHypotenuse = 5; // AC

    const AB = ratioAdjacent * scale;   // Side adjacent to angle A (unknown)
    const BC = ratioOpposite * scale;   // Side opposite to angle A (given)
    const AC = ratioHypotenuse * scale; // Hypotenuse

    // STEP 2: Build SVG figure.
    // Coordinate model: right angle at B. Place B at origin, C along +x (leg
    // BC), A along +y (leg AB); hypotenuse AC connects A and C.
    const W = 400, H = 320, P = 55;
    const bx = 0, by = 0;      // B (right angle)
    const cx = BC, cy = 0;     // C
    const ax = 0, ay = AB;     // A
    const xmin = -0.15 * BC, xmax = BC * 1.15;
    const ymin = -0.15 * AB, ymax = AB * 1.15;
    const mx = (x: number) => P + (x - xmin) / (xmax - xmin) * (W - 2 * P);
    const my = (y: number) => H - P - (y - ymin) / (ymax - ymin) * (H - 2 * P);

    // Right-angle marker at B (small square along the two legs).
    const rk = Math.min(BC, AB) * 0.09;
    const raMark = `M ${mx(bx + rk)} ${my(by)} L ${mx(bx + rk)} ${my(by + rk)} L ${mx(bx)} ${my(by + rk)}`;

    const figureCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      `<polygon points="${mx(ax)},${my(ay)} ${mx(bx)},${my(by)} ${mx(cx)},${my(cy)}" fill="#3b82f6" fill-opacity="0.10" stroke="#3b82f6" stroke-width="2" stroke-linejoin="round"/>` +
      `<path d="${raMark}" fill="none" stroke="currentColor" stroke-width="1.3"/>` +
      `<circle cx="${mx(ax)}" cy="${my(ay)}" r="3" fill="currentColor"/>` +
      `<circle cx="${mx(bx)}" cy="${my(by)}" r="3" fill="currentColor"/>` +
      `<circle cx="${mx(cx)}" cy="${my(cy)}" r="3" fill="currentColor"/>` +
      `<text x="${mx(ax) - 14}" y="${my(ay) + 5}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">A</text>` +
      `<text x="${mx(bx) - 14}" y="${my(by) + 16}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">B</text>` +
      `<text x="${mx(cx) + 14}" y="${my(cy) + 16}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">C</text>` +
      `<text x="${mx(ax / 2) - 18}" y="${my(ay / 2) + 4}" text-anchor="middle" font-size="14" fill="currentColor">x</text>` +
      `<text x="${mx(cx / 2)}" y="${my(0) + 22}" text-anchor="middle" font-size="14" fill="currentColor">${BC}</text>` +
      `</svg></div>`;

    // STEP 3: Calculate answer
    const answer = AB;

    // STEP 4: Create options with tracking
    const correctText = answer.toString();
    const optionsData = [
      { text: scale.toString(), isCorrect: false, reason: "is just the scale factor, not the side length" },
      { text: answer.toString(), isCorrect: true, reason: "" },
      { text: BC.toString(), isCorrect: false, reason: "is the length of the given side $\\overline{BC}$, not $\\overline{AB}$" },
      { text: AC.toString(), isCorrect: false, reason: "is the hypotenuse length, not $\\overline{AB}$" }
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
    const explanation = `Choice ${correctLetter} is correct. In right triangle $ABC$, $\\cos A = \\frac{AB}{AC} = \\frac{${ratioAdjacent}}{${ratioHypotenuse}}$. This means the sides are in the ratio $AB:BC:AC = ${ratioAdjacent}:${ratioOpposite}:${ratioHypotenuse}$. Given $BC = ${BC} = ${ratioOpposite} \\times ${scale}$, the scale factor is ${scale}. Therefore, $AB = ${ratioAdjacent} \\times ${scale} = ${answer}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    // STEP 7: Return question data
    return {
      questionText: `In $\\triangle ABC$, $\\angle B$ is a right angle and the length of $\\overline{BC}$ is ${BC} millimeters. If $\\cos A = \\frac{${ratioAdjacent}}{${ratioHypotenuse}}$, what is the length, in millimeters, of $\\overline{AB}$?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
