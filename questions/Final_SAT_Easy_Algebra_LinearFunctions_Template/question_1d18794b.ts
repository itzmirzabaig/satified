import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 1d18794b
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [activationFee: 25-50, monthlyCost: 20-30]
 * - Difficulty factors: [Modeling linear relationship]
 * - Distractor patterns: [division of time, swapped parameters]
 * - Constraints: [None]
 * - Question type: [Modeling→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_1d18794b = {
  metadata: {
    // id: "1d18794b",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const activationFee = getRandomInt(25, 50);

    const monthlyCost = getRandomInt(20, 30);

    const correctEquation = `c=${monthlyCost}t+${activationFee}`;

    const distractorA = `c=\\frac{t}{${monthlyCost}}+${activationFee}`;

    const distractorB = `c=\\frac{t}{${activationFee}}+${monthlyCost}`;

    const distractorD = `c=${activationFee}t+${monthlyCost}`;

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "incorrectly divides time by monthly cost" },
      { text: distractorB, isCorrect: false, reason: "incorrectly divides time by activation fee" },
      { text: correctEquation, isCorrect: true },
      { text: distractorD, isCorrect: false, reason: "swaps the activation fee and monthly cost" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `A contract for a certain service requires a onetime activation cost of ${activationFee} and a monthly cost of ${monthlyCost}. Which equation represents this situation, where $c$ is the total cost, in dollars, of this service contract for $t$ months?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctOption.letter} is correct. The total cost is the monthly cost ($${monthlyCost}$) times the number of months ($t$) plus the one-time activation fee ($${activationFee}$), giving $c = ${monthlyCost}t + ${activationFee}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: b51c173d
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-5, yIntercept: 3-8 negative]
 * - Difficulty factors: [Constructing equation from slope/intercept]
 * - Distractor patterns: [reciprocal slope, negative reciprocal, negative slope]
 * - Constraints: [Ensure negative intercept]
 * - Question type: [Find equation→Multiple Choice Text]
 * - Figure generation: null
 */

