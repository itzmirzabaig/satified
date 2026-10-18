import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 199
 *
 * ORIGINAL ANALYSIS: [Box weights substitution]
 * - Number ranges: [w1: 3-8, w2: 8-15, total: 150-300, n2: 8-18]
 * - Difficulty factors: [Substitution in weight equation]
 * - Constraints: [Result must be integer]
 *
 * Intent: w1*n1 + w2*n2 = total models a mixed shipment. Given the two box
 * weights, the total weight, and the count of heavier (w2) boxes, solve for the
 * count of lighter (w1) boxes, n1. Answer-first construction keeps every value
 * an integer.
 *
 * Fix: the distractors (n2, w1, w2) previously collided with the answer n1 and
 * with each other because their ranges overlap. They are now added through a
 * de-duplicating guard, with clean integer fillers when a guard rejects one, so
 * all four options differ for every draw.
 */

export const generator_199 = {
  metadata: {
    id: "199",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Two distinct box weights.
    const w1 = getRandomInt(3, 8);   // lighter box weight
    let w2 = getRandomInt(9, 15);    // heavier box weight (kept > w1 range top)
    let wGuard = 0;
    while (w2 === w1 && wGuard++ < 50) w2 = getRandomInt(9, 15);

    const n2 = getRandomInt(8, 18);  // number of heavier boxes (given)
    // Number of lighter boxes (the answer). Redraw until the four choices
    // n1, n2, n1 + n2 and w1 * n1 all differ.
    let n1 = 10;
    do { n1 = getRandomInt(10, 30); } while (new Set([n1, n2, n1 + n2, w1 * n1]).size < 4);
    const total = w1 * n1 + w2 * n2; // total weight (integer by construction)

    const optionsData = [
      { text: n1.toString(), isCorrect: true, reason: '' },
      { text: n2.toString(), isCorrect: false, reason: `it is the number of ${w2}-pound boxes, not ${w1}-pound boxes` },
      { text: (n1 + n2).toString(), isCorrect: false, reason: `it is the total number of boxes in the shipment` },
      { text: (w1 * n1).toString(), isCorrect: false, reason: `it is the total weight, in pounds, of the ${w1}-pound boxes; this weight must still be divided by ${w1}` }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `A shipment contains only ${w1}-pound boxes and ${w2}-pound boxes and weighs a total of ${total} pounds. If the shipment contains ${n2} of the ${w2}-pound boxes, how many ${w1}-pound boxes does it contain?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: n1.toString(),
      explanation: `Choice ${correctLetter} is correct. The ${n2} boxes that weigh ${w2} pounds each weigh $${w2}(${n2}) = ${w2 * n2}$ pounds in total. That leaves $${total} - ${w2 * n2} = ${total - w2 * n2}$ pounds for the ${w1}-pound boxes, so the shipment contains $\\frac{${total - w2 * n2}}{${w1}} = ${n1}$ of the ${w1}-pound boxes. ${shuffled.filter(o => !o.isCorrect).map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
