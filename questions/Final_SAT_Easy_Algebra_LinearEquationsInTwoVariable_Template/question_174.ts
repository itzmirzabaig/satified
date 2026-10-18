import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 174
 *
 * ORIGINAL ANALYSIS: [Potato and celery cost ratio system]
 * - Number ranges: [p1: 0.50-0.80, p2: 0.80-1.20, ratio: 2x celery]
 * - Constraints: [total must give integer c]
 *
 * FIX NOTES:
 * Prices read "0.68 dollars per pound" and "12.20 dollars", the stem ended
 * "how many pounds of celery?", two distractors were c + 1 and c - 1
 * ("calculation error"), and the explanation was written with arrows. Prices
 * now use \$, the stem is a full question, the distractors are the pounds of
 * potatoes, the total pounds, and the cost of the celery, and the
 * explanation is typeset.
 */

export const generator_174 = {
  metadata: {
    id: "174",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Generate random prices (in cents to avoid decimals, then divide by 100)
    const p1 = getRandomInt(50, 80) / 100;  // potato price: 0.50-0.80
    // celery price: 0.80-1.20, never exactly 1.00, which would make the celery
    // cost choice (e.g. 6.00) equal the answer (6)
    let p2 = 1;
    do { p2 = getRandomInt(80, 120) / 100; } while (p2 === 1);
    
    // Choose random potato amount, celery is twice that
    const p = getRandomInt(2, 5);  // pounds of potatoes
    const c = 2 * p;               // pounds of celery (twice as much)
    
    // Calculate total
    const total = Math.round((p1 * p + p2 * c) * 100) / 100;
    
    // Format to 2 decimal places
    const p1Str = p1.toFixed(2);
    const p2Str = p2.toFixed(2);
    const totalStr = total.toFixed(2);

    // Choices are distinct: p < 2p < 3p are whole numbers, and the celery cost
    // is written with two decimal places.
    const celeryCost = (p2 * c).toFixed(2);
    const optionsData = [
      { text: c.toString(), isCorrect: true, reason: '' },
      { text: p.toString(), isCorrect: false, reason: `it is the number of pounds of potatoes, not celery` },
      { text: (3 * p).toString(), isCorrect: false, reason: `it is the total number of pounds of potatoes and celery` },
      { text: celeryCost, isCorrect: false, reason: `it is the cost, in dollars, of the celery, not the number of pounds of celery` }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `At a grocery store, potatoes cost \\$${p1Str} per pound and celery costs \\$${p2Str} per pound. A customer bought only potatoes and celery for a total of \\$${totalStr}. If the customer bought twice as many pounds of celery as pounds of potatoes, how many pounds of celery did the customer buy?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: c.toString(),
      explanation: `Choice ${correctLetter} is correct. Let $p$ be the number of pounds of potatoes the customer bought. Then the customer bought $2p$ pounds of celery, so $${p1Str}p + ${p2Str}(2p) = ${totalStr}$. This simplifies to $${p1Str}p + ${(2 * p2).toFixed(2)}p = ${totalStr}$, or $${(p1 + 2 * p2).toFixed(2)}p = ${totalStr}$. Dividing both sides by ${(p1 + 2 * p2).toFixed(2)} yields $p = ${p}$, so the customer bought $2(${p}) = ${c}$ pounds of celery. ${shuffled.filter(o => !o.isCorrect).map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};