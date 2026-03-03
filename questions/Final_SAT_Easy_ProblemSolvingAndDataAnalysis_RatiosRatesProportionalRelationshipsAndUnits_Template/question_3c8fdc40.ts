import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 3c8fdc40
*
* ORIGINAL ANALYSIS:
* - Number ranges: [rate: 42 (double-digit, 40-50 range), time conversion: 60 (standard)]
* - Difficulty factors: [Unit conversion, multiplication by 60]
* - Distractor patterns: [None - fill in blank, but common errors: 252 (forgot ×10), 25200 (extra 0), 420 (just added 0), 47 (added instead of multiplied)]
* - Constraints: [Must be integer answer, simple double-digit × 60]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None - conceptual unit conversion]
*/

export const generator_3c8fdc40 = {
  metadata: {
    // id: "3c8fdc40",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const ratePerMinute = getRandomInt(30, 50);
    const minutesPerHour = 60;
    const ratePerHour = ratePerMinute * minutesPerHour;

    const questionText = `A printer produces posters at a constant rate of ${ratePerMinute} posters per minute. At what rate, in posters per hour, does the printer produce the posters?`;

    const explanation = `The correct answer is ${ratePerHour}. There are 60 minutes in one hour. At a rate of ${ratePerMinute} posters per minute, the number of posters produced in one hour can be determined by \\( \\left(\\frac{${ratePerMinute} \\text{ posters }}{1 \\text{ minute }}\\right)\\left(\\frac{60 \\text{ minutes }}{1 \\text{ hour }}\\right) \\), which is ${ratePerHour} posters per hour.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: null,
      correctAnswer: ratePerHour.toString(),
      explanation: explanation
    };
  }
};

/**
* Question ID: 3f5398a6
*
* ORIGINAL ANALYSIS:
* - Number ranges: [ratio part 1: 1 (single-digit), ratio part 2: 5 (single-digit), time: 25 (result of ratio × 5)]
* - Difficulty factors: [Setting up proportion, solving for unknown, ratio interpretation]
* - Distractor patterns: [A: 10 (wrong ratio 2:5), B: 9 (random/unrelated), C: 6 (arithmetic error), D: 5 (correct)]
* - Constraints: [Ratio must simplify to small integers, answer must be integer]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None - word problem]
*/
