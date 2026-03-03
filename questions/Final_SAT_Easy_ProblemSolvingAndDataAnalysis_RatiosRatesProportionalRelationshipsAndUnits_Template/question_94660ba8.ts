import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 94660ba8
*
* ORIGINAL ANALYSIS:
* - Number ranges: [speed: 24816 yards/hour, conversion: 1760 yards/mile, answer: 14.1 mph]
* - Difficulty factors: [Large number division with decimal result]
* - Distractor patterns: [None - fill in blank, common errors would be decimal placement]
* - Constraints: [yards must be divisible by 1760 for clean decimal]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_94660ba8 = {
  metadata: {
    // id: "94660ba8",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const mphInt = getRandomInt(12, 18);
    const mphDecimal = getRandomInt(0, 9);
    const mph = parseFloat(`${mphInt}.${mphDecimal}`);
    const yardsPerMile = 1760;
    const yardsPerHour = Math.round(mph * yardsPerMile);
    const correctMph = yardsPerHour / yardsPerMile;

    const questionText = `A participant in a bicycle race completes the race with an average speed of ${yardsPerHour.toLocaleString()} yards per hour. What is this average speed, in miles per hour? (1 mile = ${yardsPerMile.toLocaleString()} yards)`;
    const explanation = `The correct answer is ${correctMph}. This average speed is equivalent to \\(\\left(\\frac{${yardsPerHour.toLocaleString()} \\text{ yards}}{1 \\text{ hour}}\\right)\\left(\\frac{1 \\text{ mile}}{${yardsPerMile.toLocaleString()} \\text{ yards}}\\right)\\), which yields ${correctMph} miles per hour.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: null,
      correctAnswer: correctMph.toString(),
      explanation: explanation
    };
  }
};

/**
* Question ID: 4837406c
*
* ORIGINAL ANALYSIS:
* - Number ranges: [speed: 6 cm/s, distance: 24 cm, answer: 4 seconds]
* - Difficulty factors: [Time = Distance / Speed formula]
* - Distractor patterns: [None - fill in blank, common errors: division errors]
* - Constraints: [distance divisible by speed for integer time]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/
