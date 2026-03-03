import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 1c29bfd1
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 14.70, rate: 0.44, depth: 105]
 * - Difficulty factors: [Decimal arithmetic, rate application]
 * - Distractor patterns: [B = just water pressure, C = initial only, D = rate only]
 * - Constraints: [None - straightforward calculation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1c29bfd1 = {
  metadata: {
    // id: "1c29bfd1",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Initial pressure: 13-15 (atmospheric pressure range)
    const initial = Math.round((Math.random() * 2 + 13) * 100) / 100;
    // Rate: 0.3-0.6 psi per foot
    const rate = Math.round((Math.random() * 0.3 + 0.3) * 100) / 100;
    // Depth: 80-120 feet
    const depth = getRandomInt(80, 120);
    
    // STEP 2: Calculate answer
    const additionalPressure = Math.round(rate * depth * 100) / 100;
    const totalPressure = Math.round((initial + additionalPressure) * 100) / 100;
    
    // STEP 3: Create options
    const correctText = totalPressure.toFixed(2);
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: additionalPressure.toFixed(2), isCorrect: false, reason: "only calculates the water pressure at depth, not adding atmospheric pressure" },
      { text: initial.toFixed(2), isCorrect: false, reason: "only gives the pressure at sea level" },
      { text: rate.toFixed(2), isCorrect: false, reason: "gives the rate of increase per foot, not total pressure" }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 5: Return question data
    return {
      questionText: `The pressure exerted on a scuba diver at sea level is ${initial.toFixed(2)} pounds per square inch (psi). For each foot the scuba diver descends below sea level, the pressure exerted on the scuba diver increases by ${rate.toFixed(2)} psi. What is the total pressure, in psi, exerted on the scuba diver at ${depth} feet below sea level?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Total pressure = initial pressure + (rate × depth) = ${initial.toFixed(2)} + (${rate.toFixed(2)} × ${depth}) = ${initial.toFixed(2)} + ${additionalPressure.toFixed(2)} = ${correctText}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: e470e19d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 7, intercept: -84]
 * - Difficulty factors: [Finding x-intercept]
 * - Distractor patterns: [A = negative of correct, B = slope as intercept, C = slope value]
 * - Constraints: [Intercept must be divisible by slope for integer answer]
 * - Question type: [Text→Multiple Choice Text with coordinate answers]
 * - Figure generation: [None]
 */