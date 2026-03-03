import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 8213b1b3
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [0.001%, 140 grams]
 * - Difficulty factors: [Very small percentage, unit conversion attention]
 * - Distractor patterns: [Decimal place errors, percentage conversion errors]
 * - Constraints: [Maximum = 0.001% of 140 = 0.00001 * 140 = 0.0014]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - straightforward calculation]
 */

export const generator_8213b1b3 = {
  metadata: {
    // id: "8213b1b3",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate very small percentage and sample mass
    // Use scientific notation style: X * 10^-Y percent
    const mantissa = getRandomInt(1, 9); // 1-9
    const exponent = getRandomInt(3, 5); // 10^-3 to 10^-5 (0.001% to 0.00001%)
    const sampleMass = getRandomInt(100, 200); // grams
    
    // STEP 2: Calculate maximum mass
    const percentageDecimal = mantissa * Math.pow(10, -exponent);
    const maxMass = Math.round(sampleMass * percentageDecimal * 1000000) / 1000000; // Keep precision
    
    return {
      questionText: `According to a set of standards, a certain type of substance can contain a maximum of ${mantissa}×10^${-exponent}% phosphorus by mass. If a sample of this substance has a mass of ${sampleMass} grams, what is the maximum mass, in grams, of phosphorus the sample can contain to meet these standards?`,
      figureCode: null,
      options: null, // Fill-in-the-blank
      correctAnswer: maxMass.toString(),
      explanation: `Maximum mass = ${mantissa}×10^${-exponent}% of ${sampleMass}g = ${percentageDecimal}% of ${sampleMass}g = ${percentageDecimal/100} × ${sampleMass} = ${maxMass}g.`
    };
  }
};

/**
 * Question ID: 34f8cd89
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [37%, 37%, 42%]
 * - Difficulty factors: [Sequential conditional probabilities, complement calculation]
 * - Distractor patterns: [Stopping early, wrong complement, multiplying all wrong]
 * - Constraints: [Final = 0.37 * 0.37 * 0.42 = 0.057498, complement = 94.25%]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - probability/percentage problem]
 */