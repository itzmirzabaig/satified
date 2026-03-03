import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 67e866b5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 9, 7, 9]
 * - Difficulty factors: [Combining multiple like terms]
 * - Distractor patterns: [A: multiplying, B: wrong x coefficient, C: adding all coefficients]
 * - Constraints: [Keep x^2 and x separate]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_67e866b5 = {
  metadata: {
    // id: "67e866b5",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(5, 12);
    const b = getRandomInt(4, 9);
    const c = getRandomInt(5, 12);
    const sumSq = a + b;

    const correctText = `$${sumSq}x^{2}+${c}x$`;

    const optionsData = [
      { text: `$${a * b}x^{4}+${c}x$`, isCorrect: false },
      { text: `$${sumSq}x^{2}+${c + getRandomInt(1,3)}x$`, isCorrect: false },
      { text: `$${a + b + c}x^{5}$`, isCorrect: false },
      { text: correctText, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is equivalent to $${a}x^2 + ${b}x^2 + ${c}x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Combine $x^2$ terms: $(${a}+${b})x^2 = ${sumSq}x^2$. The $${c}x$ term remains unchanged.`
    };
  }
};

/**
 * Question ID: fd65f47f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2, 1, 1, 6]
 * - Difficulty factors: [Subtracting polynomials carefully]
 * - Distractor patterns: [A: keeps 2x^2 only, B: wrong middle term sign, C: wrong constant]
 * - Constraints: [Sign handling]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */