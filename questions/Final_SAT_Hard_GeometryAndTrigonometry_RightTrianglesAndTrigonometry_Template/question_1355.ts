import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1355
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [perimeter: 18 + 18√2 (isosceles right triangle with legs 9√2)]
 * - Difficulty factors: [Isosceles right triangle properties, algebraic manipulation with radicals, solving for hypotenuse]
 * - Constraints: [Perimeter must be in form a + a√2 where hypotenuse = a]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Isosceles right triangle with leg labels]
 */

export const generator_1355 = {
  metadata: {
    id: "1355",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Isosceles right triangle: legs = x, hypotenuse = h = x√2.
    // Perimeter P = 2x + x√2 = x(2 + √2).
    // We are given P = base + base√2 = base(1 + √2), with `base` an integer.
    // Solve x(2 + √2) = base(1 + √2):
    //   x = base(1 + √2)/(2 + √2)
    //     = base(1 + √2)(2 − √2)/((2 + √2)(2 − √2))
    //     = base(2 − √2 + 2√2 − 2)/(4 − 2)
    //     = base(√2)/2 = base/√2.
    // Hypotenuse h = x√2 = (base/√2)·√2 = base.
    // So the hypotenuse equals `base` exactly (an integer) for every draw.

    const base = getRandomInt(5, 15);
    const hypotenuse = base;          // proven above

    // ── Figure: proportional isosceles right triangle, right angle at B ──────
    // B bottom-left (right-angle vertex), C bottom-right (horizontal leg = x),
    // A above B (vertical leg = x). Both legs equal; hypotenuse AC labeled h.
    const W = 420, H = 300, P = 46;
    const spanX = W - 2 * P, spanY = H - 2 * P;
    const legPix = Math.min(spanX, spanY); // equal legs -> square-ish footprint
    const bx = P, by = H - P;             // B (right-angle vertex)
    const cx = P + legPix, cy = by;       // C
    const ax = P, ay = by - legPix;       // A
    const rm = 15;                        // right-angle square size
    const mafsCode = `<div style="width:100%;max-width:420px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      `<polygon points="${bx},${by} ${cx},${cy} ${ax},${ay}" fill="#3b82f6" fill-opacity="0.10" stroke="#3b82f6" stroke-width="2"/>` +
      `<path d="M ${bx + rm} ${by} L ${bx + rm} ${by - rm} L ${bx} ${by - rm}" fill="none" stroke="#3b82f6" stroke-width="1.5"/>` +
      `<circle cx="${bx}" cy="${by}" r="3.5" fill="#3b82f6"/>` +
      `<circle cx="${cx}" cy="${cy}" r="3.5" fill="#3b82f6"/>` +
      `<circle cx="${ax}" cy="${ay}" r="3.5" fill="#3b82f6"/>` +
      `<text x="${bx - 12}" y="${by + 18}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">B</text>` +
      `<text x="${cx + 12}" y="${cy + 18}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">C</text>` +
      `<text x="${ax - 12}" y="${ay - 6}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">A</text>` +
      `<text x="${ax - 16}" y="${(by + ay) / 2}" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">x</text>` +
      `<text x="${(bx + cx) / 2}" y="${by + 20}" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">x</text>` +
      `<text x="${(cx + ax) / 2 + 10}" y="${(cy + ay) / 2 - 6}" text-anchor="middle" font-size="13" fill="currentColor">h</text>` +
      `</svg></div>`;

    // Options: correct hypotenuse = base; distractors are distinct as MATH for
    // every base in [5,15] (two rationals base vs 2·base, two irrationals
    // base√2 vs 2·base√2 — a rational never equals an irrational).
    const optionsData = [
      { text: hypotenuse.toString(), isCorrect: true, reason: "correct hypotenuse length" },
      { text: (base * 2).toString(), isCorrect: false, reason: "doubles the hypotenuse, as if the perimeter were the given expression's coefficient times two" },
      { text: `${base}\\\\sqrt{2}`, isCorrect: false, reason: "multiplies the hypotenuse by an extra factor of $\\\\sqrt{2}$" },
      { text: `${base * 2}\\\\sqrt{2}`, isCorrect: false, reason: "both doubles the length and keeps an extra $\\\\sqrt{2}$ factor" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Let each leg be $x$; then the hypotenuse is $x\\\\sqrt{2}$ and the perimeter is $P = 2x + x\\\\sqrt{2} = x(2 + \\\\sqrt{2})$. We are given $P = ${base} + ${base}\\\\sqrt{2} = ${base}(1 + \\\\sqrt{2})$, so $x(2 + \\\\sqrt{2}) = ${base}(1 + \\\\sqrt{2})$. Solving, $x = \\\\dfrac{${base}(1 + \\\\sqrt{2})}{2 + \\\\sqrt{2}} = \\\\dfrac{${base}(1 + \\\\sqrt{2})(2 - \\\\sqrt{2})}{(2 + \\\\sqrt{2})(2 - \\\\sqrt{2})} = \\\\dfrac{${base}\\\\sqrt{2}}{2}$. The hypotenuse is $x\\\\sqrt{2} = \\\\dfrac{${base}\\\\sqrt{2}}{2}\\\\cdot\\\\sqrt{2} = ${hypotenuse}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `The perimeter of an isosceles right triangle is $${base} + ${base}\\\\sqrt{2}$ inches. What is the length, in inches, of the hypotenuse of this triangle?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: hypotenuse.toString(),
      explanation: explanation
    };
  }
};
