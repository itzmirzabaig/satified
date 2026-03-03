import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: e312081b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1-5, constants: -6 to 8]
 * - Difficulty factors: [Combining like terms with linear expressions]
 * - Distractor patterns: [Sign errors on constants, treating first constant as negative]
 */

export const generator_e312081b = {
  metadata: {
    // id: "e312081b",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = 1;
    const b = getRandomInt(2, 5);
    const c = getRandomInt(2, 8);
    const d = getRandomInt(-6, -2);

    const sumCoeff = a + b;
    const sumConst = c + d;
    const dSign = d >= 0 ? "+" : "-";
    const dAbs = Math.abs(d);
    const resSign = sumConst >= 0 ? "+" : "-";
    const resAbs = Math.abs(sumConst);

    const correctText = `$${sumCoeff}x ${resSign} ${resAbs}$`;

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `$${sumCoeff}x - ${resAbs}$`, isCorrect: sumConst < 0 },
      { text: `$${sumCoeff}x + ${c + Math.abs(d)}$`, isCorrect: false },
      { text: `$${sumCoeff}x - ${c + Math.abs(d)}$`, isCorrect: false }
    ].filter((v, i, arr) => arr.findIndex(t => t.text === v.text) === i);

    while (optionsData.length < 4) {
      optionsData.push({ text: `$${sumCoeff}x + ${getRandomInt(10, 20)}$`, isCorrect: false });
    }

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `$(x + ${c}) + (${b}x ${dSign} ${dAbs})$

Which of the following is equivalent to the expression above?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Group and combine like terms:

$(x + ${b}x) + (${c} ${dSign} ${dAbs})$

$1x + ${b}x = ${sumCoeff}x$

$${c} ${dSign} ${dAbs} = ${sumConst}$

The resulting expression is $${sumCoeff}x ${resSign} ${resAbs}$.`
    };
  }
};

/**
 * Question ID: 075b29b0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 5-12, constants: -10 to 12]
 * - Difficulty factors: [Polynomial addition, combining like terms]
 * - Distractor patterns: [Adding exponents (x^6), incorrect coefficient grouping, sign errors]
 */