import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

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

export const generator_81390d6c = {
  metadata: {
    // id: "81390d6c",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const intercept = getRandomInt(150, 250);

    const xValue = getRandomInt(40, 60);

    const result = xValue + intercept;

    const optionsData = [
      { text: intercept.toString(), isCorrect: false, reason: "is the constant term, not the result" },
      { text: result.toString(), isCorrect: true },
      { text: (xValue * intercept).toString(), isCorrect: false, reason: "multiplies instead of adding" },
      { text: (parseInt(xValue.toString() + intercept.toString())).toString(), isCorrect: false, reason: "concatenates digits instead of adding" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $h$ is defined by $h(x) = x + ${intercept}$. What is the value of $h(${xValue})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$: $h(${xValue}) = ${xValue} + ${intercept} = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 97eab129
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [ratio: 1.5-2.0, baseArea: 2000-3000]
 * - Difficulty factors: [Determining proportional relationship]
 * - Distractor patterns: [incorrect ratio, arbitrary coefficient, initial value as coefficient]
 * - Constraints: [Ensure proportional through origin]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

