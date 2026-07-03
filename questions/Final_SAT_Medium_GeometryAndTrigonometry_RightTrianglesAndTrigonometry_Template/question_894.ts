import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 894
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Sides: 20, 21, 29 (Pythagorean triple 20-21-29)]
 * - Difficulty factors: [Tangent ratio, identifying opposite/adjacent sides]
 * - Distractor patterns: [sin A (20/29), cos A (21/29), cot A (21/20)]
 * - Constraints: [Must be valid right triangle, 20-21-29 is primitive triple scaled]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with labeled sides]
 *
 * FIXED:
 * - Rebuilt figure as a plain SVG template literal (was corrupted nested IIFEs
 *   that leaked "${oppositeLeg" into the output).
 * - Corrected the geometry: the right angle is now at C (was incorrectly placed
 *   at A, which would make angle A = 90 deg and tan A undefined). Angle A is
 *   acute; opposite leg = CB, adjacent leg = CA, hypotenuse = AB. All three
 *   side lengths are labeled with their live values.
 */

export const generator_894 = {
  metadata: {
    id: "894",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate Pythagorean triple 20-21-29 (primitive), scaled.
    const scale = getRandomInt(2, 4);
    const a = 20 * scale;
    const b = 21 * scale;
    const c = 29 * scale; // hypotenuse: 20^2 + 21^2 = 29^2

    // Randomly decide which leg is opposite vs adjacent to angle A.
    const isStandardConfig = Math.random() < 0.5;
    const oppositeLeg = isStandardConfig ? a : b;
    const adjacentLeg = isStandardConfig ? b : a;

    // STEP 2: Build SVG figure.
    // Right angle at C. Place C at origin, A along +x (adjacent leg CA),
    // B along +y (opposite leg CB). Hypotenuse AB connects A and B.
    const W = 400, H = 320, P = 55;
    const cx = 0, cy = 0;            // C (right angle)
    const ax = adjacentLeg, ay = 0;  // A (angle A here)
    const bx = 0, by = oppositeLeg;  // B
    const xmin = -0.15 * adjacentLeg, xmax = adjacentLeg * 1.18;
    const ymin = -0.15 * oppositeLeg, ymax = oppositeLeg * 1.15;
    const mx = (x: number) => P + (x - xmin) / (xmax - xmin) * (W - 2 * P);
    const my = (y: number) => H - P - (y - ymin) / (ymax - ymin) * (H - 2 * P);

    // Right-angle marker at C.
    const rk = Math.min(adjacentLeg, oppositeLeg) * 0.09;
    const raMark = `M ${mx(cx + rk)} ${my(cy)} L ${mx(cx + rk)} ${my(cy + rk)} L ${mx(cx)} ${my(cy + rk)}`;

    const figureCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      `<polygon points="${mx(ax)},${my(ay)} ${mx(bx)},${my(by)} ${mx(cx)},${my(cy)}" fill="#3b82f6" fill-opacity="0.10" stroke="#3b82f6" stroke-width="2" stroke-linejoin="round"/>` +
      `<path d="${raMark}" fill="none" stroke="currentColor" stroke-width="1.3"/>` +
      `<circle cx="${mx(ax)}" cy="${my(ay)}" r="3" fill="currentColor"/>` +
      `<circle cx="${mx(bx)}" cy="${my(by)}" r="3" fill="currentColor"/>` +
      `<circle cx="${mx(cx)}" cy="${my(cy)}" r="3" fill="currentColor"/>` +
      `<text x="${mx(ax) + 14}" y="${my(ay) + 16}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">A</text>` +
      `<text x="${mx(bx) - 14}" y="${my(by) + 2}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">B</text>` +
      `<text x="${mx(cx) - 14}" y="${my(cy) + 16}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">C</text>` +
      `<text x="${mx(adjacentLeg / 2)}" y="${my(0) + 22}" text-anchor="middle" font-size="14" fill="currentColor">${adjacentLeg}</text>` +
      `<text x="${mx(0) - 20}" y="${my(oppositeLeg / 2) + 4}" text-anchor="middle" font-size="14" fill="currentColor">${oppositeLeg}</text>` +
      `<text x="${mx(adjacentLeg / 2) + 14}" y="${my(oppositeLeg / 2) - 6}" text-anchor="middle" font-size="14" fill="currentColor">${c}</text>` +
      `</svg></div>`;

    // STEP 3: Calculate tangent (opposite / adjacent).
    const tanA = `${oppositeLeg}/${adjacentLeg}`;

    // STEP 4: Create options with tracking.
    const correctText = tanA;
    const optionsData = [
      { text: `${oppositeLeg}/${c}`, isCorrect: false, reason: "gives the sine (opposite over hypotenuse) instead of the tangent" },
      { text: tanA, isCorrect: true, reason: "" },
      { text: `${adjacentLeg}/${c}`, isCorrect: false, reason: "gives the cosine (adjacent over hypotenuse) instead of the tangent" },
      { text: `${adjacentLeg}/${oppositeLeg}`, isCorrect: false, reason: "gives the cotangent (the reciprocal of the tangent)" }
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
    const explanation = `Choice ${correctLetter} is correct. The tangent of an acute angle in a right triangle is the ratio of the length of the side opposite the angle to the length of the side adjacent to the angle. For angle $A$, the opposite side is ${oppositeLeg} and the adjacent side is ${adjacentLeg}, so $\\tan A = \\frac{${oppositeLeg}}{${adjacentLeg}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    // STEP 7: Return question data.
    return {
      questionText: "In right triangle $ABC$ above, the right angle is at $C$. What is the value of $\\tan A$?",
      figureCode: figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
