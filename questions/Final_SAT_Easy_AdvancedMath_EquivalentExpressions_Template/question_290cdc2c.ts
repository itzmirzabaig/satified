import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 290cdc2c
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [denominator: 14]
 * - Difficulty factors: [Converting rational exponent to radical]
 * - Distractor patterns: [A: coefficient 1/14 multiplied, C: multiplied by 14, D: reciprocal exponent]
 * - Constraints: [Exponent is 1/n meaning nth root]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_290cdc2c = {
  metadata: {
    // id: "290cdc2c",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const n = getRandomInt(3, 20);

    const correctText = `$\\sqrt[${n}]{x}$`;

    const optionsData = [
      { text: `$\\frac{1}{${n}} \\cdot x$`, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: `$${n} \\cdot x$`, isCorrect: false },
      { text: `$(x)^{${n}}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is equivalent to $(x)^{\\frac{1}{${n}}}$, where $x>0$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The rule $x^{\\frac{1}{n}} = \\sqrt[${n}]{x}$ converts the rational exponent to the nth root.`
    };
  }
};

/**
 * Question ID: 499cb491
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 5, 50, GCF: 5]
 * - Difficulty factors: [Factoring GCF with two variables]
 * - Distractor patterns: [B: not dividing second coefficient by GCF, C,D: wrong GCF]
 * - Constraints: [GCF is 5x]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */