import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 151eda3c
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radius A: 16, height: 50, increase: 25%]
 * - Difficulty factors: [Percentage increase, cylinder volume with scaled radius]
 * - Distractor patterns: [A: volume A, C: calculation error, D: 25²×50]
 * - Constraints: [25% increase gives clean numbers: 16→20]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_151eda3c = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const radiusA = getRandomInt(10, 20);
    const height = getRandomInt(40, 60);
    const percentIncrease = 25; // Fixed at 25% for clean math (1.25 = 5/4)
    
    // STEP 2: Calculate derived values
    const radiusB = Math.round(radiusA * 1.25); // 25% increase
    const volumeA = radiusA * radiusA * height;
    const volumeB = radiusB * radiusB * height;
    
    // STEP 3: Create options with tracking
    // FIXED: Use \\pi (single escaped) not \\\\pi (double escaped)
    const correctText = `${volumeB.toLocaleString()} \\pi`;
    
    // Distractors
    const distractorA = `${volumeA.toLocaleString()} \\pi`; // Volume of A
    const distractorC = `${Math.round(volumeB * 1.25).toLocaleString()} \\pi`; // Calculation error
    const distractorD = `${(25 * 25 * height).toLocaleString()} \\pi`; // Using 25 as radius
    
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
    // FIXED: All \\pi instead of \\\\pi, proper $ delimiters
    const explanation = `Choice ${correctLetter} is correct. The radius of container B is $${radiusA} + 0.25(${radiusA}) = ${radiusB}$ cm. The volume is $V = \\pi r^2 h = \\pi(${radiusB})^2(${height}) = \\pi(${radiusB * radiusB})(${height}) = ${volumeB.toLocaleString()}\\pi$ cubic centimeters. Choice ${incorrectOptions[0].letter} is incorrect; this is the volume of container A ($\\pi(${radiusA})^2(${height}) = ${volumeA.toLocaleString()}\\pi$). Choice ${incorrectOptions[1].letter} is incorrect; this appears to be a calculation error. Choice ${incorrectOptions[2].letter} is incorrect; this incorrectly uses 25 (from the percentage) as the radius instead of calculating the actual radius of ${radiusB}.`;
    
    return {
      // FIXED: Proper $ delimiters around math expressions
      questionText: `A manufacturing company produces two sizes of cylindrical containers that each have a height of $${height}$ centimeters. The radius of container A is $${radiusA}$ centimeters, and the radius of container B is $25\\%$ longer than the radius of container A. What is the volume, in cubic centimeters, of container B?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};