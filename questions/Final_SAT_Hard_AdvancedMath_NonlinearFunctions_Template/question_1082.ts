import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

// Render a base raised to an integer power as an EXACT clean decimal string
// (strips binary-float artifacts like 0.16000000000000003 → "0.16").
const cleanDecimal = (value: number): string => Number(value.toFixed(6)).toString();

/**
 * Question 1082
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = 33(0.4)^(x+3), g(x) = 33(0.16)(0.4)^(x-2)]
 * - Difficulty factors: [Exponential equivalent forms, maximum value display]
 * - Distractor patterns: [A: I only, B: II only, C: I and II, D: Neither]
 * - Constraints: [Analyze which form shows max value as coefficient]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1082 = {
  metadata: {
    id: "1082",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Use round-tenth bases so every displayed power renders as an exact, short
    // decimal (no float artifacts).
    const base = getRandomElement([0.3, 0.4, 0.5, 0.6, 0.7]);
    const coeff = getRandomInt(20, 50);
    const exp1 = getRandomInt(2, 5);
    const exp2 = getRandomInt(1, 4);

    // KEY IDENTITY (root-cause fix): form II's extra factor is base^exp2 and its
    // exponent is (x - exp2), the SAME exp2. So at the max (x = 0 for a decaying
    // base < 1): g(0) = coeff·base^exp2·base^(-exp2) = coeff·base^0 = coeff.
    // Thus g's maximum EQUALS the displayed leading coefficient, for EVERY draw.
    // Previously the extra factor was base^2 while the exponent shift was a
    // random exp2, so g(0)=coeff·base^(2-exp2) only equalled coeff when exp2=2 —
    // that mismatch is the bug being fixed.
    //
    // For I: f(0) = coeff·base^exp1 with exp1 >= 2 and base < 1, so f(0) < coeff
    // and I's maximum is NOT any number written in its form. Hence "II only" is
    // the unique correct answer for every draw.

    const factorII = cleanDecimal(Math.pow(base, exp2)); // base^exp2, exact.
    const baseStr = cleanDecimal(base);

    const optionsData = [
      { text: `I only`, isCorrect: false },
      { text: `II only`, isCorrect: true },
      { text: `I and II`, isCorrect: false },
      { text: `Neither I nor II`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `The functions $f$ and $g$ are defined for $x \\geq 0$. Which of the following displays the maximum value of the function as a constant or coefficient? I. $f(x)=${coeff}(${baseStr})^{x+${exp1}}$ II. $g(x)=${coeff}(${factorII})(${baseStr})^{x-${exp2}}$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `II only`,
      explanation: `Choice ${correctLetter} is correct. The base ${baseStr} is between 0 and 1, so both functions decay for $x \\geq 0$ and each attains its maximum at $x=0$. For I, $f(0)=${coeff}(${baseStr})^{${exp1}}$, which is less than $${coeff}$ and is not shown as a constant, so I does not display its maximum. For II, $g(0)=${coeff}(${factorII})(${baseStr})^{-${exp2}}=${coeff}(${baseStr})^{${exp2}}(${baseStr})^{-${exp2}}=${coeff}(${baseStr})^{0}=${coeff}$, so the coefficient $${coeff}$ is exactly the maximum value. Therefore only II displays the maximum value.`
    };
  }
};
