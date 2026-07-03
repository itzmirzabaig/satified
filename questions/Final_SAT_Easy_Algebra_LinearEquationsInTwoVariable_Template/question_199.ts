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
    const n1 = getRandomInt(10, 30); // number of lighter boxes (the answer)
    const total = w1 * n1 + w2 * n2; // total weight (integer by construction)

    // Build options, guarding every distractor against the correct answer and
    // against previously added distractors.
    const used = new Set<number>([n1]);
    const distractors: { value: number; reason: string }[] = [];
    const addDistractor = (value: number, reason: string) => {
      if (Number.isInteger(value) && value > 0 && !used.has(value)) {
        used.add(value);
        distractors.push({ value, reason });
      }
    };

    addDistractor(n2, "reports the number of heavier boxes instead of lighter boxes");
    addDistractor(w1, "uses the lighter box weight as a count");
    addDistractor(w2, "uses the heavier box weight as a count");
    addDistractor(n1 + 1, "results from an arithmetic slip when dividing the remaining weight");
    addDistractor(n1 - 1, "results from an arithmetic slip when dividing the remaining weight");

    // Fill to exactly 3 distractors with safe nearby integers if guards rejected some.
    let filler = n1 + 2;
    while (distractors.length < 3) {
      addDistractor(filler, "does not satisfy the weight equation");
      filler++;
    }

    const optionsData = [
      { text: n1.toString(), isCorrect: true },
      ...distractors.slice(0, 3).map(d => ({ text: d.value.toString(), isCorrect: false, reason: d.reason }))
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `A shipment of ${w1}-lb and ${w2}-lb boxes totals ${total} lbs. If there are ${n2} of the ${w2}-lb boxes, how many ${w1}-lb boxes are there?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: n1.toString(),
      explanation: `Choice ${correctLetter} is correct. The ${n2} boxes weighing ${w2} lbs each account for $${w2} \\times ${n2} = ${w2 * n2}$ lbs. The remaining weight is $${total} - ${w2 * n2} = ${total - w2 * n2}$ lbs, so the number of ${w1}-lb boxes is $${total - w2 * n2} \\div ${w1} = ${n1}$.`
    };
  }
};
