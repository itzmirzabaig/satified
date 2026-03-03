import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 79784c23
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients in y = 6x + 3 form]
 * - Difficulty factors: [Infinitely many solutions, equivalent equations]
 * - Distractor patterns: [Various distribution patterns]
 * - Constraints: [Must multiply entire equation by 2]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_79784c23 = {
  metadata: {
    // id: "79784c23",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Use base equation y = 6x + 3 pattern
    const m = getRandomInt(2, 8);
    const b = getRandomInt(2, 8);
    
    // STEP 2: Build question text
    const questionText = `One of the two equations in a system of linear equations is given. The system has infinitely many solutions. Which equation could be the second equation in this system?\n\n$$y = ${m}x + ${b}$$`;
    
    // STEP 3: Create options
    const optionA = `$$y = 2(${m}x) + ${b}$$`; // Only x multiplied
    const optionB = `$$y = 2(${m}x + ${b})$$`; // Everything multiplied but not distributed
    const optionC = `$$2(y) = 2(${m}x) + ${b}$$`; // Only partial
    const optionD = `$$2(y) = 2(${m}x + ${b})$$`; // Correct - multiply both sides by 2
    
    const optionsData = [
      { text: optionA, isCorrect: false },
      { text: optionB, isCorrect: false },
      { text: optionC, isCorrect: false },
      { text: optionD, isCorrect: true }
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
      correctAnswer: optionD,
      explanation: `The problem asks for a second equation that would result in a system with infinitely many solutions. A system of linear equations has infinitely many solutions if the two lines are identical. This means the second equation must be equivalent to the first equation, $$y = ${m}x + ${b}$$.\n\nLet's check each option to see if it simplifies to $$y = ${m}x + ${b}$$:\n\nA. $$y = 2(${m}x) + ${b}$$\n   $$y = ${2*m}x + ${b}$$\n   This is not equivalent to $$y = ${m}x + ${b}$$.\n\nB. $$y = 2(${m}x + ${b})$$\n   $$y = ${2*m}x + ${2*b}$$\n   This is not equivalent to $$y = ${m}x + ${b}$$.\n\nC. $$2(y) = 2(${m}x) + ${b}$$\n   $$2y = ${2*m}x + ${b}$$\n   Dividing the entire equation by $$2$$ gives: $$y = ${m}x + ${b/2}$$.\n   This is not equivalent to $$y = ${m}x + ${b}$$.\n\nD. $$2(y) = 2(${m}x + ${b})$$\n   This equation represents multiplying both sides of the original equation ($$y = ${m}x + ${b}$$) by $$2$$.\n   $$2y = 2(${m}x) + 2(${b})$$\n   $$2y = ${2*m}x + ${2*b}$$\n   If we divide this equation by $$2$$, we get back to $$y = ${m}x + ${b}$$. Therefore, this equation represents the same line.\n\nThe correct option is **${correctLetter}**.`
    };
  }
};

/**
 * Question ID: 9f6f96ff
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [length: 106, parts: x, y (double-digit)]
 * - Difficulty factors: [Word problem, system setup, substitution]
 * - Distractor patterns: [25, 28, 56, 86]
 * - Constraints: [Integer solution]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */