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

    // 4. Distractors. These were answer+1, +2, +3 with no reasons; each is now
    //    a real slip. Every candidate is a clean multiple of 0.5 for the (c, diff)
    //    pairs above. Candidates that match the answer or each other are dropped;
    //    target, doubled and noConstant are always distinct, so 3 always remain.
    const noShift = (evalPt * evalPt + 160) / denominator;
    const doubled = numerator / c;
    const noConstant = (diff * diff) / denominator;
    const candidates = shuffle([
      { value: noShift, reason: `${fmt(noShift)} results from substituting $x=${evalPt}$ without subtracting $c$, using $(${evalPt})^2$ in place of $(${evalPt}-${c})^2$` },
      { value: doubled, reason: `${fmt(doubled)} results from dividing by $c$ instead of by $2c$` },
      { value: noConstant, reason: `${fmt(noConstant)} results from leaving out the $160$ in the numerator` },
      { value: target, reason: `${fmt(target)} is the given value of $p(c)$, not the value of $p(${evalPt})$` },
    ]);
    const wrong: { value: number; reason: string }[] = [];
    for (const cand of candidates) {
      const taken = [result, ...wrong.map(w => w.value)];
      if (wrong.length < 3 && !taken.some(u => Math.abs(u - cand.value) < 1e-9)) wrong.push(cand);
    }

    const optionsData = [
      { text: correctText, isCorrect: true, reason: '' },
      ...wrong.map(w => ({ text: fmt(w.value), isCorrect: false, reason: w.reason })),
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index),
    }));

    const correct = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      // "where c is a constant" added: c was never introduced in the stem.
      questionText: `The function $p$ is defined by $p(x)=\\frac{(x-c)^2+160}{2c}$, where $c$ is a constant. If $p(c)=${target}$, what is the value of $p(${evalPt})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correct.text,
      // Was a multiline HTML explanation with no reasons for the wrong choices.
      explanation: `Choice ${correct.letter} is correct. Substituting $x=c$ into the definition gives $p(c)=\\frac{(c-c)^2+160}{2c}=\\frac{160}{2c}=\\frac{80}{c}$. Since $p(c)=${target}$, it follows that $\\frac{80}{c}=${target}$, so $c=${c}$. Substituting $c=${c}$ and $x=${evalPt}$ gives $p(${evalPt})=\\frac{(${evalPt}-${c})^2+160}{2(${c})}=\\frac{(${diff})^2+160}{${denominator}}=\\frac{${numerator}}{${denominator}}=${correctText}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`,
    };
  }
};
