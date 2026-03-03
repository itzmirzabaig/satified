import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 273b7f37
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 760, percentage: 10%]
 * - Difficulty factors: [10% calculation, real-world context]
 * - Distractor patterns: [66 = subtraction error, 84 = miscalculation, 86 = 76+10]
 * - Constraints: [Ends in 0 for clean 10% calculation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_273b7f37 = {
  metadata: {
    // id: "273b7f37",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const total = getRandomInt(500, 900);
    const roundedTotal = Math.floor(total / 10) * 10;
    const result = roundedTotal / 10;

    const distractorA = result - 10;
    const distractorC = result + 8;
    const distractorD = result + 10;

    const optionsData = [
      { text: `${distractorA}`, isCorrect: false, reason: "might be a result of a subtraction error or miscalculation" },
      { text: `${result}`, isCorrect: true },
      { text: `${distractorC}`, isCorrect: false, reason: "is not 10% of ${roundedTotal}" },
      { text: `${distractorD}`, isCorrect: false, reason: "is likely a miscalculation, perhaps adding 10 to ${result}" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Isabel grows potatoes in her garden. This year, she harvested $${roundedTotal}$ potatoes and saved $10% of them to plant next year. How many of the harvested potatoes did Isabel save to plant next year?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${result}`,
      explanation: `Choice ${correctOption.letter} is correct. To find how many potatoes Isabel saved, calculate 10% of $${roundedTotal}$: $0.10 \\times ${roundedTotal} = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 7ed0d098
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [workday: 8 hours, meeting percentage: 15%]
 * - Difficulty factors: [Multi-step calculation, unit conversion (hours to minutes)]
 * - Distractor patterns: [1.2 = hours result, 15 = percentage value, 48 = miscalculation, 72 = correct minutes]
 * - Constraints: [Clean integer result for minutes]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */