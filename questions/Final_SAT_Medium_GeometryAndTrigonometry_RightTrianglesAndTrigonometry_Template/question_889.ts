import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 889
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Adjacent: 41, Hypotenuse: 42 (double-digit, close values)]
 * - Difficulty factors: [Cosine ratio, identifying adjacent side vs hypotenuse]
 * - Distractor patterns: [Reciprocal (42/41), adjacent/hypotenuse reversed, 1/adjacent, 1/hypotenuse]
 * - Constraints: [Must satisfy triangle inequality, hypotenuse must be longest side]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with angle A at origin]
 */

export const generator_889 = {
  metadata: {
    id: "889",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Right triangle with the leg adjacent to angle A close to the
    // hypotenuse (a "steep" triangle, small angle A). Original: adjacent=41,
    // hypotenuse=42. The hypotenuse is the longest side, so the triangle is
    // always valid and cos A = adjacent/hypotenuse < 1.
    const adjacent = getRandomInt(30, 60);
    const hypotenuse = adjacent + getRandomInt(1, 5); // strictly > adjacent
    // Opposite leg (irrational in general) — used only for the figure geometry.
    const opposite = Math.sqrt(hypotenuse * hypotenuse - adjacent * adjacent);

    // STEP 2: Build a clean SVG figure that draws the triangle.
    // A (angle A) at origin, C (right angle) on the x-axis at distance
    // `adjacent`, B above C at height `opposite`. Segment AC is the adjacent
    // leg, AB is the hypotenuse, CB is the opposite leg.
    const W = 420, H = 300, M = 48;
    const spanX = adjacent;
    const spanY = opposite;
    const sx = (W - 2 * M) / spanX;
    const sy = (H - 2 * M) / spanY;
    const s = Math.min(sx, sy);
    const r2 = (v: number) => Math.round(v * 100) / 100;
    const baseY = H - M;
    const Ax = M, Ay = baseY;
    const Cx = M + adjacent * s, Cy = baseY;
    const Bx = M + adjacent * s, By = baseY - opposite * s;
    const A = `${r2(Ax)},${r2(Ay)}`;
    const C = `${r2(Cx)},${r2(Cy)}`;
    const B = `${r2(Bx)},${r2(By)}`;
    const box = 12;
    const rightAngle = `M ${r2(Cx)} ${r2(Cy - box)} L ${r2(Cx - box)} ${r2(Cy - box)} L ${r2(Cx - box)} ${r2(Cy)}`;

    const figureCode = `<div style="width:100%;max-width:420px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      `<polygon points="${A} ${C} ${B}" fill="#3b82f6" fill-opacity="0.08" stroke="#3b82f6" stroke-width="2"/>` +
      `<path d="${rightAngle}" fill="none" stroke="currentColor" stroke-width="1.4"/>` +
      `<text x="${r2(Ax - 8)}" y="${r2(Ay + 18)}" text-anchor="middle" font-size="14" fill="currentColor">A</text>` +
      `<text x="${r2(Cx + 14)}" y="${r2(Cy + 18)}" text-anchor="middle" font-size="14" fill="currentColor">C</text>` +
      `<text x="${r2(Bx + 14)}" y="${r2(By - 6)}" text-anchor="middle" font-size="14" fill="currentColor">B</text>` +
      `<text x="${r2((Ax + Cx) / 2)}" y="${r2(Cy + 20)}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor">${adjacent}</text>` +
      `<text x="${r2((Ax + Bx) / 2 - 10)}" y="${r2((Ay + By) / 2 - 6)}" text-anchor="end" font-size="14" font-style="italic" fill="currentColor">${hypotenuse}</text>` +
      `</svg></div>`;

    // STEP 3: cos A = adjacent / hypotenuse (already in lowest visible form as a
    // ratio of the two labelled sides).
    const cosA = `${adjacent}/${hypotenuse}`;

    // STEP 4: Options with tracking. All four are numerically distinct for every
    // draw: correct < 1; secant > 1; 1/adjacent and 1/hypotenuse are tiny and
    // differ because adjacent !== hypotenuse.
    const correctText = cosA;
    const optionsData = [
      { text: `${hypotenuse}/${adjacent}`, isCorrect: false, reason: "reverses the ratio, giving the secant (hypotenuse over adjacent)" },
      { text: cosA, isCorrect: true, reason: "" },
      { text: `1/${adjacent}`, isCorrect: false, reason: "uses the reciprocal of the adjacent side only" },
      { text: `1/${hypotenuse}`, isCorrect: false, reason: "uses the reciprocal of the hypotenuse only" }
    ];

    // STEP 5: Shuffle and assign letters (letters are only meaningful now).
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 6: Build explanation from the shuffled letters and live values.
    const explanation = `Choice ${correctLetter} is correct. The cosine of an angle in a right triangle is the ratio of the length of the leg adjacent to the angle to the length of the hypotenuse. For angle $A$, the adjacent leg is ${adjacent} and the hypotenuse is ${hypotenuse}, so $\\cos A = \\frac{${adjacent}}{${hypotenuse}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    // STEP 7: Return question data.
    return {
      questionText: "In right triangle $ABC$ shown above, the right angle is at $C$. What is the value of $\\cos A$?",
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation
    };
  }
};
