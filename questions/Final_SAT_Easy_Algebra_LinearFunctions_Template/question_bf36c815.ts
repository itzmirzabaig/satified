import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: bf36c815
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: non-zero, intercept: 5-15]
 * - Difficulty factors: [Evaluating at zero - y-intercept]
 * - Distractor patterns: [sign error, input value, half value]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_bf36c815 = {
  metadata: {
    // id: "bf36c815",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(-3, 3, );

    const intercept = getRandomInt(5, 15);

    const distractor1 = -intercept;

    const distractor2 = 0;

    const distractor3 = Math.floor(intercept / 2);

    const optionsData = [
      { text: distractor1.toString(), isCorrect: false, reason: "results from a sign error" },
      { text: distractor2.toString(), isCorrect: false, reason: "is the input value, not the output" },
      { text: distractor3.toString(), isCorrect: false, reason: "is approximately half the correct value" },
      { text: intercept.toString(), isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $g$ is defined by $g(x) = ${slope === 1 ? '' : slope === -1 ? '-' : slope}x + ${intercept}$. What is the value of $g(0)$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: intercept.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting 0 for $x$: $g(0) = ${slope}(0) + ${intercept} = ${intercept}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 0d391910
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coeff: 2-6, answer: 2-8]
 * - Difficulty factors: [Solving for input given output]
 * - Constraints: [Clean division]
 * - Question type: [Solve for x→Fill in blank]
 * - Figure generation: null
 */

