import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 1180401d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total area: 92.1, water: 11.3, population: 621,000]
 * - Difficulty factors: [Subtraction for land area, then division, closest answer]
 * - Distractor patterns: [A: use total area (6740), C/D: order of magnitude errors]
 * - Constraints: [Must subtract water area first, then calculate density]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1180401d = {
  metadata: {
    // id: "1180401d",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 92.1 total, 11.3 water, 621000 pop, answer ≈ 7690
    const totalAreaTenths = getRandomInt(700, 1100);
    const totalArea = totalAreaTenths / 10;
    const waterAreaTenths = getRandomInt(80, 150);
    const waterArea = waterAreaTenths / 10;
    const landArea = totalArea - waterArea;
    
    // Calculate density, then population
    const targetDensity = getRandomInt(6000, 8500);
    const population = Math.round(targetDensity * landArea);
    
    // Calculate actual density
    const density = population / landArea;
    const roundedDensity = Math.round(density / 10) * 10; // Round to nearest 10
    
    // STEP 2: Create distractors
    // A: Density using total area
    const wrongDensityA = Math.round((population / totalArea) / 10) * 10;
    // C: Wrong order of magnitude
    const wrongDensityC = Math.round(roundedDensity / 10 / 10) * 10;
    // D: Wrong order of magnitude (higher)
    const wrongDensityD = Math.round(roundedDensity * 10 / 10) * 10;
    
    const optionsData = [
      { text: wrongDensityA.toLocaleString(), isCorrect: false, reason: "is the result of calculating density based on the total area instead of the land area" },
      { text: roundedDensity.toLocaleString(), isCorrect: true },
      { text: wrongDensityC.toLocaleString(), isCorrect: false, reason: "is likely a distractor with no direct calculation path or results from a miscalculation" },
      { text: wrongDensityD.toLocaleString(), isCorrect: false, reason: "is an order of magnitude error, possibly from misplacing a decimal point" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `The total area of a coastal city is $${totalArea}$ square miles, of which $${waterArea}$ square miles is water. If the city had a population of $${population.toLocaleString()}$ people in the year $2010$, which of the following is closest to the population density, in people per square mile of land area, of the city at that time?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: roundedDensity.toLocaleString(),
      explanation: `Choice ${correctLetter} is correct. To find the population density in people per square mile of land area, first calculate the land area: $${totalArea} - ${waterArea} = ${landArea}$ square miles. Then calculate population density: $\\frac{${population.toLocaleString()}}{${landArea}} \\approx ${density.toFixed(0)}$, which is closest to $${roundedDensity.toLocaleString()}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: f6cbb04a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [d=55t, 9k hours vs 3k hours]
 * - Difficulty factors: [Proportional reasoning with constants]
 * - Distractor patterns: [B: 6 (difference 9k-3k), C: 3k, D: 6k (includes k)]
 * - Constraints: [k cancels out, answer is pure number]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/ratios-rates-proportional-relationships-and-units/f6cbb04a.ts