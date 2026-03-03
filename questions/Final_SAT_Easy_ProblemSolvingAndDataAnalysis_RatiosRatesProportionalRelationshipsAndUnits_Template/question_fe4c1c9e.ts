import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: fe4c1c9e
*
* ORIGINAL ANALYSIS:
* - Number ranges: [rate: 60 items/hour (double-digit), time: 3 hours (single-digit), answer: 180]
* - Difficulty factors: [Rate × Time = Total, proportional reasoning]
* - Distractor patterns: [None - fill in blank, common errors: 20 (divided), 63 (added), 1800 (extra 0), 57 (subtracted)]
* - Constraints: [Simple multiplication, double-digit × single-digit]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_fe4c1c9e = {
  metadata: {
    // id: "fe4c1c9e",
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

    const explanation = `The correct answer is ${totalItems}. It's given that a mechanical device produces items at a constant rate of ${ratePerHour} items per hour. This rate can be written as \\( \\frac{${ratePerHour} \\text { items }}{1 \\text { hour }} \\). Let \\( x \\) represent the number of items the mechanical device will produce in ${hours} hours at the given rate. It follows that \\( \\frac{${ratePerHour} \\text { items }}{1 \\text { hour }}=\\frac{x \\text { items }}{${hours} \\text { hours }} \\), which can be written as \\( \\frac{${ratePerHour}}{1}=\\frac{x}{${hours}} \\), or \\( ${ratePerHour}=\\frac{x}{${hours}} \\). Multiplying each side of this equation by ${hours} yields \\( ${totalItems}=x \\). Therefore, at the given rate, the mechanical device will produce ${totalItems} items in ${hours} hours.\\n\\nAlternate approach: It's given that a mechanical device produces items at a constant rate of ${ratePerHour} items per hour. At this rate, the mechanical device will produce (${ratePerHour} items/1 hour)(${hours} hours), or ${totalItems} items in ${hours} hours.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: null,
      correctAnswer: totalItems.toString(),
      explanation: explanation
    };
  }
};

/**
* Question ID: 000259aa
*
* ORIGINAL ANALYSIS:
* - Number ranges: [distance: 2100 miles (4-digit), days: 120 (triple-digit), answer: 17.5 (decimal)]
* - Difficulty factors: [Division with decimal result, multi-step reasoning]
* - Distractor patterns: [A: 0.057 (days/miles inverted), B: 0.729 (random), C: 17.5 (correct), D: 24 (random/estimate error)]
* - Constraints: [Distance must be divisible by days for clean decimal, or round to .5]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None - word problem]
*/
