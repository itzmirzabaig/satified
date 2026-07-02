import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 19, constant: 7]
 * - Difficulty factors: [Distributing multiplication over subtraction]
 * - Distractor patterns: [B: adds 19+7, C: forgets to distribute to second term, D: subtracts 19-7]
 * - Constraints: [Multiplication]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1 = {
  metadata: {
    id: "1",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(11, 25);
    const b = getRandomInt(5, 12);
    const product = a * b;

    const correctText = `$${a}x^2-${product}$`;

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `$${a}x^2-${a + b}$`, isCorrect: false },
      { text: `$${a}x^2-${b}$`, isCorrect: false },
      { text: `$${a}x^2-${a - b}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is equivalent to $${a}\\left(x^2-${b}\\right)$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Distribute $${a}$ to both terms: $${a} \\cdot x^2 - ${a} \\cdot ${b} = ${a}x^2-${product}$.`
    };
  }
};
