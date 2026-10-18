import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 212
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coeffs: 2-5, constant: 1-5, x: 3-8]
 * - Difficulty factors: [Fraction function evaluation, order of operations]
 * - Distractor patterns: [wrong denominator, adding instead of subtracting, forgetting division]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 *
 * Answer-first construction: pick coeff a, x, and denominator d, then choose the
 * constant c so that (a*x - c) is positive and exactly divisible by d. This makes
 * the value of f(x) a clean integer for every draw (no float artifacts) while
 * keeping a, c, d, and x as natural displayed numbers. Distractors are built on
 * the stated themes (forgetting to divide, wrong denominator, adding instead of
 * subtracting) with arithmetic-slip fillers, then de-duplicated so no two options
 * ever collide.
 */

export const generator_212 = {
  metadata: {
    id: "212",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // The constant is a multiple of the denominator and the denominator divides
    // numeratorCoeff * xValue, so all three errors below give whole numbers
    // (the old version usually fell back to "arithmetic error" fillers like
    // result + 1 and result - 1). Redraw until the four choices are positive
    // and distinct.
    let numeratorCoeff = 2, xValue = 3, denominator = 2, constant = 2;
    let numeratorValue = 0, result = 0, values: number[] = [];
    do {
      numeratorCoeff = getRandomInt(2, 5);
      xValue = getRandomInt(3, 8);
      denominator = getRandomInt(2, 5);
      constant = denominator * (2 * denominator <= 5 ? getRandomInt(1, 2) : 1);
      numeratorValue = numeratorCoeff * xValue - constant;
      result = numeratorValue / denominator;
      values = [
        result,
        numeratorValue,                                            // forgot to divide
        (numeratorCoeff * xValue + constant) / denominator,       // added the constant
        (numeratorCoeff * xValue) / denominator - constant        // divided only the x term
      ];
    } while (
      numeratorCoeff % denominator === 0 || denominator % numeratorCoeff === 0 || // keeps the fraction from simplifying, e.g. (2x - 2)/2
      (numeratorCoeff * xValue) % denominator !== 0 ||
      values.some(v => !Number.isInteger(v) || v <= 0) || new Set(values).size < 4
    );

    const ax = numeratorCoeff * xValue;
    const optionsData = [
      { text: result.toString(), isCorrect: true, reason: "" },
      { text: values[1].toString(), isCorrect: false, reason: `is the value of the numerator, $${ax} - ${constant}$; it must still be divided by ${denominator}` },
      { text: values[2].toString(), isCorrect: false, reason: `results from adding ${constant} to ${ax} instead of subtracting it` },
      { text: values[3].toString(), isCorrect: false, reason: `results from dividing only ${ax} by ${denominator} and then subtracting ${constant}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `If $f$ is the function defined by $f(x) = \\frac{${numeratorCoeff}x - ${constant}}{${denominator}}$, what is the value of $f(${xValue})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$ gives $f(${xValue}) = \\frac{${numeratorCoeff}(${xValue}) - ${constant}}{${denominator}} = \\frac{${numeratorCoeff * xValue} - ${constant}}{${denominator}} = \\frac{${numeratorValue}}{${denominator}} = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because it ${o.reason}.`).join(' ')}`
    };
  }
};
