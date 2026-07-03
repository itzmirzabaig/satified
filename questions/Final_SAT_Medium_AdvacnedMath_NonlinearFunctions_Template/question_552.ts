import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 552
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential function interpretation
 * - Number ranges: [initial: 150-250, growthRate: 0.025-0.045, yearsAfter: 3-7]
 * - Difficulty: Medium - interpreting function notation in context
 * - Distractor patterns: Confusing input/output, linear vs exponential thinking
 */

export const generator_552 = {
  metadata: {
    id: "552",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    const initialValue = getRandomInt(150, 250);
    const growthRate = (getRandomInt(25, 45) / 1000);
    const yearsAfter = getRandomInt(3, 7);
    const startYear = 1957;
    const targetYear = startYear + yearsAfter;
    const growthFactor = (1 + growthRate).toFixed(3);
    const finalValue = Math.round(initialValue * Math.pow(1 + growthRate, yearsAfter));

    const questionText = `The function $f(x)=${initialValue}(${growthFactor})^{x}$ models the value, in dollars, of a certain bank account by the end of each year from ${startYear} through 1972, where $x$ is the number of years after ${startYear}. Which of the following is the best interpretation of "$f(${yearsAfter})$ is approximately equal to ${finalValue}" in this context?`;

    const correctAnswer = `The value of the bank account is estimated to be approximately \\$${finalValue} in ${targetYear}.`;

    const optionsData = [
      { text: `The value of the bank account is estimated to be approximately \\$${yearsAfter} greater in ${targetYear} than in ${startYear}.`, isCorrect: false, reason: `treats the input value ${yearsAfter} as a dollar increase rather than as the number of years after ${startYear}` },
      { text: correctAnswer, isCorrect: true },
      { text: `The value, in dollars, of the bank account is estimated to be approximately ${yearsAfter} times greater in ${targetYear} than in ${startYear}.`, isCorrect: false, reason: "confuses the input x with a multiplicative factor" },
      { text: `The value of the bank account is estimated to increase by approximately \\$${finalValue} every ${yearsAfter} years between ${startYear} and 1972.`, isCorrect: false, reason: "misinterprets the function value as a repeated increase amount rather than the total value at one point in time" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. In the function, $x$ represents the number of years after ${startYear}, and $f(x)$ gives the value of the account, in dollars, at the end of that year. So $f(${yearsAfter}) \\approx ${finalValue}$ means that ${yearsAfter} years after ${startYear} — that is, in ${targetYear} — the value of the bank account is approximately \\$${finalValue}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer,
      explanation
    };
  }
};
