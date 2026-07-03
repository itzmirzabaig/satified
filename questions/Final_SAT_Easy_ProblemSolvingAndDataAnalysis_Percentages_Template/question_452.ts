import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 452
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentage: 89%, variable: h]
 * - Difficulty factors: [Converting percentage to decimal coefficient, algebraic expression]
 * - Distractor patterns: [89h = 8900%, 0.089h = 8.9%, 8.9h = 890%]
 * - Constraints: [Decimal place errors]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_452 = {
  metadata: {
    id: "452",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const percentage = getRandomInt(31, 97);
    const adjustedPercentage = percentage % 10 === 0 ? percentage + 1 : percentage;
    const correctDecimal = (adjustedPercentage / 100).toFixed(2);
    const distractorB = (adjustedPercentage / 1000).toFixed(3);
    const distractorC = (adjustedPercentage / 10).toFixed(1);
    const distractorA = adjustedPercentage;

    const optionsData = [
      { text: `$${distractorA}h$`, isCorrect: false, reason: `this represents ${adjustedPercentage} times the height, or ${adjustedPercentage * 100}% of the height` },
      { text: `$${distractorB}h$`, isCorrect: false, reason: `this represents ${(adjustedPercentage / 10).toFixed(1)}% of the height; the decimal point is shifted too far` },
      { text: `$${distractorC}h$`, isCorrect: false, reason: `this represents ${adjustedPercentage * 10}% of the height; the decimal point is shifted incorrectly` },
      { text: `$${correctDecimal}h$`, isCorrect: true, reason: "" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The length of the base of a certain parallelogram is ${adjustedPercentage}% of the height of the parallelogram. Which expression represents the length of the base of the parallelogram, where $h$ is the height of the parallelogram?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${correctDecimal}h$`,
      explanation: `Choice ${correctOption.letter} is correct. The base is ${adjustedPercentage}% of the height $h$. Writing ${adjustedPercentage}% as a decimal gives $\\frac{${adjustedPercentage}}{100} = ${correctDecimal}$, so the base has length $\\frac{${adjustedPercentage}}{100}h$, which is the expression ${correctDecimal}h. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};
