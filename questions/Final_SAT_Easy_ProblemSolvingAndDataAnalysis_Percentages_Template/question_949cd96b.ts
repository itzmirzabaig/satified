import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 949cd96b
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentage: 89%, variable: h]
 * - Difficulty factors: [Converting percentage to decimal coefficient, algebraic expression]
 * - Distractor patterns: [89h = 8900%, 0.089h = 8.9%, 8.9h = 890%]
 * - Constraints: [Decimal place errors]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_949cd96b = {
  metadata: {
    // id: "949cd96b",
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
      { text: `$${distractorA}h$`, isCorrect: false, reason: "this represents ${adjustedPercentage} times the height, or ${adjustedPercentage * 100}% of the height" },
      { text: `$${distractorB}h$`, isCorrect: false, reason: "this represents ${(adjustedPercentage/10).toFixed(1)}% of the height; the decimal point is shifted too far" },
      { text: `$${distractorC}h$`, isCorrect: false, reason: "this represents ${adjustedPercentage * 10}% of the height; the decimal point is shifted incorrectly" },
      { text: `$${correctDecimal}h$`, isCorrect: true }
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
      explanation: `Choice ${correctOption.letter} is correct. To find "${adjustedPercentage}% of $h$", convert the percentage to a decimal: ${adjustedPercentage}% = $\\frac{${adjustedPercentage}}{100} = ${correctDecimal}$. Therefore, the expression is $${correctDecimal}h$. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 28c6bd8c
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 1,200, percentage1: 63%, percentage2: 13%]
 * - Difficulty factors: [Table reading, summing percentages, applying to total]
 * - Distractor patterns: [865 = doctor+magazines (wrong pair), 887 = ~74%, 926 = ~77%]
 * - Constraints: [Must use table data]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */