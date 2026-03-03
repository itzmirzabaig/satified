import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 284303f1
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 250, percentage: 6%]
 * - Difficulty factors: [Small percentage of total, decimal multiplication]
 * - Distractor patterns: [6 = raw percentage, 75 = 30% error, 244 = 250-6]
 * - Constraints: [Result must be integer]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_284303f1 = {
  metadata: {
    // id: "284303f1",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const percentage = getRandomInt(4, 12);
    const total = getRandomInt(20, 50) * 10;
    const result = Math.round((percentage / 100) * total);

    const distractorA = percentage;
    const distractorC = Math.round((30 / 100) * total);
    const distractorD = total - percentage;

    const optionsData = [
      { text: `${distractorA}`, isCorrect: false, reason: "confuses the percentage number (${percentage}) with the actual count; it ignores the total number of ${total}" },
      { text: `${result}`, isCorrect: true },
      { text: `${distractorC}`, isCorrect: false, reason: "would be the answer if you calculated 30% instead of ${percentage}%" },
      { text: `${distractorD}`, isCorrect: false, reason: "likely comes from subtracting ${percentage} from ${total}, which is an incorrect operation for finding a percentage" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `There are $${total}$ trees in a park. Of these trees, $${percentage}% are birch trees. How many birch trees are in the park?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${result}`,
      explanation: `Choice ${correctOption.letter} is correct. To find the number of birch trees, calculate ${percentage}% of $${total}$: $0.${percentage.toString().padStart(2, '0')} \\times ${total} = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 9c44f828
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 840, percentage: 50%]
 * - Difficulty factors: [50% = half, simplest percentage]
 * - Distractor patterns: [25 = unrelated, 50 = percentage value, 790 = 840-50]
 * - Constraints: [Even number for clean halving]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */