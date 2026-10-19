import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 241
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-5, intercept: 5-10 negative, x: 5-10]
 * - Difficulty factors: [Evaluation with negative intercept]
 * - Distractor patterns: [added instead of subtracted, forgot constant, subtracted before multiplying]
 * - Constraints: [Ensure negative intercept]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_241 = {
  metadata: {
    id: "241",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Every wrong choice is a real evaluation slip. The old "sign error"
    // choice was the negative of the answer, and the reasons said the intercept
    // should be added when the function subtracts it. x and the constant
    // differ so the explanation never reads "subtracting 6 from 6". The four
    // values are always distinct because slope >= 2.
    let slope = 2, xValue = 5, c = 6;
    do {
      slope = getRandomInt(2, 5);
      c = getRandomInt(5, 10);
      xValue = getRandomInt(5, 10);
    } while (xValue === c);
    const result = slope * xValue - c;

    const optionsData = [
      { text: (slope * xValue + c).toString(), isCorrect: false, reason: `it results from adding ${c} instead of subtracting it` },
      { text: result.toString(), isCorrect: true, reason: '' },
      { text: (slope * xValue).toString(), isCorrect: false, reason: `it is the value of $${slope}(${xValue})$; ${c} must still be subtracted` },
      { text: (slope * (xValue - c)).toString(), isCorrect: false, reason: `it results from subtracting ${c} from ${xValue} before multiplying by ${slope}, which gives $${slope}(${xValue} - ${c})$ instead of $${slope}(${xValue}) - ${c}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(x) = ${slope}x - ${c}$. What is the value of $f(${xValue})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$ in the given function yields $f(${xValue}) = ${slope}(${xValue}) - ${c}$, or $f(${xValue}) = ${slope * xValue} - ${c} = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
