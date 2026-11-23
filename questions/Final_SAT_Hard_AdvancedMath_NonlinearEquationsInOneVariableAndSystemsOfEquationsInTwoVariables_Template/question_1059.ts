import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1059
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [equation ax²+bx=t, discriminant<0 condition on t]
 * - Difficulty factors: [Determining parameter range for no real solutions]
 * - Distractor patterns: [Only one option satisfies t < threshold]
 * - Constraints: [threshold -b²/(4a) constructed to be an integer]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1059 = {
  metadata: {
    id: "1059",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Equation: ax^2 + bx = t with b = -2k. Rearranged: ax^2 + bx - t = 0.
    // No real solutions when the discriminant is negative:
    //   b^2 + 4at < 0  =>  t < -b^2/(4a) = -k^2/a.
    // Choose a from the divisors of k^2 (capped at 4) so the threshold is an
    // integer for every draw — no float artifacts.
    const k = getRandomInt(2, 5);
    const b = -2 * k;
    const validA = [1, 2, 3, 4].filter(v => (k * k) % v === 0);
    const a = getRandomElement(validA);
    const threshold = -(k * k) / a; // integer by construction

    const aStr = a === 1 ? '' : String(a);

    // Before: the wrong choices were threshold + 1, + 3, + 5 (fixed offsets
    // that no student slip produces), the stem said "the equation above", and
    // the explanation was split over lines. Now exactly one option is below the
    // threshold -m (m = k^2/a > 0), and each wrong choice is a slip:
    //   -m     : the boundary value; the discriminant is 0 (one solution)
    //   -m + 1 : reversing the inequality (solving b^2 + 4at > 0, the
    //            condition for two real solutions)
    //   m + 1  : treating the constant term as +t instead of -t, which gives
    //            b^2 - 4at < 0, that is, t > m
    // m >= 1, so the values -m - j, -m, -m + 1, m + 1 are always distinct.
    const m = -threshold;
    const correctValue = threshold - getRandomInt(1, 3);
    const discOf = (t: number) => b * b + 4 * a * t;

    const optionsData = [
      { text: `$${correctValue}$`, isCorrect: true, reason: '' },
      { text: `$${threshold}$`, isCorrect: false, reason: `$${threshold}$ is the boundary value: it makes the discriminant $${b * b}+${4 * a}(${threshold})=0$, so the equation has exactly one real solution, not zero` },
      { text: `$${threshold + 1}$`, isCorrect: false, reason: `$${threshold + 1}$ results from reversing the inequality and solving $${b * b}+${4 * a}t>0$, which is the condition for two real solutions; it gives a discriminant of $${discOf(threshold + 1)}>0$` },
      { text: `$${m + 1}$`, isCorrect: false, reason: `$${m + 1}$ results from using $c=t$ instead of $c=-t$, which gives $${b * b}-${4 * a}t<0$, or $t>${m}$; in fact $t=${m + 1}$ gives a discriminant of $${discOf(m + 1)}>0$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Subtracting $t$ from both sides of $${aStr}x^2 ${b}x = t$ gives $${aStr}x^2 ${b}x - t = 0$. A quadratic equation has no real solutions exactly when its discriminant $b^2 - 4ac$ is negative. Here the discriminant is $(${b})^2 - 4(${a})(-t) = ${b * b} + ${4 * a}t$, so the equation has no real solutions when $${b * b} + ${4 * a}t < 0$, that is, when $t < ${threshold}$. Of the choices, only $${correctValue}$ is less than $${threshold}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `$${aStr}x^2 ${b}x = t$\n\nIn the given equation, $t$ is a constant. If the equation has no real solutions, which of the following could be the value of $t$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
