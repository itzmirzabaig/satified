import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 12345
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-5, intercept: 5-10 negative, x: -2]
 * - Difficulty factors: [Evaluation with negative input]
 * - Distractor patterns: [arithmetic error, sign error, addition instead of multiplication]
 * - Constraints: [Ensure negative input]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_12345 = {
  metadata: {
    // id: "12345",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(2, 5);

    const intercept = -getRandomInt(5, 10);

    const xValue = -2;

    const result = slope * xValue + intercept;

    const distractor2 = result + slope;

    const distractor3 = -result;

    const distractor4 = slope + intercept;

    const optionsData = [
      { text: result.toString(), isCorrect: true },
      { text: distractor2.toString(), isCorrect: false, reason: "results from an arithmetic error" },
      { text: distractor3.toString(), isCorrect: false, reason: "has a sign error" },
      { text: distractor4.toString(), isCorrect: false, reason: "adds instead of multiplying" }
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
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$: $h(${xValue}) = ${slope}(${xValue}) - ${Math.abs(intercept)} = ${slope * xValue} - ${Math.abs(intercept)} = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: a9039591
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-5, intercept: 25-35]
 * - Difficulty factors: [Modeling from table]
 * - Distractor patterns: [swapped m and b, incorrect slope, incorrect values]
 * - Constraints: [None]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

