import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 0eae6be1
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [difference: 30-100]
 * - Difficulty factors: [Translating word problem to equation]
 * - Distractor patterns: [addition, division, multiplication]
 * - Constraints: [None]
 * - Question type: [Modeling→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_0eae6be1 = {
  metadata: {
    // id: "0eae6be1",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const difference = getRandomInt(30, 100);

    const optionA = `y = x + ${difference}`;

    const optionB = `y = \\frac{1}{${difference}}x`;

    const optionC = `y = ${difference}x`;

    const optionD = `y = x - ${difference}`;

    const optionsData = [
      { text: optionA, isCorrect: false, reason: "represents 'y is more than x', not less" },
      { text: optionB, isCorrect: false, reason: "represents a division relationship" },
      { text: optionC, isCorrect: false, reason: "represents a multiplication relationship" },
      { text: optionD, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The number $y$ is $${difference}$ less than the number $x$. Which equation represents the relationship between $x$ and $y$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: optionD,
      explanation: `Choice ${correctOption.letter} is correct. If $y$ is $${difference}$ less than $x$, then $y = x - ${difference}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 361f97c7
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-6, intercept: 1-5 negative, x: 8-15]
 * - Difficulty factors: [Function evaluation with negative intercept]
 * - Distractor patterns: [sign error, forgot intercept, added intercept]
 * - Constraints: [Ensure negative intercept]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

