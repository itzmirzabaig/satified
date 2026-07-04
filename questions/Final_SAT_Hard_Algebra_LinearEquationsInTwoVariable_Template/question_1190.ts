import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1190
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [25% solution, 10% solution, 3 liters, target 15%]
 * - Difficulty factors: [Mixture problem with percentages]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [0.25x + 0.10(3) = 0.15(x+3)]
 * - Question type: [Text → Fill in blank]
 * - Figure generation: [None]
 */

export const generator_1190 = {
  metadata: {
    id: "1190",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values.
    // strongPct% * x + weakPct% * weakLiters = targetPct% * (x + weakLiters)
    //   => strongPct*x + weakPct*weakLiters = targetPct*x + targetPct*weakLiters
    //   => x(strongPct - targetPct) = weakLiters*(targetPct - weakPct)
    //   => x = weakLiters * (targetPct - weakPct) / (strongPct - targetPct)
    // Constrain the draw so x is a whole number: (strongPct - targetPct) must
    // divide weakLiters*(targetPct - weakPct) exactly. This keeps the exact
    // solution as the stored fill-in answer and makes the explanation chain true.
    let strongPct = 40;
    let weakPct = 12;
    let weakLiters = 3;
    let targetPct = 16;
    let x = 3;
    let tries = 0;
    while (tries++ < 50) {
      const sp = getRandomInt(20, 40);
      const wp = getRandomInt(5, 15);
      const wl = getRandomInt(2, 5);
      const tp = getRandomInt(wp + 2, sp - 5);
      const num = wl * (tp - wp);
      const den = sp - tp;
      if (den > 0 && num % den === 0) {
        const candidate = num / den;
        if (candidate >= 1 && candidate <= 30) {
          strongPct = sp; weakPct = wp; weakLiters = wl; targetPct = tp; x = candidate;
          break;
        }
      }
    }

    const result = x;
    // Render a whole-number percent as a two-digit decimal, e.g. 6 -> "0.06", 40 -> "0.40".
    const dec = (pct: number): string => `0.${pct < 10 ? '0' : ''}${pct}`;

    return {
      questionText: `How many liters of a ${strongPct}% saline solution must be added to ${weakLiters} liters of a ${weakPct}% saline solution to obtain a ${targetPct}% saline solution?`,
      figureCode: null,
      options: [],
      correctAnswer: result.toString(),
      explanation: `Let $x$ be liters of ${strongPct}% solution. Total salt: $${dec(strongPct)}x + ${dec(weakPct)}(${weakLiters}) = ${dec(targetPct)}(x + ${weakLiters})$. Solving: $${strongPct}x + ${weakPct * weakLiters} = ${targetPct}x + ${targetPct * weakLiters}$, so $${strongPct - targetPct}x = ${targetPct * weakLiters - weakPct * weakLiters}$, giving $x = ${result}$.`
    };
  }
};
