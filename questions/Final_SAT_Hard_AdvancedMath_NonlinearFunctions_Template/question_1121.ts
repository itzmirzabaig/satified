import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1121
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [g(x) = x(x-2)(x+6)², solve g(7-w) = 0]
 * - Difficulty factors: [Cubic/quartic roots, substitution, sum of solutions]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Roots at x=0, 2, -6 (double), so 7-w ∈ {0, 2, -6}]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1121 = {
  metadata: {
    id: "1121",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // g(x) = x (x - r2) (x + |r3|)^2  -> distinct roots {0, r2, r3}
    // Solve g(shift - w) = 0  ->  shift - w in {0, r2, r3}
    //   w in {shift, shift - r2, shift - r3}
    const r2 = getRandomInt(5, 10);
    const r3 = -getRandomInt(4, 8);
    const shift = getRandomInt(5, 12);

    // Roots of g are {0, r2, r3}; since r2 >= 5 > 0 > r3, they are always distinct.
    const w0 = shift - 0;      // from shift - w = 0
    const w2 = shift - r2;     // from shift - w = r2
    const w3 = shift - r3;     // from shift - w = r3
    const sum = w0 + w2 + w3;  // = 3*shift - r2 - r3

    const factor2 = `(x-${r2})`;
    const factor3 = r3 >= 0 ? `(x-${r3})` : `(x+${Math.abs(r3)})`;
    const back3 = r3 >= 0 ? `-${r3}` : `+${Math.abs(r3)}`;

    return {
      questionText: `$g(x)=x${factor2}${factor3}^2$. If $g(${shift}-w)=0$, what is the sum of all possible values of $w$?`,
      figureCode: null,
      options: [],
      correctAnswer: sum.toString(),
      explanation: `Substituting $x=${shift}-w$ gives $g(${shift}-w)=(${shift}-w)(${shift}-w-${r2})(${shift}-w${back3})^2=0$. A product equals zero exactly when one of its factors equals zero, so $(${shift}-w)\\in\\{0,\\ ${r2},\\ ${r3}\\}$. Solving each equation gives the values $w\\in\\{${w0},\\ ${w2},\\ ${w3}\\}$, whose sum is $w_1+w_2+w_3=${sum}$.`
    };
  }
};
