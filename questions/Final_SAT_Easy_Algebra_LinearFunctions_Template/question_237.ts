import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 237
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 10-50, intercept: 10-50, x: 2-5]
 * - Difficulty factors: [Simple function evaluation]
 * - Distractor patterns: [forgetting intercept, adding all numbers, doubling intercept]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: [Plot.OfX]
 */

export const generator_237 = {
  metadata: {
    id: "237",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(10, 50);

    const intercept = getRandomInt(10, 50);

    const xValue = getRandomInt(2, 5);

    const correctValue = slope * xValue + intercept;

    const distractor1 = slope * xValue;

    const distractor2 = slope + intercept + xValue;

    const distractor3 = slope * xValue + intercept * 2;

    const optionsData = [
      { text: distractor1.toString(), isCorrect: false, reason: "results from forgetting to add the y-intercept" },
      { text: distractor2.toString(), isCorrect: false, reason: "results from incorrectly adding all numbers together" },
      { text: correctValue.toString(), isCorrect: true },
      { text: distractor3.toString(), isCorrect: false, reason: "results from doubling the y-intercept" }
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
      correctAnswer: correctValue.toString(),
      explanation: `Choice ${correctOption.letter} is correct. To find the value of $f(x)$ when $x = ${xValue}$, substitute ${xValue} for $x$ in the given function: $f(${xValue}) = ${slope}(${xValue}) + ${intercept} = ${slope * xValue} + ${intercept} = ${correctValue}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
