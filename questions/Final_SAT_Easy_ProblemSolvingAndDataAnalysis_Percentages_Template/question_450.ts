import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 450
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentage: 20%, base: 440 (triple-digit)]
 * - Difficulty factors: [20% calculation = divide by 5]
 * - Distractor patterns: [44 = 10% of 440, 880 = 200% of 440, 1760 = 400% of 440]
 * - Constraints: [20% for mental math]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_450 = {
  metadata: {
    id: "450",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const base = getRandomInt(200, 800);
    const roundedBase = Math.floor(base / 20) * 20;
    const result = (roundedBase * 20) / 100;

    // Wrong choices: 10% of the number, the number times 2 instead of 0.2,
    // and the 80% that remains. The last replaced 400% of the number, which
    // no likely slip produces.
    const fmt = (n: number) => n.toLocaleString('en-US');
    const optionsData = [
      { text: fmt(result / 2), isCorrect: false, reason: `${fmt(result / 2)} is 10% of ${roundedBase}, not 20%` },
      { text: fmt(result), isCorrect: true, reason: "" },
      { text: fmt(roundedBase * 2), isCorrect: false, reason: `${fmt(roundedBase * 2)} results from multiplying ${roundedBase} by 2 instead of by 0.2` },
      { text: fmt(roundedBase - result), isCorrect: false, reason: `${fmt(roundedBase - result)} is 80% of ${roundedBase}, the amount that remains after 20% is subtracted` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What is 20% of ${roundedBase}?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: fmt(result),
      explanation: `Choice ${correctOption.letter} is correct. 20% of ${roundedBase} can be calculated as $\\left(\\frac{20}{100}\\right)(${roundedBase})$, which is equivalent to $\\frac{${fmt(roundedBase * 20).replace(/,/g, '{,}')}}{100}$, or ${result}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
