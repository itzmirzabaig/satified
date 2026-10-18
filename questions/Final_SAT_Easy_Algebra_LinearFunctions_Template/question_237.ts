import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 237
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 10-50, intercept: 10-50, x: 2-5]
 * - Difficulty factors: [Simple function evaluation]
 * - Distractor patterns: [forgot intercept, added x instead of multiplying, multiplied both terms by x]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: [Plot.OfX]
 *
 * FIXED:
 * - Bounded retry guarantees all four option values are distinct. Latent
 *   collision: distractor1 (slope*x) could equal distractor2 (slope+intercept+x)
 *   — e.g. slope=10, x=3, intercept=17 gives both = 30. Re-draw until distinct.
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
    // Each wrong choice is a real evaluation slip. The old "doubling the
    // y-intercept" choice, slope * x + 2 * intercept, only matched an actual
    // mistake when x was 2; it is now x * (slope + intercept), which comes from
    // multiplying both terms by x. Redraw until the four values differ.
    let slope = 10, intercept = 10, xValue = 2;
    do {
      slope = getRandomInt(10, 50);
      intercept = getRandomInt(10, 50);
      xValue = getRandomInt(2, 5);
    } while (new Set([
      slope * xValue + intercept,
      slope * xValue,
      slope + intercept + xValue,
      xValue * (slope + intercept)
    ]).size < 4);

    const correctValue = slope * xValue + intercept;

    const optionsData = [
      { text: (slope * xValue).toString(), isCorrect: false, reason: `it is the value of $${slope}(${xValue})$; ${intercept} must still be added` },
      { text: (slope + intercept + xValue).toString(), isCorrect: false, reason: `it results from adding ${xValue} to ${slope} instead of multiplying ${slope} by ${xValue}` },
      { text: correctValue.toString(), isCorrect: true, reason: '' },
      { text: (xValue * (slope + intercept)).toString(), isCorrect: false, reason: `it results from multiplying both ${slope} and ${intercept} by ${xValue}, which gives $${xValue}(${slope} + ${intercept})$; only ${slope} is multiplied by ${xValue}` }
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
      explanation: `Choice ${correctOption.letter} is correct. To find the value of $f(x)$ when $x = ${xValue}$, substitute ${xValue} for $x$ in the given function, which yields $f(${xValue}) = ${slope}(${xValue}) + ${intercept}$, or $f(${xValue}) = ${slope * xValue} + ${intercept} = ${correctValue}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
