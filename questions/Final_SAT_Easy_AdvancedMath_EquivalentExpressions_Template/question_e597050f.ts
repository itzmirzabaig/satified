import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: e597050f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [9, 6, 2, 3]
 * - Difficulty factors: [Combining multiple like terms x and y]
 * - Distractor patterns: [A: wrong x coefficient, B: wrong y coefficient, C: arbitrary addition]
 * - Constraints: [Two pairs of like terms]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_e597050f = {
  metadata: {
    // id: "e597050f",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a1 = getRandomInt(5, 12);
    const a2 = getRandomInt(4, 9);
    const b1 = getRandomInt(2, 5);
    const b2 = getRandomInt(3, 6);

    const sumA = a1 + a2;
    const sumB = b1 + b2;

    const correctText = `$${sumA}x+${sumB}y$`;

    const optionsData = [
      { text: `$${a1 - a2}x+${sumB}y$`, isCorrect: false },
      { text: `$${sumA}x+${b1 + b2 + 3}y$`, isCorrect: false },
      { text: `$${a1 + a2 + b1 + b2}x^{5}$`, isCorrect: false },
      { text: correctText, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is equivalent to $${a1}x + ${a2}x + ${b1}y + ${b2}y$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Combine $x$ terms: $${a1}+${a2}=${sumA}$. Combine $y$ terms: $${b1}+${b2}=${sumB}$.`
    };
  }
};

/**
 * Question ID: 5dd53f73
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [34 both, GCF is 34]
 * - Difficulty factors: [Recognizing common binomial factor]
 * - Distractor patterns: [A: multiplies as 34xy, C/D: combine unlike terms]
 * - Constraints: [Simple factoring]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */