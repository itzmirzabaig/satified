import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 251
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initialHeight: 14-25, ratePerSecond: 5-12]
 * - Difficulty factors: [Modeling linear growth from word problem]
 * - Distractor patterns: [swapped rate/intercept, rate used as start, combined rate]
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

    const correctEquation = `h = ${ratePerSecond}s + ${initialHeight}`;

    // Swapped the rate and the initial height.
    const distractorSwap = `h = ${initialHeight}s + ${ratePerSecond}`;
    // Used the rate as the starting height as well.
    const distractorRateStart = `h = ${ratePerSecond}s + ${ratePerSecond}`;
    // Combined the rate and the initial height into a single rate.
    const distractorCombined = `h = ${ratePerSecond + initialHeight}s + ${initialHeight}`;

    const optionsData = [
      { text: correctEquation, isCorrect: true },
      { text: distractorSwap, isCorrect: false, reason: "swaps the rate and the initial height" },
      { text: distractorRateStart, isCorrect: false, reason: "uses the rate as the starting height instead of the given initial height" },
      { text: distractorCombined, isCorrect: false, reason: "adds the initial height into the rate instead of using it as the constant term" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The front of a roller-coaster car is at the bottom of a hill and is ${initialHeight} feet above the ground. If the front of the roller-coaster car rises at a constant rate of ${ratePerSecond} feet per second, which of the following equations gives the height $h$, in feet, of the front of the roller-coaster car $s$ seconds after it starts up the hill?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctOption.letter} is correct. The starting height of ${initialHeight} feet is the constant term, and the rate of ${ratePerSecond} feet per second multiplied by the time $s$ gives the equation $h = ${ratePerSecond}s + ${initialHeight}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
