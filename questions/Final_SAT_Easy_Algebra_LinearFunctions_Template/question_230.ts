import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 230
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 3-6, intercept: 5-10 negative, x: 5-10 negative]
 * - Difficulty factors: [Negative input evaluation]
 * - Distractor patterns: [arithmetic error, sign error, fractional format]
 * - Constraints: [Ensure negative input]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_230 = {
  metadata: {
    id: "230",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(3, 6);

    const intercept = -getRandomInt(5, 10);

    const xValue = -getRandomInt(5, 10);

    const result = slope * xValue + intercept;
    const c = Math.abs(intercept);

    // Always distinct: the four values are -s|x| - c, s|x| - c, -s|x| + c and
    // s|x| + c, and s|x| >= 15 > c.
    const optionsData = [
      { text: result.toString(), isCorrect: true, reason: '' },
      { text: (slope * -xValue + intercept).toString(), isCorrect: false, reason: `is the value of $g(${-xValue})$, not $g(${xValue})$` },
      { text: (slope * xValue - intercept).toString(), isCorrect: false, reason: `results from adding ${c} instead of subtracting it` },
      { text: (-result).toString(), isCorrect: false, reason: `is the opposite of the value of $g(${xValue})$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $g$ is defined by $g(x) = ${slope}x - ${Math.abs(intercept)}$. What is the value of $g(${xValue})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting $${xValue}$ for $x$ in the given function yields $g(${xValue}) = ${slope}(${xValue}) - ${c}$, or $g(${xValue}) = ${slope * xValue} - ${c} = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because it ${o.reason}.`).join(' ')}`
    };
  }
};
