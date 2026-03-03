import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 58a71e06
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 300,000 (6-digit), large: 234,000 (6-digit), percentage result: 78%]
 * - Difficulty factors: [Basic percentage calculation, large numbers, fraction simplification]
 * - Distractor patterns: [22% = complement percentage, 33% = estimation error, 66% = calculation error]
 * - Constraints: [Numbers divisible by 3 for clean simplification]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_58a71e06 = {
  metadata: {
    // id: "58a71e06",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const percentageResult = getRandomInt(65, 85);
    const totalBase = getRandomInt(2, 5) * 100;
    const part = Math.round((percentageResult / 100) * totalBase);
    const scale = getRandomInt(100, 999);
    const total = totalBase * scale * 10;
    const large = part * scale * 10;

    const calculatedPercentage = Math.round((large / total) * 100);
    const complement = 100 - calculatedPercentage;

    const optionsData = [
      { text: `${complement}%`, isCorrect: false, reason: "represents the percentage of items that are not large (the complement)" },
      { text: `${Math.round(complement * 1.5)}%`, isCorrect: false, reason: "results from an estimation error" },
      { text: `${Math.round(calculatedPercentage * 0.85)}%`, isCorrect: false, reason: "results from a calculation error or wrong operation" },
      { text: `${calculatedPercentage}%`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    const formatNumber = (n: number) => n.toLocaleString();

    return {
      questionText: `Of $${formatNumber(total)}$ paper clips, $${formatNumber(large)}$ are size large. What percentage of the paper clips are size large?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${calculatedPercentage}%`,
      explanation: `Choice ${correctOption.letter} is correct. To find the percentage of paper clips that are large, divide the number of large paper clips by the total number of paper clips and multiply by $100$: $\\frac{${formatNumber(large)}}{${formatNumber(total)}} \\times 100 = ${calculatedPercentage}%. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 8705ecba
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [price: $20 (double-digit), tax rate: 5% (single-digit percentage)]
 * - Difficulty factors: [Sales tax calculation, decimal multiplication]
 * - Distractor patterns: [20.05 = decimal error, 20.50 = half percentage, 25.00 = added 5 instead of 5%]
 * - Constraints: [Tax rate < 10% for simple calculation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */