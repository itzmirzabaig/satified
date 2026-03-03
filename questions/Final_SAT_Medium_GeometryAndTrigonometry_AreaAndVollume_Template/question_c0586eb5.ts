import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: c0586eb5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [diameter: 8, height: 12]
 * - Difficulty factors: [Cylinder volume, diameter to radius conversion]
 * - Distractor patterns: [A: base area (16π), B: lateral area (96π), D: using diameter as radius]
 * - Constraints: [Numbers must work cleanly with π]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_c0586eb5 = {
  metadata: {
    // id: "c0586eb5",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const diameter = getRandomInt(6, 12) * 2; // Even number for clean radius
    const radius = diameter / 2;
    const height = getRandomInt(10, 16);
    
    // STEP 2: Calculate derived values
    const volume = radius * radius * height; // Coefficient of π
    const baseArea = radius * radius;
    const lateralArea = diameter * height; // 2πr × h = πdh, coefficient
    
    // STEP 3: Create options with tracking
    const correctText = `${volume}\\\\pi`;
    
    // Distractors
    const distractorA = `${baseArea}\\\\pi`; // Base area only
    const distractorB = `${lateralArea}\\\\pi`; // Lateral surface area
    const distractorD = `${diameter * diameter * height}\\\\pi`; // Using diameter as radius
    
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
    const explanation = `Choice ${correctLetter} is correct. The radius is half the diameter: $${diameter}/2 = ${radius}$. The volume is $V = \\\\pi r^2 h = \\\\pi(${radius})^2(${height}) = \\\\pi(${baseArea})(${height}) = ${volume}\\\\pi$. Choice ${incorrectOptions[0].letter} is incorrect; this is just the area of the base ($\\\\pi r^2 = ${baseArea}\\\\pi$). Choice ${incorrectOptions[1].letter} is incorrect; this is the lateral surface area ($\\\\pi dh = \\\\pi(${diameter})(${height}) = ${lateralArea}\\\\pi$). Choice ${incorrectOptions[2].letter} is incorrect; this results from using the diameter (${diameter}) instead of the radius (${radius}) in the volume formula.`;
    
    return {
      questionText: `A cylinder has a diameter of $${diameter}$ inches and a height of $${height}$ inches. What is the volume, in cubic inches, of the cylinder?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

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