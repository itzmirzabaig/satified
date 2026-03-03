import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 60fdb4d4
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2, -4, -3, 2, -7]
 * - Difficulty factors: [Distributing negative sign, combining like terms]
 * - Distractor patterns: [B: wrong sign on middle term, C: adding x^2 terms wrong, D: wrong signs throughout]
 * - Constraints: [Careful with negatives]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_60fdb4d4 = {
  metadata: {
    // id: "60fdb4d4",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(2, 4);
    const b = getRandomInt(-5, -2);
    const c2 = -getRandomInt(2, 4);
    const d2 = getRandomInt(2, 4);
    const e2 = -getRandomInt(5, 9);

    const x2Coeff = a - c2;
    const xCoeff = -d2;
    const constTerm = b - e2;

    const correctText = `$${x2Coeff}x^2${xCoeff >= 0 ? '+' : ''}${xCoeff}x${constTerm >= 0 ? '+' : ''}${constTerm}$`;

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `$${x2Coeff}x^2+${d2}x${constTerm >= 0 ? '+' : ''}${constTerm}$`, isCorrect: false },
      { text: `$${a + c2}x^2${xCoeff >= 0 ? '+' : ''}${xCoeff}x${constTerm >= 0 ? '+' : ''}${constTerm}$`, isCorrect: false },
      { text: `$${a + c2}x^2+${d2}x${b + e2 >= 0 ? '+' : ''}${b + e2}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is equivalent to $(${a}x^2 ${b}) - (${c2}x^2 + ${d2}x ${e2})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Distribute the negative sign: $${a}x^2 ${b} ${-c2}x^2 - ${d2}x ${-e2}$. Combine like terms: $(${a} ${-c2})x^2 - ${d2}x + (${b} ${-e2}) = ${correctText.replace(/\$/g, '')}$.`
    };
  }
};

/**
 * Question ID: 4a5af623
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2, 38, 10, all divisible by 2]
 * - Difficulty factors: [Finding GCF of expression]
 * - Distractor patterns: [B: 5x (not factor of all), C: 38x (not factor of all), D: 2x^2 (not factor of last term)]
 * - Constraints: [Must identify that 2 is the only common factor of all coefficients, x is not in last term]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */