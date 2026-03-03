import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 70482e20
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 11, 5]
 * - Difficulty factors: [Subtracting like terms]
 * - Distractor patterns: [A: adding instead of subtracting, C: adding exponents, D: both errors]
 * - Constraints: [Same variable and exponent]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_70482e20 = {
  metadata: {
    // id: "70482e20",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(8, 15);
    const b = getRandomInt(3, 7);
    const diff = a - b;
    const sum = a + b;

    const correctText = `$${diff}x^{3}$`;

    const optionsData = [
      { text: `$${sum}x^{3}$`, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: `$${diff}x^{6}$`, isCorrect: false },
      { text: `$${sum}x^{6}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is equivalent to $${a}x^{3}-${b}x^{3}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Subtract coefficients: $${a}-${b}=${diff}$. Keep the variable part $x^{3}$ unchanged.`
    };
  }
};

/**
 * Question ID: 8452c42b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 50, 5]
 * - Difficulty factors: [Adding like terms]
 * - Distractor patterns: [A: multiplying, B: dividing, C: subtracting]
 * - Constraints: [Simple addition]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */