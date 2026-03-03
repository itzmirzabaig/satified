import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 2e1a7f66
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [perimeters sum: 63, coefficients: 3, 6]
 * - Difficulty factors: [Interpreting coefficient in geometric context]
 * - Distractor patterns: [Confusing number of sides with side length]
 * - Constraints: [Clear interpretation]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_2e1a7f66 = {
  metadata: {
    // id: "2e1a7f66",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const sideA = getRandomInt(2, 6);
    const sideB = getRandomInt(3, 9);
    const sum = getRandomInt(40, 100);
    
    // STEP 2: Create options
    const optionsData = [
      { text: `Each side of figure B has a length of ${sideB} inches.`, isCorrect: true },
      { text: `The number of sides of figure B is ${sideB}.`, isCorrect: false },
      { text: `Each side of figure A has a length of ${sideB} inches.`, isCorrect: false },
      { text: `The number of sides of figure A is ${sideB}.`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    return {
      questionText: `Figure A and figure B are both regular polygons. The sum of the perimeter of figure A and the perimeter of figure B is ${sum} inches. The equation ${sideA}x + ${sideB}y = ${sum} represents this situation, where x is the number of sides of figure A and y is the number of sides of figure B. Which statement is the best interpretation of ${sideB} in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `Choice ${correctLetter} is correct. Since figure A and figure B are regular polygons and ${sideA}x + ${sideB}y = ${sum} represents the sum of their perimeters, ${sideA}x represents the perimeter of figure A and ${sideB}y represents the perimeter of figure B. Since $y$ is the number of sides of figure B, ${sideB} must be the length of each side of figure B in inches.`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-228945.ts
/**
 * Question ID: 228945
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: -6,-3,0, y: n+184,n+92,n, slope: -92/3]
 * - Difficulty factors: [Finding slope with variable n in table]
 * - Distractor patterns: [A: correct, B: reciprocal, C: includes n, D: wrong calculation]
 * - Constraints: [Slope independent of n]
 * - Question type: [Table+Figure→Multiple Choice Text]
 * - Figure generation: [Mafs plot showing line through points]
 */
