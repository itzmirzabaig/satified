import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 445
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 300,000 (6-digit), large: 234,000 (6-digit), percentage result: 78%]
 * - Difficulty factors: [Basic percentage calculation, large numbers, fraction simplification]
 * - Distractor patterns: [22% = complement percentage, 33% = estimation error, 66% = calculation error]
 * - Constraints: [Numbers divisible by 3 for clean simplification]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_445 = {
  metadata: {
    id: "445",
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

    const decimal = calculatedPercentage / 100;

    // Wrong choices: the percent not large, the quotient not multiplied by
    // 100, and the decimal point moved one place too few. Two of them used to
    // be arbitrary multiples "from an estimation error."
    const optionsData = [
      { text: `${complement}%`, isCorrect: false, reason: `${complement}% is the percent of the paper clips that are not size large` },
      { text: `${decimal}%`, isCorrect: false, reason: `${decimal} is the fraction of the paper clips that are size large written as a decimal; it must be multiplied by 100 to give a percent` },
      { text: `${calculatedPercentage / 10}%`, isCorrect: false, reason: `${calculatedPercentage / 10}% results from multiplying ${decimal} by 10 instead of by 100` },
      { text: `${calculatedPercentage}%`, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    const formatNumber = (n: number) => n.toLocaleString('en-US');

    return {
      questionText: `Of ${formatNumber(total)} paper clips, ${formatNumber(large)} are size large. What percentage of the paper clips are size large?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${calculatedPercentage}%`,
      explanation: `Choice ${correctOption.letter} is correct. To find the percentage of paper clips that are large, divide the number of large paper clips by the total number of paper clips and multiply by 100: $\\frac{${formatNumber(large).replace(/,/g, '{,}')}}{${formatNumber(total).replace(/,/g, '{,}')}} = ${decimal}$ and $${decimal} \\times 100 = ${calculatedPercentage}$, so ${calculatedPercentage}% of the paper clips are size large. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
