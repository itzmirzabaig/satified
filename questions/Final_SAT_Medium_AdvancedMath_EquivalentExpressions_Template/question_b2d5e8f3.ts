import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

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

export const generator_b2d5e8f3 = {
  metadata: {
    // id: "b2d5e8f3",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate square root terms that can be combined
    // Format: a√(b²c) + d√(e²c) = ab√c + de√c = (ab + de)√c
    const a = getRandomInt(2, 5);   // Coefficient of first term
    const b = getRandomInt(2, 4);   // Perfect square part inside first radical
    const d = getRandomInt(2, 5);   // Coefficient of second term
    const e = getRandomInt(2, 4);   // Perfect square part inside second radical
    
    // Ensure c is not a perfect square
    const nonSquares = [2, 3, 5, 6, 7, 10, 11, 13, 14, 15];
    const cFinal = getRandomElement(nonSquares);
    
    // STEP 2: Calculate radicands and simplified form
    const radicand1 = b * b * cFinal;  // b²c
    const radicand2 = e * e * cFinal;  // e²c
    
    const simplifiedCoeff1 = a * b;    // a√(b²c) = ab√c
    const simplifiedCoeff2 = d * e;    // d√(e²c) = de√c
    
    const finalCoeff = simplifiedCoeff1 + simplifiedCoeff2;
    
    // STEP 3: Format expressions
    const term1 = `${a}\\sqrt{${radicand1}}`;
    const term2 = d >= 0 ? `+ ${d}\\sqrt{${radicand2}}` : `- ${Math.abs(d)}\\sqrt{${radicand2}}`;
    const originalExpr = `${term1} ${term2}`;
    
    const correctAnswer = `${finalCoeff}\\sqrt{${cFinal}}`;
    
    // STEP 4: Generate distractors
    
    // Distractor A: Adds radicands together (classic error)
    const distractorA = `${a + d}\\sqrt{${radicand1 + radicand2}}`;
    
    // Distractor B: Doesn't simplify, just adds coefficients
    const distractorB = `${a + d}\\sqrt{${radicand1}}`;
    
    // Distractor D: Arithmetic error in final coefficient
    const distractorD = `${finalCoeff + getRandomInt(1, 3)}\\sqrt{${cFinal}}`;
    
    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "results from adding the radicands instead of simplifying and combining like terms" },
      { text: correctAnswer, isCorrect: true },
      { text: distractorB, isCorrect: false, reason: "fails to simplify the radicals before combining" },
      { text: distractorD, isCorrect: false, reason: "results from an arithmetic error when combining the coefficients" }
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
    const explanation = `Choice ${correctLetter} is correct. First, simplify each radical term:\n\n$$${a}\\sqrt{${radicand1}} = ${a}\\sqrt{${b}^2 \\cdot ${cFinal}} = ${a} \\cdot ${b}\\sqrt{${cFinal}} = ${simplifiedCoeff1}\\sqrt{${cFinal}}$$\n\n$$${d}\\sqrt{${radicand2}} = ${d}\\sqrt{${e}^2 \\cdot ${cFinal}} = ${d} \\cdot ${e}\\sqrt{${cFinal}} = ${simplifiedCoeff2}\\sqrt{${cFinal}}$$\n\nCombining like terms: $${simplifiedCoeff1}\\sqrt{${cFinal}} + ${simplifiedCoeff2}\\sqrt{${cFinal}} = ${correctAnswer}$\n\nChoice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `Which of the following is equivalent to $${originalExpr}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};