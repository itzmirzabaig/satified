import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: 8bf3f67a
*
* ORIGINAL ANALYSIS:
* - Number ranges: [depth: 39 fathoms, conversion: 6 feet/fathom, answer: 234 feet]
* - Difficulty factors: [Unit conversion, multiplication]
* - Distractor patterns: [A: 234 (correct), B: 117 (39×3), C: 45 (39+6), D: 7 (39/6)]
* - Constraints: [Simple multiplication]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_8bf3f67a = {
  metadata: {
    // id: "8bf3f67a",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const fathoms = getRandomInt(25, 50);
    const feetPerFathom = 6;
    const feet = fathoms * feetPerFathom;

    const distractor1 = fathoms * 3;
    const distractor2 = fathoms + feetPerFathom;
    const distractor3 = Math.round(fathoms / feetPerFathom);

    const optionsData = [
      { text: feet.toString(), isCorrect: true, reason: null },
      { text: distractor1.toString(), isCorrect: false, reason: "multiplying by 3 instead of 6" },
      { text: distractor2.toString(), isCorrect: false, reason: "adding the two numbers" },
      { text: distractor3.toString(), isCorrect: false, reason: "dividing the numbers" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // Fixed: Plain text for words, $...$ only for math expressions
    const explanation = `To find the depth in feet, multiply the depth in fathoms by the number of feet in one fathom. $${fathoms} \\times ${feetPerFathom} = ${feet}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; it results from ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it results from ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it results from ${incorrectOptions[2].reason}.`;

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

/**
* Question ID: c47256ca
*
* ORIGINAL ANALYSIS:
* - Number ranges: [speed: 64 yards/sec, conversion: 3 feet/yard, answer: 192 feet/sec]
* - Difficulty factors: [Rate conversion, multiplication]
* - Distractor patterns: [A: 61 (64-3), B: 67 (64+3), C: 94 (random), D: 192 (correct, 64×3)]
* - Constraints: [Simple multiplication]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/