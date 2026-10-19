import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 253
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [intercept: 150-250, x: 40-60]
 * - Difficulty factors: [Simple evaluation]
 * - Distractor patterns: [constant only, multiplied, subtracted]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_253 = {
  metadata: {
    id: "253",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const intercept = getRandomInt(150, 250);

    const xValue = getRandomInt(40, 60);

    const result = xValue + intercept;

    const fmt = (n: number) => n.toLocaleString('en-US');

    // The old fourth choice glued the digits together (55 and 206 gave 55206).
    // It is now the result of subtracting x from the constant. All four values
    // differ: 206 - 55 < 206 < 261 < 55 * 206.
    const optionsData = [
      { text: fmt(intercept), isCorrect: false, reason: `${intercept} is the value of $h(0)$; it leaves out the ${xValue} that is substituted for $x$` },
      { text: fmt(result), isCorrect: true, reason: '' },
      { text: fmt(xValue * intercept), isCorrect: false, reason: `it results from multiplying ${xValue} by ${intercept} instead of adding them` },
      { text: fmt(intercept - xValue), isCorrect: false, reason: `it results from subtracting ${xValue} from ${intercept} instead of adding them` }
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
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$ in the given function yields $h(${xValue}) = ${xValue} + ${intercept}$, or $h(${xValue}) = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
