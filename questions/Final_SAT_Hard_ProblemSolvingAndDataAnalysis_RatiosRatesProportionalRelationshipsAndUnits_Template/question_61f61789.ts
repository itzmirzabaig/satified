import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 61f61789
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [edge: 2.00 cm, mass: 2.56 g, density: 0.32 g/cm³]
 * - Difficulty factors: [Density formula, cube volume, decimal division]
 * - Distractor patterns: [Fill-in-the-blank - accepts 0.32 or 8/25]
 * - Constraints: [Volume = 8 cm³, mass/volume = clean decimal]
 * - Question type: [Text→Fill-in-the-blank]
 * - Figure generation: [None - conceptual]
 */

export const generator_61f61789 = {
  metadata: {
    // id: "61f61789",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate edge length (2.00 in original)
    const edgeLength = getRandomInt(2, 4); // 2, 3, or 4 cm
    
    // STEP 2: Calculate volume
    const volume = Math.pow(edgeLength, 3);
    
    // STEP 3: Generate mass that gives clean density (mass/volume = clean decimal)
    // density = mass/volume, so mass = density × volume
    // We want density like 0.32, so mass = 0.32 × 8 = 2.56
    const densityOptions = [0.25, 0.32, 0.5, 0.75]; // Clean fractions
    const density = getRandomElement(densityOptions);
    const mass = parseFloat((density * volume).toFixed(2));
    
    // STEP 4: Calculate answer
    const calculatedDensity = mass / volume;
    
    // Convert to fraction if it's a simple one
    let fractionAnswer = "";
    if (Math.abs(calculatedDensity - 0.25) < 0.001) fractionAnswer = "1/4";
    else if (Math.abs(calculatedDensity - 0.32) < 0.001) fractionAnswer = "8/25";
    else if (Math.abs(calculatedDensity - 0.5) < 0.001) fractionAnswer = "1/2";
    else if (Math.abs(calculatedDensity - 0.75) < 0.001) fractionAnswer = "3/4";
    
    const correctAnswer = fractionAnswer || calculatedDensity.toFixed(2);
    
    return {
      questionText: `To study the moisture content in a group of trees, samples from the trunk of each tree were taken from trees and cut in the shape of a cube. The length of the edge of one of these cubes is ${edgeLength.toFixed(2)} centimeters. If this cube has a mass of ${mass} grams, what is the density of this cube, in grams per cubic centimeter?`,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `The correct answer is ${correctAnswer}. The volume of a cube with edge length ${edgeLength} cm is (${edgeLength})³ = ${volume} cubic centimeters. Density = Mass/Volume = ${mass}/${volume} = ${calculatedDensity} grams per cubic centimeter.`
    };
  }
};

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