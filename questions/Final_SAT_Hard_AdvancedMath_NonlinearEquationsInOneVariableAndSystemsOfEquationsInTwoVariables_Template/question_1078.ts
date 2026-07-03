import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1078
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [(x-a)(x-b)=x-b with symbolic constant a > b, b randomized]
 * - Difficulty factors: [Factor out common term, don't divide by zero, zero product property]
 * - Distractor patterns: [Roman numeral combinations; I (a) is never a solution]
 * - Constraints: [Solutions are b and a+1, not a; a stays symbolic in the equation]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1078 = {
  metadata: {
    id: "1078",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Pattern: (x-a)(x-b) = x-b where a is a symbolic constant with a > b.
    // (x-b)(x-a-1) = 0, so the solutions are x = b and x = a+1.
    // x = a is NOT a solution: it makes the left side 0 but the right side a-b > 0.
    const b = getRandomInt(20, 40);

    // Roman numerals: I. a (not a solution), II. a+1 (solution), III. b (solution)
    const optionsData = [
      { text: `I and II only`, isCorrect: false, reason: `it includes I, but $a$ is not a solution: substituting $x=a$ makes the left-hand side zero while the right-hand side equals $a-${b}$, which is nonzero because $a>${b}$; it also omits III, even though $x=${b}$ makes both sides zero` },
      { text: `I and III only`, isCorrect: false, reason: `it includes I, which is not a solution, and omits II, even though $x=a+1$ makes both sides equal to $a+1-${b}$` },
      { text: `II and III only`, isCorrect: true, reason: `` },
      { text: `I, II, and III`, isCorrect: false, reason: `it includes I, but $a$ is not a solution, since substituting $x=a$ gives zero on the left-hand side and the nonzero value $a-${b}$ on the right-hand side` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Subtracting $x-${b}$ from both sides gives $(x-a)(x-${b})-(x-${b})=0$. Factoring out the common factor $x-${b}$ gives $(x-${b})(x-a-1)=0$. By the zero product property, $x=${b}$ or $x=a+1$, so II and III are both solutions. Substituting $x=a$ makes the left-hand side zero but makes the right-hand side $a-${b}$, which is nonzero because $a>${b}$, so I is not a solution. (Dividing both sides by $x-${b}$ instead of factoring would incorrectly discard the solution $x=${b}$.)
Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;

    return {
      questionText: `$(x-a)(x-${b})=x-${b}$\n\nIn the given equation, $a$ is a constant and $a>${b}$. Which of the following are solutions to the equation?\n\nI. $a$\nII. $a+1$\nIII. $\\,${b}$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
