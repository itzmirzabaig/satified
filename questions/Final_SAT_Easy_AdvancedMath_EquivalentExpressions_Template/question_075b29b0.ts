import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 075b29b0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 5-12, constants: -10 to 12]
 * - Difficulty factors: [Polynomial addition, combining like terms]
 * - Distractor patterns: [Adding exponents (x^6), incorrect coefficient grouping, sign errors]
 */

export const generator_075b29b0 = {
  metadata: {
    // id: "075b29b0",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a1 = getRandomInt(5, 12);
    const a2 = getRandomInt(4, 9);
    const b2 = getRandomInt(3, 7);
    const c1 = getRandomInt(3, 8);
    const const1 = getRandomInt(5, 10);
    const const2 = getRandomInt(-10, -3);

    const sumA = a1 + a2;
    const sumConst = const1 + const2;
    const const2Sign = const2 >= 0 ? "+" : "-";
    const const2Abs = Math.abs(const2);
    const resConstSign = sumConst >= 0 ? "+" : "-";
    const resConstAbs = Math.abs(sumConst);

    const correctText = `$${sumA}x^{3} + ${b2}x^{2} + ${c1}x ${resConstSign} ${resConstAbs}$`;

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `$${sumA}x^{6} + ${b2}x^{2} + ${c1}x ${resConstSign} ${resConstAbs}$`, isCorrect: false },
      { text: `$${sumA}x^{3} + ${b2 + c1}x^{2} ${resConstSign} ${resConstAbs}$`, isCorrect: false },
      { text: `$${sumA}x^{3} + ${b2}x^{2} + ${c1}x + ${const1 + Math.abs(const2)}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is equivalent to $( ${a1}x^{3} + ${c1}x + ${const1} ) + ( ${a2}x^{3} + ${b2}x^{2} ${const2Sign} ${const2Abs} )$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. To simplify the expression, combine like terms by grouping the same powers of $x$:

$x^3$ terms: $(${a1}x^3 + ${a2}x^3) = ${sumA}x^3$
$x^2$ terms: $${b2}x^2$
$x$ terms: $${c1}x$
Constants: $(${const1} ${const2Sign} ${const2Abs}) = ${sumConst}$

Combining these results yields $${sumA}x^3 + ${b2}x^2 + ${c1}x ${resConstSign} ${resConstAbs}$.`
    };
  }
};

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