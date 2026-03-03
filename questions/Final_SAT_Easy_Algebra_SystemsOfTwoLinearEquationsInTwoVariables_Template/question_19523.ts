import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 19523
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [novel price: 4, magazine: 1, total items: 10-15, total cost: 20-30]
 * - Difficulty factors: [Word problem requiring solution, not just setup]
 * - Distractor patterns: [Off-by-one, wrong item count, reversed items]
 * - Constraints: [Valid integer solution]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_19523 = {
  metadata: {
    // id: "19523",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const priceExpensive = getRandomInt(3, 6);
    const priceCheap = getRandomInt(1, 3);
    const numExpensive = getRandomInt(2, 5);
    const numCheap = getRandomInt(6, 12);
    const totalItems = numExpensive + numCheap;
    const totalCost = priceExpensive * numExpensive + priceCheap * numCheap;

    const items = getRandomElement([
      ['novels', 'magazines'],
      ['hardcover books', 'paperbacks'],
      ['CDs', 'posters']
    ]);
    const store = getRandomElement(['bookstore', 'shop', 'store']);
    const buyer = getRandomElement(['Sadie', 'Alex', 'Jordan', 'Taylor']);

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

    const explanation = `Choice ${correctOption.letter} is correct. Let $n$ be the number of ${items} and $m$ be the number of ${items}. Then $n + m = ${totalItems}$ and $${priceExpensive}n + ${priceCheap}m = ${totalCost}$. Subtracting $${priceCheap}(n + m) = ${priceCheap * totalItems}$ from the second equation: $${priceExpensive - priceCheap}n = ${totalCost - priceCheap * totalItems}$, so $n = ${numExpensive}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `An online ${store} sells ${items} and ${items}. Each ${items.slice(0, -1)} sells for $${priceExpensive}$, and each ${items.slice(0, -1)} sells for $${priceCheap}$. If ${buyer} purchased a total of $${totalItems}$ ${items} and ${items} that have a combined selling price of $${totalCost}$, how many ${items} did ${buyer} purchase?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: numExpensive.toString(),
      explanation: explanation
    };
  }
};

/**
 * Question ID: 5f46fc76
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slopes: 1 and -1, intercepts: 1 and -7]
 * - Difficulty factors: [Intersection in negative quadrant]
 * - Constraints: [Integer intersection coordinates]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Lines intersecting in third quadrant]
 */