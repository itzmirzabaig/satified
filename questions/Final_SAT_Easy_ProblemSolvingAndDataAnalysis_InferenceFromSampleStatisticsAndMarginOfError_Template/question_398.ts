import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 398
 * FIXED:
 * - Replaced all `$...$` in plain text with `\\$...\\$` to prevent LaTeX parsing
 * - Ensured all currency values are rendered as plain text — not math
 * - Kept LaTeX math only for actual math expressions (e.g., in explanation)
 * - No `<LaTeX>` or `tex={...}` used — so no double rendering
 */

export const generator_398 = {
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
    // Full phrases, so eggs read "a dozen eggs" (it was "a dozen of eggs").
    const productTypes = [
      "a carton of grape tomatoes",
      "a basket of strawberries",
      "a container of blueberries",
      "a dozen eggs"
    ];
    const product = getRandomElement(productTypes);
    // "a" or "an"; the article before the analyst was always "An", giving
    // "An researcher" and "An statistician".
    const art = (w: string) => (/^[aeiou]/i.test(w) ? 'An' : 'A');

    // 4. Generate Options
    const optionsData = [
      {
        text: `It is between \\$${lowerBound} and \\$${upperBound}.`,
        isCorrect: true,
        reason: ''
      },
      {
        text: `It is either less than \\$${lowerBound} or greater than \\$${upperBound}.`,
        isCorrect: false,
        reason: `it describes the values outside the interval of plausible values, which is where the mean price is not likely to be`
      },
      {
        text: `It is less than \\$${lowerBound}.`,
        isCorrect: false,
        reason: `\\$${lowerBound} is the lowest plausible value of the mean price, so values less than \\$${lowerBound} are not plausible`
      },
      {
        text: `It is greater than \\$${upperBound}.`,
        isCorrect: false,
        reason: `\\$${upperBound} is the greatest plausible value of the mean price, so values greater than \\$${upperBound} are not plausible`
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
    const explanation = `Choice ${correctLetter} is correct. The plausible values of the mean price for all locations are found by subtracting the margin of error from the estimated mean and adding it to the estimated mean. The lowest plausible value is \\$${meanPrice.toFixed(2)} − \\$${marginOfError.toFixed(2)} = \\$${lowerBound}, and the greatest is \\$${meanPrice.toFixed(2)} + \\$${marginOfError.toFixed(2)} = \\$${upperBound}. Therefore, it is plausible that the mean price is between \\$${lowerBound} and \\$${upperBound}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      // ✅ Use \\$ for currency values — not $ — to prevent LaTeX parsing
      questionText: `${art(analyst)} ${analyst} collected data on the price of ${product} at ${sampleSize} locations selected at random in ${location}. The mean price of ${product} in ${location} was estimated to be \\$${meanPrice.toFixed(2)}, with an associated margin of error of \\$${marginOfError.toFixed(2)}. Which of the following is a plausible statement about the mean price of ${product} for all locations that sell this product in ${location}?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};