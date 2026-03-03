import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 771ee744
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 320, percentage: 10%]
 * - Difficulty factors: [10% calculation, complement distractor]
 * - Distractor patterns: [288 = complement (90%), 320 = total, 352 = 110%]
 * - Constraints: [Ends in 0 for clean 10%]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_771ee744 = {
  metadata: {
    // id: "771ee744",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const total = getRandomInt(200, 500);
    const roundedTotal = Math.floor(total / 10) * 10;
    const percentage = getRandomInt(5, 25);
    const result = Math.round((percentage / 100) * roundedTotal);

    const complementCount = roundedTotal - result;
    const increasedTotal = Math.round(roundedTotal * 1.1);

    const optionsData = [
      { text: `${result}`, isCorrect: true },
      { text: `${complementCount}`, isCorrect: false, reason: "is the number of marbles that are *not* red" },
      { text: `${roundedTotal}`, isCorrect: false, reason: "is the total number of marbles" },
      { text: `${increasedTotal}`, isCorrect: false, reason: "represents an increase rather than a part of the whole" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `There are $${roundedTotal}$ marbles in a container. Of these marbles, $${percentage}% are red. How many marbles in the container are red?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${result}`,
      explanation: `Choice ${correctOption.letter} is correct. To find the number of red marbles, calculate $${percentage}% of $${roundedTotal}$: $${roundedTotal} \\times 0.${percentage.toString().padStart(2, '0')} = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};