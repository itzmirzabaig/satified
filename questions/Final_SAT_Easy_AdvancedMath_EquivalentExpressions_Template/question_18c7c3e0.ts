import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 18c7c3e0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 13, 7]
 * - Difficulty factors: [Subtracting like terms]
 * - Distractor patterns: [A: multiplies, C: adds, D: arbitrary]
 * - Constraints: [Simple subtraction]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_18c7c3e0 = {
  metadata: {
    // id: "18c7c3e0",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(10, 20);
    const b = getRandomInt(4, 9);
    const diff = a - b;

    const correctText = `$${diff}x^2$`;

    const optionsData = [
      { text: `-$${a * b}x^2$`, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: `$${a + b}x^2$`, isCorrect: false },
      { text: `$${a + b}x^{4}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is equivalent to $${a}x^2 - ${b}x^2$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Subtract coefficients: $${a}-${b}=${diff}$, keeping $x^2$ unchanged.`
    };
  }
};

/**
 * Question ID: 294db8ec
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 2, constant: 4]
 * - Difficulty factors: [Factoring out GCF from two terms]
 * - Distractor patterns: [A: factors out 4, B: factors out 4, C: factors out 2 but wrong inner term]
 * - Constraints: [GCF is 2]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */