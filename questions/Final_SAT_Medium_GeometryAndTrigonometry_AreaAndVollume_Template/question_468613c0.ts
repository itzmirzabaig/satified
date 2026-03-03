import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 468613c0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base: 56, height: 112]
 * - Difficulty factors: [Triangle area, larger numbers]
 * - Distractor patterns: [A: base+height, B: quartered, D: no 1/2 factor]
 * - Constraints: [Product should be even for clean division]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_468613c0 = {
  metadata: {
    // id: "468613c0",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const base = getRandomInt(50, 60);
    const height = getRandomInt(100, 120);
    
    // STEP 2: Calculate derived values
    const area = (base * height) / 2;
    
    // STEP 3: Create options with tracking
    const correctText = area.toLocaleString();
    
    // Distractors
    const distractorA = (base + height).toString(); // Sum
    const distractorB = (area / 2).toLocaleString(); // Quartered
    const distractorD = (base * height).toLocaleString(); // No 1/2
    
    const optionsData = [
      { text: distractorA, isCorrect: false },
      { text: distractorB, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distractorD, isCorrect: false }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 5: Build explanation
    const explanation = `Choice ${correctLetter} is correct. The area of a triangle is $A = \\\\frac{1}{2}bh$. With base $b = ${base}$ and height $h = ${height}$, the area is $\\\\frac{1}{2}(${base})(${height}) = ${area}$ cm². Choice ${incorrectOptions[0].letter} is incorrect; this is the sum of the base and height, not the area. Choice ${incorrectOptions[1].letter} is incorrect; this appears to divide by 4 instead of by 2. Choice ${incorrectOptions[2].letter} is incorrect; this multiplies base and height without dividing by 2, which would be the area of a rectangle.`;
    
    return {
      questionText: `A triangle has a base length of $${base}$ centimeters and a height of $${height}$ centimeters. What is the area, in square centimeters, of the triangle?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 37dde49f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [volume: 473, formula with k³]
 * - Difficulty factors: [Volume formula manipulation, cube root calculation]
 * - Distractor patterns: [A: small value, B: cube root miscalc, C: close miscalc]
 * - Constraints: [Should produce clean decimal or specific value]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */