import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 4ac59df6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 8, 7 (implied 1)]
 * - Difficulty factors: [Multiplying variables, adding exponents]
 * - Distractor patterns: [B: missing z exponent, C: missing y exponent, D: adding coefficients]
 * - Constraints: [Must multiply coefficients]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_4ac59df6 = {
  metadata: {
    // id: "4ac59df6",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const c1 = getRandomInt(2, 9);
    const c2 = getRandomInt(2, 9);
    const coeff = c1 * c2;

    const correctText = `$${coeff}y^{2}z^{2}$`;

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `$${coeff}y^{2}z$`, isCorrect: false },
      { text: `$${coeff}yz$`, isCorrect: false },
      { text: `$${c1 + c2 + 1}yz$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is equivalent to $(${c1}yz)(y)(${c2}z)$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Multiply coefficients: $${c1} \\cdot ${c2} = ${coeff}$. Multiply $y \\cdot y = y^{2}$ and $z \\cdot z = z^{2}$.`
    };
  }
};

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