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
    // Fixed: the stem was unclear and ran I and II together on one line; the answer
    // was always "II only"; wrong choices had no reasons; and a draw such as
    // 24(0.5)^(x+3) has maximum 3, which IS displayed as the constant in the
    // exponent, making "II only" false. Such draws are now rejected.
    //
    // Key identity: the rewritten form is c(base^e)(base)^(x-e), so its value at
    // x = 0 is c. The shifted form c(base)^(x+e) has maximum c(base^e) < c.
    let base = 0.5, coeff = 30, exp1 = 2, exp2 = 1, maxShifted = 0;
    const same = (u: number, v: number) => Math.abs(u - v) < 1e-9;
    do {
      base = getRandomElement([0.3, 0.4, 0.5, 0.6, 0.7]);
      coeff = getRandomInt(20, 50);
      exp1 = getRandomInt(2, 5);
      exp2 = getRandomInt(1, 4);
      maxShifted = coeff * Math.pow(base, exp1);
    } while (same(maxShifted, exp1) || same(maxShifted, base) || same(maxShifted, coeff));

    const factor = cleanDecimal(Math.pow(base, exp2)); // base^exp2, exact.
    const baseStr = cleanDecimal(base);
    const maxStr = cleanDecimal(maxShifted);

    // Randomize which numeral holds the form that displays its maximum.
    const rewrittenIsFirst = getRandomInt(0, 1) === 1;
    const rewrittenName = rewrittenIsFirst ? 'f' : 'g';
    const shiftedName = rewrittenIsFirst ? 'g' : 'f';
    const rewrittenNumeral = rewrittenIsFirst ? 'I' : 'II';
    const shiftedNumeral = rewrittenIsFirst ? 'II' : 'I';
    const rewrittenEq = `${rewrittenName}(x)=${coeff}(${factor})(${baseStr})^{x-${exp2}}`;
    const shiftedEq = `${shiftedName}(x)=${coeff}(${baseStr})^{x+${exp1}}`;
    const firstEq = rewrittenIsFirst ? rewrittenEq : shiftedEq;
    const secondEq = rewrittenIsFirst ? shiftedEq : rewrittenEq;

    const optionsData = [
      { text: `${rewrittenNumeral} only`, isCorrect: true, reason: '' },
      { text: `${shiftedNumeral} only`, isCorrect: false, reason: `it selects $${shiftedName}$, whose maximum value $${maxStr}$ does not appear in its equation, and leaves out $${rewrittenName}$, whose maximum value $${coeff}$ is its leading coefficient` },
      { text: `I and II`, isCorrect: false, reason: `it treats the leading coefficient $${coeff}$ as the maximum value of $${shiftedName}$, but $${shiftedName}(0)=${coeff}(${baseStr})^{${exp1}}=${maxStr}$` },
      { text: `Neither I nor II`, isCorrect: false, reason: `$${rewrittenName}(0)=${coeff}$, so the equation for $${rewrittenName}$ does display its maximum value as the leading coefficient` }
    ];
    // Keep the conventional order of the numeral choices.
    const order = ['I only', 'II only', 'I and II', 'Neither I nor II'];
    const orderedOptions = order
      .map(t => optionsData.find(o => o.text === t)!)
      .map((opt, index) => ({ ...opt, letter: String.fromCharCode(65 + index) }));
    const correctOption = orderedOptions.find(o => o.isCorrect)!;
    const incorrectOptions = orderedOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The functions $f$ and $g$ are defined by the given equations, where $x \\geq 0$. Which of the following equations displays, as a constant or coefficient, the maximum value of the function it defines?\n\nI. $${firstEq}$\nII. $${secondEq}$`,
      figureCode: null,
      options: orderedOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The base $${baseStr}$ is between $0$ and $1$, so both functions decrease as $x$ increases, and each reaches its maximum value at $x=0$. For $${shiftedName}$, the maximum value is $${shiftedName}(0)=${coeff}(${baseStr})^{${exp1}}=${maxStr}$, which does not appear as a constant or coefficient in its equation. For $${rewrittenName}$, the maximum value is $${rewrittenName}(0)=${coeff}(${factor})(${baseStr})^{-${exp2}}=${coeff}(${baseStr})${exp2 === 1 ? '' : `^{${exp2}}`}(${baseStr})^{-${exp2}}=${coeff}(${baseStr})^{0}=${coeff}$, which is the leading coefficient of its equation. Therefore, only equation ${rewrittenNumeral} displays the maximum value. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
