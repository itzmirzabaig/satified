import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 283
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [xValue: 3-8, result: 3-8, constant: calculated]
 * - Difficulty factors: [Fraction evaluation, order of operations]
 * - Distractor patterns: [wrong order ops, forgot 1/2, forgot coefficient]
 * - Constraints: [Ensure integer result]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 *
 * Answer-first construction: choose the answer result in [3,8] and the input
 * xValue in [3,8], then set constant = 2*result - xValue so that
 * f(xValue) = (1/2)(xValue + constant) = result is an exact integer for every
 * draw. A bounded retry keeps constant >= 1 so the displayed constant is a
 * clean positive number (no "+ -k" sign glitch and no "+ 0"). Distractors are
 * built on the stated themes (forgetting the 1/2, adding without halving,
 * arithmetic slips) and de-duplicated against the answer and each other so no
 * two options ever collide. The original bug — an option equal to
 * xValue + constant, which always equals 2*result and duplicated the "forgot
 * 1/2" distractor — is removed.
 */

export const generator_283 = {
  metadata: {
    id: "283",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Pick answer and input first; derive the constant. Retry (bounded) until
    // the constant is a positive integer so it renders cleanly as "x + k".
    let xValue = 0, result = 0, constant = 0, sumInside = 0;
    let tries = 0;
    do {
      xValue = getRandomInt(3, 8);
      result = getRandomInt(3, 8);
      sumInside = result * 2;      // = xValue + constant
      constant = sumInside - xValue;
    } while (constant < 1 && tries++ < 50);
    if (constant < 1) constant = 1; // safety net; keeps the draw self-consistent
    sumInside = xValue + constant;  // re-sync after any clamp
    result = sumInside / 2;         // exact integer by construction

    // On-theme distractor candidates.
    const candidates: { value: number; reason: string }[] = [];
    // Forgetting to multiply by 1/2 (reports the full sum inside the parentheses).
    candidates.push({ value: sumInside, reason: "forgets to multiply the sum by $\\frac{1}{2}$" });
    // Halving only the input and ignoring the constant.
    if (xValue % 2 === 0) {
      candidates.push({ value: xValue / 2, reason: "halves only $x$ and ignores the constant" });
    }
    // Multiplying the sum by 2 instead of by 1/2.
    candidates.push({ value: sumInside * 2, reason: "multiplies by $2$ instead of by $\\frac{1}{2}$" });
    // Generic arithmetic-slip fillers to guarantee three usable distractors.
    candidates.push({ value: result + 1, reason: "results from an arithmetic error" });
    candidates.push({ value: result - 1, reason: "results from an arithmetic error" });
    candidates.push({ value: result + 2, reason: "results from an arithmetic error" });

    const used = new Set<number>([result]);
    const distractors: { value: number; reason: string }[] = [];
    for (const cand of candidates) {
      if (cand.value > 0 && !used.has(cand.value)) {
        used.add(cand.value);
        distractors.push(cand);
        if (distractors.length === 3) break;
      }
    }

    const optionsData = [
      { text: result.toString(), isCorrect: true, reason: "" },
      { text: distractors[0].value.toString(), isCorrect: false, reason: distractors[0].reason },
      { text: distractors[1].value.toString(), isCorrect: false, reason: distractors[1].reason },
      { text: distractors[2].value.toString(), isCorrect: false, reason: distractors[2].reason }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(x)=\\frac{1}{2}(x+${constant})$. What is the value of $f(${xValue})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$ gives $f(${xValue}) = \\frac{1}{2}(${xValue} + ${constant}) = \\frac{1}{2}(${sumInside}) = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
