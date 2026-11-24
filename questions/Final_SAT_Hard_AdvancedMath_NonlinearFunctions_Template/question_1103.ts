import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1103
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [max depth 302.4 at 6 min, surface at 12 min]
 * - Difficulty factors: [Quadratic model, depth at specific time]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must use vertex form, evaluate at t=evalTime]
 * - Question type: [Fill-in-the-blank word problem]
 * - Figure generation: [None]
 */

export const generator_1103 = {
  metadata: {
    id: "1103",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const h = getRandomInt(4, 8);

    // Max depth k at t=h, surfaces (depth 0) at t=2h. The vertex at t=h with a
    // zero at t=2h forces the other zero at t=0 and the leading coefficient
    // a = -k / h^2 (from g(2h) = a*h^2 + k = 0). Choosing k as a multiple of
    // h^2 makes a an exact negative integer, so the seal genuinely surfaces at
    // t=2h and every evaluated depth is a clean integer.
    const h2 = h * h;
    const kChoices: number[] = [];
    for (let m = Math.ceil(100 / h2); m * h2 <= 400; m++) kChoices.push(m * h2);
    const k = getRandomElement(kChoices);

    const a = -k / h2;                                  // exact negative integer
    const evalTime = Math.round(1.5 * h);
    const g_eval = a * Math.pow(evalTime - h, 2) + k;   // exact integer depth

    return {
      // Stem was a fragment ("modeled by quadratic g") that never defined t or the dive.
      questionText: `The quadratic function $g$ models the depth, in meters, of a seal below the surface of the water $t$ minutes after the seal begins a dive. The seal reaches its maximum depth of $${k}$ meters ${h} minutes after beginning the dive and returns to the surface ${2 * h} minutes after beginning the dive. According to the model, what is the depth, in meters, of the seal ${evalTime} minutes after beginning the dive?`,
      figureCode: null,
      options: [],
      correctAnswer: g_eval.toString(),
      explanation: `The correct answer is ${g_eval}. The vertex of the graph of $g$ is $(${h}, ${k})$, so $g(t)=a(t-${h})^2+${k}$ for some constant $a$. The seal is at the surface, a depth of $0$ meters, when $t=${2 * h}$, so $a(${2 * h}-${h})^2+${k}=0$, which gives $a=-\\frac{${k}}{${h2}}=${a}$. Then $g(${evalTime})=${a}(${evalTime}-${h})^2+${k}=${a}(${(evalTime - h) * (evalTime - h)})+${k}=${g_eval}$ meters.`
    };
  }
};
