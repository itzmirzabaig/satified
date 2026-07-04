import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 590
 *
 * ORIGINAL ANALYSIS:
 * - Type: Exponential function value interpretation (f(k) ~ v in context)
 * - Number ranges: initial 40-100, growth 1.02-1.05, years 5-10 (within the
 *   declared domain 0 <= x <= 10), value = round(initial * growth^years)
 * - Difficulty: Medium - interpreting a function value in context
 */

export const generator_590 = {
  metadata: {
    id: "590",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    const initial = getRandomInt(4, 10) * 10;
    const rate = getRandomInt(2, 5);
    const growthFactor = 1 + rate / 100;
    const time = getRandomInt(5, 10); // stays inside the declared domain 0 <= x <= 10
    const finalValue = Math.round(initial * Math.pow(growthFactor, time));

    const questionText = `A collector purchased a certain rare coin on January 1. The function $f(x)=${initial}(${growthFactor.toFixed(2)})^{x}$, where $\\,0 \\leq x \\leq 10$, gives the predicted value, in dollars, of the rare coin $x$ years after the collector purchased it. What is the best interpretation of the statement "$f(${time})$ is approximately equal to ${finalValue}" in this context?`;

    const correctText = `${time} years after the collector purchased the rare coin, its predicted value is approximately \\$${finalValue}.`;

    const optionsData = [
      { text: `When the rare coin's predicted value is approximately \\$${finalValue}, it is greater than the predicted value, in dollars, on January 1 of the previous year.`, isCorrect: false, reason: `describes a comparison, not what the function notation means` },
      { text: `When the rare coin's predicted value is approximately \\$${finalValue}, it is ${growthFactor.toFixed(2)} times the predicted value, in dollars, on January 1 of the previous year.`, isCorrect: false, reason: `describes a growth calculation, not what $f(${time})$ represents` },
      { text: `From the day the collector purchased the rare coin to ${time} years after the collector purchased the coin, its predicted value increased by a total of approximately \\$${finalValue - initial}.`, isCorrect: false, reason: `describes the total increase, not the value at a specific time` },
      { text: correctText, isCorrect: true, reason: "" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const correctAnswer = correctText;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. The function $f(x)=${initial}(${growthFactor.toFixed(2)})^{x}$ gives the predicted value, in dollars, $x$ years after purchase. The value $f(${time})$ represents the predicted value when $x=${time}$. Therefore, the statement means that ${time} years after the collector purchased the rare coin, its predicted value is approximately \\$${finalValue}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer,
      explanation
    };
  }
};
