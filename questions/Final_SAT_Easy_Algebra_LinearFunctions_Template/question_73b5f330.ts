import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 73b5f330
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 4-8, intercept: 5-12, result: calculated]
 * - Difficulty factors: [Solving for input given output]
 * - Distractor patterns: [calculation error, subtracting slope]
 * - Constraints: [Ensure clean result]
 * - Question type: [Solve for x→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_73b5f330 = {
  metadata: {
    // id: "73b5f330",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(4, 8);

    const intercept = getRandomInt(5, 12);

    const xValue = getRandomInt(8, 12);

    const result = slope * xValue + intercept;

    const optionsData = [
      { text: xValue.toString(), isCorrect: true },
      { text: (xValue + 3).toString(), isCorrect: false, reason: "results from a calculation error" },
      { text: (result - slope).toString(), isCorrect: false, reason: "subtracts slope instead of solving correctly" },
      { text: (result * slope).toString(), isCorrect: false, reason: "multiplies instead of dividing" }
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
      explanation: `Choice ${correctOption.letter} is correct. Setting $f(x) = ${result}$: ${result} = ${slope}x + ${intercept}$. Subtracting ${intercept} gives ${result - intercept} = ${slope}x$. Dividing by ${slope} yields $x = ${xValue}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 81390d6c
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [intercept: 150-250, x: 40-60]
 * - Difficulty factors: [Simple evaluation]
 * - Distractor patterns: [intercept value, multiplied values, concatenated digits]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

