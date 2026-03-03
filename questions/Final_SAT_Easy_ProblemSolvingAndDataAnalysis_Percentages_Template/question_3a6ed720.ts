import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 3a6ed720
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 900,000 (6-digit), part: 828,000 (6-digit), percentage: 92%]
 * - Difficulty factors: [Large number percentage, fraction simplification]
 * - Distractor patterns: [8% = complement, 36% and 72% = calculation errors]
 * - Constraints: [Result must be clean percentage]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_3a6ed720 = {
  metadata: {
    // id: "3a6ed720",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const percentageResult = getRandomInt(85, 95);
    const totalBase = 100;
    const partBase = percentageResult;
    const scale = getRandomInt(100, 999) * 10;
    const total = totalBase * scale * 100;
    const part = partBase * scale * 100;

    const calculatedPercent = Math.round((part / total) * 100);
    const complement = 100 - calculatedPercent;
    const distractorB = Math.floor(calculatedPercent / 2.5);
    const distractorC = Math.floor(calculatedPercent * 0.78);

    const optionsData = [
      { text: `${complement}%`, isCorrect: false, reason: "this is the percentage of items that are not silver (the complement), calculated as 100% - ${calculatedPercent}%" },
      { text: `${distractorB}%`, isCorrect: false, reason: "results from a calculation error" },
      { text: `${distractorC}%`, isCorrect: false, reason: "results from a calculation error" },
      { text: `${calculatedPercent}%`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Of $${total.toLocaleString()}$ beads, $${part.toLocaleString()}$ are silver. What percentage of the beads are silver?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${calculatedPercent}%`,
      explanation: `Choice ${correctOption.letter} is correct. To find the percentage of beads that are silver, divide the number of silver beads by the total number of beads and multiply by 100: $\\frac{${part.toLocaleString()}}{${total.toLocaleString()}} \\times 100 = ${calculatedPercent}%. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

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