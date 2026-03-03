import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 2d16d62c
*
* ORIGINAL ANALYSIS:
* - Number ranges: [depth: 58 fathoms (double-digit), conversion: 6 feet/fathom, answer: 348]
* - Difficulty factors: [Unit conversion, multiplication]
* - Distractor patterns: [None - fill in blank, common errors: 3480 (extra 0), 64 (added), 52 (subtracted), 348 (correct)]
* - Constraints: [Simple multiplication, double-digit × single-digit]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_2d16d62c = {
  metadata: {
    // id: "2d16d62c",
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
      options: null,
      correctAnswer: feet.toString(),
      explanation: explanation
    };
  }
};

/**
* Question ID: aeeaec96
*
* ORIGINAL ANALYSIS:
* - Number ranges: [612 inches (triple-digit), conversion: 36 inches/yard, answer: 17]
* - Difficulty factors: [Unit conversion, division with larger numbers]
* - Distractor patterns: [A: 0.059 (inverted 36/612), B: 17 (correct), C: 576 (612-36), D: 22032 (612×36)]
* - Constraints: [inches must be divisible by 36 for integer yards]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/
