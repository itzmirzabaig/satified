import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: cecbdeba
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [volume: 432, base area: 24]
 * - Difficulty factors: [Cylinder volume V = Bh, solving for height]
 * - Distractor patterns: [B: base area, C: volume/2, D: volume×base]
 * - Constraints: [Volume divisible by base area for integer height]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_cecbdeba = {
  metadata: {
    // id: "cecbdeba",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const baseArea = getRandomInt(20, 30);
    const height = getRandomInt(15, 25);
    const volume = baseArea * height;
    
    // STEP 2: Create options with tracking
    const correctText = height.toString();
    
    // Distractors
    const distractorB = baseArea.toString(); // Base area itself
    const distractorC = Math.floor(volume / 2).toString(); // Volume/2
    const distractorD = (volume * baseArea).toLocaleString(); // Volume × base
    
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: distractorB, isCorrect: false },
      { text: distractorC, isCorrect: false },
      { text: distractorD, isCorrect: false }
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
    const explanation = `Choice ${correctLetter} is correct. The volume of a cylinder is $V = Bh$. Substituting $V = ${volume}$ and $B = ${baseArea}$ gives ${volume} = ${baseArea}h$. Dividing both sides by ${baseArea} yields $h = ${height}$ centimeters. Choice ${incorrectOptions[0].letter} is incorrect; this is the area of the base, not the height. Choice ${incorrectOptions[1].letter} is incorrect; this results from dividing the volume by 2 instead of by the base area. Choice ${incorrectOptions[2].letter} is incorrect; this results from multiplying the volume by the base area instead of dividing.`;
    
    return {
      questionText: `A right circular cylinder has a volume of ${volume} cubic centimeters. The area of the base of the cylinder is ${baseArea} square centimeters. What is the height, in centimeters, of the cylinder?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: a2e76b60
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base area: 75, height: 10, syrup: 110]
 * - Difficulty factors: [Volume subtraction, total vs partial volume]
 * - Distractor patterns: [A: base/10, B: syrup×something, D: total volume]
 * - Constraints: [Numbers should produce clean integer fruit volume]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */