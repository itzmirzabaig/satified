import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: d909cd31
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: -15, 25, 65 (double-digit)]
 * - Difficulty factors: [Infinitely many solutions = equivalent equations]
 * - Distractor patterns: [Various sign combinations]
 * - Constraints: [Must be scalar multiple]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_d909cd31 = {
  metadata: {
    // id: "d909cd31",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const a = getRandomInt(2, 6) * getRandomElement([-1, 1]);
    const b = getRandomInt(3, 8) * getRandomElement([-1, 1]);
    const c = getRandomInt(30, 80);
    const multiplier = getRandomInt(2, 5);
    
    // STEP 2: Build question text
    const questionText = `One of the two equations in a system of linear equations is $${a}x + ${b}y = ${c}$. The system has infinitely many solutions. Which of the following could be the second equation in the system?`;
    
    // STEP 3: Create options with proper closing $
    const newA = a * multiplier;
    const newB = b * multiplier;
    const newC = c * multiplier;
    
    const optionA = `$${newA * -1}x+${newB}y=${newC}$`; // Wrong sign
    const optionB = `$${newA}x+${newB}y=${-newC}$`; // Wrong result sign
    const optionC = `$${newA}x+${newB}y=${newC}$`; // Correct multiple
    const optionD = `$${-newA}x+${newB}y=${-newC}$`; // Both signs wrong
    
    const optionsData = [
      { text: optionA, isCorrect: false },
      { text: optionB, isCorrect: false },
      { text: optionC, isCorrect: true },
      { text: optionD, isCorrect: false }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    
    // STEP 5: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter, // Should be letter, not text
      explanation: `Infinitely many solutions occur when equations are equivalent. Choice ${correctLetter} is ${multiplier} times the original equation: $${multiplier}(${a}x + ${b}y) = ${multiplier}(${c})$, which simplifies to $${newA}x + ${newB}y = ${newC}$. The other choices are not scalar multiples of the original equation.`
    };
  }
};

// Helper for GCD using while loop (no recursion)
Math.gcd = function(a: number, b: number): number {
  let num1 = Math.abs(a);
  let num2 = Math.abs(b);
  while (num2 !== 0) {
    const temp = num2;
    num2 = num1 % num2;
    num1 = temp;
  }
  return num1;
};