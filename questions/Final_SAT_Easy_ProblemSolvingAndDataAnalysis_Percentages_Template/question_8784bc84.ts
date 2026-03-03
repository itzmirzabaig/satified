import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 8784bc84
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentage: 20%, base: 440 (triple-digit)]
 * - Difficulty factors: [20% calculation = divide by 5]
 * - Distractor patterns: [44 = 10% of 440, 880 = 200% of 440, 1760 = 400% of 440]
 * - Constraints: [20% for mental math]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_8784bc84 = {
  metadata: {
    // id: "8784bc84",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const base = getRandomInt(200, 800);
    const roundedBase = Math.floor(base / 20) * 20;
    const result = (roundedBase * 20) / 100;

    const distractorA = result / 2;
    const distractorC = roundedBase * 2;
    const distractorD = roundedBase * 4;

    const optionsData = [
      { text: `${distractorA}`, isCorrect: false, reason: "this is 10%, not 20%, of ${roundedBase}" },
      { text: `${result}`, isCorrect: true },
      { text: `${distractorC}`, isCorrect: false, reason: "this is 200%, not 20%, of ${roundedBase}" },
      { text: `${distractorD}`, isCorrect: false, reason: "this is 400%, not 20%, of ${roundedBase}" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What is 20% of ${roundedBase}?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${result}`,
      explanation: `Choice ${correctOption.letter} is correct. 20% of ${roundedBase} can be calculated as $\\left(\\frac{20}{100}\\right)(${roundedBase})$, which is equivalent to $\\frac{${roundedBase * 20}}{100}$, or ${result}. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 949cd96b
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentage: 89%, variable: h]
 * - Difficulty factors: [Converting percentage to decimal coefficient, algebraic expression]
 * - Distractor patterns: [89h = 8900%, 0.089h = 8.9%, 8.9h = 890%]
 * - Constraints: [Decimal place errors]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */