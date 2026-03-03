import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 2e379126
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 3-6, intercept: 5-10 negative, x: 5-10 negative]
 * - Difficulty factors: [Negative input evaluation]
 * - Distractor patterns: [arithmetic error, sign error, fractional format]
 * - Constraints: [Ensure negative input]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_2e379126 = {
  metadata: {
    // id: "2e379126",
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

    const distractor2 = result + slope;

    const distractor3 = Math.abs(result) / slope;

    const distractor4 = -result;

    const optionsData = [
      { text: result.toString(), isCorrect: true },
      { text: distractor2.toString(), isCorrect: false, reason: "results from an arithmetic error" },
      { text: `\\frac{${Math.abs(result)}}{${slope}}`, isCorrect: false, reason: "incorrectly formats as a fraction" },
      { text: distractor4.toString(), isCorrect: false, reason: "has a sign error" }
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
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$: $g(${xValue}) = ${slope}(${xValue}) - ${Math.abs(intercept)} = ${slope * xValue} - ${Math.abs(intercept)} = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 979b0b8d
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 20-50]
 * - Difficulty factors: [Slope-intercept from point and slope]
 * - Distractor patterns: [negative slope, reciprocal slope, slope as intercept]
 * - Constraints: [Passes through origin]
 * - Question type: [Find equation→Multiple Choice Text]
 * - Figure generation: null
 */

