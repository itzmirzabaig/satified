import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 8173f32b
 * FIXED:
 * - Replaced all `$...$` in plain text with `\\$...\\$` to prevent LaTeX parsing
 * - Ensured all currency values are rendered as plain text — not math
 * - Kept LaTeX math only for actual math expressions (e.g., in explanation)
 * - No `<LaTeX>` or `tex={...}` used — so no double rendering
 */

export const generator_8173f32b = {
  metadata: {
    assessment: "SAT",
    domain: "Problem-Solving and Data Analysis",
    skill: "Inference from sample statistics and margin of error",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Generate Statistics
    const sampleSize = getRandomInt(25, 40);
    const dollars = getRandomInt(3, 6);
    const cents = getRandomInt(10, 90);
    const meanPrice = parseFloat(`${dollars}.${cents}`);
    const marginCents = getRandomInt(2, 15);
    const marginOfError = marginCents / 100;
    
    // 2. Calculate Bounds
    const lowerBound = (meanPrice - marginOfError).toFixed(2);
    const upperBound = (meanPrice + marginOfError).toFixed(2);

    // 3. Generate Context
    const analystTypes = ["analyst", "researcher", "economist", "statistician"];
    const analyst = getRandomElement(analystTypes);
    const locationTypes = ["Utah", "Colorado", "Oregon", "Maine", "Iowa"];
    const location = getRandomElement(locationTypes);
    const productTypes = [
      { item: "grape tomatoes", container: "carton" },
      { item: "strawberries", container: "basket" },
      { item: "blueberries", container: "container" },
      { item: "eggs", container: "dozen" }
    ];
    const product = getRandomElement(productTypes);

    // 4. Generate Options
    const optionsData = [
      {
        text: `It is between \\$${lowerBound} and \\$${upperBound}.`,
        isCorrect: true
      },
      {
        text: `It is either less than \\$${lowerBound} or greater than \\$${upperBound}.`,
        isCorrect: false,
        reason: "describes values outside the confidence interval"
      },
      {
        text: `It is less than \\$${lowerBound}.`,
        isCorrect: false,
        reason: "falls outside the lower bound of the confidence interval"
      },
      {
        text: `It is greater than \\$${upperBound}.`,
        isCorrect: false,
        reason: "falls outside the upper bound of the confidence interval"
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // 5. Construct Explanation — Use LaTeX Math Only for Math Expressions
    const explanation = `Choice ${correctLetter} is correct. The confidence interval is calculated by subtracting and adding the margin of error to the mean. 
    Lower bound: \\$${meanPrice.toFixed(2)} - \\$${marginOfError.toFixed(2)} = \\$${lowerBound}. 
    Upper bound: \\$${meanPrice.toFixed(2)} + \\$${marginOfError.toFixed(2)} = \\$${upperBound}. 
    Therefore, the plausible range for the mean price is between \\$${lowerBound} and \\$${upperBound}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      // ✅ Use \\$ for currency values — not $ — to prevent LaTeX parsing
      questionText: `An ${analyst} collected data on the price of a ${product.container} of ${product.item} at ${sampleSize} locations selected at random in ${location}. The mean price of a ${product.container} of ${product.item} in ${location} was estimated to be \\$${meanPrice.toFixed(2)}, with an associated margin of error of \\$${marginOfError.toFixed(2)}. Which of the following is a plausible statement about the mean price of a ${product.container} of ${product.item} for all locations that sell this product in ${location}?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};