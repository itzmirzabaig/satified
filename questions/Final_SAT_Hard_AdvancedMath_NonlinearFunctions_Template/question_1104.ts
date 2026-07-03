import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1104
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [first term a, common ratio r]
 * - Difficulty factors: [Geometric sequence, explicit formula]
 * - Distractor patterns: [r(a^n), r(a^{n-1}), a(r^n), a(r^{n-1}) correct]
 * - Constraints: [Correct formula is a·r^(n-1)]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 *
 * MATH (re-derived):
 *   Geometric sequence, first term a, common ratio r. The nth term is w = a * r^(n-1).
 *   Distractors swap base/coefficient or the exponent:
 *     r(a^n), r(a^{n-1}), a(r^n)  vs correct  a(r^{n-1}).
 *   These four expression strings are all distinct EXCEPT when a == r, in which case
 *   r(a^n) == a(r^n) and r(a^{n-1}) == a(r^{n-1}). We force a != r to keep 4 distinct
 *   options for every draw (verified over a in [3,12], r in [2,6]).
 */

export const generator_1104 = {
  metadata: {
    id: "1104",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(3, 12);
    let r = getRandomInt(2, 6);
    let tries = 0;
    while (r === a && tries++ < 50) {
      r = getRandomInt(2, 6); // ensure a != r so no two option expressions coincide
    }

    const optionsData = [
      { text: `$w=${r}(${a}^n)$`, isCorrect: false },
      { text: `$w=${r}(${a}^{n-1})$`, isCorrect: false },
      { text: `$w=${a}(${r}^n)$`, isCorrect: false },
      { text: `$w=${a}(${r}^{n-1})$`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `The first term of a sequence is ${a}. Each term after the first is ${r} times the preceding term. If $w$ represents the $n$th term of the sequence, which equation gives $w$ in terms of $n$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$w=${a}(${r}^{n-1})$`,
      explanation: `Choice ${correctLetter} is correct. For a geometric sequence, the $n$th term equals the first term times the common ratio raised to the power $n-1$. With first term ${a} and common ratio ${r}, this gives $w=${a}(${r}^{n-1})$. Using ${r} as the base instead of the first term, or writing the exponent as $n$ rather than $n-1$ (which would give the term after the intended one), produces the other choices.`
    };
  }
};
