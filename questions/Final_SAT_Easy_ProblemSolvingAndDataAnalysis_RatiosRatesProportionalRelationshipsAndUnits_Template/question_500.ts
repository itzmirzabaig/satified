import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 500
*
* ORIGINAL ANALYSIS:
* - Number ranges: [depth: 39 fathoms, conversion: 6 feet/fathom, answer: 234 feet]
* - Difficulty factors: [Unit conversion, multiplication]
* - Distractor patterns: [A: 234 (correct), B: 117 (39×3), C: 45 (39+6), D: 7 (39/6)]
* - Constraints: [Simple multiplication]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_500 = {
  metadata: {
    id: "500",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Before: the "dividing" choice was Math.round(fathoms / 6), a rounded
    // value presented as an exact quotient, and the reasons were vague ("adding
    // the two numbers", "dividing the numbers"). The depth is now a multiple of
    // 6 so the division slip is exact, and each reason names its value and slip.
    const fathoms = 6 * getRandomInt(4, 12);
    const feetPerFathom = 6;
    const feet = fathoms * feetPerFathom;

    const distractor1 = fathoms * 3;
    const distractor2 = fathoms + feetPerFathom;
    const distractor3 = fathoms / feetPerFathom;

    const optionsData = [
      { text: feet.toString(), isCorrect: true, reason: '' },
      { text: distractor1.toString(), isCorrect: false, reason: `${distractor1} is the result of multiplying ${fathoms} by 3, the number of feet in a yard, instead of by ${feetPerFathom}, the number of feet in a fathom` },
      { text: distractor2.toString(), isCorrect: false, reason: `${distractor2} is the result of adding ${feetPerFathom} to ${fathoms} instead of multiplying` },
      { text: distractor3.toString(), isCorrect: false, reason: `${distractor3} is the result of dividing ${fathoms} by ${feetPerFathom} instead of multiplying` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Each fathom is ${feetPerFathom} feet, so multiply the depth in fathoms by ${feetPerFathom} to find the depth in feet: $${fathoms} \\times ${feetPerFathom} = ${feet}$. So the camera is at a depth of ${feet} feet. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      // Fixed: Plain text for units, no \\text{} needed
      questionText: `A special camera is used for underwater ocean research. The camera is at a depth of ${fathoms} fathoms. What is the camera's depth in feet? (1 fathom = ${feetPerFathom} feet)`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: feet.toString(),
      explanation: explanation
    };
  }
};
