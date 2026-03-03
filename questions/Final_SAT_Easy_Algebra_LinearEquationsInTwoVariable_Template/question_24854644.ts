import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 24854644
 *
 * ORIGINAL ANALYSIS: [Parallel lines, slope/intercept from point]
 */

export const generator_24854644 = {
  metadata: {
    // id: "24854644",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(2, 9);
    const givenIntercept = getRandomInt(2, 9);
    const intercept = getRandomInt(2, 10);

    const correctEquation = `y = ${slope}x + ${intercept}`;

    const optionsData = [
      { text: `$y = ${slope}x + ${intercept}$`, isCorrect: true },
      { text: `$y = ${intercept}x$`, isCorrect: false, reason: "incorrectly uses y-coordinate as slope" },
      { text: `$y = ${slope}x$`, isCorrect: false, reason: "omits y-intercept" },
      { text: `$y = ${intercept}x + ${slope}$`, isCorrect: false, reason: "swaps slope and intercept" }
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
      correctAnswer: correctEquation,
      explanation: `Choice ${correctLetter} is correct. Parallel lines have the same slope ($${slope}$). The point $(0, ${intercept})$ gives the intercept $b=${intercept}$.`
    };
  }
};

/**
 * Question ID: 87322577
 *
 * ORIGINAL ANALYSIS: [Constant meaning in context]
 */