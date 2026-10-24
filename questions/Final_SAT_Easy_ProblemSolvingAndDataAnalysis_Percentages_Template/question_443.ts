import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 443
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 900,000 (6-digit), part: 828,000 (6-digit), percentage: 92%]
 * - Difficulty factors: [Large number percentage, fraction simplification]
 * - Distractor patterns: [8% = complement, 36% and 72% = calculation errors]
 * - Constraints: [Result must be clean percentage]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_443 = {
  metadata: {
    id: "443",
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

    const calculatedPercent = percentageResult;
    const complement = 100 - calculatedPercent;
    const fmt = (n: number) => n.toLocaleString('en-US');
    const decimal = calculatedPercent / 100;

    // Wrong choices: the percent not silver, the quotient not multiplied by
    // 100, and the decimal point moved one place too few. Two of them used to
    // be arbitrary fractions of the answer "from a calculation error."
    const optionsData = [
      { text: `${complement}%`, isCorrect: false, reason: `${complement}% is the percent of the beads that are not silver` },
      { text: `${decimal}%`, isCorrect: false, reason: `${decimal} is the fraction of the beads that are silver written as a decimal; it must be multiplied by 100 to give a percent` },
      { text: `${calculatedPercent / 10}%`, isCorrect: false, reason: `${calculatedPercent / 10}% results from multiplying ${decimal} by 10 instead of by 100` },
      { text: `${calculatedPercent}%`, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Of ${fmt(total)} beads, ${fmt(part)} are silver. What percentage of the beads are silver?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${calculatedPercent}%`,
      explanation: `Choice ${correctOption.letter} is correct. To find the percentage of beads that are silver, divide the number of silver beads by the total number of beads and multiply by 100: $\\frac{${fmt(part).replace(/,/g, '{,}')}}{${fmt(total).replace(/,/g, '{,}')}} = ${decimal}$ and $${decimal} \\times 100 = ${calculatedPercent}$, so ${calculatedPercent}% of the beads are silver. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
