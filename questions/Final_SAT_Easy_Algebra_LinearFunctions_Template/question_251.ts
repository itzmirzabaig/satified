import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 251
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initialHeight: 14-25, ratePerSecond: 5-12]
 * - Difficulty factors: [Modeling linear growth from word problem]
 * - Distractor patterns: [swapped rate and starting height, starting height folded into rate, starting height left out]
 * - Constraints: [initialHeight > ratePerSecond so the swap distractor is always distinct]
 * - Question type: [Modeling→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_251 = {
  metadata: {
    id: "251",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // initialHeight is kept strictly greater than ratePerSecond (ranges do not
    // overlap: 14..25 vs 5..12), which guarantees the "swap" distractor and the
    // "rate-as-start" distractor can never coincide with the correct equation.
    const initialHeight = getRandomInt(14, 25);
    const ratePerSecond = getRandomInt(5, 12);

    const correctEquation = `$h = ${ratePerSecond}s + ${initialHeight}$`;

    // Each wrong choice is a real modeling slip: swapping the two values,
    // folding the starting height into the rate, or leaving it out. The old
    // choices used the rate as the starting height (for example
    // h = 10s + 10) and added the starting height to the rate while also
    // keeping it as the constant.
    const optionsData = [
      { text: correctEquation, isCorrect: true, reason: '' },
      { text: `$h = ${initialHeight}s + ${ratePerSecond}$`, isCorrect: false, reason: `it gives a starting height of ${ratePerSecond} feet and a rate of ${initialHeight} feet per second, which reverses the two values` },
      { text: `$h = ${ratePerSecond + initialHeight}s$`, isCorrect: false, reason: `it adds the starting height of ${initialHeight} feet to the rate; this equation gives a height of 0 feet when $s = 0$, but the car starts ${initialHeight} feet above the ground` },
      { text: `$h = ${ratePerSecond}s$`, isCorrect: false, reason: `it leaves out the starting height; this equation gives a height of 0 feet when $s = 0$, not ${initialHeight} feet` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The front of a roller coaster car is at the bottom of a hill and is ${initialHeight} feet above the ground. If the front of the roller coaster car rises at a constant rate of ${ratePerSecond} feet per second, which of the following equations gives the height $h$, in feet, of the front of the roller coaster car $s$ seconds after it starts up the hill?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctOption.letter} is correct. After $s$ seconds, the front of the car has risen $${ratePerSecond}s$ feet above its starting height of ${initialHeight} feet. Adding the two gives the equation $h = ${ratePerSecond}s + ${initialHeight}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
