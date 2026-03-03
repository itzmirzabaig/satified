import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 5d93c782
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [3 and -40, factors -5 and 8]
 * - Difficulty factors: [Factoring quadratic trinomial]
 * - Distractor patterns: [A: wrong signs, C: reversed middle term, D: wrong pair]
 * - Constraints: [Must find factors of -40 that sum to 3]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_5d93c782 = {
  metadata: {
    // id: "5d93c782",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const r1 = getRandomInt(2, 5);
    const r2 = getRandomInt(6, 10);
    const sum = -r1 + r2;
    const product = -r1 * r2;

    const correctText = `$(x-${r1})(x+${r2})$`;

    const optionsData = [
      { text: `$(x-${r2})(x+${r1})$`, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: `$(x-${r2})(x+${r1})$`, isCorrect: false },
      { text: `$(x-${r1 + r2})(x+${1})$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is equivalent to $x^2+${sum}x${product}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Find factors of $${product}$ that add to $${sum}$: $-${r1}$ and $${r2}$. So $(x-${r1})(x+${r2})$.`
    };
  }
};

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