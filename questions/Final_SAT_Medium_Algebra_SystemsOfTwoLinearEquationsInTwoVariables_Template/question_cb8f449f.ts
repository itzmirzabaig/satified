import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: cb8f449f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 1/2 (simple fractions), result: single digit]
 * - Difficulty factors: [Simple substitution, elimination method]
 * - Distractor patterns: [3, 7/2, 4, 6 - close to correct value 6]
 * - Constraints: [Ensure clean arithmetic with fractions]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_cb8f449f = {
  metadata: {
    // id: "cb8f449f",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values - simple coefficients for clean arithmetic
    const coeffY = getRandomInt(2, 5); // Coefficient for y (2, 3, 4, or 5)
    const yValue = getRandomInt(2, 8) * 2; // Even y value for clean division
    const rightSide1 = (coeffY * yValue) / 2; // Result of first equation
    
    // Second equation: x - (1/coeffY)*y = some value
    // We want x to be clean, so let's set up so x = rightSide1 + something
    const xOffset = getRandomInt(2, 6);
    const xValue = rightSide1 + xOffset;
    const rightSide2 = xValue - rightSide1;
    
    // STEP 2: Format as fractions
    const frac1 = coeffY === 2 ? "\\frac{1}{2}" : `\\frac{1}{${coeffY}}`;
    const frac2 = coeffY === 2 ? "\\frac{1}{2}" : `\\frac{1}{${coeffY}}`;
    
    // STEP 3: Build question text
    const questionText = `$$\\begin{cases} ${frac1}y=${rightSide1} \\\\ x-${frac2}y=${rightSide2} \\end{cases}$$ \n\nThe system of equations above has solution $(x, y)$. What is the value of $x$?`;
    
    // STEP 4: Generate distractors based on SAT error patterns
    const distractor1 = xValue - xOffset; // 3 (wrong subtraction)
    const distractor2 = (xValue + rightSide1) / 2; // Average
    const distractor3 = rightSide1; // Wrong variable
    
    const correctText = xValue.toString();
    const optionsData = [
      { text: distractor1.toString(), isCorrect: false },
      { text: distractor2.toString(), isCorrect: false },
      { text: distractor3.toString(), isCorrect: false },
      { text: correctText, isCorrect: true }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    
    // STEP 6: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Adding the corresponding sides of the two equations eliminates $y$ and yields $x=${xValue}$. Substituting $${frac1}y=${rightSide1}$ into the second equation: $x - ${rightSide1} = ${rightSide2} \\implies x = ${xValue}$.`
    };
  }
};

/**
 * Question ID: bf4a8b6a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [group size: 21 (double-digit), prices: 60-80, revenue: 1440 (4-digit)]
 * - Difficulty factors: [Word problem, system setup, substitution method]
 * - Distractor patterns: [3, 9, 12, 18 - plausible child counts]
 * - Constraints: [Ensure integer solutions, valid counts]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */