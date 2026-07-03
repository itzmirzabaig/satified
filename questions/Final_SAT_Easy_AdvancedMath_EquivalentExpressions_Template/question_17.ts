import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 17
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [r1: 2-5, r2: 6-10, so the trinomial is x^2+(r2-r1)x-r1*r2]
 * - Difficulty factors: [Factoring quadratic trinomial]
 * - Distractor patterns: [both signs reversed, both factors negative, both factors positive]
 * - Constraints: [r1 and r2 come from disjoint ranges, so all four factor pairs render distinctly]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_17 = {
  metadata: {
    id: "17",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const r1 = getRandomInt(2, 5);
    const r2 = getRandomInt(6, 10);
    const sum = r2 - r1;        // coefficient of x, always in [1, 8]
    const product = -r1 * r2;   // constant term, always negative

    // Renders x^2 + mx + c with sign-aware formatting (m and c are never 0 here).
    const quadStr = (m: number, c: number): string => {
      const mCoef = Math.abs(m) === 1 ? '' : String(Math.abs(m));
      return `x^2${m < 0 ? '-' : '+'}${mCoef}x${c < 0 ? '-' : '+'}${Math.abs(c)}`;
    };

    // Renders (x+p)(x+q) with sign-aware factors.
    const factorStr = (p: number, q: number): string => {
      const f = (v: number) => (v < 0 ? `(x-${Math.abs(v)})` : `(x+${v})`);
      return `${f(p)}${f(q)}`;
    };

    // Candidates as root-shift pairs (x+p)(x+q). Because r1 and r2 come from
    // disjoint ranges, the four sign patterns always render as distinct strings.
    const candidates = [
      { p: -r1, q: r2, isCorrect: true },   // correct factorization
      { p: r1, q: -r2, isCorrect: false },  // both signs reversed
      { p: -r1, q: -r2, isCorrect: false }, // both factors negative
      { p: r1, q: r2, isCorrect: false }    // both factors positive
    ].map(cand => ({
      text: `$${factorStr(cand.p, cand.q)}$`,
      expansion: quadStr(cand.p + cand.q, cand.p * cand.q),
      isCorrect: cand.isCorrect
    }));

    const shuffledOptions = shuffle(candidates).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const quad = quadStr(sum, product);

    const distractorNotes = shuffledOptions
      .filter(opt => !opt.isCorrect)
      .map(opt => `Choice ${opt.letter} is incorrect because ${opt.text} expands to $${opt.expansion}$.`)
      .join(' ');

    return {
      questionText: `Which expression is equivalent to $${quad}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. To factor $${quad}$, find two numbers whose product is the constant term, $-${r1 * r2}$, and whose sum is the coefficient of $x$, which is ${sum}. The numbers $-${r1}$ and $+${r2}$ work, since $(-${r1})(${r2})=${product}$ and $-${r1}+${r2}=${sum}$. Therefore $${quad}=(x-${r1})(x+${r2})$. ${distractorNotes}`
    };
  }
};
