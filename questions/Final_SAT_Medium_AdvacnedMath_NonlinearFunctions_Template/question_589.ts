import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 589
 *
 * ORIGINAL ANALYSIS:
 * - Type: Exponential function value interpretation (f(k) ~ v in context)
 * - Number ranges: initial 50-80, growth 1.02-1.05, years 5-10 (within the
 *   declared domain 0 <= x <= 10), value = round(initial * growth^years)
 * - Difficulty: Medium - interpreting a function value in context
 */

export const generator_589 = {
  metadata: {
    id: "589",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const initialValue = getRandomInt(50, 80);
    const growthRate = 1 + (getRandomInt(2, 5) / 100); // 1.02 to 1.05
    const years = getRandomInt(5, 10); // stays inside the declared domain 0 <= x <= 10
    const finalValue = Math.round(initialValue * Math.pow(growthRate, years));

    const questionText = `A collector purchased a certain rare coin on January 1. The function $f(x)=${initialValue}(${growthRate.toFixed(2)})^{x}$, where $\\,0 \\leq x \\leq 10$, gives the predicted value, in dollars, of the rare coin $x$ years after the collector purchased it. What is the best interpretation of the statement "$f(${years})$ is approximately equal to ${finalValue}" in this context?`;

    const correctText = `${years} years after the collector purchased the rare coin, its predicted value is approximately \\$${finalValue}.`;

    const optionsData = [
      { text: `When the rare coin's predicted value is approximately \\$${finalValue}, it is greater than the predicted value, in dollars, on January 1 of the previous year.`, isCorrect: false, reason: `describes a comparison between consecutive years, but $f(${years}) \\approx ${finalValue}$ relates the input ${years}, in years since purchase, to the output, the predicted value in dollars` },
      { text: `When the rare coin's predicted value is approximately \\$${finalValue}, it is ${years} times the predicted value, in dollars, on January 1 of the previous year.`, isCorrect: false, reason: `treats the input ${years} as a multiplicative factor between consecutive years, but the input of $f$ is the number of years since purchase` },
      { text: `From the day the collector purchased the rare coin to ${years} years after the collector purchased the coin, its predicted value increased by a total of approximately \\$${finalValue}.`, isCorrect: false, reason: `interprets the output ${finalValue} as the increase in value, but $f(${years})$ is the total predicted value after ${years} years, not the change in value` },
      { text: correctText, isCorrect: true, reason: "" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const correctAnswer = correctText;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. The function $f$ gives the predicted value, in dollars, of the rare coin $x$ years after the collector purchased it. In the statement $f(${years}) \\approx ${finalValue}$, the input ${years} is a number of years after the purchase, and the output is the predicted value, in dollars, at that time. Therefore, the statement means that ${years} years after the collector purchased the rare coin, its predicted value is approximately \\$${finalValue}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer,
      explanation
    };
  }
};
