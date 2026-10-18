import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 217
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [difference: 30-100]
 * - Difficulty factors: [Translating word problem to equation]
 * - Distractor patterns: [addition, division, multiplication]
 * - Constraints: [None]
 * - Question type: [Modeling→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_217 = {
  metadata: {
    id: "217",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const difference = getRandomInt(30, 100);

    // All choices typeset (only the fraction choice was, so the others showed
    // as plain text like "y = x - 83")
    const optionA = `$y = x + ${difference}$`;

    const optionB = `$y = \\frac{1}{${difference}}x$`;

    const optionC = `$y = ${difference}x$`;

    const optionD = `$y = x - ${difference}$`;

    const optionsData = [
      { text: optionA, isCorrect: false, reason: `represents $y$ being ${difference} more than $x$, not ${difference} less` },
      { text: optionB, isCorrect: false, reason: `represents $y$ being $x$ divided by ${difference}` },
      { text: optionC, isCorrect: false, reason: `represents $y$ being ${difference} times $x$` },
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
