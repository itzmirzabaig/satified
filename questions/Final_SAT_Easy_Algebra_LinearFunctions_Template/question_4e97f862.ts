import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 4e97f862
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-5, intercept: 5-10 negative, x: 5-10]
 * - Difficulty factors: [Evaluation with negative intercept]
 * - Distractor patterns: [wrong intercept sign, forgot intercept, sign error]
 * - Constraints: [Ensure negative intercept]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_4e97f862 = {
  metadata: {
    // id: "4e97f862",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(2, 5);

    const intercept = -getRandomInt(5, 10);

    const xValue = getRandomInt(5, 10);

    const result = slope * xValue + intercept;

    const distractor1 = slope * xValue - intercept;

    const distractor2 = slope * xValue;

    const distractor3 = -result;

    const optionsData = [
      { text: distractor1.toString(), isCorrect: false, reason: "subtracts the intercept instead of adding" },
      { text: result.toString(), isCorrect: true },
      { text: distractor2.toString(), isCorrect: false, reason: "forgets to add the intercept" },
      { text: distractor3.toString(), isCorrect: false, reason: "has a sign error" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(x) = ${slope}x - ${Math.abs(intercept)}$. What is the value of $f(${xValue})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$: $f(${xValue}) = ${slope}(${xValue}) - ${Math.abs(intercept)} = ${slope * xValue} - ${Math.abs(intercept)} = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 3174f07d
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: neg fractional, yIntercept: 6-10]
 * - Difficulty factors: [Reading y-intercept]
 * - Distractor patterns: [origin, calculated wrong, wrong sign]
 * - Constraints: [None]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Plot.OfX]
 */

