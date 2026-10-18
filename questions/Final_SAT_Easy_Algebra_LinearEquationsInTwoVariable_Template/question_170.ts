import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 170
 *
 * ORIGINAL ANALYSIS: [Snail count from total cost]
 * - Number ranges: [pR: 5-12, pN: 3-8, nN: 1-4]
 * - Constraints: [total must be divisible to give integer nR]
 *
 * FIX NOTES:
 * One distractor was nR + 1, explained as "one more than the number of rabbit
 * snails bought". It is now the dollars spent on rabbit snails (forgetting to
 * divide by the price). Reasons are listed in letter order as full sentences.
 */

export const generator_170 = {
  metadata: {
    id: "170",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Redraw until the four option values are distinct.
    let pN = 3, pR = 7, nR = 3, nN = 1;
    let neriteCost = 0, priceSum = 0, rabbitCost = 0;
    do {
      pN = getRandomInt(3, 8);                     // nerite snail price
      pR = getRandomInt(5, 12);                    // rabbit snail price
      nR = getRandomInt(3, 8);                     // number of rabbit snails (the answer)
      nN = getRandomInt(1, 4);                     // number of nerite snails
      neriteCost = pN * nN;
      priceSum = pR + pN;
      rabbitCost = pR * nR;
    } while (pR === pN || new Set([nR, neriteCost, priceSum, rabbitCost]).size < 4);
    const total = rabbitCost + neriteCost;

    const optionsData = [
      { key: 'correct', text: nR.toString(), isCorrect: true, reason: '' },
      { key: 'neriteCost', text: neriteCost.toString(), isCorrect: false, reason: `it is the cost, in dollars, of the nerite snails, not a number of snails` },
      { key: 'priceSum', text: priceSum.toString(), isCorrect: false, reason: `it is the sum of the two prices, \\$${pR} and \\$${pN}` },
      { key: 'rabbitCost', text: rabbitCost.toString(), isCorrect: false, reason: `it is the amount, in dollars, spent on rabbit snails; this amount must still be divided by \\$${pR}, the price of one rabbit snail` }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const letterOf = (key: string) => shuffled.find(o => o.key === key)!.letter;

    return {
      questionText: `An aquarium owner buys rabbit snails for \\$${pR} each and nerite snails for \\$${pN} each, spending a total of \\$${total}. If the owner bought ${nN} nerite snail${nN === 1 ? '' : 's'}, how many rabbit snails did the owner buy?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: nR.toString(),
      explanation: `Choice ${letterOf('correct')} is correct. ${nN === 1 ? `The nerite snail cost ${pN} dollars` : `The ${nN} nerite snails cost $${nN}(${pN}) = ${neriteCost}$ dollars`}, which leaves $${total} - ${neriteCost} = ${rabbitCost}$ dollars for the rabbit snails. Dividing by the price of one rabbit snail gives $\\frac{${rabbitCost}}{${pR}} = ${nR}$, so the owner bought ${nR} rabbit snails. ${shuffled.filter(o => !o.isCorrect).map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
