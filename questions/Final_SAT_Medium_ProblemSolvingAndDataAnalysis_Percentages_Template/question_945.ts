import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 945
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [original: 9, new: 90, increase: 81, percent: 900%]
 * - Difficulty factors: [Large percent increase calculation, distinguishing from absolute increase]
 * - Distractor patterns: [A: 10% (ratio inverted), B: 81% (absolute increase only), C: 90% (final value confusion)]
 * - Constraints: [(new - old) / old * 100]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */

export const generator_945 = {
  metadata: {
    id: "945",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values.
    // Original: 9 -> 90 = 900% increase. Small original, integer multiplier
    // (8x..15x), so newValue is an integer and the percent increase is an exact
    // multiple of 100 ((multiplier - 1) * 100). All four choices are pairwise
    // distinct for every draw in these ranges (verified), so no retry needed.
    const original = getRandomInt(5, 15);
    const multiplier = getRandomInt(8, 15); // 8x to 15x
    const newValue = original * multiplier;

    // STEP 2: Calculate answer.
    const increase = newValue - original;
    const percentIncrease = (increase / original) * 100; // = (multiplier - 1) * 100, an integer

    // STEP 3: Create distractors.
    const distractorA = Math.round((original / newValue) * 100); // ratio inverted (original/new)
    const distractorB = increase;                                // absolute increase only
    const distractorC = newValue;                                // final value confused for a percent

    const correctText = `${percentIncrease}\\%`;

    const optionsData = [
      { text: `${distractorA}\\%`, isCorrect: false, reason: "results from dividing the original by the new value instead of the increase by the original" },
      { text: `${distractorB}\\%`, isCorrect: false, reason: "gives the absolute increase without dividing by the original value" },
      { text: `${distractorC}\\%`, isCorrect: false, reason: "uses the final value as if it were the percent increase" },
      { text: correctText, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 4: Return question data
    return {
      questionText: `The number of coins in a collection increased from ${original} to ${newValue}. What was the percent increase in the number of coins in this collection?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The percent increase is $\\frac{\\text{New} - \\text{Original}}{\\text{Original}} \\times 100\\% = \\frac{${newValue} - ${original}}{${original}} \\times 100\\% = \\frac{${increase}}{${original}} \\times 100\\% = ${percentIncrease}\\%$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
