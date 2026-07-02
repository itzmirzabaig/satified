import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 3
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 20, 4, 3]
 * - Difficulty factors: [Distributing negative, combining like terms]
 * - Distractor patterns: [A: 10w (wrong arithmetic), C: 19w (forgets to distribute negative to 3w), D: 21w (ignores subtraction)]
 * - Constraints: [Must simplify inside parentheses first]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_3 = {
  metadata: {
    id: "3",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(15, 25);
    const b = getRandomInt(3, 6);
    const c = getRandomInt(2, 5);
    const innerSum = b + c;
    const result = a - innerSum;

    const correctText = `$${result}w$`;

    const optionsData = [
      { text: `$${a - b - c - getRandomInt(1,3)}w$`, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: `$${a - b + c}w$`, isCorrect: false },
      { text: `$${a + b - c}w$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is equivalent to $${a}w - (${b}w + ${c}w)$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. First simplify inside parentheses: $${b}w+${c}w=${innerSum}w$. Then subtract: $${a}w-${innerSum}w=${result}w$.`
    };
  }
};
