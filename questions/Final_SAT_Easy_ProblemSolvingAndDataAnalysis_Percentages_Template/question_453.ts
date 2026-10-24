import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 453
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 840, percentage: 50%]
 * - Difficulty factors: [50% = half, simplest percentage]
 * - Distractor patterns: [25 = unrelated, 50 = percentage value, 790 = 840-50]
 * - Constraints: [Even number for clean halving]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_453 = {
  metadata: {
    id: "453",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const total = getRandomInt(400, 1000);
    const roundedTotal = total % 2 === 0 ? total : total + 1;
    const result = roundedTotal / 2;

    // Wrong choices: the percent used as a count, 50 subtracted from the
    // total, and the total doubled instead of halved. The last replaced a
    // random number explained as "a random guess."
    const fmt = (n: number) => n.toLocaleString('en-US');
    const optionsData = [
      { text: fmt(roundedTotal * 2), isCorrect: false, reason: `${fmt(roundedTotal * 2)} results from multiplying ${roundedTotal} by 2 instead of dividing it by 2` },
      { text: `50`, isCorrect: false, reason: `50 is the percent of the seats that were occupied, not the number of seats` },
      { text: `${result}`, isCorrect: true, reason: '' },
      { text: `${roundedTotal - 50}`, isCorrect: false, reason: `${roundedTotal - 50} results from subtracting 50 from ${roundedTotal} instead of finding 50% of ${roundedTotal}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `There are a total of ${roundedTotal} seats in a school auditorium. During an assembly, students occupied $50\\%$ of the seats in the auditorium. How many seats did the students occupy during this assembly?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${result}`,
      explanation: `Choice ${correctOption.letter} is correct. To find 50% of ${roundedTotal}, multiply by 0.50 or divide by 2: $${roundedTotal} \\times 0.50 = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
