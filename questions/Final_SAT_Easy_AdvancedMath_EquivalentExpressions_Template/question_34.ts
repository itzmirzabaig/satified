import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 34
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1-5, constants: -6 to 8]
 * - Difficulty factors: [Combining like terms with linear expressions]
 * - Distractor patterns: [Sign errors on constants, treating first constant as negative]
 */

export const generator_34 = {
  metadata: {
    id: "34",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const b = getRandomInt(2, 5);
    const d = getRandomInt(-6, -2);
    // Guard: keep the combined constant nonzero so no option reads "+ 0".
    let c = getRandomInt(2, 8);
    let tries = 0;
    while (c + d === 0 && tries++ < 50) c = getRandomInt(2, 8);
    if (c + d === 0) c = 8; // d >= -6, so 8 + d >= 2: never zero

    const sumCoeff = 1 + b;
    const sumConst = c + d;       // nonzero by guard
    const diffConst = c - d;      // c + |d|, always >= 4 (positive)
    const dAbs = Math.abs(d);
    const resSign = sumConst >= 0 ? '+' : '-';
    const resAbs = Math.abs(sumConst);

    const fmt = (constant: number) =>
      `$${sumCoeff}x ${constant >= 0 ? '+' : '-'} ${Math.abs(constant)}$`;

    const correctText = fmt(sumConst);

    // The four constants sumConst, -sumConst, diffConst, -diffConst are
    // pairwise distinct for every draw: sumConst != 0 (guard), diffConst > 0,
    // sumConst = diffConst would need d = 0, sumConst = -diffConst would need
    // c = 0 — both impossible in the declared ranges. So no options collide.
    const optionsData = [
      { text: correctText, isCorrect: true, reason: '' },
      { text: fmt(-sumConst), isCorrect: false, reason: `reverses the sign of the combined constant` },
      { text: fmt(diffConst), isCorrect: false, reason: `treats the $-${dAbs}$ as $+${dAbs}$, giving $${c} + ${dAbs} = ${diffConst}$ instead of $${c} - ${dAbs} = ${sumConst}$` },
      { text: fmt(-diffConst), isCorrect: false, reason: `treats the $${c}$ as negative, giving $-${c} - ${dAbs} = -${diffConst}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectSentences = shuffledOptions
      .filter(opt => !opt.isCorrect)
      .map(opt => `Choice ${opt.letter} is incorrect; it ${opt.reason}.`)
      .join(' ');

    return {
      questionText: `$(x + ${c}) + (${b}x - ${dAbs})$

Which of the following is equivalent to the expression above?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Group the like terms: $(x + ${b}x) + (${c} - ${dAbs})$. The x-terms combine to $1x + ${b}x = ${sumCoeff}x$, and the constants combine to $${c} - ${dAbs} = ${sumConst}$. The resulting expression is $${sumCoeff}x ${resSign} ${resAbs}$. ${incorrectSentences}`
    };
  }
};
