import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1436
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [edge: 3.000 cm, density: 0.230 g/cm³, mass: 6.21 g]
 * - Difficulty factors: [Density formula rearrangement, cube volume, precision handling]
 * - Distractor patterns: [Fill-in-the-blank - no distractors]
 * - Constraints: [3 decimal places in edge, 3 decimal places in density, 2 in answer]
 * - Question type: [Text→Fill-in-the-blank]
 * - Figure generation: [None - conceptual]
 */

export const generator_1436 = {
  metadata: {
    id: "1436",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate values (edge: 3.000 style, density: 0.xxx style)
    const edgeLength = getRandomInt(2, 5); // 2, 3, 4, or 5 cm
    const density = parseFloat((Math.random() * 0.4 + 0.1).toFixed(3)); // 0.100 to 0.500
    
    // STEP 2: Calculate volume and mass
    const volume = Math.pow(edgeLength, 3);
    const mass = parseFloat((density * volume).toFixed(2));
    
    return {
      questionText: `To study fluctuations in composition, samples of pumice were taken from 29 locations and cut in the shape of a cube. The length of the edge of one of these cubes is ${edgeLength.toFixed(3)} centimeters. This cube has a density of ${density} grams per cubic centimeter. What is the mass of this cube, in grams?`,
      figureCode: null,
      options: [],
      correctAnswer: mass.toFixed(2),
      explanation: `The correct answer is ${mass.toFixed(2)}. The volume is (${edgeLength})³ = ${volume} cubic centimeters. Mass = Density × Volume = ${density} × ${volume} = ${mass.toFixed(2)} grams.`
    };
  }
};
