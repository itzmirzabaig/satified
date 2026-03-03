import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 37930b2a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [sample size: 200, percentage: 87% (high satisfaction rate)]
 * - Difficulty factors: [Understanding sampling vs population parameters, recognizing sampling variability]
 * - Distractor patterns: [I only (confusing sample stat with population parameter), 
 *   II only (ignoring sampling variability), 
 *   I and II (both errors combined)]
 * - Constraints: [Percentage must be realistic for satisfaction survey (70-95% range),
 *   Sample size must be large enough to be credible (100-500 range)]
 * - Question type: [Conceptual - No figure, Multiple choice text]
 * - Figure generation: [None - conceptual statistics question]
 */

export const generator_37930b2a = {
  metadata: {
    // id: "37930b2a",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Evaluating Statistical Claims Observational Studies And Experiments",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values within original ranges
    // Sample size: 100-500 (credible survey size)
    const sampleSize = getRandomInt(100, 500);
    // Satisfaction percentage: 70-95% (realistic range)
    const satisfactionPercent = getRandomInt(70, 95);
    // Location type for variety
    const locationTypes = [
      "local park",
      "community center",
      "public library",
      "recreation center",
      "town hall"
    ];
    const location = getRandomElement(locationTypes);
    // Survey topic for variety
    const topics = [
      "concession stand",
      "parking facilities",
      "maintenance services",
      "public Wi-Fi",
      "safety measures"
    ];
    const topic = getRandomElement(topics);
    
    // STEP 2: Create options with tracking
    const optionsData = [
      { text: "Neither", isCorrect: true },
      { text: "I only", isCorrect: false, reason: "confuses sample statistic with exact population parameter, ignoring margin of error" },
      { text: "II only", isCorrect: false, reason: "ignores sampling variability; different samples yield different results" },
      { text: "I and II", isCorrect: false, reason: "both statements confuse sample estimates with exact population values" }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 4: Build explanation with dynamic letters
    const explanation = `Choice ${correctLetter} is correct. ` +
      `Statement I need not be true because sample statistics provide estimates of population parameters, ` +
      `not exact values—there is always a margin of error. ` +
      `Statement II need not be true because of sampling variability; ` +
      `different random samples from the same population will likely yield slightly different results. ` +
      `Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. ` +
      `Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. ` +
      `Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    // STEP 5: Return question data
    return {
      questionText: `Residents of a town were surveyed to determine whether they are satisfied with the ${topic} at the ${location}. ` +
        `A random sample of ${sampleSize} residents was selected. All ${sampleSize} responded, and ${satisfactionPercent}% said they are satisfied. ` +
        `Based on this information, which of the following statements must be true? ` +
        `I. Of all the town residents, ${satisfactionPercent}% would say they are satisfied with the ${topic} at the ${location}. ` +
        `II. If another random sample of ${sampleSize} residents were surveyed, ${satisfactionPercent}% would say they are satisfied.`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: "Neither",
      explanation: explanation
    };
  }
};

/**
 * Question ID: b4f5a7ca
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [No specific numbers - conceptual sampling question]
 * - Difficulty factors: [Understanding generalization limits, identifying sampling frame vs target population]
 * - Distractor patterns: [All professors in US (overgeneralization), 
 *   All history professors in US (slightly narrowed but still overgeneralized),
 *   All professors at CSU (wrong profession - too broad)]
 * - Constraints: [Must maintain university system context,
 *   Must preserve subject matter (history) distinction]
 * - Question type: [Conceptual - No figure, Multiple choice text]
 * - Figure generation: [None - conceptual statistics question]
 */

// File: generators/evaluating-statistical-claims-observational-studies-and-experiments/b4f5a7ca.ts