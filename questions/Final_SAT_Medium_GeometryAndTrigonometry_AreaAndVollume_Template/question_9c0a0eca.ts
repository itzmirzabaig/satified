import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 9c0a0eca
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base: 10, height: 70]
 * - Difficulty factors: [Triangle area, larger numbers]
 * - Distractor patterns: [A: forgot 1/2, C: quartered, D: added]
 * - Constraints: [Base × height should be even for clean area]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_9c0a0eca = {
  metadata: {
    // id: "9c0a0eca",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const base = getRandomInt(8, 15) * 2; // Even for clean division
    const height = getRandomInt(60, 80);
    
    // STEP 2: Calculate derived values
    const area = (base * height) / 2;
    
    // STEP 3: Create options with tracking
    const correctText = area.toString();
    
    // Distractors
    const distractorA = (base * height).toString(); // Forgot 1/2
    const distractorC = (area / 2).toString(); // Quartered (divided by 2 twice)
    const distractorD = (base + height).toString(); // Added instead of multiplied
    
    const optionsData = [
      { text: distractorA, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distractorC, isCorrect: false },
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
    const explanation = `Choice ${correctLetter} is correct. The area of a triangle is $A = \\\\frac{1}{2}bh$. With base $b = ${base}$ and height $h = ${height}$, the area is $\\\\frac{1}{2}(${base})(${height}) = ${area}$ square centimeters. Choice ${incorrectOptions[0].letter} is incorrect; this results from multiplying base and height without dividing by 2, which would be the area of a rectangle. Choice ${incorrectOptions[1].letter} is incorrect; this appears to divide by 2 twice or divide by 4. Choice ${incorrectOptions[2].letter} is incorrect; this results from adding the base and height instead of using the area formula.`;
    
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
 * Question ID: aef4fd8a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [side: 94]
 * - Difficulty factors: [Square area expression recognition]
 * - Distractor patterns: [A: 2×side, B: 2×side², C: perimeter]
 * - Constraints: [Clear distinction between area and perimeter formulas]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */