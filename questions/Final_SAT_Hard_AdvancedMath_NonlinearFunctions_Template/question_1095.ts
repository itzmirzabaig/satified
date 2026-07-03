import { getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1095
 *
 * ANALYSIS:
 * - Domain: Advanced Math
 * - Skill: Nonlinear Functions
 * - Logic: Given p(c)=target, solve for parameter c, then evaluate p(x).
 * - Construction: c is a divisor of 80 so target = 80/c is an integer. The
 *   evaluation offset `diff` is drawn from a per-c list chosen so the result
 *   (diff^2 + 160)/(2c) is always an integer or a clean half — never a
 *   repeating decimal. The answer is a real option string (not a letter);
 *   distractors are built to be numerically distinct from the answer and from
 *   each other with a bounded retry.
 */

export const generator_1095 = {
  metadata: {
    id: "1095",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Format a value that is guaranteed to be an integer or a multiple of 0.5.
    const fmt = (n: number): string =>
      Number.isInteger(n) ? String(n) : n.toFixed(1);

    // 1. Setup: p(c) = (0 + 160)/(2c) = 80/c = target.
    //    c is a divisor of 80 so target is an integer.
    //    For each c, allow only offsets whose result is a clean multiple of 0.5.
    const diffByC: Record<number, number[]> = {
      4:  [-8, -6, -4, -2, 2, 4, 6, 8, 10, 12],
      5:  [10],
      8:  [-8, -4, 4, 8, 12],
      10: [10],
      16: [-8, -4, 4, 8, 12],
      20: [10],
    };
    const validC = [4, 5, 8, 10, 16, 20];
    const c = getRandomElement(validC);
    const target = 80 / c; // integer

    // 2. Evaluation point: x = c + diff (integer offset from the per-c list).
    const diff = getRandomElement(diffByC[c]);
    const evalPt = c + diff;

    // 3. Correct answer: p(evalPt) = (diff^2 + 160)/(2c) — clean multiple of 0.5.
    const numerator = diff * diff + 160;
    const denominator = 2 * c;
    const result = numerator / denominator;
    const correctText = fmt(result);

    // 4. Distractors.
    //    - The target value itself (student solves for c but forgets to
    //      evaluate p, reporting p(c) instead of p(evalPt)).
    //    - Two nearby values (small arithmetic slips), constructed distinct.
    const optionValues: number[] = [result];
    const pushIfNew = (v: number): void => {
      if (!optionValues.some(u => Math.abs(u - v) < 1e-9)) optionValues.push(v);
    };
    pushIfNew(target);
    const offsets = [1, 2, 3, -1, -2, 4, -3, 5, -4, 6];
    let oi = 0;
    while (optionValues.length < 4 && oi < offsets.length) {
      pushIfNew(result + offsets[oi]);
      oi++;
    }
    // Safety net: fill any remaining slots with fresh distinct integers.
    let filler = 7;
    while (optionValues.length < 4 && filler < 60) {
      pushIfNew(result + filler);
      filler++;
    }

    const optionsData = optionValues.map((v, idx) => ({
      text: fmt(v),
      isCorrect: idx === 0,
    }));

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index),
    }));

    const correct = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correct.letter;

    return {
      questionText: `The function $p$ is defined by $p(x)=\\frac{(x-c)^2+160}{2c}$. If $p(c)=${target}$, what is the value of $p(${evalPt})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correct.text,
      explanation: `
        Choice ${correctLetter} is correct.
        <br />
        1. <strong>Find $c$:</strong>
        Substitute $x=c$ into the function definition:
        $$p(c) = \\frac{(c-c)^2+160}{2c} = \\frac{0+160}{2c} = \\frac{80}{c}$$
        We are given that $p(c)=${target}$, so:
        $$\\frac{80}{c} = ${target} \\implies c = ${c}$$
        <br />
        2. <strong>Evaluate $p(${evalPt})$:</strong>
        Substitute $c=${c}$ and $x=${evalPt}$ into the function:
        $$p(${evalPt}) = \\frac{(${evalPt}-${c})^2+160}{2(${c})} = \\frac{(${diff})^2+160}{${denominator}} = \\frac{${numerator}}{${denominator}} = ${correctText}$$
      `,
    };
  }
};
