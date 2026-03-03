import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 5154615f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [edge: 3.000 cm, density: 0.230 g/cm³, mass: 6.21 g]
 * - Difficulty factors: [Density formula rearrangement, cube volume, precision handling]
 * - Distractor patterns: [Fill-in-the-blank - no distractors]
 * - Constraints: [3 decimal places in edge, 3 decimal places in density, 2 in answer]
 * - Question type: [Text→Fill-in-the-blank]
 * - Figure generation: [None - conceptual]
 */

export const generator_5154615f = {
  metadata: {
    // id: "5154615f",
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
      options: null,
      correctAnswer: mass.toFixed(2),
      explanation: `The correct answer is ${mass.toFixed(2)}. The volume is (${edgeLength})³ = ${volume} cubic centimeters. Mass = Density × Volume = ${density} × ${volume} = ${mass.toFixed(2)} grams.`
    };
  }
};

/**
 * Question ID: 50b99b2d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [object R: 4x inches in y seconds, object S: 24x inches, speed R = 0.5 × speed S]
 * - Difficulty factors: [Abstract variables, ratio reasoning, relative speed]
 * - Distractor patterns: [12y: if R were twice S, 16y: wrong distance, 6y: time for R not S]
 * - Constraints: [Must track which object is faster, algebraic manipulation with x and y]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual]
 */