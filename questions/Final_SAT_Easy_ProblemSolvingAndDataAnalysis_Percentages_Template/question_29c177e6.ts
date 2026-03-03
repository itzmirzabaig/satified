import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 29c177e6
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentage: 10%, base: 470 (triple-digit)]
 * - Difficulty factors: [10% calculation = divide by 10]
 * - Distractor patterns: [37 = 10% of 370, 423 = 90% of 470, 460 = 470-10]
 * - Constraints: [10% for easy mental math]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_29c177e6 = {
  metadata: {
    // id: "29c177e6",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const base = getRandomInt(200, 900);
    const roundedBase = Math.floor(base / 10) * 10;
    const result = roundedBase / 10;

    const distractorA = (roundedBase - 100) / 10;
    const distractorC = roundedBase - result;
    const distractorD = roundedBase - 10;

    const optionsData = [
      { text: `${distractorA}`, isCorrect: false, reason: "this is 10% of ${roundedBase - 100}, not 10% of ${roundedBase}" },
      { text: `${result}`, isCorrect: true },
      { text: `${distractorC}`, isCorrect: false, reason: "this is 90% of ${roundedBase}, not 10% of ${roundedBase}" },
      { text: `${distractorD}`, isCorrect: false, reason: "this is ${roundedBase} - 10, not 10% of ${roundedBase}" }
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
      explanation: `Choice ${correctOption.letter} is correct. 10% of a quantity means $\\frac{10}{100}$ times the quantity. Therefore, 10% of ${roundedBase} can be represented as $\\frac{10}{100}(${roundedBase})$, which is equivalent to 0.10(${roundedBase}), or ${result}. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

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