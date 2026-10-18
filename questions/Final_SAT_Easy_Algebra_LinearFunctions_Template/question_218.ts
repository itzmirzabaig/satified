import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 218
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-5, intercept: 5-10 negative, x: -2]
 * - Difficulty factors: [Evaluation with negative input]
 * - Distractor patterns: [arithmetic error, sign error, addition instead of multiplication]
 * - Constraints: [Ensure negative input]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_218 = {
  metadata: {
    id: "218",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Redraw until the four choices differ (h(2) equals the "added the
    // constant" value when the constant is -2 times the slope).
    const xValue = -2;
    let slope = 2, intercept = -5, values: number[] = [];
    do {
      slope = getRandomInt(2, 5);
      intercept = -getRandomInt(5, 10);
      values = [
        slope * xValue + intercept,   // h(-2), the answer
        slope * 2 + intercept,        // h(2): dropped the negative sign of the input
        slope * xValue - intercept,   // added the constant instead of subtracting it
        xValue + intercept            // substituted -2 for the whole term (slope)x
      ];
    } while (new Set(values).size < 4);
    const result = values[0];
    const c = Math.abs(intercept);

    const optionsData = [
      { text: result.toString(), isCorrect: true, reason: '' },
      { text: values[1].toString(), isCorrect: false, reason: `is the value of $h(2)$, not $h(-2)$` },
      { text: values[2].toString(), isCorrect: false, reason: `results from adding ${c} instead of subtracting it` },
      { text: values[3].toString(), isCorrect: false, reason: `results from substituting $-2$ for $${slope}x$ instead of for $x$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $h$ is defined by $h(x) = ${slope}x - ${Math.abs(intercept)}$. What is the value of $h(${xValue})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting $${xValue}$ for $x$ in the given function yields $h(${xValue}) = ${slope}(${xValue}) - ${c}$, or $h(${xValue}) = ${slope * xValue} - ${c} = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because it ${o.reason}.`).join(' ')}`
    };
  }
};
