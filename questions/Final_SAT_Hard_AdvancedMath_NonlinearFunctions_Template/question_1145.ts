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

    const correctText = `$h(x)=${newCoeff}(${base})^x$`;

    const optionsData = [
      // Correct: dividing the coefficient by base^shift, base unchanged.
      { text: correctText, isCorrect: true },
      // Distractor: forgot to apply the shift at all (keeps original coefficient).
      { text: `$h(x)=${coeff}(${base})^x$`, isCorrect: false },
      // Distractor: changed the base to base^shift instead of the coefficient.
      { text: `$h(x)=${coeff}(${powBaseShift})^x$`, isCorrect: false },
      // Distractor: kept the correct coefficient but wrongly raised the base.
      { text: `$h(x)=${newCoeff}(${powBaseShift})^x$`, isCorrect: false }
    ];
    // Every option is pairwise distinct for all draws: base^shift > base (shift >= 2)
    // and coeff = newCoeff·base^shift > newCoeff, so no coefficient/base pair repeats.

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `$f(x)=${coeff}(${base})^x$ and $h(x)=f(x-${shift})$. Which defines $h$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. $h(x)=f(x-${shift})=${coeff}(${base})^{x-${shift}}=${coeff}(${base})^{-${shift}}(${base})^x=\\frac{${coeff}}{${powBaseShift}}(${base})^x=${newCoeff}(${base})^x$. The other choices come from shifting the base instead of the coefficient, or from not applying the shift.`
    };
  }
};
