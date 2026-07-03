import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 671
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fractions: 1/a, 1/b with a,b in 2..5; integer solution x]
 * - Difficulty factors: [Working with fractions, factoring common binomial]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Equation has common factor (x+c) that can be factored out;
 *   result is a clean integer and x is a clean positive integer for every draw]
 * - Question type: [Fill-in-the-blank]
 */

export const generator_671 = {
  metadata: {
    id: "671",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate equation with common-factor pattern.
    //   Form: (1/a)(x+c) - (1/b)(x+c) = result
    //   Factoring: (x+c) * (1/a - 1/b) = (x+c) * (b-a)/(ab) = result
    // Pick a, b distinct so the coefficient (b-a)/(ab) is nonzero (a genuine
    // linear equation with a unique solution).
    const a = getRandomInt(2, 5);
    let b = getRandomInt(2, 5);
    let guard = 0;
    while (b === a && guard++ < 50) b = getRandomInt(2, 5);
    if (b === a) b = a === 5 ? 4 : a + 1; // deterministic fallback, still distinct

    const common = a * b;      // ab (positive)
    const diff = b - a;        // b - a (nonzero; may be negative)

    // STEP 2: Answer-first construction. Make (x + c) a multiple of ab so that
    //   result = (x+c) * diff / ab = k * diff  is always a clean integer, and x
    //   is a clean positive integer. Retry k/c until x lands in a nice range.
    const c = getRandomInt(3, 10);
    let k = getRandomInt(2, 6);
    let targetX = k * common - c;
    let tries = 0;
    while ((targetX < 12 || targetX > 80) && tries++ < 50) {
      k = getRandomInt(2, 6);
      targetX = k * common - c;
    }
    // Guaranteed-valid fallback (k grows with ab so this always lands >= 12).
    if (targetX < 12 || targetX > 80) {
      k = 3;
      targetX = k * common - c;
    }

    const result = k * diff;             // integer, nonzero (diff != 0, k > 0)
    const sum = targetX + c;             // = k * common
    const correctAnswer = targetX.toString();

    return {
      questionText: `$$\\frac{1}{${a}}(x+${c})-\\frac{1}{${b}}(x+${c})=${result}$$ What value of $x$ is the solution to the given equation?`,
      figureCode: null,
      options: [],
      correctAnswer: correctAnswer,
      explanation: `The correct answer is ${correctAnswer}. Notice that the expression $x+${c}$ appears in both terms on the left-hand side of the equation. Factor out $(x+${c})$ from the left-hand side: $$(x+${c})\\left(\\frac{1}{${a}}-\\frac{1}{${b}}\\right)=${result}$$ Using a common denominator of ${common}: $$\\frac{1}{${a}}-\\frac{1}{${b}}=\\frac{${b}}{${common}}-\\frac{${a}}{${common}}=\\frac{${diff}}{${common}}$$ Substituting back: $$(x+${c})\\left(\\frac{${diff}}{${common}}\\right)=${result}$$ Multiplying both sides by $\\frac{${common}}{${diff}}$: $$x+${c}=${result}\\cdot\\frac{${common}}{${diff}}=${sum}$$ Therefore, $x=${sum}-${c}=${targetX}$.`
    };
  }
};
