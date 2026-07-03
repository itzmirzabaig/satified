import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 170
 *
 * ORIGINAL ANALYSIS: [Snail count from total cost]
 * - Number ranges: [pR: 5-12, pN: 3-8, nN: 1-4]
 * - Constraints: [total must be divisible to give integer nR]
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
    // Prices and counts, constructed so all four option values are distinct:
    //  - pR + pN >= 10, so the "sum of prices" distractor can never equal
    //    nR (<= 8) or nR + 1 (<= 9);
    //  - nN chosen so the nerite cost pN * nN avoids the other three values
    //    (pN * {1,2,3,4} are four distinct candidates vs. only three
    //    forbidden values, so a valid nN always exists — pigeonhole).
    const pN = getRandomInt(3, 8);                       // nerite snail price
    const pR = getRandomInt(Math.max(5, 10 - pN), 12);   // rabbit snail price (keeps pR + pN >= 10)
    const nR = getRandomInt(3, 8);                       // number of rabbit snails (the answer)
    const priceSum = pR + pN;
    const nN = shuffle([1, 2, 3, 4]).find(
      k => pN * k !== nR && pN * k !== nR + 1 && pN * k !== priceSum
    )!;                                                  // number of nerite snails
    const neriteCost = pN * nN;
    const total = pR * nR + neriteCost;

    const optionsData = [
      { key: 'correct', text: nR.toString(), isCorrect: true },
      { key: 'neriteCost', text: neriteCost.toString(), isCorrect: false }, // cost of nerite snails, not a count
      { key: 'priceSum', text: priceSum.toString(), isCorrect: false },     // sums the two prices
      { key: 'offByOne', text: (nR + 1).toString(), isCorrect: false }      // off-by-one error
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const letterOf = (key: string) => shuffled.find(o => o.key === key)!.letter;

    return {
      questionText: `An aquarium owner buys rabbit snails for \\$${pR} each and nerite snails for \\$${pN} each, spending a total of \\$${total}. If the owner bought ${nN} nerite snail${nN === 1 ? '' : 's'}, how many rabbit snails did the owner buy?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: nR.toString(),
      explanation: `Choice ${letterOf('correct')} is correct. The ${nN} nerite snail${nN === 1 ? '' : 's'} cost $ ${nN} \\times ${pN} = ${neriteCost} $ dollars, which leaves $ ${total} - ${neriteCost} = ${pR * nR} $ dollars for the rabbit snails. Dividing by the price of one rabbit snail gives $ ${pR * nR} \\div ${pR} = ${nR} $, so the owner bought ${nR} rabbit snails. Choice ${letterOf('neriteCost')} is incorrect; it is the cost of the nerite snails in dollars, not a number of snails. Choice ${letterOf('priceSum')} is incorrect; it is the sum of the two prices. Choice ${letterOf('offByOne')} is incorrect; it is one more than the number of rabbit snails bought.`
    };
  }
};
