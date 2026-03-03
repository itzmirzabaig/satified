import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: fe6f9678
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [intercept: 15-25]
 * - Difficulty factors: [Identifying constant function]
 * - Distractor patterns: [reciprocal constant, unitary constant, doubled constant]
 * - Constraints: [Slope is zero]
 * - Question type: [Find equation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_fe6f9678 = {
  metadata: {
    // id: "fe6f9678",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const intercept = getRandomInt(15, 25);

    const correctEquation = `f(x) = ${intercept}`;

    const distractorA = `f(x) = \\frac{1}{${intercept}}`;

    const distractorB = `f(x) = 1`;

    const distractorD = `f(x) = ${2 * intercept}`;

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "is a constant function with an incorrect value" },
      { text: distractorB, isCorrect: false, reason: "is a constant function with wrong value" },
      { text: correctEquation, isCorrect: true },
      { text: distractorD, isCorrect: false, reason: "doubles the correct constant" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `For the linear function $f$, $f(0) = ${intercept}$ and $f(1) = ${intercept}$. Which equation defines $f$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctOption.letter} is correct. Since $f(0) = ${intercept}$ and $f(1) = ${intercept}$, the function has slope $m = \\frac{${intercept} - ${intercept}}{1 - 0} = 0$ and y-intercept $b = ${intercept}$, giving $f(x) = ${intercept}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: bc638f2d
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [growthRate: 10-20, initialLength: 5-15]
 * - Difficulty factors: [Interpreting y-intercept]
 * - Distractor patterns: [time period, growth rate monthly, maximum length]
 * - Constraints: [None]
 * - Question type: [Interpretation→Multiple Choice Text]
 * - Figure generation: null
 */

