import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 1b403590
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [mass: 168g, volume: 24cm³]
 * - Difficulty factors: [Density formula application]
 * - Distractor patterns: [B: subtraction, C: addition, D: multiplication]
 * - Constraints: [Must result in integer answer]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1b403590 = {
  metadata: {
    // id: "1b403590",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 168g, 24cm³, density = 7
    // Strategy: pick divisor first, then ensure clean division
    const density = getRandomInt(3, 15);
    const volume = getRandomInt(10, 40);
    const mass = density * volume; // ensures integer result
    
    // STEP 2: Create distractors
    const distractorB = mass - volume; // subtraction error
    const distractorC = mass + volume; // addition error
    const distractorD = mass * volume; // multiplication error
    
    const optionsData = [
      { text: density.toString(), isCorrect: true },
      { text: distractorB.toString(), isCorrect: false, reason: "is the result of subtracting the volume from the mass" },
      { text: distractorC.toString(), isCorrect: false, reason: "is the result of adding the mass and the volume" },
      { text: distractorD.toLocaleString(), isCorrect: false, reason: "is the result of multiplying the mass by the volume" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `An object has a mass of $${mass}$ grams and a volume of $${volume}$ cubic centimeters. What is the density, in grams per cubic centimeter, of the object?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: density.toString(),
      explanation: `Choice ${correctLetter} is correct. The formula for density is: $\\text{Density} = \\frac{\\text{Mass}}{\\text{Volume}}$. Substituting the given values: $\\text{Density} = \\frac{${mass} \\text{ grams}}{${volume} \\text{ cubic centimeters}} = ${density}$ grams per cubic centimeter. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 445dd032
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [rate: $13.50/hour, z hours, find earnings for 3z hours]
 * - Difficulty factors: [Proportional reasoning with algebraic expressions]
 * - Distractor patterns: [B: 3 + 13.50z (addition), C: 3z + 13.50z (combining terms), D: 13.50(z+3) (z+3 vs 3z)]
 * - Constraints: [Must recognize 3z means 3 times z]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/ratios-rates-proportional-relationships-and-units/445dd032.ts