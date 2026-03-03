import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: c8fb6bcb
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = 2x + 244, find width]
 * - Difficulty factors: [Connecting linear function to geometric formula]
 * - Distractor patterns: [A = coefficient, C = full perimeter term, D = doubled]
 * - Constraints: [None - formula recognition]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_c8fb6bcb = {
  metadata: {
    // id: "c8fb6bcb",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Width: 100-150
    const width = getRandomInt(100, 150);
    // Coefficient of x: 1-4
    const coef = getRandomInt(1, 4);
    // Perimeter function: f(x) = coef*x + 2*width
    // (where coef represents the 2 from 2*length, so actually should be 2)
    // Actually for rectangle: P = 2l + 2w, so if f(x) = 2x + constant, constant = 2w
    const constant = 2 * width;
    
    // STEP 2: Create options
    const correctText = width.toString();
    const optionsData = [
      { text: coef.toString(), isCorrect: false, reason: "gives the coefficient of x, which represents 2 (the number of length sides)" },
      { text: correctText, isCorrect: true },
      { text: constant.toString(), isCorrect: false, reason: "gives the constant term which equals 2w, not w" },
      { text: (constant * 2).toString(), isCorrect: false, reason: "incorrectly doubles the constant term" }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 4: Return question data
    return {
      questionText: `The given function $f(x) = ${coef}x + ${constant}$ represents the perimeter, in centimeters, of a rectangle with a length of $x$ cm and a fixed width. What is the width, in cm, of the rectangle?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The perimeter formula is $P = 2l + 2w$. Comparing $f(x) = ${coef}x + ${constant}$ to this, we see ${constant} = 2w$, so $w = \\frac{${constant}}{2} = ${width}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 123456
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = -9x + 9]
 * - Difficulty factors: [Identifying y-intercept from slope-intercept form]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [None - straightforward identification]
 * - Question type: [Text→Fill in Blank]
 * - Figure generation: [None]
 */