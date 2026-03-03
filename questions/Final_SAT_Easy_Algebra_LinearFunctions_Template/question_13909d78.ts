import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 13909d78
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 80-120, intercept: 1-5, xValue: 7-12]
 * - Difficulty factors: [Evaluation]
 * - Distractor patterns: [adding all numbers, addition error, forgetting intercept]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_13909d78 = {
  metadata: {
    // id: "13909d78",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(80, 120);

    const intercept = getRandomInt(1, 5);

    const xValue = getRandomInt(7, 12);

    const result = slope * xValue + intercept;

    const distractor1 = slope + xValue + intercept;

    const distractor2 = slope + intercept;

    const distractor3 = slope * xValue;

    const optionsData = [
      { text: distractor1.toString(), isCorrect: false, reason: "adds all numbers instead of following order of operations" },
      { text: distractor2.toString(), isCorrect: false, reason: "adds slope and intercept without multiplying by x" },
      { text: distractor3.toString(), isCorrect: false, reason: "forgets to add the intercept" },
      { text: result.toString(), isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $f$ is defined by the equation $f(x) = ${slope}x + ${intercept}$. What is the value of $f(x)$ when $x = ${xValue}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$: $f(${xValue}) = ${slope}(${xValue}) + ${intercept} = ${slope * xValue} + ${intercept} = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: de6fe450
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initialWage: 8-12 + 0.25, increase: 0.3-0.7, years: 4-6]
 * - Difficulty factors: [Modeling from rate/intercept]
 * - Distractor patterns: [subtraction, initial wage as rate]
 * - Constraints: [Fixed starting cents]
 * - Question type: [Modeling→Multiple Choice Text]
 * - Figure generation: null
 */

