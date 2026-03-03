import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 06fc1726
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coeffs: 2-5, constant: 1-5, x: 3-8]
 * - Difficulty factors: [Fraction function evaluation, order of operations]
 * - Distractor patterns: [wrong denominator, adding instead of subtracting, forgetting division]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_06fc1726 = {
  metadata: {
    // id: "06fc1726",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const numeratorCoeff = getRandomInt(2, 5);

    const constant = getRandomInt(1, 5);

    const denominator = getRandomInt(2, 5);

    const xValue = getRandomInt(3, 8);

    const numeratorValue = (numeratorCoeff * xValue) - constant;

    const result = numeratorValue / denominator;

    const distractor1 = numeratorValue / (denominator + 1);

    const distractor2 = (numeratorCoeff * xValue + constant) / denominator;

    const distractor3 = numeratorValue;

    const optionsData = [
      { text: result.toString(), isCorrect: true },
      { text: `\\frac{${Math.round(distractor1 * 10) / 10}}{3}`, isCorrect: false, reason: "results from an arithmetic error" },
      { text: `\\frac{${Math.round(distractor2)}}{3}`, isCorrect: false, reason: "results from adding instead of subtracting" },
      { text: distractor3.toString(), isCorrect: false, reason: "results from forgetting to divide" }
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
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$: $f(${xValue}) = \\frac{${numeratorCoeff}(${xValue}) - ${constant}}{${denominator}} = \\frac{${numeratorCoeff * xValue} - ${constant}}{${denominator}} = \\frac{${numeratorValue}}{${denominator}} = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 22802
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [rate: 10-25]
 * - Difficulty factors: [Interpreting linear model coefficient]
 * - Distractor patterns: [total distance, distance formula, reciprocal rate]
 * - Constraints: [None]
 * - Question type: [Interpretation→Multiple Choice Text]
 * - Figure generation: null
 */

