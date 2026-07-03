import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1044
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [5x²+10x+16=0, discriminant=100-320=-220]
 * - Difficulty factors: [Calculate discriminant, identify sign]
 * - Distractor patterns: [A: one, B: two, C: infinite, D: zero/correct]
 * - Constraints: [Discriminant negative means no real solutions]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1044 = {
  metadata: {
    id: "1044",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Pattern: ax^2 + bx + c = 0 with b^2 < 4ac (negative discriminant),
    // guaranteed by construction (no retry loop needed).
    const a = getRandomInt(2, 6);
    const b = getRandomInt(5, 15);
    // Smallest integer c with 4ac > b^2, plus a random bump.
    // Then b^2 - 4ac <= -1 for every draw.
    const finalC = Math.floor((b * b) / (4 * a)) + 1 + getRandomInt(0, 8);
    const finalDisc = b * b - 4 * a * finalC;

    const optionsData = [
      { text: `Exactly one`, isCorrect: false, reason: "would require the discriminant to equal zero" },
      { text: `Exactly two`, isCorrect: false, reason: "would require a positive discriminant" },
      { text: `Infinitely many`, isCorrect: false, reason: "suggests infinitely many solutions, which is impossible for a quadratic equation" },
      { text: `Zero`, isCorrect: true, reason: "" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. The number of distinct real solutions of $px^2 + qx + r = 0$ is determined by the discriminant $\\Delta = q^2 - 4pr$. Here $\\Delta = (${b})^2 - 4(${a})(${finalC}) = ${b * b} - ${4 * a * finalC} = ${finalDisc}$. Since $\\Delta < 0$, the equation has zero distinct real solutions.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `$ ${a}x^2 + ${b}x + ${finalC} = 0$\n\nHow many distinct real solutions does the given equation have?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
