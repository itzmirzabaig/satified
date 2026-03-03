import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

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

export const generator_aef4fd8a = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const side = getRandomInt(80, 100); // Like 94
    
    // STEP 2: Create options with tracking
    // FIXED: Changed \\\\cdot to \\cdot (single escaped backslash)
    const correctText = `${side} \\cdot ${side}`;
    
    // Distractors
    const distractorA = `2 \\cdot ${side}`; // 2×side
    const distractorB = `2 \\cdot ${side} \\cdot ${side}`; // 2×side²
    const distractorC = `4 \\cdot ${side}`; // Perimeter
    
    const optionsData = [
      { text: distractorA, isCorrect: false },
      { text: distractorB, isCorrect: false },
      { text: distractorC, isCorrect: false },
      { text: correctText, isCorrect: true }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 4: Build explanation
    // FIXED: Changed all \\\\cdot to \\cdot
    const explanation = `Choice ${correctLetter} is correct. The area of a square with side length $s$ is $s^2 = s \\cdot s$. With side length ${side}, the area is ${side} \\cdot ${side}$ cm². Choice ${incorrectOptions[0].letter} is incorrect; this multiplies the side by 2, which is not a valid geometric formula. Choice ${incorrectOptions[1].letter} is incorrect; this doubles the area, which is incorrect for finding the area of a single square. Choice ${incorrectOptions[2].letter} is incorrect; this calculates the perimeter ($4s$), not the area.`;
    
    return {
      questionText: `The length of each side of a square is $${side}$ centimeters (cm). Which expression gives the area, in cm², of the square?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};