import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: d28c29e1
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [speed: 4.76 (single-decimal precision), conversion: 3600 (60*60)]
 * - Difficulty factors: [Unit conversion, time conversion seconds to hours]
 * - Distractor patterns: [A: multiply by 60 once, B: multiply by 2, C: multiply by 3]
 * - Constraints: [Must maintain decimal precision]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_d28c29e1 = {
  metadata: {
    // id: "d28c29e1",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original used 4.76 miles per second (single decimal, 1-10 range)
    const speedTenths = getRandomInt(15, 95); // 1.5 to 9.5 mph range
    const speed = speedTenths / 10; // Convert to decimal (e.g., 4.76 → random 1.5-9.5)
    
    // STEP 2: Calculate correct answer
    // Convert miles per second to miles per hour: multiply by 3600
    const correctValue = speed * 3600;
    
    // STEP 3: Create distractors based on SAT error patterns
    // A: Multiply by 60 once (convert to minutes, not hours)
    const distractorA = speed * 60;
    // B: Multiply by 60 then by 2 (arbitrary)
    const distractorB = speed * 60 * 2;
    // C: Multiply by 60 then by 3 (arbitrary)
    const distractorC = speed * 60 * 3;
    
    const correctText = correctValue.toFixed(1);
    
    const optionsData = [
      { text: distractorA.toFixed(1), isCorrect: false, reason: "results from multiplying by 60 only once, converting to miles per minute" },
      { text: distractorB.toFixed(1), isCorrect: false, reason: "results from multiplying by 60 then by 2, which is not a standard conversion" },
      { text: distractorC.toFixed(1), isCorrect: false, reason: "results from multiplying by 60 then by 3, which is not a standard conversion" },
      { text: correctText, isCorrect: true }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 5: Return question data
    return {
      questionText: `The International Space Station orbits Earth at an average speed of $${speed}$ miles per second. What is the space station's average speed in miles per hour?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. To convert miles per second to miles per hour, multiply by 3,600 (60 seconds × 60 minutes): $${speed} \\times 3,600 = ${correctText}$ miles per hour. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: b4912cc5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [density: 2.5 to 3.3, area: 100,250 (large fixed number)]
 * - Difficulty factors: [Population density calculation, difference calculation]
 * - Distractor patterns: [A: total population 2014, B: miscalculation, C: miscalculation]
 * - Constraints: [Area remains constant]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/ratios-rates-proportional-relationships-and-units/b4912cc5.ts