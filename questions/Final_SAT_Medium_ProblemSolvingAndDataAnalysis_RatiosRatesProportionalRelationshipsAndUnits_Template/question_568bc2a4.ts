import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 568bc2a4
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [354 furlongs, 220 yards/furlong, 3 feet/yard]
 * - Difficulty factors: [Two-step conversion, large number result]
 * - Distractor patterns: [A: 306 (subtraction), B: 402 (addition), C: 25960 (divide by 3)]
 * - Constraints: [Must multiply, not divide]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_568bc2a4 = {
  metadata: {
    // id: "568bc2a4",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 354 furlongs, 220 yards/furlong, 3 feet/yard, answer = 233640
    const furlongs = getRandomInt(200, 500);
    const yardsPerFurlong = getRandomInt(180, 250);
    const feetPerYard = getRandomInt(2, 5);
    
    // STEP 2: Calculate
    const totalFeet = furlongs * yardsPerFurlong * feetPerYard;
    const totalYards = furlongs * yardsPerFurlong;
    
    // STEP 3: Create distractors
    const distractorA = Math.abs(furlongs - yardsPerFurlong - feetPerYard); // random subtraction
    const distractorB = furlongs + Math.floor(yardsPerFurlong / feetPerYard); // random addition combo
    const distractorC = Math.floor(totalYards / feetPerYard); // divide by feet instead of multiply
    
    const optionsData = [
      { text: distractorA.toLocaleString(), isCorrect: false, reason: "results from incorrect arithmetic or operations such as subtracting values" },
      { text: distractorB.toLocaleString(), isCorrect: false, reason: "results from adding numbers or performing incorrect operations" },
      { text: distractorC.toLocaleString(), isCorrect: false, reason: "is obtained if you divide by $${feetPerYard}$ instead of multiplying" },
      { text: totalFeet.toLocaleString(), isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `A distance of $${furlongs}$ furlongs is equivalent to how many feet? ($1\\text{ furlong} = ${yardsPerFurlong}\\text{ yards}$ and $1\\text{ yard} = ${feetPerYard}\\text{ feet}$)`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: totalFeet.toLocaleString(),
      explanation: `Choice ${correctLetter} is correct. To convert furlongs to feet: First convert furlongs to yards: $${furlongs} \\text{ furlongs} \\times ${yardsPerFurlong} \\text{ yards/furlong} = ${totalYards.toLocaleString()} \\text{ yards}$. Then convert yards to feet: $${totalYards.toLocaleString()} \\text{ yards} \\times ${feetPerYard} \\text{ feet/yard} = ${totalFeet.toLocaleString()} \\text{ feet}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 96c3e32d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [area: 874 in², pressure: 19 psi]
 * - Difficulty factors: [Pressure × Area = Force, large number multiplication]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Must multiply]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

// File: generators/ratios-rates-proportional-relationships-and-units/96c3e32d.ts