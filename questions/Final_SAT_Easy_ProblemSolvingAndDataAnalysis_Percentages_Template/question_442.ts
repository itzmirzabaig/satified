import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 442
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 350, percentage: 4%]
 * - Difficulty factors: [Small percentage calculation]
 * - Distractor patterns: [4 = raw percentage, 70 = 20%, 346 = 350-4]
 * - Constraints: [Result must be integer]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_442 = {
  metadata: {
    id: "442",
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
    if (check !== result) return generator_442.generate();

    // Wrong choices: the percent used as a count, the objects that are not
    // balls, and the percent subtracted from the total. The second used to
    // be 20% of the total with the reason "might result from a calculation
    // error."
    const optionsData = [
      { text: `${result}`, isCorrect: true, reason: '' },
      { text: `${percentage}`, isCorrect: false, reason: `${percentage} is the percent of the objects that are balls, not the number of balls` },
      { text: `${total - result}`, isCorrect: false, reason: `${total - result} is the number of objects that are not balls, ${100 - percentage}% of ${total}` },
      { text: `${total - percentage}`, isCorrect: false, reason: `${total - percentage} results from subtracting ${percentage} from ${total} instead of finding ${percentage}% of ${total}` }
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
      explanation: `Choice ${correctOption.letter} is correct. The number of balls is ${percentage}% of ${total}: $${total} \\times \\frac{${percentage}}{100} = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
