import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 261
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 4-8, xValue: 3-6, aValue: 5-15]
 * - Difficulty factors: [Solving for parameter in linear function]
 * - Distractor patterns: [added instead of subtracted, subtracted slope only, subtracted in wrong order]
 * - Constraints: [None]
 * - Question type: [Find parameter→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_261 = {
  metadata: {
    id: "261",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(4, 8);

    const xValue = getRandomInt(3, 6);

    const aValue = getRandomInt(5, 15);

    const result = (slope * xValue) + aValue;

    const product = slope * xValue;

    // Every wrong choice is a real solving slip. The old first choice was the
    // answer's g value minus 1 ("a calculation error"). The four values are
    // distinct: -a < a < result - slope < result + product.
    const optionsData = [
      { text: (result + product).toString(), isCorrect: false, reason: `it results from adding ${product} to ${result} instead of subtracting it` },
      { text: (result - slope).toString(), isCorrect: false, reason: `it results from subtracting ${slope} from ${result} instead of subtracting $${slope}(${xValue})$, or ${product}` },
      { text: aValue.toString(), isCorrect: true, reason: '' },
      { text: (-aValue).toString(), isCorrect: false, reason: `it results from subtracting in the wrong order, $${product} - ${result}$, instead of $${result} - ${product}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $g$ is defined as $g(x)=${slope}x+a$, where $a$ is a constant. If $g(${xValue})=${result}$, what is the value of $a$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: aValue.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$ in the given function yields $g(${xValue}) = ${slope}(${xValue}) + a$, or $g(${xValue}) = ${product} + a$. Since $g(${xValue}) = ${result}$, it follows that $${result} = ${product} + a$. Subtracting ${product} from both sides of this equation yields $a = ${aValue}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
