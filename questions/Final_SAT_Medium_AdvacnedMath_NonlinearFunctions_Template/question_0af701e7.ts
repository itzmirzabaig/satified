import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 0af701e7
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coeff1: 1-3, coeff2: 3-6, testValue: 4-8]
 * - Difficulty factors: [Simplifying absolute value and solving]
 * - Constraints: [Absolute value properties]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_0af701e7 = {
  metadata: {
    // id: "0af701e7",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Generate random coefficients
    const coeff1 = getRandomInt(1, 3);
    const coeff2 = getRandomInt(3, 6);
    const simplifiedCoeff = Math.abs(coeff1 - coeff2);

    const testValue = getRandomInt(4, 8);
    const resultAtTest = simplifiedCoeff * testValue;
    const targetDifference = -getRandomInt(10, 20);
    const targetValue = resultAtTest - targetDifference;
    const answerValue = targetValue / simplifiedCoeff;

    const questionText = `The function $f$ is defined by $f(x) = |${coeff1}x - ${coeff2}x|$. What value of $a$ satisfies $f(${testValue}) - f(a) = ${targetDifference}$?`;

    const correctAnswer = answerValue.toString();

    const optionsData = [
      { text: (-answerValue - 10).toString(), isCorrect: false, reason: "makes sign error in calculation" },
      { text: testValue.toString(), isCorrect: false, reason: "uses the test value instead of solving" },
      { text: answerValue.toString(), isCorrect: true },
      { text: (answerValue + 20).toString(), isCorrect: false, reason: "adds instead of subtracts in equation setup" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    return {
      questionText,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${correctAnswer}$`,
      explanation: `Choice ${correctLetter} is correct. First, simplify: $f(x) = |${coeff1}x - ${coeff2}x| = |-${simplifiedCoeff}x| = ${simplifiedCoeff}|x|$. Then $f(${testValue}) = ${simplifiedCoeff}(${testValue}) = ${resultAtTest}$. Solve ${resultAtTest} - f(a) = ${targetDifference}$, so $f(a) = ${targetValue}$. Thus ${simplifiedCoeff}|a| = ${targetValue}$, so $|a| = ${answerValue}$, giving $a = \pm${answerValue}$. Of these, ${answerValue} is an option.`
    };
  }
};

/**
 * Question ID: 4209aefe
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Quadratic function evaluation
 * - Number ranges: [f(x) = x² + k]
 * - Difficulty: Medium
 */
