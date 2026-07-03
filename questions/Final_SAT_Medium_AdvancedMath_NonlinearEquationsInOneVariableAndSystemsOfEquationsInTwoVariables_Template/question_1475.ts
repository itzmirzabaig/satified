import { getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1475
 *
 * ANALYSIS:
 * - Context: Factoring Quadratics.
 * - Problem: x^2 + bx + k = 0 (b a positive constant) has two integer
 *   solutions. Find a possible value of b.
 * - Logic: integer solutions means x^2 + bx + k = (x + m)(x + n) with
 *   positive integers m, n (both roots negative), so mn = k and m + n = b.
 *   Correct b is the sum of a factor pair with m < n (m = n would give a
 *   repeated root, not two solutions). Distractors must not equal the sum
 *   of ANY factor pair of k, or the question would have multiple defensible
 *   answers.
 */
export const generator_1475 = {
  metadata: {
    id: "1475",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Math setup — k values with several factor pairs.
    const kVals = [12, 18, 20, 24, 30, 36];
    const k = getRandomElement(kVals);

    // All positive factor pairs (m, n) with m <= n and m * n = k.
    const pairs: [number, number][] = [];
    for (let i = 1; i * i <= k; i++) {
      if (k % i === 0) pairs.push([i, k / i]);
    }

    // Correct b comes from a pair with m < n (two DISTINCT integer solutions).
    // Sums of ALL pairs (including m = n, e.g. 6+6 for k = 36) are banned as
    // distractors so no other option could also be a valid b.
    const validPairs = pairs.filter(([m, n]) => m < n);
    const chosen = getRandomElement(validPairs);
    const correctB = chosen[0] + chosen[1];

    // 2. Distractors: positive, not the sum of any factor pair, all distinct.
    // For every k in kVals, k + 2 and k - 1 are never factor-pair sums; the
    // third is nudged upward past the (at most ~8) taken values, so the
    // 50-step bound is never reached.
    const taken = new Set<number>(pairs.map(([m, n]) => m + n));
    const distractors: number[] = [];
    const pushIfFree = (cand: number) => {
      if (distractors.length < 3 && cand > 0 && !taken.has(cand)) {
        distractors.push(cand);
        taken.add(cand);
      }
    };
    pushIfFree(k + 2); // close to k itself (confusing b with the constant term)
    pushIfFree(k - 1); // off-by-one from the constant term
    let d3 = correctB + 3; // near the correct sum
    let guard = 0;
    while (taken.has(d3) && guard++ < 50) d3 += 1;
    pushIfFree(d3);
    // Deterministic backstop (unreachable in practice): fill upward.
    let filler = k + 40;
    while (distractors.length < 3 && filler < k + 100) { pushIfFree(filler); filler += 1; }

    const optionsData = [
      { text: String(correctB), isCorrect: true },
      ...distractors.map(d => ({ text: String(d), isCorrect: false }))
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const pairList = pairs
      .map(([m, n]) => `$\\,${m} \\times ${n}$ (sum $\\,${m + n}$)`)
      .join(', ');
    const incorrectList = shuffledOptions
      .filter(o => !o.isCorrect)
      .map(o => `Choice ${o.letter} (${o.text})`)
      .join(', ');

    return {
      questionText: `In the equation $x^2 + bx + ${k} = 0$, $b$ is a positive constant. If the equation has two integer solutions, which of the following could be the value of $b$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct.

If the equation has two integer solutions, it can be written in factored form as $(x + m)(x + n) = 0$, where $m$ and $n$ are positive integers (both solutions are negative because $b$ and the constant term are positive). Expanding gives $x^2 + (m + n)x + mn = 0$, so $mn = ${k}$ and $m + n = b$.

The factor pairs of ${k} and their sums are: ${pairList}.

The pair $\\,${chosen[0]} \\times ${chosen[1]} = ${k}$ has sum ${correctB}, so $b = ${correctB}$ is possible. The equation becomes $(x + ${chosen[0]})(x + ${chosen[1]}) = 0$, which has the two integer solutions $x = ${-chosen[0]}$ and $x = ${-chosen[1]}$.

${incorrectList} are incorrect because none of those values equals the sum of a factor pair of ${k}, so the quadratic could not be factored with integers for those values of $b$.`
    };
  }
};
