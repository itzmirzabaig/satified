import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 96
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [aVal: 2-8, xVal: 5-12]
 * - Difficulty factors: [Evaluating a basic quadratic function]
 * - Distractor patterns: [Linear multiplication, multiplicative error, addition error]
 * - Constraints: [Evaluation results in integer]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_96 = {
  metadata: {
    id: "96",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const aVal = getRandomInt(2, 8);

    const xVal = getRandomInt(5, 12);

    const result = aVal * xVal * xVal;

    const optionsData = [
      { text: `$${result}$`, isCorrect: true },
      { text: `$${aVal * xVal}$`, isCorrect: false },
      { text: `$${2 * aVal * xVal}$`, isCorrect: false },
      { text: `$${aVal + xVal * xVal}$`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The function $f$ is defined by $f(x)=${aVal}x^2$. What is the value of $f(${xVal})$?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xVal} for $x$ gives $f(${xVal})=${aVal}(${xVal})^2 = ${aVal}(${xVal * xVal}) = ${result}$.`
    };
  }
};
