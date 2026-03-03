import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 38517165
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [circumference: 31π]
 * - Difficulty factors: [Circumference to diameter, C = πd]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Circumference coefficient equals diameter for C = πd]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

export const generator_38517165 = {
  metadata: {
    // id: "38517165",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const diameter = getRandomInt(20, 50);
    
    // STEP 2: Calculate circumference coefficient
    const circumferenceCoeff = diameter; // C = πd, so if C = kπ, then k = d
    
    // STEP 3: Return question data
    return {
      questionText: `A circle has a circumference of ${circumferenceCoeff}π centimeters. What is the diameter, in centimeters, of the circle?`,
      figureCode: null,
      options: null,
      correctAnswer: diameter.toString(),
      explanation: `The circumference of a circle is $C = 2\\\\pi r = \\\\pi d$, where $d$ is the diameter. Given $C = ${circumferenceCoeff}\\\\pi$, we have $\\\\pi d = ${circumferenceCoeff}\\\\pi$, so $d = ${diameter}$ centimeters.`
    };
  }
};

/**
 * Question ID: 98c12e38
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radius K: 4, area L: 100π]
 * - Difficulty factors: [Circle area, sum of areas]
 * - Distractor patterns: [A: sum of radii ×π, B: sum of diameters ×π, C: miscalculation]
 * - Constraints: [Should produce clean answer]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */