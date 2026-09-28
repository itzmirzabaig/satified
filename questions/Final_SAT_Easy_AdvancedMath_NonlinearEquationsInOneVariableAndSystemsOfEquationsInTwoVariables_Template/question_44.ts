import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 44
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [y = 76, y = x^2 - 5, roots ±9]
 *
 * FIXED (two options were both marked correct):
 * - The options array marked BOTH roots (base and -base) isCorrect: true, so
 *   a single-select question had two correct answers (e.g. y = 30 with
 *   y = x^2 - 6 offered both 6 and -6). The negative root is removed from the
 *   options entirely — the SAT convention for this item type: both roots
 *   solve the equation, only one appears among the choices, and the stem's
 *   original "a possible value" phrasing covers that.
 * - The negative-root slot is replaced by yValue + constant (= base^2), the
 *   "forgot to take the square root" distractor — a real error from a
 *   different range (36-144) than the answer (6-12).
 * - The old dedup filter + random-filler machinery is replaced by a bounded
 *   redraw that guarantees the four option values are pairwise distinct
 *   (in these ranges the only possible collision is base === constant, when
 *   base is 6-8; the old random fillers 20-50 could themselves collide with
 *   yValue, which spans 28-141). The stem reverts to the original wording —
 *   no "positive" qualifier.
 */

export const generator_44 = {
  metadata: {
    id: "44",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // STEP 1: Draw values until the four option values are pairwise distinct.
    // In these ranges the only possible collision is base === constant
    // (base 6-8 vs constant 3-8): yValue = base^2 - constant can never equal
    // base, constant, or base^2, and base^2 (>= 36) can never equal base (<= 12)
    // or constant (<= 8).
    let base = 0, constant = 0, yValue = 0;
    let tries = 0;
    do {
      base = getRandomInt(6, 12);
      constant = getRandomInt(3, 8);
      yValue = base * base - constant;
      tries++;
    } while (
      tries < 50 &&
      new Set([base, yValue, constant, yValue + constant]).size !== 4
    );

    // STEP 2: Options. Exactly one correct answer (the positive root); the
    // negative root is deliberately absent from the choices. Distractors:
    // the y-coordinate (yValue), the constant, and the un-rooted value
    // (yValue + constant = base^2 — the "solved x^2 = base^2 but answered
    // base^2" error).
    const optionsData = [
      { text: `${base}`, isCorrect: true },
      { text: `${yValue}`, isCorrect: false },
      { text: `${constant}`, isCorrect: false },
      { text: `${yValue + constant}`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, i) => ({
      ...opt,
      letter: String.fromCharCode(65 + i)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `$$y = ${yValue}$$ $$y = x^2 - ${constant}$$ \n\n The graphs of the given equations in the $xy$-plane intersect at the point $(x, y)$. What is a possible value of $x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Set the equations equal to each other:

 $${yValue} = x^2 - ${constant}$ 
Add $${constant}$ to both sides:

 $${yValue + constant} = x^2$ 
Taking the square root gives $x = \\pm ${base}$. Therefore, a possible value of $x$ is $${correctOption.text}$.`
    };
  }
};