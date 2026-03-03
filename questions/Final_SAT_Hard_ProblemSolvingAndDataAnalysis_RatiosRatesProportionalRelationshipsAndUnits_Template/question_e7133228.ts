import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: e7133228
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [acceleration: 7.3 (single decimal), conversion: 1 mile = 1609m]
 * - Difficulty factors: [Complex unit conversion with squared time units, dimensional analysis]
 * - Distractor patterns: [0.3: dividing by 60 instead of 60², 195.8/220.4: calculation errors]
 * - Constraints: [Must convert m/s² to mi/min² using squared conversion factor]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual]
 */

export const generator_e7133228 = {
  metadata: {
    // id: "e7133228",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate acceleration value (single decimal as in 7.3)
    const acceleration = parseFloat((Math.random() * 9 + 1).toFixed(1)); // 1.0 to 10.0
    
    // STEP 2: Conversion factors
    const metersPerMile = 1609;
    const secondsPerMinute = 60;
    
    // STEP 3: Calculate correct conversion
    // m/s² × (1 mi/1609 m) × (60 s/1 min)² = m/s² × (1/1609) × 3600 mi/min²
    const conversionFactor = (secondsPerMinute * secondsPerMinute) / metersPerMile;
    const result = acceleration * conversionFactor;
    const resultRounded = Math.round(result * 10) / 10; // Round to nearest tenth
    
    // STEP 4: Generate distractors
    // A: Dividing by 60 instead of multiplying by 60²
    const distractorA = Math.round((acceleration / metersPerMile) * secondsPerMinute * 10) / 10;
    // C: Using 60 instead of 3600 but then other errors
    const distractorC = Math.round((acceleration * secondsPerMinute / metersPerMile) * 10) / 10;
    // D: Inverting the mile-meter conversion
    const distractorD = Math.round(acceleration * metersPerMile / (secondsPerMinute * secondsPerMinute) * 10) / 10;
    
    // Ensure distractors are unique
    const distractorValues = [distractorA, distractorC, distractorD];
    const uniqueDistractors = distractorValues.filter((d, i, arr) => 
      d !== resultRounded && arr.indexOf(d) === i
    );
    
    // Fill in if needed
    while (uniqueDistractors.length < 3) {
      const variation = resultRounded + (getRandomInt(1, 5) * 0.1 * (Math.random() > 0.5 ? 1 : -1));
      const newDistractor = Math.round(variation * 10) / 10;
      if (newDistractor !== resultRounded && !uniqueDistractors.includes(newDistractor) && newDistractor > 0) {
        uniqueDistractors.push(newDistractor);
      }
    }
    
    // STEP 5: Create and shuffle options
    const correctText = resultRounded.toFixed(1);
    const optionsData = [
      { text: uniqueDistractors[0].toFixed(1), isCorrect: false, reason: "results from dividing by 60 instead of multiplying by 60²" },
      { text: correctText, isCorrect: true },
      { text: uniqueDistractors[1].toFixed(1), isCorrect: false, reason: "results from conceptual errors in unit conversion" },
      { text: uniqueDistractors[2].toFixed(1), isCorrect: false, reason: "results from inverting the mile-meter conversion" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. To convert ${acceleration} m/s² to mi/min²: multiply by (1 mile/${metersPerMile} meters) and by (${secondsPerMinute}²) since time is squared. This gives ${acceleration} × ${conversionFactor.toFixed(4)} = ${resultRounded} mi/min². Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `The speed of a vehicle is increasing at a rate of $${acceleration}$ meters per second squared. What is this rate, in **miles per minute squared**, rounded to the nearest tenth? (Use $1 \\text{ mile} = 1,609 \\text{ meters}$.)`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 3638f413
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [final amount: 480 (triple-digit), years: 4 (doubling periods)]
 * - Difficulty factors: [Exponential decay/growth, working backwards from final to initial]
 * - Distractor patterns: [Fill-in-the-blank - no distractors needed]
 * - Constraints: [Final amount must be divisible by 2⁴ = 16 for clean integer answer]
 * - Question type: [Text→Fill-in-the-blank]
 * - Figure generation: [None - conceptual]
 */