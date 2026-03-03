import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 7d093333
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [250 sq ft/hour, conversion 1m = 3.28ft]
 * - Difficulty factors: [Area unit conversion with squared units, time conversion, small result]
 * - Distractor patterns: [0.39: correct, others are various miscalculations]
 * - Constraints: [1 sq m = 10.7584 sq ft, 1 hour = 60 min, result is small ~0.39]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual]
 */

export const generator_7d093333 = {
  metadata: {
    // id: "7d093333",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate rate (250 in original)
    const rateSqFtPerHour = getRandomInt(200, 300);
    const feetPerMeter = 3.28; // Given conversion
    
    // STEP 2: Convert
    const sqFtPerSqMeter = feetPerMeter * feetPerMeter; // ~10.7584
    const rateSqMeterPerHour = rateSqFtPerHour / sqFtPerSqMeter;
    const rateSqMeterPerMinute = rateSqMeterPerHour / 60;
    const resultRounded = Math.round(rateSqMeterPerMinute * 100) / 100; // To nearest hundredth
    
    // STEP 3: Distractors (various calculation errors)
    const distractorB = Math.max(0.01, resultRounded * 3.2).toFixed(2); // About 3.3x larger
    const distractorC = Math.max(0.01, resultRounded * 35).toFixed(2); // Much larger
    const distractorD = Math.max(0.01, resultRounded * 60).toFixed(2); // Forgot time conversion
    
    // Ensure distractors are unique
    const distractorValues = [parseFloat(distractorB), parseFloat(distractorC), parseFloat(distractorD)];
    const uniqueDistractors = distractorValues.filter((d, i, arr) => 
      d !== resultRounded && arr.indexOf(d) === i && d > 0
    );
    
    while (uniqueDistractors.length < 3) {
      const factor = [2, 5, 10, 20][getRandomInt(0, 3)];
      const newDistractor = Math.round(resultRounded * factor * 100) / 100;
      if (newDistractor !== resultRounded && !uniqueDistractors.includes(newDistractor) && newDistractor > 0) {
        uniqueDistractors.push(newDistractor);
      }
    }
    
    // STEP 4: Create and shuffle options
    const correctText = resultRounded.toFixed(2);
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: uniqueDistractors[0].toFixed(2), isCorrect: false, reason: "results from errors in the area conversion factor" },
      { text: uniqueDistractors[1].toFixed(2), isCorrect: false, reason: "results from significant calculation errors" },
      { text: uniqueDistractors[2].toFixed(2), isCorrect: false, reason: "results from omitting the time unit conversion" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. $1 \\text{ m} = ${feetPerMeter} \\text{ ft}$, so $1 \\text{ m}^2 = ${(feetPerMeter * feetPerMeter).toFixed(4)} \\text{ ft}^2$. Converting: $${rateSqFtPerHour} \\frac{\\text{ft}^2}{\\text{hour}} \\times \\frac{1 \\text{ m}^2}{${(feetPerMeter * feetPerMeter).toFixed(4)} \\text{ ft}^2} \\times \\frac{1 \\text{ hour}}{60 \\text{ min}} \\approx ${correctText} \\frac{\\text{m}^2}{\\text{min}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `The area of a rectangular region is increasing at a rate of $${rateSqFtPerHour}$ square feet per hour. Which of the following is closest to this rate in square meters per minute? (Use $1$ meter $=$ $${feetPerMeter}$ feet.)`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 20b69297
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [first batch: 2 blue, 3 yellow, second batch: 5 blue]
 * - Difficulty factors: [Ratio reasoning, abstract relationship vs concrete calculation]
 * - Distractor patterns: [A: exactly 5 (confusing with blue), B: 3 more (additive error), C: 1.5x first yellow (wrong reference)]
 * - Constraints: [Correct answer D: 1.5x second blue amount]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual]
 */