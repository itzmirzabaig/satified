import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 501
*
* ORIGINAL ANALYSIS:
* - Number ranges: [speed: 24816 yards/hour, conversion: 1760 yards/mile, answer: 14.1 mph]
* - Difficulty factors: [Large number division with decimal result]
* - Distractor patterns: [None - fill in blank, common errors would be decimal placement]
* - Constraints: [yards must be divisible by 1760 for clean decimal]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_501 = {
  metadata: {
    id: "501",
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

    const questionText = `A participant in a bicycle race completes the race with an average speed of ${yardsPerHour.toLocaleString('en-US')} yards per hour. What is this average speed, in miles per hour? (1 mile = ${yardsPerMile.toLocaleString('en-US')} yards)`;
    // Before: the thousands commas were plain "," inside math, which renders
    // as "25, 872" with a gap; inside math they are now {,}.
    const m = (n: number) => n.toLocaleString('en-US').replace(/,/g, '{,}');
    const explanation = `The correct answer is ${correctMph}. Since 1 mile is ${yardsPerMile.toLocaleString('en-US')} yards, this average speed is equivalent to $\\left(\\frac{${m(yardsPerHour)} \\text{ yards}}{1 \\text{ hour}}\\right)\\left(\\frac{1 \\text{ mile}}{${m(yardsPerMile)} \\text{ yards}}\\right)$, which yields ${correctMph} miles per hour.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: [],
      correctAnswer: correctMph.toString(),
      explanation: explanation
    };
  }
};
