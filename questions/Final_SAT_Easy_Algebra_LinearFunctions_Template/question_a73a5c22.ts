import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: a73a5c22
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 8-12, intercept: 5-10, x: 6-10]
 * - Difficulty factors: [Simple evaluation]
 * - Distractor patterns: [zero, input value, slope]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_a73a5c22 = {
  metadata: {
    // id: "a73a5c22",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(8, 12);

    const intercept = getRandomInt(5, 10);

    const xValue = getRandomInt(6, 10);

    const result = slope * xValue + intercept;

    const optionsData = [
      { text: "0", isCorrect: false, reason: "is not the result of the function evaluation" },
      { text: xValue.toString(), isCorrect: false, reason: "is just the input value" },
      { text: slope.toString(), isCorrect: false, reason: "is the slope, not the result" },
      { text: result.toString(), isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $g$ is defined by $g(x) = ${slope}x + ${intercept}$. What is the value of $g(x)$ when $x = ${xValue}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$: $g(${xValue}) = ${slope}(${xValue}) + ${intercept} = ${slope * xValue} + ${intercept} = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 1993561d
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [denominator: 3-6, intercept: 3-8]
 * - Difficulty factors: [Equation from slope and intercept]
 * - Distractor patterns: [reciprocal intercept, incorrect fraction, wrong sign]
 * - Constraints: [Slope is 1/denominator]
 * - Question type: [Find equation→Multiple Choice Text]
 * - Figure generation: null
 */

