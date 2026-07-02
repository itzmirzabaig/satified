import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 38
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [12, 5]
 * - Difficulty factors: [Subtracting like terms with x^3]
 * - Distractor patterns: [A: changes exponent, B: adds instead of subtracts, D: both errors]
 * - Constraints: [Keep exponent 3]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_38 = {
  metadata: {
    id: "38",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(10, 15);
    const b = getRandomInt(4, 9);
    const diff = a - b;

    const correctText = `$${diff}x^{3}$`;

    const optionsData = [
      { text: `$${diff}x^{6}$`, isCorrect: false },
      { text: `$${a + b}x^{3}$`, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: `$${a + b}x^{6}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is equivalent to $${a}x^3 - ${b}x^3$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. $${a}x^3-${b}x^3 = (${a}-${b})x^3 = ${diff}x^3$.`
    };
  }
};
