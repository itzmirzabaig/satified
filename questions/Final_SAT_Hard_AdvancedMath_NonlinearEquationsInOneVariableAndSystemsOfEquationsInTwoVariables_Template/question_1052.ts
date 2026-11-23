import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1052
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [64x²+bx+25=0, find b for more than one solution (b²>6400)]
 * - Difficulty factors: [Discriminant > 0 condition, find which value satisfies]
 * - Distractor patterns: [A: -91/correct, B: -80 (disc=0), C: 5 (disc<0), D: 40 (disc<0)]
 * - Constraints: [a and c are perfect squares so sqrt(4ac) is an integer; only one option has |b| > sqrt(4ac)]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1052 = {
  metadata: {
    id: "1052",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // ax^2 + bx + c = 0 has more than one real solution iff b^2 - 4ac > 0.
    // Pick a = p^2 and c = q^2 (both perfect squares) so that
    // sqrt(4ac) = 2pq is an integer and b = +/-2pq gives a discriminant of
    // exactly zero (like the original 64/25 -> 6400 -> 80).
    //
    // Before: two wrong choices were random numbers, the correct b was always
    // the only large negative value, numbers of 1,000 or more had no comma,
    // and the explanation was split over several lines. Now the signs vary
    // and each wrong choice is a named slip:
    //   +/-2pq   the boundary, discriminant exactly 0
    //   +/-pq    sqrt(ac), the boundary when the 4 is left out
    //   +/-(p+q) middle term of (px + q)^2 written as (p + q)x
    // p >= 6 and q >= 4 give p + q < pq < 2pq < |correct b|, so all differ.
    const p = getRandomInt(6, 9);  // a = 36..81
    const q = getRandomInt(4, 6);  // c = 16..36
    const a = p * p;
    const c = q * q;
    const threshold = 2 * p * q;   // sqrt(4ac), integer, 48..108
    const fourAC = 4 * a * c;
    const sign = () => (getRandomInt(0, 1) === 0 ? 1 : -1);
    const m = (n: number) => n.toLocaleString('en-US').replace(/,/g, '{,}');

    const correctB = sign() * (threshold + getRandomInt(5, 15));
    const boundaryB = sign() * threshold;
    const noFourB = sign() * (p * q);
    const sumB = sign() * (p + q);

    const optionsData = [
      { text: `$${correctB}$`, isCorrect: true, reason: "" },
      { text: `$${boundaryB}$`, isCorrect: false, reason: `$${boundaryB}$ makes $b^2 = ${m(fourAC)}$, which equals $4(${a})(${c})$, so the discriminant is zero and the equation has exactly one real solution` },
      { text: `$${noFourB}$`, isCorrect: false, reason: `$${noFourB}$ is the boundary found by leaving the 4 out of the discriminant, since $${p * q}^2 = (${a})(${c})$; here $b^2 = ${m(a * c)}$ is less than $${m(fourAC)}$, so the equation has no real solutions` },
      { text: `$${sumB}$`, isCorrect: false, reason: `$${sumB}$ results from writing the middle term of $(${p}x ${sumB < 0 ? '-' : '+'} ${q})^2$ as $${sumB < 0 ? '-' : ''}(${p} + ${q})x$ instead of $${sumB < 0 ? '-' : ''}2(${p})(${q})x$; here $b^2 = ${m(sumB * sumB)}$ is less than $${m(fourAC)}$, so the equation has no real solutions` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. A quadratic equation has more than one real solution exactly when its discriminant is positive: $b^2 - 4(${a})(${c}) > 0$, that is, $b^2 > ${m(fourAC)}$. Since $\\sqrt{${m(fourAC)}} = ${threshold}$, this requires $b < -${threshold}$ or $b > ${threshold}$. Of the choices, only $${correctB}$ satisfies this condition, because $|${correctB}| = ${Math.abs(correctB)}$ and $${Math.abs(correctB)} > ${threshold}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `$${a}x^2 + bx + ${c} = 0$\n\nIn the given equation, $b$ is a constant. For which of the following values of $b$ will the equation have more than one real solution?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
