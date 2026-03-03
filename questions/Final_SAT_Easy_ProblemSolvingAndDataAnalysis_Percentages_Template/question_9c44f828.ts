import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

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

export const generator_9c44f828 = {
  metadata: {
    // id: "9c44f828",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const total = getRandomInt(400, 1000);
    const roundedTotal = total % 2 === 0 ? total : total + 1;
    const result = roundedTotal / 2;

    const distractorA = getRandomInt(20, 40);
    const distractorB = 50;
    const distractorD = roundedTotal - 50;

    const optionsData = [
      { text: `${distractorA}`, isCorrect: false, reason: "likely results from a misinterpretation of the numbers or a random guess" },
      { text: `${distractorB}`, isCorrect: false, reason: "incorrectly assumes the answer is the percentage value itself (50)" },
      { text: `${result}`, isCorrect: true },
      { text: `${distractorD}`, isCorrect: false, reason: "appears to be the result of subtracting 50 from ${roundedTotal}" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `There are a total of $${roundedTotal}$ seats in a school auditorium. During an assembly, students occupied $50% of the seats in the auditorium. How many seats did the students occupy during this assembly?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${result}`,
      explanation: `Choice ${correctOption.letter} is correct. To find 50% of $${roundedTotal}$, multiply by 0.50 or divide by 2: $${roundedTotal} \\times 0.50 = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

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