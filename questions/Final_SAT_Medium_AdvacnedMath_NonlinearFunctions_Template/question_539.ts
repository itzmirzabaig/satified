import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 539
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coeff1: 1-3, coeff2: 3-6, testValue: 4-8]
 * - Difficulty factors: [Simplifying absolute value and solving]
 * - Constraints: [Absolute value properties]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_539 = {
  metadata: {
    id: "539",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // f(x) = |coeff1*x - coeff2*x| simplifies to (coeff2 - coeff1)|x|.
    // Force coeff2 >= coeff1 + 2 so the simplified coefficient is at least 2:
    // nonzero (no division by zero) and large enough that the f(a)-value
    // distractor below can never equal the correct answer.
    const coeff1 = getRandomInt(1, 3);
    const coeff2 = getRandomInt(coeff1 + 2, 6);
    const simplifiedCoeff = coeff2 - coeff1;

    const testValue = getRandomInt(4, 8);
    // Answer-first construction: a = testValue + delta keeps every derived
    // value an integer, and delta <= testValue - 1 keeps the sign-error
    // distractor (testValue - delta) positive.
    const delta = getRandomInt(2, Math.min(5, testValue - 1));
    const answerValue = testValue + delta;
    const resultAtTest = simplifiedCoeff * testValue;
    const targetValue = simplifiedCoeff * answerValue;
    const targetDifference = resultAtTest - targetValue;

    const coeff1Text = coeff1 === 1 ? '' : String(coeff1);

    const questionText = `The function $f$ is defined by $f(x) = |${coeff1Text}x - ${coeff2}x|$. What is the positive value of $a$ for which $f(${testValue}) - f(a) = ${targetDifference}$?`;

    const correctAnswer = answerValue.toString();

    // All four values are distinct for every draw: answerValue = testValue + delta
    // with delta >= 2; targetValue = simplifiedCoeff * answerValue >= 2 * answerValue;
    // testValue - delta <= testValue - 2 < testValue < answerValue < targetValue.
    const optionsData = [
      { text: (testValue - delta).toString(), isCorrect: false, reason: `results from a sign error that leads to solving $f(a) = ${resultAtTest} + (${targetDifference})$ instead of $f(a) = ${resultAtTest} - (${targetDifference})$` },
      { text: testValue.toString(), isCorrect: false, reason: `is the input value ${testValue} given in the question, not the solution for $a$` },
      { text: answerValue.toString(), isCorrect: true, reason: "" },
      { text: targetValue.toString(), isCorrect: false, reason: `is the value of $f(a)$, not the value of $a$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer,
      explanation: `Choice ${correctLetter} is correct. Combining like terms inside the absolute value gives $f(x) = |${coeff1Text}x - ${coeff2}x| = |-${simplifiedCoeff}x| = ${simplifiedCoeff}|x|$. Then $f(${testValue}) = ${simplifiedCoeff} \\cdot ${testValue} = ${resultAtTest}$. Substituting into $f(${testValue}) - f(a) = ${targetDifference}$ gives $f(a) = ${resultAtTest} - (${targetDifference}) = ${targetValue}$. Since $f(a) = ${simplifiedCoeff}|a|$, it follows that $|a| = ${answerValue}$, so $a = ${answerValue}$ or $a = -${answerValue}$. The positive value of $a$ is ${answerValue}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
