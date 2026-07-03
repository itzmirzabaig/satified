import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 483
*
* ORIGINAL ANALYSIS:
* - Number ranges: [depth: 58 fathoms (double-digit), conversion: 6 feet/fathom, answer: 348]
* - Difficulty factors: [Unit conversion, multiplication]
* - Distractor patterns: [None - fill in blank, common errors: 3480 (extra 0), 64 (added), 52 (subtracted), 348 (correct)]
* - Constraints: [Simple multiplication, double-digit × single-digit]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_483 = {
  metadata: {
    id: "483",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const fathoms = getRandomInt(40, 80);
    const feetPerFathom = 6;
    const feet = fathoms * feetPerFathom;

    const questionText = `A special camera is used for underwater ocean research. When the camera is at a depth of ${fathoms} fathoms, what is the camera's depth in feet? (1 fathom = ${feetPerFathom} feet)`;
    const explanation = `The correct answer is ${feet}. It's given that 1 fathom is equivalent to ${feetPerFathom} feet. Therefore, ${fathoms} fathoms is equivalent to (${fathoms} fathoms) (${feetPerFathom} feet/1 fathom), or ${feet} feet. Thus, when the camera is at a depth of ${fathoms} fathoms, the camera's depth, in feet, is ${feet}.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: [],
      correctAnswer: feet.toString(),
      explanation: explanation
    };
  }
};
