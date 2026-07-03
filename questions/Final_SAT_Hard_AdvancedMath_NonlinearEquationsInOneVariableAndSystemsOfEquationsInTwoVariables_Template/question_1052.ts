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
    // sqrt(4ac) = 2pq is an integer and the boundary distractor -2pq gives a
    // discriminant of EXACTLY zero (like the original 64/25 -> 6400 -> 80).
    const p = getRandomInt(6, 9);  // a = 36..81
    const q = getRandomInt(4, 6);  // c = 16..36
    const a = p * p;
    const c = q * q;
    const threshold = 2 * p * q;   // sqrt(4ac), integer, 48..108

    // Correct: |b| > threshold (discriminant positive).
    const correctB = -(threshold + getRandomInt(5, 15));
    // Boundary: b = -threshold gives b^2 = 4ac, discriminant exactly 0.
    const boundaryB = -threshold;
    // Two values with |b| < threshold (discriminant negative), drawn from
    // DISJOINT ranges so they can never collide: [2, threshold-16] and
    // [threshold-15, threshold-5]. threshold >= 48 keeps both ranges valid.
    const wrongB1 = getRandomInt(2, threshold - 16);
    const wrongB2 = getRandomInt(threshold - 15, threshold - 5);

    const optionsData = [
      { text: `$${correctB}$`, isCorrect: true, reason: "" },
      { text: `$${boundaryB}$`, isCorrect: false, reason: `makes the discriminant equal to zero ($b^2 = ${4 * a * c}$ exactly), so the equation has exactly one real solution` },
      { text: `$${wrongB1}$`, isCorrect: false, reason: "makes the discriminant negative, so the equation has no real solutions" },
      { text: `$${wrongB2}$`, isCorrect: false, reason: "makes the discriminant negative, so the equation has no real solutions" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. A quadratic equation has more than one real solution exactly when its discriminant is positive: $b^2 - 4(${a})(${c}) > 0$, that is, $b^2 > ${4 * a * c}$. Since $\\sqrt{${4 * a * c}} = ${threshold}$, this requires $b < -${threshold}$ or $b > ${threshold}$. Of the choices, only $${correctB}$ satisfies this condition, because $|${correctB}| = ${-correctB} > ${threshold}$.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `$${a}x^2 + bx + ${c} = 0$\n\nIn the given equation, $b$ is a constant. For which of the following values of $b$ will the equation have more than one real solution?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
