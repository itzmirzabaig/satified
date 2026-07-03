import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 547
 *
 * ORIGINAL ANALYSIS:
 * - Type: Exponential growth model creation
 * - Number ranges: Initial 2000, growth 3%, years 1998-2010
 * - Difficulty: Medium - building exponential growth equation
 */

export const generator_547 = {
  metadata: {
    id: "547",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    const initialPop = getRandomInt(10, 50) * 100; // 1,000 to 5,000 in clean hundreds
    const growthPercent = getRandomInt(2, 6);
    const growthFactor = 1 + growthPercent / 100;
    const growthFactorStr = growthFactor.toFixed(2);
    const growthDecimalStr = (growthPercent / 100).toFixed(2);
    const startYear = 1998;
    const popProse = initialPop.toLocaleString('en-US');
    const popTeX = popProse.replace(/,/g, '{,}');

    const questionText = `A function $p$ models the number of animals in a population. The model estimates that there were ${popProse} animals in the population in ${startYear}. Each year from ${startYear} to ${startYear + 12}, the number of animals in the population increased by ${growthPercent}% of the number of animals in the population the previous year. Which equation defines this function, where $p(x)$ is the estimated number of animals in the population $x$ years after ${startYear}?`;

    const correctText = `$p(x) = ${popTeX}(${growthFactorStr})^x$`;

    const optionsData = [
      { text: `$p(x) = ${popTeX}(${growthPercent})^x$`, isCorrect: false, reason: `uses the percentage ${growthPercent} as the base instead of the growth factor ${growthFactorStr}` },
      { text: correctText, isCorrect: true, reason: '' },
      { text: `$p(x) = ${popTeX}(${growthPercent})^{${startYear}}$`, isCorrect: false, reason: `uses the percentage ${growthPercent} as the base and the constant ${startYear} as the exponent instead of the variable $x$` },
      { text: `$p(x) = ${popTeX}(${growthFactorStr})^{${startYear}}$`, isCorrect: false, reason: `uses the constant ${startYear} as the exponent instead of the variable $x$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. The estimated population was ${popProse} in ${startYear}, and an increase of ${growthPercent}% per year means the population is multiplied by the growth factor 1 + ${growthDecimalStr} = ${growthFactorStr} each year. After $x$ years of repeated growth, the estimated population is $p(x) = ${popTeX}(${growthFactorStr})^x$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation
    };
  }
};
