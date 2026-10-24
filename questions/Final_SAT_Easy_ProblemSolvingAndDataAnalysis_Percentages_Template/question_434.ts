import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 434
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentage: 10%, base: 370]
 * - Difficulty factors: [10% calculation = divide by 10]
 * - Distractor patterns: [27 = miscalculation, 333 = 90%, 360 = 370-10]
 * - Constraints: [Base ends in 0]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_434 = {
  metadata: {
    id: "434",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const base = getRandomInt(200, 600);
    const roundedBase = Math.floor(base / 10) * 10;
    const result = roundedBase / 10;

    // Wrong choices are real slips: 1% of the number (dividing by 100),
    // 90% of the number, and multiplying by 10 instead of dividing. They used
    // to include "might be a miscalculation" (the answer minus 10).
    const fmt = (n: number) => n.toLocaleString('en-US');
    const optionsData = [
      { text: fmt(result), isCorrect: true, reason: '' },
      { text: fmt(roundedBase / 100), isCorrect: false, reason: `${fmt(roundedBase / 100)} is 1% of ${roundedBase}, which results from dividing by 100 instead of by 10` },
      { text: fmt(roundedBase - result), isCorrect: false, reason: `${fmt(roundedBase - result)} is 90% of ${roundedBase}, the amount that remains after 10% is subtracted` },
      { text: fmt(roundedBase * 10), isCorrect: false, reason: `${fmt(roundedBase * 10)} results from multiplying ${roundedBase} by 10 instead of dividing by 10` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What is 10% of ${roundedBase}?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${result}`,
      explanation: `Choice ${correctOption.letter} is correct. Since 10% means $\\frac{10}{100}$, or $\\frac{1}{10}$, 10% of ${roundedBase} is $${roundedBase} \\div 10 = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
