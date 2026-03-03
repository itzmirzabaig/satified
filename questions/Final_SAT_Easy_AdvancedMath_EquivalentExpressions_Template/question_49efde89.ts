import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 49efde89
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [a=7 from factored form]
 * - Difficulty factors: [Expanding factored form to find coefficient]
 * - Distractor patterns: [A: just uses 2 from 2x, B,C: random]
 * - Constraints: [Must expand correctly]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_49efde89 = {
  metadata: {
    // id: "49efde89",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const factor = getRandomInt(2, 5);
    const constTerm = getRandomInt(5, 10);
    const a = constTerm;

    const correctText = `$${constTerm}$`;

    const optionsData = [
      { text: `$${factor}$`, isCorrect: false },
      { text: `$${constTerm - 2}$`, isCorrect: false },
      { text: `$${constTerm + 2}$`, isCorrect: false },
      { text: correctText, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `The expression $${factor}x^{2} + ax$ is equivalent to $x(${factor}x + ${constTerm})$ for some constant $a$. What is the value of $a$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: constTerm.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Expanding $x(${factor}x + ${constTerm})$ gives $${factor}x^{2} + ${constTerm}x$. Therefore, $a = ${constTerm}$.`
    };
  }
};

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