import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 451
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [value: 10-49 (double-digit), used as both the part and the percent]
 * - Difficulty factors: [Finding the whole from part and percentage, algebra setup]
 * - Distractor patterns: [0 = zero, 1 = decimal error, value*2 = doubled]
 * - Constraints: [Part equals percentage number so the whole is always 100]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_451 = {
  metadata: {
    id: "451",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // value is both the part and the percent. Since value = (value/100) * x,
    // the whole x is always 100. Values from 10 to 49 stay clear of
    // the 0, 1, and 100 choices.
    const value = getRandomInt(10, 49);
    const whole = 100;

    const decimal = (value / 100).toFixed(2); // "0.10" .. "0.49"

    const distractorA = 0;
    const distractorB = 1;
    // The number given in the question (it used to be value * 2).
    const distractorC = value;

    const optionsData = [
      { text: `${distractorA}`, isCorrect: false, reason: `${value}% of 0 is 0, not ${value}` },
      { text: `${distractorB}`, isCorrect: false, reason: `${value}% of 1 is ${(value / 100).toFixed(2)}, not ${value}` },
      { text: `${distractorC}`, isCorrect: false, reason: `${value} is the part, not the whole; ${value}% of ${value} is ${(value * value / 100).toFixed(2)}, not ${value}` },
      { text: `${whole}`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `$${value}$ is $${value}\\%$ of what number?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${whole}`,
      explanation: `Choice ${correctOption.letter} is correct. To find the number, set up the equation $x \\times ${decimal} = ${value}$ and solve for $x$: $x = \\frac{${value}}{${decimal}} = ${whole}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
