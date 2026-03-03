import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 520c8177
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [rate: 15-40, constant: 5-20]
 * - Difficulty factors: [Modeling linear relationship from word problem]
 * - Distractor patterns: [missing constant, added coefficients, swapped parameters]
 * - Constraints: [None]
 * - Question type: [Modeling→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_520c8177 = {
  metadata: {
    // id: "520c8177",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const ratePerPound = getRandomInt(15, 40);

    const constantCalories = getRandomInt(5, 20);

    const correctEquation = `c=${ratePerPound}x+${constantCalories}`;

    const distractorA = `c=${ratePerPound}x`;

    const distractorB = `c=${ratePerPound + constantCalories}x`;

    const distractorC = `c=${constantCalories}x+${ratePerPound}`;

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "omits the additional constant calories" },
      { text: distractorB, isCorrect: false, reason: "incorrectly adds the rate and constant together" },
      { text: distractorC, isCorrect: false, reason: "swaps the rate and the constant value" },
      { text: correctEquation, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `A veterinarian recommends that each day a certain rabbit should eat $${ratePerPound}$ calories per pound of the rabbit's weight, plus an additional $${constantCalories}$ calories. Which equation represents this situation, where $c$ is the total number of calories the veterinarian recommends the rabbit should eat each day if the rabbit's weight is $x$ pounds?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctOption.letter} is correct. The rabbit eats $${ratePerPound}$ calories per pound ($${ratePerPound}x$) plus $${constantCalories}$ additional calories, giving $c = ${ratePerPound}x + ${constantCalories}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 88e13c8c
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [monthly: 300-500, fixed: 800-1200, months: 24-48]
 * - Difficulty factors: [Function evaluation with large numbers]
 * - Distractor patterns: [subtracted fixed, forgot fixed, swapped parameters]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

