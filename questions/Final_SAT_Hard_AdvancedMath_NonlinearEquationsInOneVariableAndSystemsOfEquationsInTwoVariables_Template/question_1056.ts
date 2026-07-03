import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1056
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [(x-1)²=-4]
 * - Difficulty factors: [Square of real number cannot be negative]
 * - Distractor patterns: [A: one solution, B: two solutions, C: infinite, D: zero/correct]
 * - Constraints: [No real solutions since left side ≥ 0, right side < 0]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1056 = {
  metadata: {
    id: "1056",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Pattern: (x-h)² = -k where k > 0, so there are no real solutions.
    const h = getRandomInt(1, 5);
    const k = getRandomInt(2, 10);

    // STEP 2: Create options ("Zero" is correct — no real solutions)
    const optionsData = [
      { text: `Exactly one`, isCorrect: false, reason: `the equation would have exactly one real solution only if the right-hand side were equal to zero, since $(x-${h})^2=0$ has the single solution $x=${h}$` },
      { text: `Exactly two`, isCorrect: false, reason: `the equation would have exactly two real solutions only if the right-hand side were a positive number` },
      { text: `Infinitely many`, isCorrect: false, reason: `the equation would have infinitely many solutions only if it were true for every value of $x$, which it is not` },
      { text: `Zero`, isCorrect: true, reason: `` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. For any real value of $x$, the expression $(x-${h})^2$ is the square of a real number, so its value is always greater than or equal to zero. However, the equation states that $(x-${h})^2=-${k}$, and $-${k}$ is negative. Since a nonnegative number can never equal a negative number, no real value of $x$ satisfies the equation, so it has zero real solutions.
Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;

    return {
      questionText: `How many distinct real solutions does the given equation have?\n\n$(x-${h})^2=-${k}$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
