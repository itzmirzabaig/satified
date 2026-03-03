import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: ee846db7
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 3-8, 6-12 (decimal prices), total: 500-2000]
 * - Difficulty factors: [Interpreting linear equation coefficients in context]
 * - Distractor patterns: [Confusing total revenue with unit price, confusing variables]
 * - Constraints: [Prices should be reasonable decimal values, total should calculate correctly]
 * - Question type: [Word Problem → Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_ee846db7 = {
  metadata: {
    // id: "ee846db7",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const smallPrice = parseFloat((getRandomInt(3, 8) + getRandomInt(0, 99) / 100).toFixed(2));
    const largePrice = parseFloat((getRandomInt(6, 12) + getRandomInt(0, 99) / 100).toFixed(2));
    const totalSales = parseFloat((getRandomInt(500, 2000) + getRandomInt(0, 99) / 100).toFixed(2));

    const correctText = `$${smallPrice.toFixed(2)}$`;

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `$${largePrice.toFixed(2)}y$`, isCorrect: false, reason: "represents the total revenue from larger containers, not the unit price of smaller ones" },
      { text: `$${largePrice.toFixed(2)}$`, isCorrect: false, reason: "represents the price of larger containers, not smaller ones" },
      { text: `$${smallPrice.toFixed(2)}x$`, isCorrect: false, reason: "represents the total revenue from smaller containers, not the unit price" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A store sells two different-sized containers of a certain Greek yogurt. The store's sales of this Greek yogurt totaled $${totalSales.toFixed(2)}$ dollars last month. The equation $${smallPrice.toFixed(2)}x + ${largePrice.toFixed(2)}y = ${totalSales.toFixed(2)}$ represents this situation, where $x$ is the number of smaller containers sold and $y$ is the number of larger containers sold. According to the equation, which of the following represents the price, in dollars, of each smaller container?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. In the equation $${smallPrice.toFixed(2)}x + ${largePrice.toFixed(2)}y = ${totalSales.toFixed(2)}$, the term $${smallPrice.toFixed(2)}x$ represents the total revenue from smaller containers (price × quantity). Therefore, $${smallPrice.toFixed(2)}$ is the price of each smaller container. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 5b8a8475
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-6]
 * - Difficulty factors: [Perpendicular lines have negative reciprocal slopes]
 * - Distractor patterns: [Using negative without reciprocal, using reciprocal without negative]
 * - Constraints: [Slope cannot be 0]
 * - Question type: [Conceptual → Multiple Choice Text]
 * - Figure generation: [None]
 */