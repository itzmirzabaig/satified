import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1141
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(-4) calculation, then g(c)]
 * - Difficulty factors: [Function composition, evaluation, fractions]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Correct answer is -4.9 or -49/10]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 *
 * FIXED: b = 1 printed "1x" in the function and "1(-n)" in the solution, so b now
 * starts at 2. The explanation now opens with the answer and shows both steps.
 */

export const generator_1141 = {
  metadata: {
    id: "1141",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(1, 5);
    const b = getRandomInt(2, 6);
    const n = getRandomInt(3, 6);
    const c = getRandomInt(3, 8);

    // f(-n) = a + b(-n) - (-n)² = a - bn - n²
    const f_neg_n = a - b * n - n * n;
    const g_result = -f_neg_n + c;

    return {
      questionText: `The functions $f$ and $g$ are defined by $f(x)=${a}+${b}x-x^2$ and $g(w)=-w+${c}$. If $f(-${n})=d$, where $d$ is a constant, what is the value of $g(d)$?`,
      figureCode: null,
      options: [],
      correctAnswer: g_result.toString(),
      explanation: `The correct answer is ${g_result}. Substituting $-${n}$ for $x$ in $f$ gives $f(-${n})=${a}+${b}(-${n})-(-${n})^2=${a}-${b * n}-${n * n}=${f_neg_n}$, so $d=${f_neg_n}$. Substituting $${f_neg_n}$ for $w$ in $g$ gives $g(${f_neg_n})=-(${f_neg_n})+${c}=${-f_neg_n}+${c}=${g_result}$.`
    };
  }
};
