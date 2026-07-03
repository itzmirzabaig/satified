import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 167
 *
 * ORIGINAL ANALYSIS: [Parallel lines, slope/intercept from point]
 */

export const generator_167 = {
  metadata: {
    id: "167",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // slope must differ from intercept so the swapped-coefficient distractor
    // (and the two slope-only distractors) can never collide with each other
    // or with the correct equation.
    const slope = getRandomInt(2, 9);
    const intercept = getRandomElement([2, 3, 4, 5, 6, 7, 8, 9, 10].filter(v => v !== slope));
    // The given parallel line must not be the SAME line, so its intercept
    // must differ from the answer line's intercept.
    const givenIntercept = getRandomElement([2, 3, 4, 5, 6, 7, 8, 9].filter(v => v !== intercept));

    const correctText = `$y = ${slope}x + ${intercept}$`;

    const optionsData = [
      { text: correctText, isCorrect: true, reason: "" },
      { text: `$y = ${intercept}x$`, isCorrect: false, reason: `uses the $y$-coordinate of the point as the slope and omits the $y$-intercept` },
      { text: `$y = ${slope}x$`, isCorrect: false, reason: `has the correct slope but omits the $y$-intercept` },
      { text: `$y = ${intercept}x + ${slope}$`, isCorrect: false, reason: `swaps the slope and the $y$-intercept` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What is the equation of the line that passes through $(0, ${intercept})$ and is parallel to $y = ${slope}x + ${givenIntercept}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Parallel lines have the same slope, so the slope of the new line is $m = ${slope}$. The line passes through $(0, ${intercept})$, so its $y$-intercept is $b = ${intercept}$. Substituting into $y = mx + b$ gives $y = ${slope}x + ${intercept}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because it ${o.reason}.`).join(' ')}`
    };
  }
};
