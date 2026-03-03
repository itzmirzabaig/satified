import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: a232aa96
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-5 negative, intercept: 50-70, xValue: 5-10 negative]
 * - Difficulty factors: [Evaluating with negative values]
 * - Distractor patterns: [calculation errors]
 * - Constraints: [Ensure negative xValue]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_a232aa96 = {
  metadata: {
    // id: "a232aa96",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = -getRandomInt(2, 5);

    const intercept = getRandomInt(50, 70);

    const xValue = -getRandomInt(5, 10);

    const result = slope * xValue + intercept;

    const distractor1 = result - 10;

    const distractor2 = result - 5;

    const distractor3 = result + 3;

    const optionsData = [
      { text: distractor1.toString(), isCorrect: false, reason: "results from a calculation error" },
      { text: distractor2.toString(), isCorrect: false, reason: "results from a calculation error" },
      { text: distractor3.toString(), isCorrect: false, reason: "results from a calculation error" },
      { text: result.toString(), isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(x) = ${slope}x + ${intercept}$. What is the value of $f(x)$ when $x = ${xValue}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$: $f(${xValue}) = ${slope}(${xValue}) + ${intercept} = ${slope * xValue} + ${intercept} = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 1ecaa9c0
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fee: 15-25, rate: 0.60-0.90, miles: 30-50]
 * - Difficulty factors: [Linear model evaluation in word problem]
 * - Distractor patterns: [overestimate, adding miles, doubling mileage cost]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

