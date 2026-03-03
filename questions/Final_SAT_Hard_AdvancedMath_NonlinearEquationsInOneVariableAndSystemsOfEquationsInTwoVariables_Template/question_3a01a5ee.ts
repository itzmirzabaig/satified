import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 3a01a5ee
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 5 (absolute value), constant: 73, results involve fractions]
 * - Difficulty factors: [Absolute value equation, requires solving two cases, summing fractions]
 * - Distractor patterns: [-146/5 = sign error in summing, -12 = only one solution, 0 = incorrect]
 * - Constraints: [Two cases for absolute value, must sum solutions correctly]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_3a01a5ee = {
  metadata: {
    // id: "3a01a5ee",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Original: |-5x + 13| = 73
    // Generate: |ax + b| = c where a is negative, solution involves fraction summing
    
    const a = -1 * getRandomInt(3, 8); // Negative coefficient
    const b = getRandomInt(10, 20); // Constant inside absolute value
    const c = getRandomInt(60, 90); // Right side constant
    
    // STEP 2: Calculate solutions
    // Case 1: ax + b = c → x = (c - b)/a
    // Case 2: ax + b = -c → x = (-c - b)/a
    
    const x1Numerator = c - b;
    const x2Numerator = -c - b;
    const denominator = a;
    
    // Calculate sum: x1 + x2 = (c - b)/a + (-c - b)/a = (-2b)/a
    const sumNumerator = -2 * b;
    const sumDenominator = a;
    
    // Simplify sum fraction
    const gcd = (m: number, n: number): number => n === 0 ? m : gcd(n, m % n);
    const sumGcd = gcd(Math.abs(sumNumerator), Math.abs(sumDenominator));
    const simplifiedSumNum = sumNumerator / sumGcd;
    const simplifiedSumDen = sumDenominator / sumGcd;
    
    let correctAnswerText: string;
    if (simplifiedSumDen === 1) {
      correctAnswerText = simplifiedSumNum.toString();
    } else if (simplifiedSumDen === -1) {
      correctAnswerText = (-simplifiedSumNum).toString();
    } else {
      // Ensure denominator is positive
      if (simplifiedSumDen < 0) {
        correctAnswerText = `${-simplifiedSumNum}/${-simplifiedSumDen}`;
      } else {
        correctAnswerText = `${simplifiedSumNum}/${simplifiedSumDen}`;
      }
    }
    
    // STEP 3: Create distractors based on SAT patterns
    // Distractor A: Sign error in summing (adds instead of subtracts)
    const distractorANum = x1Numerator + x2Numerator;
    const distractorAGcd = gcd(Math.abs(distractorANum), Math.abs(denominator));
    const distractorA = `${distractorANum / distractorAGcd}/${denominator / distractorAGcd}`;
    
    // Distractor B: Just one of the solutions
    const distractorB = `${x1Numerator}/${denominator}`;
    
    // Distractor C: 0 (common wrong answer)
    const distractorC = "0";
    
    // STEP 4: Create options with tracking
    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "results from incorrectly adding the numerators when summing the two solutions" },
      { text: distractorB, isCorrect: false, reason: "is just one of the solutions, not the sum" },
      { text: distractorC, isCorrect: false, reason: "is incorrect; the solutions are not opposites" },
      { text: correctAnswerText, isCorrect: true }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index) // A=65, B=66, C=67, D=68
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 6: Build explanation with dynamic letters
    const explanation = `Choice ${correctLetter} is correct. To solve $|${a}x + ${b}| = ${c}$, consider two cases:
Case 1: ${a}x + ${b} = ${c} → ${a}x = ${c - b} → x = ${x1Numerator}/${denominator}
Case 2: ${a}x + ${b} = -${c} → ${a}x = ${-c - b} → x = ${x2Numerator}/${denominator}
Sum = ${x1Numerator}/${denominator} + ${x2Numerator}/${denominator} = ${sumNumerator}/${sumDenominator} = ${correctAnswerText}.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `What is the sum of the solutions to the given equation?\n\n$|${a}x + ${b}| = ${c}$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: `$${o.text}$` })),
      correctAnswer: correctAnswerText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 9691901
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients in system: 1, 20, 100, 7]
 * - Difficulty factors: [System of nonlinear equations, substitution, perfect square trinomial]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [System must have unique solution, quadratic must factor nicely]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/9691901.ts