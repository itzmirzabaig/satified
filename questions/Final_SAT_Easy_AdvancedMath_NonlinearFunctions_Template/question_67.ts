import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 67
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [xInput: -2 to -1, denomSub: 1-3, b: -8 to -5, c: 2-5]
 * - Difficulty factors: [Evaluating a rational expression with substitution]
 * - Distractor patterns: [Sign errors, arithmetic errors in numerator/denominator]
 * - Constraints: [Denominator must not be zero]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIXED:
 * - result = numerVal / denomVal was usually a repeating decimal
 *   (FLOAT_ARTIFACT); now a bounded retry (<= 50 tries, deterministic
 *   fallback) redraws until denomVal divides numerVal, so the answer is
 *   always a clean negative integer.
 * - result is always negative, so the old distractors -result and
 *   Math.abs(result) were ALWAYS identical (DUP_OPTIONS on nearly every
 *   draw). New distractor set {result - 1, result + 1, -result} is provably
 *   pairwise distinct for every result <= -2.
 * - Explanation now shows the full evaluation from live values and covers
 *   each distractor using letters from the shuffled array.
 */

export const generator_67 = {
  metadata: {
    id: "67",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Redraw until the denominator divides the numerator, so the answer is a
    // clean integer. numerVal is always positive (x^2 + |b||x| + c) and
    // denomVal is always negative (xInput - denomSub in [-5, -2]), so the
    // result is always a negative integer with result <= -2.
    let b = -getRandomInt(5, 8);
    let c = getRandomInt(2, 5);
    let denomSub = getRandomInt(1, 3);
    let xInput = -getRandomInt(1, 2);
    let numerVal = xInput * xInput + b * xInput + c;
    let denomVal = xInput - denomSub;
    let tries = 0;
    while (numerVal % denomVal !== 0 && tries++ < 50) {
      b = -getRandomInt(5, 8);
      c = getRandomInt(2, 5);
      denomSub = getRandomInt(1, 3);
      xInput = -getRandomInt(1, 2);
      numerVal = xInput * xInput + b * xInput + c;
      denomVal = xInput - denomSub;
    }
    if (numerVal % denomVal !== 0) {
      // Deterministic clean fallback: (1 + 5 + 2) / (-1 - 1) = -4
      b = -5;
      c = 2;
      denomSub = 1;
      xInput = -1;
      numerVal = xInput * xInput + b * xInput + c; // 8
      denomVal = xInput - denomSub; // -2
    }

    const result = numerVal / denomVal; // negative integer, at most -2

    // Pairwise distinct for every result <= -2: any collision would require
    // result to be 0, 1, 0.5, or -0.5.
    const optionsData = [
      { id: 'correct', text: `$${result}$`, isCorrect: true },
      { id: 'offLow', text: `$${result - 1}$`, isCorrect: false },
      { id: 'offHigh', text: `$${result + 1}$`, isCorrect: false },
      { id: 'signError', text: `$${-result}$`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;
    const letterOf = (id: string) => shuffled.find(o => o.id === id)!.letter;

    const bSign = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;

    return {
      questionText: `If $f(x) = \\frac{x^2 ${bSign}x + ${c}}{x - ${denomSub}}$, what is the value of $f(${xInput})$?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Substituting $${xInput}$ for $x$, the numerator is $(${xInput})^2 ${bSign}(${xInput}) + ${c} = ${xInput * xInput} + ${b * xInput} + ${c} = ${numerVal}$, and the denominator is $${xInput} - ${denomSub} = ${denomVal}$. Therefore $f(${xInput}) = \\frac{${numerVal}}{${denomVal}} = ${result}$. Choice ${letterOf('signError')} is incorrect; it results from ignoring the negative sign of the denominator. Choices ${letterOf('offLow')} and ${letterOf('offHigh')} are incorrect; each results from an arithmetic error when evaluating the numerator or the denominator.`
    };
  }
};
