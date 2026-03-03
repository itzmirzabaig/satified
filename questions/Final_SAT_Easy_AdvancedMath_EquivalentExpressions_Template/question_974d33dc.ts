import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 974d33dc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [adding two trinomials]
 * - Difficulty factors: [Combining multiple like terms across polynomials]
 * - Distractor patterns: [A: adds exponents, B: wrong combination, C: doesn't combine all]
 * - Constraints: [Must combine r^3, r^2, r, and constants]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_974d33dc = {
  metadata: {
    // id: "974d33dc",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a1 = 1;
    const b1 = getRandomInt(4, 7);
    const const1 = getRandomInt(5, 9);
    const b2 = 1;
    const c2 = getRandomInt(6, 10);
    const const2 = getRandomInt(10, 15);

    const sumB = b1 + b2;
    const sumConst = const1 + const2;

    const correctText = `$r^3+${sumB}r^2+${c2}r+${sumConst}$`;

    const optionsData = [
      { text: `$r^5+${sumB + c2}r^3+${sumConst}$`, isCorrect: false },
      { text: `$${a1 + a1}r^3+${sumB + c2}r^2+${sumConst}$`, isCorrect: false },
      { text: `$r^3+${b1}r^2+${c2}r+${const2}$`, isCorrect: false },
      { text: correctText, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which of the following expressions is equivalent to the sum of $(r^3+${b1}r^2+${const1})$ and $(r^2+${c2}r+${const2})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Add like terms: $r^3 + (${b1}+1)r^2 + ${c2}r + (${const1}+${const2}) = r^3+${sumB}r^2+${c2}r+${sumConst}$.`
    };
  }
};

/**
 * Question ID: d4d513ff
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [12 and 27, GCF is 3]
 * - Difficulty factors: [Basic GCF factoring]
 * - Distractor patterns: [A,B: wrong GCFs, D: arithmetic error]
 * - Constraints: [3 is GCF]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */