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
    // the whole x is always 100. Cap at 49 so value*2 (20..98) never hits the
    // correct answer 100, and stays clear of the 0 and 1 distractors.
    const value = getRandomInt(10, 49);
    const whole = 100;

    const decimal = (value / 100).toFixed(2); // "0.10" .. "0.49"

    const distractorA = 0;
    const distractorB = 1;
    const distractorC = value * 2;

    const optionsData = [
      { text: `${distractorA}`, isCorrect: false, reason: `${value}% of 0 is 0, not ${value}` },
      { text: `${distractorB}`, isCorrect: false, reason: `${value}% of 1 is ${(value / 100).toFixed(2)}, not ${value}` },
      { text: `${distractorC}`, isCorrect: false, reason: `${value}% of ${distractorC} is ${(distractorC * value / 100).toFixed(2)}, not ${value}` },
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
      explanation: `Choice ${correctOption.letter} is correct. To find the number, set up the equation $x \\times ${decimal} = ${value}$ and solve for $x$: $x = \\frac{${value}}{${decimal}} = ${whole}$. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};
