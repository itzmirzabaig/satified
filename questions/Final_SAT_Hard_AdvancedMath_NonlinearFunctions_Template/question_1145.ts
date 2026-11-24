import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1145
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = 272(2)^x, h(x) = f(x-4)]
 * - Difficulty factors: [Exponential transformation, horizontal shift]
 * - Distractor patterns: [A: 17(2)^x, B: 68(2)^x, C: 272(16)^x, D: 272(8)^x]
 * - Constraints: [h(x) = 272·2^(x-4) = 272/16 · 2^x = 17·2^x]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1145 = {
  metadata: {
    id: "1145",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Pick the answer first, then derive the original coefficient so the
    // horizontal shift produces an EXACT integer coefficient:
    //   h(x) = f(x - shift) = coeff·base^(x-shift) = (coeff/base^shift)·base^x
    // With coeff = newCoeff·base^shift, this collapses to newCoeff·base^x exactly.
    const base = getRandomInt(2, 5);
    const shift = getRandomInt(2, 3);
    const powBaseShift = Math.pow(base, shift);   // base^shift, e.g. 2^4 = 16
    const newCoeff = getRandomInt(3, 19);          // the coefficient of h(x)
    const coeff = newCoeff * powBaseShift;         // original coefficient (exact multiple)

    // Fixed: coefficients of 1,000 or more had no comma, the stem was a fragment,
    // the choice that kept the right coefficient but raised the base was not a real
    // slip (now the wrong shift direction), and wrong choices had no reasons.
    const m = (n: number) => n.toLocaleString('en-US').replace(/,/g, '{,}');
    const wrongDirection = coeff * powBaseShift;   // f(x + shift) instead of f(x - shift)

    const correctText = `$h(x)=${m(newCoeff)}(${base})^x$`;

    const optionsData = [
      // Correct: dividing the coefficient by base^shift, base unchanged.
      { text: correctText, isCorrect: true, reason: '' },
      // Distractor: forgot to apply the shift at all (keeps original coefficient).
      { text: `$h(x)=${m(coeff)}(${base})^x$`, isCorrect: false, reason: `$${m(coeff)}$ is the coefficient of $f$, so this choice ignores the shift and is just $f(x)$` },
      // Distractor: changed the base to base^shift instead of the coefficient.
      { text: `$h(x)=${m(coeff)}(${powBaseShift})^x$`, isCorrect: false, reason: `$${powBaseShift}$ is $${base}^{${shift}}$, which should divide the coefficient rather than replace the base` },
      // Distractor: multiplied by base^shift, which is the shift in the wrong direction.
      { text: `$h(x)=${m(wrongDirection)}(${base})^x$`, isCorrect: false, reason: `$${m(wrongDirection)}$ comes from multiplying $${m(coeff)}$ by $${powBaseShift}$ instead of dividing, which gives $f(x+${shift})$` }
    ];
    // Every option is pairwise distinct for all draws: base^shift > base (shift >= 2)
    // and newCoeff < coeff < wrongDirection, so no coefficient/base pair repeats.

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(x)=${m(coeff)}(${base})^x$, and the function $h$ is defined by $h(x)=f(x-${shift})$. Which equation defines $h$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Substituting $x-${shift}$ for $x$ in $f$ gives $h(x)=${m(coeff)}(${base})^{x-${shift}}$. By the laws of exponents, this equals $${m(coeff)}(${base})^{-${shift}}(${base})^x=\\frac{${m(coeff)}}{${powBaseShift}}(${base})^x=${m(newCoeff)}(${base})^x$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
