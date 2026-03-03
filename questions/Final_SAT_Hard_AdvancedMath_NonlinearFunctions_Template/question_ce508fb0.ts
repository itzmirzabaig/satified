import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: ce508fb0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(-4) calculation, then g(c)]
 * - Difficulty factors: [Function composition, evaluation, fractions]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Correct answer is -4.9 or -49/10]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_ce508fb0 = {
  metadata: {
    // id: "ce508fb0",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const a = getRandomInt(1, 5);
    const b = getRandomInt(1, 5);
    const n = getRandomInt(3, 6);
    const c = getRandomInt(3, 8);
    
    // f(-n) = a + b(-n) - (-n)² = a - bn - n²
    const f_neg_n = a - b * n - n * n;
    const g_result = -f_neg_n + c;
    
    return {
      questionText: `The functions $f(x)$ and $g(w)$ are defined by the given equations: $f(x)=${a}+${b}x-x^2$ and $g(w)=-w+${c}$. If $f(-${n})=d$, where $d$ is a constant, what is the value of $g(d)$?`,
      figureCode: null,
      options: null,
      correctAnswer: g_result.toString(),
      explanation: `$f(-${n})=${a}+${b}(-${n})-(-${n})^2=${a}-${b*n}-${n*n}=${f_neg_n}=d$. Then $g(d)=-(${f_neg_n})+${c}=${g_result}$.`
    };
  }
};

/**
 * Question ID: 2f51abc2
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = |59-2x|, solve f(k) = 3k]
 * - Difficulty factors: [Absolute value equation, extraneous solution check]
 * - Distractor patterns: [A: 59/5, B: 59/2, C: 177/5, D: 59]
 * - Constraints: [Must check which solution is valid]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */