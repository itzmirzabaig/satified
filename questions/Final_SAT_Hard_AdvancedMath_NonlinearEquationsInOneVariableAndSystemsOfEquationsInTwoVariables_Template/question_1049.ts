import { getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1049
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [simple linear and quadratic system, intersection points]
 * - Difficulty factors: [System with parabola and line, solving by substitution, involves radicals]
 * - Distractor patterns: [Other radical combinations, sign errors]
 * - Constraints: [k and 2k must both be non-perfect-squares so radicals stay irrational]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1049 = {
  metadata: {
    id: "1049",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // System: x - y = 1 and x + y = x^2 - k.
    // Substituting x = y + 1 into the second equation:
    //   (y+1) + y = (y+1)^2 - k  =>  2y + 1 = y^2 + 2y + 1 - k  =>  y^2 = k.
    // Solutions: (1 + sqrt(k), sqrt(k)) and (1 - sqrt(k), -sqrt(k)).
    // k is restricted so that neither k nor 2k (used by a distractor radical)
    // is a perfect square, keeping every displayed radical irrational.
    const finalK = getRandomElement([3, 5, 6, 7]);

    // Correct: (1 + sqrt(k), sqrt(k)).
    const correctText = `$(1+\\sqrt{${finalK}}, \\sqrt{${finalK}})$`;
    // Distractor: (sqrt(k), -sqrt(k)) — swapped/sign-error pattern.
    //   Not a solution: x - y = 2*sqrt(k) != 1 for k >= 3.
    const distractorB = `$(\\sqrt{${finalK}},-\\sqrt{${finalK}})$`;
    // Distractor: wrong radical sqrt(2k).
    //   Satisfies x - y = 1 but fails the second equation by exactly k != 0.
    const distractorC = `$(1+\\sqrt{${2 * finalK}}, \\sqrt{${2 * finalK}})$`;
    // Distractor: (sqrt(k), -1 + sqrt(k)) — coordinates mixed up.
    //   Satisfies x - y = 1 but fails the second equation (2*sqrt(k) - 1 != 0 for k >= 3).
    const distractorD = `$(\\sqrt{${finalK}},-1+\\sqrt{${finalK}})$`;

    const optionsData = [
      { text: correctText, isCorrect: true, reason: "" },
      { text: distractorB, isCorrect: false, reason: "incorrectly uses the y-value as the x-coordinate and pairs it with the negative y-value; this pair does not satisfy the first equation" },
      { text: distractorC, isCorrect: false, reason: `uses $\\sqrt{${2 * finalK}}$ instead of $\\sqrt{${finalK}}$; this pair satisfies the first equation but not the second` },
      { text: distractorD, isCorrect: false, reason: "mixes up the coordinate pattern; this pair satisfies the first equation but not the second" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. From the first equation, $x = y + 1$. Substituting into the second equation gives $(y+1) + y = (y+1)^2 - ${finalK}$. Expanding the right side: $(y+1) + y = y^2 + 2y + 1 - ${finalK}$. Subtracting $(2y+1)$ from both sides leaves $y^2 - ${finalK} = 0$, so $y = \\pm\\sqrt{${finalK}}$. When $y = \\sqrt{${finalK}}$, the first equation gives $x = 1 + \\sqrt{${finalK}}$, so $(1+\\sqrt{${finalK}}, \\sqrt{${finalK}})$ is a solution of the system. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `$x - y = 1$\n$x + y = x^2 - ${finalK}$\n\nWhich ordered pair is a solution to the system of equations above?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
