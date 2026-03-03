import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 361f97c7
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-6, intercept: 1-5 negative, x: 8-15]
 * - Difficulty factors: [Function evaluation with negative intercept]
 * - Distractor patterns: [sign error, forgot intercept, added intercept]
 * - Constraints: [Ensure negative intercept]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_361f97c7 = {
  metadata: {
    // id: "361f97c7",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(2, 6);

    const intercept = -getRandomInt(1, 5);

    const xValue = getRandomInt(8, 15);

    const result = slope * xValue + intercept;

    const distractor1 = -(slope * xValue);

    const distractor2 = slope * xValue;

    const distractor3 = slope * xValue - intercept;

    const optionsData = [
      { text: distractor1.toString(), isCorrect: false, reason: "results from a sign error" },
      { text: result.toString(), isCorrect: true },
      { text: distractor2.toString(), isCorrect: false, reason: "results from forgetting to add the intercept" },
      { text: distractor3.toString(), isCorrect: false, reason: "results from adding the intercept instead of subtracting it" }
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
 * Question ID: 447fa970
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 5-10, intercept: 1-5, x: 3-8]
 * - Difficulty factors: [Simple function evaluation]
 * - Constraints: [Clean arithmetic]
 * - Question type: [Function evaluation→Fill in blank]
 * - Figure generation: null
 */

