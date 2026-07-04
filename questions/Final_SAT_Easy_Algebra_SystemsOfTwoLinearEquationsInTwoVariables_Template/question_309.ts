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
    const priceExpensive = getRandomInt(3, 6);
    // priceCheap must stay strictly below priceExpensive (which is >= 3);
    // an equal price makes the two equations dependent (0n = 0, no unique solution).
    const priceCheap = getRandomInt(1, 2);
    const numExpensive = getRandomInt(2, 5);
    const numCheap = getRandomInt(6, 12);
    const totalItems = numExpensive + numCheap;
    const totalCost = priceExpensive * numExpensive + priceCheap * numCheap;

    const itemPair = getRandomElement([
      { expPlural: 'novels', expSingular: 'novel', cheapPlural: 'magazines', cheapSingular: 'magazine' },
      { expPlural: 'hardcover books', expSingular: 'hardcover book', cheapPlural: 'paperbacks', cheapSingular: 'paperback' },
      { expPlural: 'CDs', expSingular: 'CD', cheapPlural: 'posters', cheapSingular: 'poster' }
    ]);
    const store = getRandomElement(['bookstore', 'shop', 'store']);

    const optionsData = [
      { text: (numExpensive - 1).toString(), isCorrect: false, reason: "is off by one from the correct answer" },
      { text: numExpensive.toString(), isCorrect: true },
      { text: (numExpensive + 1).toString(), isCorrect: false, reason: "is off by one from the correct answer" },
      { text: (numExpensive + 2).toString(), isCorrect: false, reason: "is off by two from the correct answer" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Let $n$ be the number of ${itemPair.expPlural} and $m$ be the number of ${itemPair.cheapPlural}. Then $n + m = ${totalItems}$ and $${priceExpensive}n + ${priceCheap}m = ${totalCost}$. Subtracting $${priceCheap}(n + m) = ${priceCheap * totalItems}$ from the second equation gives $${priceExpensive - priceCheap}n = ${totalCost - priceCheap * totalItems}$, so $n = ${numExpensive}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `An online ${store} sells ${itemPair.expPlural} and ${itemPair.cheapPlural}. Each ${itemPair.expSingular} sells for $\\$${priceExpensive}$, and each ${itemPair.cheapSingular} sells for $\\$${priceCheap}$. A customer purchased a total of ${totalItems} ${itemPair.expPlural} and ${itemPair.cheapPlural} that have a combined selling price of $\\$${totalCost}$. How many ${itemPair.expPlural} did the customer purchase?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: numExpensive.toString(),
      explanation: explanation
    };
  }
};
