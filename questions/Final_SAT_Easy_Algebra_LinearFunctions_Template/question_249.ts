import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 249
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 4-8, intercept: 5-12, result: calculated]
 * - Difficulty factors: [Solving for input given output]
 * - Distractor patterns: [added intercept instead of subtracting, did not divide, evaluated f at the target]
 * - Constraints: [Ensure clean result]
 * - Question type: [Solve for x→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_249 = {
  metadata: {
    id: "249",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Every wrong choice is a real solving slip. The old choices were the
    // answer plus 3 ("a calculation error"), the target minus the slope, and
    // the target times the slope. The slope divides twice the intercept so
    // that adding the intercept instead of subtracting it gives a whole number.
    let slope = 4, intercept = 8;
    do {
      slope = getRandomInt(4, 8);
      intercept = getRandomInt(5, 12);
    } while ((2 * intercept) % slope !== 0);

    const xValue = getRandomInt(8, 12);

    const result = slope * xValue + intercept;

    // Always distinct: x < x + 2b/m <= 18 < 32 <= m*x < f(result).
    const optionsData = [
      { text: xValue.toString(), isCorrect: true, reason: '' },
      { text: ((result + intercept) / slope).toString(), isCorrect: false, reason: `it results from adding ${intercept} to both sides instead of subtracting it, which gives $${slope}x = ${result + intercept}$` },
      { text: (result - intercept).toString(), isCorrect: false, reason: `it is the value of $${slope}x$, not $x$; both sides must still be divided by ${slope}` },
      { text: (slope * result + intercept).toString(), isCorrect: false, reason: `it is the value of $f(${result})$, not the value of $x$ for which $f(x) = ${result}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(x) = ${slope}x + ${intercept}$. For what value of $x$ does $f(x) = ${result}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: xValue.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${result} for $f(x)$ in the given function yields $${result} = ${slope}x + ${intercept}$. Subtracting ${intercept} from both sides of this equation yields $${result - intercept} = ${slope}x$. Dividing both sides by ${slope} yields $x = ${xValue}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
