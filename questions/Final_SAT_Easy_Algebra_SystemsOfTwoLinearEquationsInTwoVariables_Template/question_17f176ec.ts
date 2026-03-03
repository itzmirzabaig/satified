import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 17f176ec
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [price1: 10-12, price2: 8-9, total: 200-250, revenue: 2000-2500]
 * - Difficulty factors: [Setting up system for ticket sales]
 * - Distractor patterns: [Swapped totals, swapped prices, wrong variable assignment]
 * - Constraints: [Valid integer solution]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_17f176ec = {
  metadata: {
    // id: "17f176ec",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const priceFull = getRandomInt(10, 13);
    const priceReduced = Math.floor(priceFull * 0.75);
    const numFull = getRandomInt(100, 150);
    const numReduced = getRandomInt(80, 120);
    const total = numFull + numReduced;
    const revenue = priceFull * numFull + priceReduced * numReduced;

    const correctAnswer = `f + r = ${total}\n${priceFull}f + ${priceReduced}r = ${revenue.toLocaleString()}`;
    const optionsData = [
      { text: `f + r = ${revenue.toLocaleString()}\n${priceFull}f + ${priceReduced}r = ${total}`, isCorrect: false, reason: "swaps the total tickets with total revenue" },
      { text: correctAnswer, isCorrect: true },
      { text: `f + r = ${total}\n${priceReduced}f + ${priceFull}r = ${revenue.toLocaleString()}`, isCorrect: false, reason: "swaps the prices for full and reduced tickets" },
      { text: `f + r = ${revenue.toLocaleString()}\n${priceReduced}f + ${priceFull}r = ${total}`, isCorrect: false, reason: "swaps both totals and prices" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The total tickets sold is $f + r = ${total}$. The revenue from full-price tickets is $${priceFull}f$ and from reduced-price tickets is $${priceReduced}r$, totaling $${revenue.toLocaleString()}$, so $${priceFull}f + ${priceReduced}r = ${revenue}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A movie theater charges $${priceFull}$ for each full-price ticket and $${priceReduced}$ for each reduced-price ticket. For one movie showing, the theater sold a total of ${total} full-price and reduced-price tickets for $${revenue.toLocaleString()}$. Which of the following systems of equations could be used to determine the number of full-price tickets, $f$, and the number of reduced-price tickets, $r$, sold?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 44d65912
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coins: 20-30, stars: 10-15, score1: 500-800, score2: 700-1000]
 * - Difficulty factors: [Setting up system for points calculation]
 * - Distractor patterns: [Swapped items, wrong totals, wrong coefficients]
 * - Constraints: [Valid integer solution]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */