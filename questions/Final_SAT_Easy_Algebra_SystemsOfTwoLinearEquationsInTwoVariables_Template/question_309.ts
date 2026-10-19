import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 309
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [novel price: 4, magazine: 1, total items: 10-15, total cost: 20-30]
 * - Difficulty factors: [Word problem requiring solution, not just setup]
 * - Distractor patterns: [Off-by-one, wrong item count, reversed items]
 * - Constraints: [Valid integer solution]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_309 = {
  metadata: {
    id: "309",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // The prices differ by at least 2 so that the "did not divide" choice
    // differs from the answer, and all four choices are distinct. The old
    // choices were the answer plus or minus 1 or 2 ("off by one").
    let priceExpensive = 3, priceCheap = 1, numExpensive = 2, numCheap = 6;
    do {
      priceExpensive = getRandomInt(3, 6);
      priceCheap = getRandomInt(1, 2);
      numExpensive = getRandomInt(2, 5);
      numCheap = getRandomInt(6, 12);
    } while (
      priceExpensive - priceCheap < 2 ||
      new Set([numExpensive, numCheap, numExpensive + numCheap, (priceExpensive - priceCheap) * numExpensive]).size < 4
    );
    const totalItems = numExpensive + numCheap;
    const totalCost = priceExpensive * numExpensive + priceCheap * numCheap;
    const diff = priceExpensive - priceCheap;
    const mTerm = priceCheap === 1 ? 'm' : `${priceCheap}m`;

    const itemPair = getRandomElement([
      { expPlural: 'novels', expSingular: 'novel', cheapPlural: 'magazines', cheapSingular: 'magazine' },
      { expPlural: 'hardcover books', expSingular: 'hardcover book', cheapPlural: 'paperbacks', cheapSingular: 'paperback' },
      { expPlural: 'CDs', expSingular: 'CD', cheapPlural: 'posters', cheapSingular: 'poster' }
    ]);
    const store = getRandomElement(['bookstore', 'shop', 'store']);

    const optionsData = [
      { text: numCheap.toString(), isCorrect: false, reason: `${numCheap} is the number of ${itemPair.cheapPlural} the customer purchased, not the number of ${itemPair.expPlural}` },
      { text: numExpensive.toString(), isCorrect: true, reason: '' },
      { text: (diff * numExpensive).toString(), isCorrect: false, reason: `${diff * numExpensive} is the value of $${diff}n$; both sides must still be divided by ${diff}` },
      { text: totalItems.toString(), isCorrect: false, reason: `${totalItems} is the total number of ${itemPair.expPlural} and ${itemPair.cheapPlural} the customer purchased` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Let $n$ be the number of ${itemPair.expPlural} and $m$ be the number of ${itemPair.cheapPlural}. Then $n + m = ${totalItems}$ and $${priceExpensive}n + ${mTerm} = ${totalCost}$. ${priceCheap === 1 ? `Subtracting the first equation from the second` : `Multiplying the first equation by ${priceCheap} gives $${priceCheap}n + ${mTerm} = ${priceCheap * totalItems}$, and subtracting this equation from the second`} gives $${diff}n = ${totalCost - priceCheap * totalItems}$. Dividing both sides by ${diff} gives $n = ${numExpensive}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `An online ${store} sells ${itemPair.expPlural} and ${itemPair.cheapPlural}. Each ${itemPair.expSingular} sells for $\\$${priceExpensive}$, and each ${itemPair.cheapSingular} sells for $\\$${priceCheap}$. A customer purchased a total of ${totalItems} ${itemPair.expPlural} and ${itemPair.cheapPlural} that have a combined selling price of $\\$${totalCost}$. How many ${itemPair.expPlural} did the customer purchase?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: numExpensive.toString(),
      explanation: explanation
    };
  }
};
