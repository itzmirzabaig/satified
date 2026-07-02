import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 477
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [die sides: 14, target number: single value]
 * - Difficulty factors: [Basic probability formula, single favorable outcome]
 * - Distractor patterns: [B: confuses value with count, C: wrong complementary, D: full complementary]
 * - Constraints: [Die must have distinct faces 1-N, only 1 favorable outcome for specific number]
 * - Question type: [No figure/table → Text Options]
 * - Figure generation: [None]
 */

export const generator_477 = {
  metadata: {
    id: "477",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const numSides = getRandomInt(10, 20);
    const targetNumber = getRandomInt(1, numSides);

    const probabilityNumerator = 1;
    const probabilityDenominator = numSides;

    const correctText = `\\frac{${probabilityNumerator}}{${probabilityDenominator}}`;

    const optionsData = [
      { text: `\\frac{${probabilityNumerator}}{${probabilityDenominator}}`, isCorrect: true },
      { text: `\\frac{${targetNumber}}{${numSides}}`, isCorrect: false, reason: "confuses the value of the outcome with the number of outcomes" },
      { text: `\\frac{${numSides - 2}}{${numSides}}`, isCorrect: false, reason: "represents probability of not rolling target or 1 (miscalculation)" },
      { text: `\\frac{${numSides - 1}}{${numSides}}`, isCorrect: false, reason: "represents probability of not rolling the target number" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The die has ${numSides} faces in total, labeled 1 through ${numSides}. This means there are ${numSides} possible outcomes when rolling the die. The event is "rolling a ${targetNumber}". There is only one face labeled with the number ${targetNumber}. Therefore, the probability is calculated as: $P = \\frac{\\text{Number of favorable outcomes}}{\\text{Total number of possible outcomes}} = \\frac{1}{${numSides}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `Each face of a fair $${numSides}$-sided die is labeled with a number from $1$ through $${numSides}$, with a different number appearing on each face. If the die is rolled one time, what is the probability of rolling a $${targetNumber}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
