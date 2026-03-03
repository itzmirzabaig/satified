import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 7fac16fb
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initialHeight: 10-25, ratePerSecond: 5-12]
 * - Difficulty factors: [Modeling linear growth from word problem]
 * - Distractor patterns: [incorrect combinations, division error, swapped rate/intercept]
 * - Constraints: [None]
 * - Question type: [Modeling→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_7fac16fb = {
  metadata: {
    // id: "7fac16fb",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const initialHeight = getRandomInt(10, 25);

    const ratePerSecond = getRandomInt(5, 12);

    const correctEquation = `h = ${ratePerSecond}s + ${initialHeight}`;

    const distractorB = `h = ${initialHeight}s + ${Math.floor((ratePerSecond * 100 + initialHeight * 335) / 8)}`;

    const distractorC = `h = ${ratePerSecond}s + ${Math.floor(335 / initialHeight)}`;

    const distractorD = `h = ${initialHeight}s + ${ratePerSecond}`;

    const optionsData = [
      { text: correctEquation, isCorrect: true },
      { text: distractorB, isCorrect: false, reason: "incorrectly combines values from the problem" },
      { text: distractorC, isCorrect: false, reason: "incorrectly applies division operations" },
      { text: distractorD, isCorrect: false, reason: "swaps the rate and initial height" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The front of a roller-coaster car is at the bottom of a hill and is $${initialHeight}$ feet above the ground. If the front of the roller-coaster car rises at a constant rate of $${ratePerSecond}$ feet per second, which of the following equations gives the height $h$, in feet, of the front of the roller-coaster car $s$ seconds after it starts up the hill?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctOption.letter} is correct. The initial height of $${initialHeight}$ feet is the constant term, and the rate of $${ratePerSecond}$ feet per second multiplied by time $s$ gives the height equation $h = ${ratePerSecond}s + ${initialHeight}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 7fac16fb_v2
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [numerator: 3-9, denominator: 5-11, intercept: 40-70]
 * - Difficulty factors: [Fraction coefficient evaluation]
 * - Constraints: [Ensure clean division]
 * - Question type: [Function evaluation→Fill in blank]
 * - Figure generation: null
 */

