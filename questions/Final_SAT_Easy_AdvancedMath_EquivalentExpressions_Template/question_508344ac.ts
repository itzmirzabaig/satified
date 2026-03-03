import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 508344ac
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [16 and 15]
 * - Difficulty factors: [Distribution with larger numbers]
 * - Distractor patterns: [A: adds 16+15, C: arbitrary, D: doesn't distribute to 15]
 * - Constraints: [Must multiply 16*15]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_508344ac = {
  metadata: {
    // id: "508344ac",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(11, 20);
    const b = getRandomInt(10, 20);
    const product = a * b;

    const correctText = `$${a}x+${product}$`;

    const optionsData = [
      { text: `$${a}x+${a + b}$`, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: `$${a}x+1$`, isCorrect: false },
      { text: `$${a}x+${b}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is equivalent to $${a}(x+${b})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Distribute $${a}$: $${a} \\cdot x + ${a} \\cdot ${b} = ${a}x+${product}$.`
    };
  }
};

/**
 * Question ID: fd4b2aa0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [12, 5]
 * - Difficulty factors: [Subtracting like terms with x^3]
 * - Distractor patterns: [A: changes exponent, B: adds instead of subtracts, D: both errors]
 * - Constraints: [Keep exponent 3]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */