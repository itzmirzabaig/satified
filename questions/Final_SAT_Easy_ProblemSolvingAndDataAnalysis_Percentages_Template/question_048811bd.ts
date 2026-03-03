import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 048811bd
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentage: 10%, base: 370]
 * - Difficulty factors: [10% calculation = divide by 10]
 * - Distractor patterns: [27 = miscalculation, 333 = 90%, 360 = 370-10]
 * - Constraints: [Base ends in 0]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_048811bd = {
  metadata: {
    // id: "048811bd",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const base = getRandomInt(200, 600);
    const roundedBase = Math.floor(base / 10) * 10;
    const result = roundedBase / 10;

    const distractorA = result - 10;
    const distractorC = roundedBase - result;
    const distractorD = roundedBase - 10;

    const optionsData = [
      { text: `${distractorA}`, isCorrect: false, reason: "might be a miscalculation" },
      { text: `${result}`, isCorrect: true },
      { text: `${distractorC}`, isCorrect: false, reason: "likely results from calculating 90% instead of 10%" },
      { text: `${distractorD}`, isCorrect: false, reason: "is obtained by subtracting 10 from the total" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What is 10% of ${roundedBase}?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${result}`,
      explanation: `Choice ${correctOption.letter} is correct. To find 10% of a number, multiply by 0.10 or divide by 10: $${roundedBase} \\div 10 = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 6e4a60dd
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [bill: $25.00, tip: 20%]
 * - Difficulty factors: [Tip calculation, money context]
 * - Distractor patterns: [3.50 = 14%, 4.00 = 16%, 4.50 = 18%]
 * - Constraints: [Result must be clean dollar amount]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */