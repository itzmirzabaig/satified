import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1069
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [absolute value |x-9|+45=63, sum of solutions]
 * - Difficulty factors: [Isolate absolute value, split into cases, sum solutions]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [b = a + diff with diff > 0, so both cases exist; sum = 2h is always a positive integer]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1069 = {
  metadata: {
    id: "1069",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Pattern: |x - h| + a = b, find sum of solutions.
    // b - a = diff > 0 for every draw, so the equation always has the two
    // solutions x = h + diff and x = h - diff, whose sum is 2h.

    const h = getRandomInt(5, 15);
    const a = getRandomInt(30, 60);
    const diff = getRandomInt(15, 30);
    const b = a + diff;

    const sol1 = h + diff;
    const sol2 = h - diff;
    const sum = sol1 + sol2; // = 2h, always a positive integer

    return {
      questionText: `What is the sum of the solutions to the given equation?\n\n$|x-${h}|+${a}=${b}$`,
      figureCode: null,
      options: [],
      correctAnswer: sum.toString(),
      explanation: `The correct answer is ${sum}. Subtracting ${a} from both sides of the equation gives $|x-${h}|=${diff}$. The expression inside the absolute value must equal ${diff} or $-${diff}$, so $x-${h}=${diff}$ or $x-${h}=-${diff}$. Solving these two equations gives $x=${sol1}$ or $x=${sol2}$. The sum of the two solutions is $(${h}+${diff})+(${h}-${diff})=${sum}$.`
    };
  }
};
