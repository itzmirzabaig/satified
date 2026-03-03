import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 8f82ad81
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 4, constant: 6]
 * - Difficulty factors: [Basic distribution]
 * - Distractor patterns: [B: adds instead of multiplies, C: forgets to distribute, D: subtracts or negative error]
 * - Constraints: [Simple integers]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_8f82ad81 = {
  metadata: {
    // id: "8f82ad81",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(2, 6);
    const b = getRandomInt(4, 10);
    const product = a * b;

    const correctText = `$${a}x^2+${product}$`;

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `$${a}x^2+${a + b}$`, isCorrect: false },
      { text: `$${a}x^2+${b}$`, isCorrect: false },
      { text: `$${a}x^2${(a - b) >= 0 ? '+' : ''}${a - b}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is equivalent to $${a}(x^2+${b})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Distribute $${a}$: $${a} \\cdot x^2 + ${a} \\cdot ${b} = ${a}x^2+${product}$.`
    };
  }
};

/**
 * Question ID: 9ed9f54d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2, 3]
 * - Difficulty factors: [Treating binomial as single unit or expanding then combining]
 * - Distractor patterns: [B: wrong sign, C: loses squared terms, D: loses linear terms]
 * - Constraints: [Must combine like coefficients of the binomial]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */