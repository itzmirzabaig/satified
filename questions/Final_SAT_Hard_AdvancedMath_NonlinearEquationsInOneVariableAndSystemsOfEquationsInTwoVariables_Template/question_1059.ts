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

    // Exactly one option below the threshold; the rest strictly above it.
    // All four values are distinct for every draw.
    const correctValue = threshold - 1;
    const d1 = threshold + 1;
    const d2 = threshold + 3;
    const d3 = threshold + 5;

    // For t = threshold + j (j > 0) the discriminant is b^2 + 4at = 4aj > 0.
    const reasonFor = (t: number) => `substituting $t = ${t}$ gives a discriminant of $ ${b * b} + ${4 * a}(${t}) = ${b * b + 4 * a * t} > 0$, so the equation would have two real solutions`;

    const optionsData = [
      { text: `$${correctValue}$`, isCorrect: true, reason: '' },
      { text: `$${d1}$`, isCorrect: false, reason: reasonFor(d1) },
      { text: `$${d2}$`, isCorrect: false, reason: reasonFor(d2) },
      { text: `$${d3}$`, isCorrect: false, reason: reasonFor(d3) }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Subtracting $t$ from both sides of $ ${aStr}x^2 ${b}x = t$ gives $ ${aStr}x^2 ${b}x - t = 0$. A quadratic equation has no real solutions exactly when its discriminant $b^2 - 4ac$ is negative. Here the discriminant is $(${b})^2 - 4(${a})(-t) = ${b * b} + ${4 * a}t$, so the equation has no real solutions when $ ${b * b} + ${4 * a}t < 0$, that is, when $t < ${threshold}$. Of the choices, only $ ${correctValue}$ is less than $ ${threshold}$.
Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;

    return {
      questionText: `$ ${aStr}x^2 ${b}x = t$\n\nIn the equation above, $t$ is a constant. If the equation has no real solutions, which of the following could be the value of $t$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
