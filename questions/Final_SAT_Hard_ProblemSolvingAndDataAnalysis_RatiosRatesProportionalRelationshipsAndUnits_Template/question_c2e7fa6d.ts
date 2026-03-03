import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: c2e7fa6d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [side ratio: 3:1, field strength: 29.00, total flux: 4640]
 * - Difficulty factors: [Area ratio of squares, algebraic setup, proportional reasoning]
 * - Distractor patterns: [Fill-in-the-blank - no distractors]
 * - Constraints: [Area ratio is 9:1 (3²), total parts = 10, must divide 4640 appropriately]
 * - Question type: [Text→Fill-in-the-blank]
 * - Figure generation: [None - conceptual]
 */

export const generator_c2e7fa6d = {
  metadata: {
    // id: "c2e7fa6d",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate values
    const sideRatio = getRandomInt(2, 5); // 3 in original
    const fieldStrength = parseFloat((Math.random() * 30 + 10).toFixed(2)); // 29.00 in original
    const areaRatio = sideRatio * sideRatio; // 9 for ratio 3:1
    
    // STEP 2: Set up equation
    // Small area = x, Large area = areaRatio × x, Total = (areaRatio + 1) × x
    // Total flux = fieldStrength × totalArea
    const totalParts = areaRatio + 1;
    const baseMultiplier = getRandomInt(10, 30);
    const totalFlux = Math.round(fieldStrength * baseMultiplier * totalParts); // Ensure clean division
    
    // STEP 3: Solve
    const smallArea = totalFlux / (fieldStrength * totalParts);
    const largeArea = smallArea * areaRatio;
    const largeFlux = Math.round(largeArea * fieldStrength);
    
    return {
      questionText: `For an electric field passing through a flat surface perpendicular to it, the electric flux of the electric field through the surface is the product of the electric field's strength and the area of the surface. A certain flat surface consists of two adjacent squares, where the side length, in meters, of the larger square is ${sideRatio} times the side length, in meters, of the smaller square. An electric field with strength ${fieldStrength.toFixed(2)} volts per meter passes uniformly through this surface, which is perpendicular to the electric field. If the total electric flux of the electric field through this surface is ${totalFlux.toLocaleString()} volts · meters, what is the electric flux, in volts · meters, of the electric field through the larger square?`,
      figureCode: null,
      options: null,
      correctAnswer: largeFlux.toString(),
      explanation: `The correct answer is ${largeFlux.toLocaleString()}. The area ratio is ${sideRatio}² = ${areaRatio}:1. Total parts = ${totalParts}. Small area = ${smallArea} m², large area = ${largeArea} m². Flux through larger square = ${fieldStrength} × ${largeArea} = ${largeFlux.toLocaleString()} volts·meters.`
    };
  }
};

/**
 * Question ID: 21e539a0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [88x ounces in 5y minutes, find for 9y minutes]
 * - Difficulty factors: [Proportion with abstract variables, cross-multiplication]
 * - Distractor patterns: [9x/440: inverted/wrong, 440x/9: wrong operation, 5x/792: wrong]
 * - Constraints: [Rate = 88x/5y, new amount = rate × 9y = (88x/5y) × 9y = 792x/5]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual]
 */