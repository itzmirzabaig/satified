import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 265
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 8-12, intercept: 5-10, x: 6-10]
 * - Difficulty factors: [Simple evaluation]
 * - Distractor patterns: [zero, input value, slope]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_265 = {
  metadata: {
    id: "265",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(8, 12);

    const intercept = getRandomInt(5, 10);

    // xValue and slope both act as distractors, so keep them distinct to avoid
    // duplicate options (their ranges overlap on 8-10). Bounded retry.
    let xValue = getRandomInt(6, 10);
    for (let tries = 0; xValue === slope && tries < 50; tries++) {
      xValue = getRandomInt(6, 10);
    }

    const result = slope * xValue + intercept;

    const optionsData = [
      { text: "0", isCorrect: false, reason: "is not the result of the function evaluation" },
      { text: xValue.toString(), isCorrect: false, reason: "is just the input value" },
      { text: slope.toString(), isCorrect: false, reason: "is the slope, not the result" },
      { text: result.toString(), isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $g$ is defined by $g(x) = ${slope}x + ${intercept}$. What is the value of $g(x)$ when $x = ${xValue}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$: $g(${xValue}) = ${slope}(${xValue}) + ${intercept} = ${slope * xValue} + ${intercept} = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
