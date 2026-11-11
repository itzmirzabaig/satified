import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 514
*
* ORIGINAL ANALYSIS:
* - Number ranges: [rate: 60 items/hour (double-digit), time: 3 hours (single-digit), answer: 180]
* - Difficulty factors: [Rate × Time = Total, proportional reasoning]
* - Distractor patterns: [None - fill in blank, common errors: 20 (divided), 63 (added), 1800 (extra 0), 57 (subtracted)]
* - Constraints: [Simple multiplication, double-digit × single-digit]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_514 = {
  metadata: {
    id: "514",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const ratePerHour = getRandomInt(40, 80);
    const hours = getRandomInt(2, 5);
    const totalItems = ratePerHour * hours;

    const questionText = `A mechanical device in a workshop produces items at a constant rate of ${ratePerHour} items per hour. At this rate, how many items will the mechanical device produce in ${hours} hours?`;

    // Before: the explanation contained literal "\n\n" text before an
    // "Alternate approach" paragraph that wrote the rate as plain text
    // "(60 items/1 hour)(3 hours)". Now plain sentences with math in $...$.
    const explanation = `The correct answer is ${totalItems}. The device produces items at a constant rate of ${ratePerHour} items per hour. Let $x$ represent the number of items the device will produce in ${hours} hours. Then $\\frac{${ratePerHour} \\text{ items}}{1 \\text{ hour}} = \\frac{x \\text{ items}}{${hours} \\text{ hours}}$, which can be written as $${ratePerHour} = \\frac{x}{${hours}}$. Multiplying each side of this equation by $${hours}$ yields $x = ${ratePerHour} \\cdot ${hours} = ${totalItems}$. Therefore, at the given rate, the device will produce ${totalItems} items in ${hours} hours.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: [],
      correctAnswer: totalItems.toString(),
      explanation: explanation
    };
  }
};
