import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 0536ad4f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 20, 4, 3]
 * - Difficulty factors: [Distributing negative, combining like terms]
 * - Distractor patterns: [A: 10w (wrong arithmetic), C: 19w (forgets to distribute negative to 3w), D: 21w (ignores subtraction)]
 * - Constraints: [Must simplify inside parentheses first]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_0536ad4f = {
  metadata: {
    // id: "0536ad4f",
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

/**
 * Question ID: 1d3fee25
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 3, constant: 5, subtract: 6]
 * - Difficulty factors: [Distribution, then subtraction]
 * - Distractor patterns: [A: 3x-3 (forgets to distribute 3 to 5), B: 3x-1 (wrong), D: 15x-6 (multiplies 3 and 5 and attaches x)]
 * - Constraints: [Order of operations]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */