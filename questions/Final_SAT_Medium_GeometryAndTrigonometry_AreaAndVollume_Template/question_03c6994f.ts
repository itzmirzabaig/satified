import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 03c6994f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [scale factor: 246]
 * - Difficulty factors: [Area scaling with linear dimension, squaring scale factor]
 * - Distractor patterns: [B: 2×scale, C: scale itself, D: scale/2]
 * - Constraints: [Scale factor should be such that scale² is large but manageable]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_03c6994f = {
  metadata: {
    // id: "03c6994f",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const scaleFactor = getRandomInt(200, 300); // Like 246
    
    // STEP 2: Calculate derived values
    const k = scaleFactor * scaleFactor; // Area scales as square
    
    // STEP 3: Create options with tracking
    const correctText = k.toLocaleString();
    
    // Distractors
    const distractorB = (2 * scaleFactor).toString(); // 2×scale
    const distractorC = scaleFactor.toString(); // Scale itself
    const distractorD = Math.floor(scaleFactor / 2).toString(); // Scale/2
    
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: distractorB, isCorrect: false },
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
    const explanation = `Choice ${correctLetter} is correct. If the side length of square A is ${scaleFactor} times the side length of square B, then the area of square A is $(${scaleFactor})^2 = ${k}$ times the area of square B. Area scales with the square of the linear scale factor. Choice ${incorrectOptions[0].letter} is incorrect; this is $2 \\\\times ${scaleFactor}$, which incorrectly applies a linear relationship to area. Choice ${incorrectOptions[1].letter} is incorrect; this is the scale factor itself, which would be correct for the ratio of perimeters, but area requires squaring. Choice ${incorrectOptions[2].letter} is incorrect; this is approximately half the scale factor, unrelated to the area calculation.`;
    
    return {
      questionText: `Square A has side lengths that are $${scaleFactor}$ times the side lengths of square B. The area of square A is $k$ times the area of square B. What is the value of $k$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

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