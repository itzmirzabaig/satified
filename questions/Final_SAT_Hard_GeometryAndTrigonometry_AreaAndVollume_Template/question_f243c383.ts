import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: f243c383
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [surface area: 54]
 * - Difficulty factors: [Surface area to volume, cube formulas]
 * - Distractor patterns: [A: 18 (6×3), B: 27 (correct), C: 36 (6²), D: 81 (9²)]
 * - Constraints: [SA must be divisible by 6 for integer side]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_f243c383 = {
  metadata: {
    // id: "f243c383",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters that give clean answer
    // Original: height = 90, s = 8, ratio = 92/47
    // K = 2s² + 360s (with h=90)
    // New SA = 2s² + 720s
    // Equation: 2s² + 720s = (92/47)(2s² + 360s)
    
    // Let's generate similar structure with different numbers
    const baseHeight = getRandomInt(60, 120); // Similar magnitude
    const sideLength = getRandomInt(4, 12);
    
    // Calculate the ratio that makes equation true
    const K_orig = 2*sideLength*sideLength + 4*sideLength*baseHeight;
    const newSA_orig = 2*sideLength*sideLength + 8*sideLength*baseHeight;
    
    // Create answer choices around the correct answer
    const correctAnswer = sideLength;
    
    // Generate unique distractors
    let distractor1 = sideLength - 4;
    let distractor2 = sideLength + 1;
    let distractor3 = sideLength * 2;
    
    // Ensure all distractors are positive and unique
    const usedValues = new Set([correctAnswer]);
    const distractors: number[] = [];
    
    [distractor1, distractor2, distractor3].forEach(d => {
      if (d > 0 && !usedValues.has(d)) {
        distractors.push(d);
        usedValues.add(d);
      }
    });
    
    // Fill in with additional values if needed
    while (distractors.length < 3) {
      const newDistractor = getRandomInt(2, 20);
      if (!usedValues.has(newDistractor)) {
        distractors.push(newDistractor);
        usedValues.add(newDistractor);
      }
    }
    
    const optionsData = [
      { text: distractors[0].toString(), isCorrect: false },
      { text: correctAnswer.toString(), isCorrect: true },
      { text: distractors[1].toString(), isCorrect: false },
      { text: distractors[2].toString(), isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // Simplify ratio for display
    const ratioDisplay = `\\frac{${newSA_orig}}{${K_orig}}`;
    
    return {
      questionText: `Two identical rectangular prisms each have a height of $${baseHeight}$ centimeters (cm). The base of each prism is a square, and the surface area of each prism is K cm². If the prisms are glued together along a square base, the resulting prism has a surface area of $${ratioDisplay}K$ cm². What is the side length, in cm, of each square base?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer.toString(),
      explanation: `Choice ${correctOption.letter} is correct. For one prism: $K = 2s^2 + 4s(${baseHeight}) = 2s^2 + ${4*baseHeight}s$. For the combined prism (height ${2*baseHeight}): $SA = 2s^2 + 4s(${2*baseHeight}) = 2s^2 + ${8*baseHeight}s$. Setting $SA = ${ratioDisplay}K$ and solving yields $s = ${correctAnswer}$. Choice ${incorrectOptions[0].letter} is incorrect. Choice ${incorrectOptions[1].letter} is incorrect. Choice ${incorrectOptions[2].letter} is incorrect.`
    };
  }
};

/**
 * Question ID: 93de3f84
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [volume A: 22]
 * - Difficulty factors: [Cylinder volume scaling: double radius (4× area), half height (1/2) → net 2×]
 * - Distractor patterns: [A: 11 (half), B: 22 (same), C: 44 (correct), D: 66 (3×)]
 * - Constraints: [Understanding how r² scales vs h scales]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */