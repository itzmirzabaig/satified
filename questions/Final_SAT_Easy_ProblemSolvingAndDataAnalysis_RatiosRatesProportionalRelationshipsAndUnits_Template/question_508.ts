import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 508
*
* ORIGINAL ANALYSIS:
* - Number ranges: [34 yards (double-digit), conversion: 3 feet/yard, answer: 102]
* - Difficulty factors: [Unit conversion, multiplication]
* - Distractor patterns: [None - fill in blank, common errors: 37 (added), 31 (subtracted), 1020 (extra 0), 102 (correct)]
* - Constraints: [Simple multiplication]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_508 = {
  metadata: {
    id: "508",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const yards = getRandomInt(20, 50);
    const feetPerYard = 3;
    const feet = yards * feetPerYard;

    const questionText = `How many feet are equivalent to ${yards} yards? (1 yard = ${feetPerYard} feet)`;
    const explanation = `The correct answer is ${feet}. It's given that 1 yard is equivalent to ${feetPerYard} feet. Therefore, ${yards} yards is equivalent to (${yards} yards) \\( \\times \\frac{${feetPerYard} \\text{ feet}}{1 \\text{ yard}} \\), or ${feet} feet.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: [],
      correctAnswer: feet.toString(),
      explanation: explanation
    };
  }
};
