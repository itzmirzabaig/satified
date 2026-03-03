import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: bb7c8186
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentage: 23%, base: 100 (special number)]
 * - Difficulty factors: [Percentage of 100 is trivial but tests understanding]
 * - Distractor patterns: [46 = doubled percentage, 77 = 100-23, 123 = 100+23]
 * - Constraints: [Base is 100 making answer = percentage]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_bb7c8186 = {
  metadata: {
    // id: "bb7c8186",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const percentage = getRandomInt(5, 95);
    const base = 100;
    const result = percentage;

    const distractorB = percentage * 2;
    const distractorC = base - percentage;
    const distractorD = base + percentage;

    const optionsData = [
      { text: `${result}`, isCorrect: true },
      { text: `${distractorB}`, isCorrect: false, reason: "this is ${percentage * 2}%, not ${percentage}%, of 100" },
      { text: `${distractorC}`, isCorrect: false, reason: "this is ${percentage}% less than 100, not ${percentage}% of 100" },
      { text: `${distractorD}`, isCorrect: false, reason: "this is ${percentage}% greater than 100, not ${percentage}% of 100" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What is ${percentage}% of ${base}?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${result}`,
      explanation: `Choice ${correctOption.letter} is correct. ${percentage}% of ${base} can be calculated by multiplying $\\frac{${percentage}}{100}$ by ${base}, which yields $\\left(\\frac{${percentage}}{100}\\right)${base}$, or ${result}. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 29c177e6
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentage: 10%, base: 470 (triple-digit)]
 * - Difficulty factors: [10% calculation = divide by 10]
 * - Distractor patterns: [37 = 10% of 370, 423 = 90% of 470, 460 = 470-10]
 * - Constraints: [10% for easy mental math]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */