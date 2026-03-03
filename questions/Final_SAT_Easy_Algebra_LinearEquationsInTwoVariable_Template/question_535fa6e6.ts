import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 535fa6e6
 *
 * ORIGINAL ANALYSIS: [Potato and celery cost ratio system]
 * - Number ranges: [p1: 0.50-0.80, p2: 0.80-1.20, ratio: 2x celery]
 * - Constraints: [total must give integer c]
 */

export const generator_535fa6e6 = {
  metadata: {
    // id: "535fa6e6",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Generate random prices (in cents to avoid decimals, then divide by 100)
    const p1 = getRandomInt(50, 80) / 100;  // potato price: 0.50-0.80
    const p2 = getRandomInt(80, 120) / 100; // celery price: 0.80-1.20
    
    // Choose random potato amount, celery is twice that
    const p = getRandomInt(2, 5);  // pounds of potatoes
    const c = 2 * p;               // pounds of celery (twice as much)
    
    // Calculate total
    const total = Math.round((p1 * p + p2 * c) * 100) / 100;
    
    // Format to 2 decimal places
    const p1Str = p1.toFixed(2);
    const p2Str = p2.toFixed(2);
    const totalStr = total.toFixed(2);

    const optionsData = [
      { text: c.toString(), isCorrect: true },
      { text: p.toString(), isCorrect: false, reason: "uses potato count" },
      { text: (c + 1).toString(), isCorrect: false, reason: "calculation error" },
      { text: (c - 1).toString(), isCorrect: false, reason: "calculation error" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `Potatoes cost ${p1Str} dollars per pound and celery costs ${p2Str} dollars per pound. The total cost is ${totalStr} dollars. If twice as many pounds of celery were bought as potatoes, how many pounds of celery?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: c.toString(),
      explanation: `Choice ${correctLetter} is correct. Let p = pounds of potatoes, then celery = 2p. Equation: ${p1Str}p + ${p2Str}(2p) = ${totalStr}. Solving: ${p1Str}p + ${(2 * p2).toFixed(2)}p = ${totalStr} → ${(p1 + 2 * p2).toFixed(2)}p = ${totalStr} → p = ${p} → celery = ${c}.`
    };
  }
};