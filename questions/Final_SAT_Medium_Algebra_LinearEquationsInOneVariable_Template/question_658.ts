import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 658
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [m: 3-6, p: 2-5, k: 2-3]
 * - Difficulty factors: [Infinite solutions condition with fractions]
 * - Distractor patterns: [reports m, adds m+k, over-counts by k]
 * - Constraints: [For infinitely many solutions: a = m*k AND n = m*p]
 * - Question type: [Multiple Choice Text]
 *
 * MATH NOTE: The equation is  m*x + n = a(x + p)/k.  Expanding the right side
 * gives (a/k)x + (a*p)/k. For the equation to have infinitely many solutions
 * both sides must be identical, which forces TWO conditions:
 *   coefficient of x:  m = a/k        =>  a = m*k
 *   constant term:     n = (a*p)/k = (m*k*p)/k = m*p
 * So the constant n is NOT free: it must equal m*p for the "infinitely many
 * solutions" premise to be true at all. We therefore construct n = m*p rather
 * than drawing it independently (the original independent draw made the premise
 * impossible for almost every draw). The question asks for a = m*k.
 *
 * DISTINCTNESS: with m in [3,6], k in [2,3] the answer a = m*k and the three
 * distractors m, m+k, a+k are pairwise distinct for every draw:
 *   a  > m      because k >= 2  => m*k >= 2m > m
 *   a  > m+k    because (m-1)(k-1) >= 2  => m*k > m+k
 *   a+k differs from a, m, m+k by a positive amount in every case
 */

export const generator_658 = {
  metadata: {
    id: "658",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Equation form: m*x + n = a(x + p)/k
    // Infinite solutions => a = m*k and n = m*p (see MATH NOTE above).
    const m = getRandomInt(3, 6);
    const p = getRandomInt(2, 5);
    const k = getRandomInt(2, 3);
    const n = m * p;          // forced by the constant-term condition
    const a = m * k;          // the value being asked for

    // Deterministic, provably-distinct distractors (see DISTINCTNESS note):
    const distReportsM = m;       // reports the coefficient, forgot to multiply by k
    const distAdds     = m + k;   // added m and k instead of multiplying
    const distOverBy   = a + k;   // multiplied correctly then over-counted by k

    const correctText = `${a}`;
    const optionsData = [
      { text: `${distReportsM}`, isCorrect: false },
      { text: `${distAdds}`, isCorrect: false },
      { text: `${a}`, isCorrect: true },
      { text: `${distOverBy}`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;

    return {
      questionText: `\\( ${m}x + ${n} = \\frac{a(x + ${p})}{${k}} \\) In the given equation, \\(a\\) is a constant. If the equation has infinitely many solutions, what is the value of \\(a\\)?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. For an equation to have infinitely many solutions, the two sides must be identical after expanding. Distributing on the right gives \\( ${m}x + ${n} = \\frac{a}{${k}}x + \\frac{${p}a}{${k}} \\). Matching the coefficients of \\(x\\): \\( ${m} = \\dfrac{a}{${k}} \\), so \\( a = ${m} \\times ${k} = ${a} \\). (The constant terms agree as well, since \\( \\dfrac{${p}\\cdot ${a}}{${k}} = ${n} \\).) The value \\( ${distReportsM} \\) is only the coefficient of \\(x\\) (multiplying by \\( ${k} \\) was skipped); \\( ${distAdds} \\) comes from adding \\( ${m} \\) and \\( ${k} \\) instead of multiplying; and \\( ${distOverBy} \\) over-counts the product by \\( ${k} \\).`
    };
  }
};
