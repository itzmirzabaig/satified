import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 310c87fe
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [surface area: 54]
 * - Difficulty factors: [Surface area to volume, cube formulas]
 * - Distractor patterns: [A: 18 (6×3), B: 27 (correct), C: 36 (6²), D: 81 (9²)]
 * - Constraints: [SA must be divisible by 6 for integer side]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_310c87fe = {
  metadata: {
    // id: "310c87fe",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate side length
    const side = getRandomInt(3, 8);
    
    // STEP 2: Calculate SA and volume
    const surfaceArea = 6 * side * side;
    const volume = side * side * side;
    
    // STEP 3: Create distractors
    const distractorA = 6 * side; // 6s instead of s³
    const distractorC = 6 * 6; // 6² (random)
    const distractorD = (side * side) * (side * side); // s⁴ (wrong)
    
    const correctText = volume.toString();
    
    const optionsData = [
      { text: distractorA.toString(), isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distractorC.toString(), isCorrect: false },
      { text: distractorD.toString(), isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `A cube has a surface area of $${surfaceArea}$ square meters. What is the volume, in cubic meters, of the cube?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Surface area $6s^2 = ${surfaceArea}$, so $s^2 = ${side * side}$ and $s = ${side}$. Volume $= s^3 = ${side}^3 = ${volume}$ cubic meters. Choice ${incorrectOptions[0].letter} is incorrect because it calculates $6s$ instead of $s^3$. Choice ${incorrectOptions[1].letter} is incorrect because it calculates $6^2$ instead of using the side length. Choice ${incorrectOptions[2].letter} is incorrect because it calculates $s^4$ instead of $s^3$.`
    };
  }
};