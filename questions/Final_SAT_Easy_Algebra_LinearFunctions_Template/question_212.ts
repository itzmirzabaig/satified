import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 212
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coeffs: 2-5, constant: 1-5, x: 3-8]
 * - Difficulty factors: [Fraction function evaluation, order of operations]
 * - Distractor patterns: [wrong denominator, adding instead of subtracting, forgetting division]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 *
 * Answer-first construction: pick coeff a, x, and denominator d, then choose the
 * constant c so that (a*x - c) is positive and exactly divisible by d. This makes
 * the value of f(x) a clean integer for every draw (no float artifacts) while
 * keeping a, c, d, and x as natural displayed numbers. Distractors are built on
 * the stated themes (forgetting to divide, wrong denominator, adding instead of
 * subtracting) with arithmetic-slip fillers, then de-duplicated so no two options
 * ever collide.
 */

export const generator_212 = {
  metadata: {
    id: "212",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Pick the coefficient, input, and denominator, then a constant that makes
    // (numeratorCoeff * xValue - constant) a positive multiple of the denominator.
    let numeratorCoeff = 0, xValue = 0, denominator = 0, constant = 0;
    let numeratorValue = 0, result = 0;
    let tries = 0;
    do {
      numeratorCoeff = getRandomInt(2, 5);
      xValue = getRandomInt(3, 8);
      denominator = getRandomInt(2, 5);
      const validConstants: number[] = [];
      for (let c = 1; c <= 5; c++) {
        const num = numeratorCoeff * xValue - c;
        if (num > 0 && num % denominator === 0) validConstants.push(c);
      }
      if (validConstants.length === 0) continue; // retry with fresh a, x, d
      constant = validConstants[getRandomInt(0, validConstants.length - 1)];
      numeratorValue = numeratorCoeff * xValue - constant; // guaranteed > 0
      result = numeratorValue / denominator;               // guaranteed integer
    } while (numeratorValue % denominator !== 0 && tries++ < 50);

    // Build on-theme integer distractors, then de-duplicate against the answer
    // and each other. Ordered so the conceptual mistakes come first and generic
    // arithmetic slips only fill remaining slots.
    const candidates: { value: number; reason: string }[] = [];
    // Forgetting to divide by the denominator (report just the numerator).
    candidates.push({ value: numeratorValue, reason: "results from forgetting to divide the numerator by the denominator" });
    // Adding the constant instead of subtracting it (only when it stays an integer).
    if ((numeratorCoeff * xValue + constant) % denominator === 0) {
      candidates.push({ value: (numeratorCoeff * xValue + constant) / denominator, reason: "results from adding the constant instead of subtracting it" });
    }
    // Dividing by the wrong denominator (a neighbor that still divides the numerator).
    for (const d of [denominator - 1, denominator + 1, denominator - 2, denominator + 2]) {
      if (d >= 1 && d !== denominator && numeratorValue % d === 0) {
        candidates.push({ value: numeratorValue / d, reason: "results from dividing by the wrong denominator" });
      }
    }
    // Generic arithmetic-slip fillers to guarantee three usable distractors.
    candidates.push({ value: result + 1, reason: "results from an arithmetic error" });
    candidates.push({ value: result - 1, reason: "results from an arithmetic error" });
    candidates.push({ value: result + 2, reason: "results from an arithmetic error" });
    candidates.push({ value: result + denominator, reason: "results from an arithmetic error" });

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
      questionText: `If $f$ is the function defined by $f(x) = \\frac{${numeratorCoeff}x - ${constant}}{${denominator}}$, what is the value of $f(${xValue})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$ gives $f(${xValue}) = \\frac{${numeratorCoeff}(${xValue}) - ${constant}}{${denominator}} = \\frac{${numeratorCoeff * xValue} - ${constant}}{${denominator}} = \\frac{${numeratorValue}}{${denominator}} = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
