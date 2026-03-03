import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: f9a3e7c1
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [exponents: 2-5, coefficients: 2-4, variable combinations]
 * - Difficulty factors: [Exponent rules, power of a product, power of a power, combining exponents]
 * - Distractor patterns: [Adding instead of multiplying exponents, mishandling coefficients, forgetting to distribute outer exponent]
 * - Constraints: [Must use power of a power rule: (a^m)^n = a^(mn), clean integer results]
 * - Question type: [Exponent simplification→Multiple Choice Text]
 * - Figure generation: [None - exponent manipulation]
 */

export const generator_f9a3e7c1 = {
  metadata: {
    // id: "f9a3e7c1",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate base expression: (a * x^m * y^n)^p
    const coeff = getRandomInt(2, 4);      // Inner coefficient
    const xExp = getRandomInt(1, 3);       // Inner x exponent
    const yExp = getRandomInt(1, 2);       // Inner y exponent
    const outerExp = getRandomInt(2, 3);   // Outer exponent (power)
    
    // STEP 2: Calculate resulting exponents
    const resultCoeff = Math.pow(coeff, outerExp);  // coefficient^outerExp
    const resultXExp = xExp * outerExp;             // Multiply exponents
    const resultYExp = yExp * outerExp;             // Multiply exponents
    
    // STEP 3: Format expressions
    const innerX = xExp === 1 ? 'x' : `x^{${xExp}}`;
    const innerY = yExp === 1 ? 'y' : `y^{${yExp}}`;
    const originalExpr = `(${coeff}${innerX}${innerY})^{${outerExp}}`;
    
    const resultX = resultXExp === 1 ? 'x' : `x^{${resultXExp}}`;
    const resultY = resultYExp === 1 ? 'y' : `y^{${resultYExp}}`;
    const correctAnswer = `${resultCoeff}${resultX}${resultY}`;
    
    // STEP 4: Generate distractors
    
    // Distractor A: Adds exponents instead of multiplying (common error)
    const wrongXExpA = xExp + outerExp;
    const wrongYExpA = yExp + outerExp;
    const wrongXA = wrongXExpA === 1 ? 'x' : `x^{${wrongXExpA}}`;
    const wrongYA = wrongYExpA === 1 ? 'y' : `y^{${wrongYExpA}}`;
    const distractorA = `${coeff * outerExp}${wrongXA}${wrongYA}`;  // Also wrong coeff
    
    // Distractor B: Only applies outer exponent to variables, not coefficient
    const distractorB = `${coeff}${resultX}${resultY}`;
    
    // Distractor C: Multiplies coefficient by outer exp but keeps inner exponents
    const distractorC = `${coeff * outerExp}${innerX}${innerY}`;
    
    // Create options
    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "results from adding exponents instead of multiplying them, and incorrectly calculates the coefficient" },
      { text: correctAnswer, isCorrect: true },
      { text: distractorB, isCorrect: false, reason: "fails to raise the coefficient to the outer power" },
      { text: distractorC, isCorrect: false, reason: "multiplies the coefficient by the outer exponent but fails to multiply the variable exponents" }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 6: Build explanation
    const explanation = `Choice ${correctLetter} is correct. Using the power of a product rule and power of a power rule:\n\n$$(${coeff}${innerX}${innerY})^{${outerExp}} = (${coeff})^{${outerExp}} \\cdot (${innerX})^{${outerExp}} \\cdot (${innerY})^{${outerExp}} = ${resultCoeff} \\cdot ${resultX} \\cdot ${resultY} = ${correctAnswer}$$\n\nChoice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `Which of the following is equivalent to $${originalExpr}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};

/**
 * Question ID: b2d5e8f3
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radical expressions with perfect square radicands, coefficients 2-5]
 * - Difficulty factors: [Simplifying radicals, combining like radical terms, recognizing perfect squares]
 * - Distractor patterns: [Adding radicands instead of coefficients, not simplifying radicals, incorrect perfect square recognition]
 * - Constraints: [Must simplify to a√b + c√b = (a+c)√b form, radicands must be perfect squares times square-free]
 * - Question type: [Radical simplification→Multiple Choice Text]
 * - Figure generation: [None - radical manipulation]
 */