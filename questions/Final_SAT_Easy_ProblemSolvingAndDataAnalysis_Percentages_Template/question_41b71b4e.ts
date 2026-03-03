import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 41b71b4e
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base: 60, percentage increase: 20%]
 * - Difficulty factors: [Percentage increase, two calculation methods]
 * - Distractor patterns: [50 = less than base, 75 = 25% increase, 132 = 120% increase]
 * - Constraints: [Clean integer result]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_41b71b4e = {
  metadata: {
    // id: "41b71b4e",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const base = getRandomInt(40, 100);
    const increasePercent = getRandomInt(15, 35);
    const increaseAmount = Math.round((increasePercent / 100) * base);
    const result = base + increaseAmount;

    const distractorA = base - 10;
    const distractorC = base + Math.round((25 / 100) * base);
    const distractorD = base + (base * 1.2);

    const optionsData = [
      { text: `${distractorA}`, isCorrect: false, reason: "is less than the base value" },
      { text: `${result}`, isCorrect: true },
      { text: `${distractorC}`, isCorrect: false, reason: "is a 25% increase instead" },
      { text: `${distractorD}`, isCorrect: false, reason: "is a 120% increase instead" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What number is ${increasePercent}% greater than ${base}?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${result}`,
      explanation: `Choice ${correctOption.letter} is correct. First calculate ${increasePercent}% of ${base}: $0.${increasePercent} \\times ${base} = ${increaseAmount}$. Then add this to the base: $${base} + ${increaseAmount} = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: eaab8bc1
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 300, percentage: 80%]
 * - Difficulty factors: [Fill-in-the-blank, high percentage]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Clean integer result]
 * - Question type: [Text→Fill in the blank]
 * - Figure generation: [None]
 */