import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 308
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [price1: 10-12, price2: 8-9, total: 200-250, revenue: 2000-2500]
 * - Difficulty factors: [Setting up system for ticket sales]
 * - Distractor patterns: [Swapped totals, swapped prices, wrong variable assignment]
 * - Constraints: [Valid integer solution]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_308 = {
  metadata: {
    id: "308",
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

    const correctAnswer = `$\\begin{aligned} f + r &= ${total} \\\\ ${priceFull}f + ${priceReduced}r &= ${revenue.toLocaleString('en-US')} \\end{aligned}$`;
    const optionsData = [
      { text: `$\\begin{aligned} f + r &= ${revenue.toLocaleString('en-US')} \\\\ ${priceFull}f + ${priceReduced}r &= ${total} \\end{aligned}$`, isCorrect: false, reason: `it sets the number of tickets, $f + r$, equal to the amount collected, ${revenue.toLocaleString('en-US')}, and the amount collected equal to the number of tickets, ${total}` },
      { text: correctAnswer, isCorrect: true, reason: '' },
      { text: `$\\begin{aligned} f + r &= ${total} \\\\ ${priceReduced}f + ${priceFull}r &= ${revenue.toLocaleString('en-US')} \\end{aligned}$`, isCorrect: false, reason: `it charges \\$${priceReduced} for each full-price ticket and \\$${priceFull} for each reduced-price ticket, which reverses the two prices` },
      { text: `$\\begin{aligned} f + r &= ${revenue.toLocaleString('en-US')} \\\\ ${priceReduced}f + ${priceFull}r &= ${total} \\end{aligned}$`, isCorrect: false, reason: `it reverses the two prices and also reverses the number of tickets, ${total}, and the amount collected, ${revenue.toLocaleString('en-US')}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // The prices and the total used to be written as $10$, so they rendered
    // as plain numbers without dollar signs.
    const revenueText = revenue.toLocaleString('en-US');
    const explanation = `Choice ${correctOption.letter} is correct. The theater sold ${total} tickets in all, so $f + r = ${total}$. The full-price tickets brought in $${priceFull}f$ dollars and the reduced-price tickets brought in $${priceReduced}r$ dollars, for a total of \\$${revenueText}, so $${priceFull}f + ${priceReduced}r = ${revenueText}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `A movie theater charges \\$${priceFull} for each full-price ticket and \\$${priceReduced} for each reduced-price ticket. For one movie showing, the theater sold a total of ${total} full-price and reduced-price tickets for \\$${revenueText}. Which of the following systems of equations could be used to determine the number of full-price tickets, $f$, and the number of reduced-price tickets, $r$, sold?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};