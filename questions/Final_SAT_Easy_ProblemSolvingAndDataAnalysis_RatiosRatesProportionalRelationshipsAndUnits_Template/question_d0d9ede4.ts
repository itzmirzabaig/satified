import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: d0d9ede4
*
* ORIGINAL ANALYSIS:
* - Number ranges: [34 yards (double-digit), conversion: 3 feet/yard, answer: 102]
* - Difficulty factors: [Unit conversion, multiplication]
* - Distractor patterns: [None - fill in blank, common errors: 37 (added), 31 (subtracted), 1020 (extra 0), 102 (correct)]
* - Constraints: [Simple multiplication]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_d0d9ede4 = {
  metadata: {
    // id: "d0d9ede4",
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
      options: null,
      correctAnswer: feet.toString(),
      explanation: explanation
    };
  }
};

/**
* Question ID: 06a152cd
*
* ORIGINAL ANALYSIS:
* - Number ranges: [2.5 oz/muffin, 48 muffins, conversion: 16 oz/pound, answer: 7.5 pounds]
* - Difficulty factors: [Multi-step conversion, division by 16, decimal handling]
* - Distractor patterns: [A: 7.5 (correct), B: 10 (estimation), C: 50.5 (added), D: 120 (ounces, not converted)]
* - Constraints: [Total ounces must be divisible by 16 for clean decimal pounds]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/
