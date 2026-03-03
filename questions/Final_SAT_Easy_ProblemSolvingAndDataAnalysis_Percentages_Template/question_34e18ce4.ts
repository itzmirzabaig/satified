import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 34e18ce4
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 350, percentage: 4%]
 * - Difficulty factors: [Small percentage calculation]
 * - Distractor patterns: [4 = raw percentage, 70 = 20%, 346 = 350-4]
 * - Constraints: [Result must be integer]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_34e18ce4 = {
  metadata: {
    // id: "34e18ce4",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const total = getRandomInt(200, 500);
    const percentage = getRandomInt(2, 8);
    const result = Math.round((percentage / 100) * total);

    const check = (total * percentage) / 100;
    if (check !== result) return generator_34e18ce4.generate();

    const distractorA = percentage;
    const distractorC = Math.round((20 / 100) * total);
    const distractorD = total - percentage;

    const optionsData = [
      { text: `${distractorA}`, isCorrect: false, reason: "simply takes the number from the percentage without performing the calculation" },
      { text: `${result}`, isCorrect: true },
      { text: `${distractorC}`, isCorrect: false, reason: "might result from a calculation error" },
      { text: `${distractorD}`, isCorrect: false, reason: "is obtained by subtracting the percentage value from the total" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `There are ${total} objects in a box. Of these objects, ${percentage}% are balls. How many balls are in the box?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${result}`,
      explanation: `Choice ${correctOption.letter} is correct. Calculate ${percentage}% of ${total}: $${total} \\times \\frac{${percentage}}{100} = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

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