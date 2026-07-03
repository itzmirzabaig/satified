import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1186
 *
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Equations In Two Variables
 * - Logic: The line x = xVal is vertical (undefined slope). A line
 *   perpendicular to a vertical line is horizontal, so its slope is 0.
 * - Correct answer: 0.
 * - Distractors: reciprocal-style trap (-1/xVal), negative-of-x trap (-xVal),
 *   and the "no defined slope" trap (mistaking perpendicular for parallel).
 * - Guards: xVal in [2,10] keeps -xVal and -1/xVal distinct from each other
 *   and from 0, and avoids the degenerate 1/1.
 */

export const generator_1186 = {
  metadata: {
    id: "1186",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const xVal = getRandomInt(2, 10);

    // Build options. correctAnswer will be the exact text of the correct one.
    const optionsData = [
      { text: `$0$`, isCorrect: true, reason: "" },
      { text: `$-\\frac{1}{${xVal}}$`, isCorrect: false, reason: "incorrectly treats the answer as a negative reciprocal slope" },
      { text: `$-${xVal}$`, isCorrect: false, reason: "confuses the slope with the negative of the $x$-value" },
      { text: `$\\frac{1}{${xVal}}$`, isCorrect: false, reason: "incorrectly treats the answer as a reciprocal slope" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `Line $\\ell$ in the $xy$-plane is perpendicular to the line with equation $x = ${xVal}$. What is the slope of line $\\ell$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. The equation $x = ${xVal}$ represents a vertical line, which has no defined slope. A line perpendicular to a vertical line is horizontal, and a horizontal line has slope $m = 0$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
