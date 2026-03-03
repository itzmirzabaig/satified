import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 642519d7
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [sample size: 1000, percentage: 78%]
 * - Difficulty factors: [Distinguishing between sample statistics and population parameters,
 *   Understanding sampling variability across repeated samples,
 *   Recognizing external validity limits (different cities)]
 * - Distractor patterns: [II only (accepts sampling variability but misses other issues),
 *   I and II only (accepts population estimate and sample stability),
 *   I and III only (accepts population estimate and external validity)]
 * - Constraints: [Sample size must be large (500-2000),
 *   Percentage must be realistic (60-85% range for environmental questions),
 *   City context must be maintained]
 * - Question type: [Conceptual - No figure, Multiple choice text]
 * - Figure generation: [None - conceptual statistics question]
 */

export const generator_642519d7 = {
  metadata: {
    // id: "642519d7",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Evaluating Statistical Claims Observational Studies And Experiments",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values within original ranges
    // Sample size: 500-2000 (large city survey)
    const sampleSize = getRandomInt(500, 2000);
    // Satisfaction percentage: 60-85% (realistic for environmental quality)
    const satisfactionPercent = getRandomInt(60, 85);
    // Environmental topics
    const envTopics = [
      "quality of air",
      "cleanliness of streets",
      "availability of green spaces",
      "noise pollution levels",
      "quality of drinking water",
      "waste management services"
    ];
    const topic = getRandomElement(envTopics);
    
    // STEP 2: Create options with tracking
    const optionsData = [
      { text: "None", isCorrect: true },
      { text: "II only", isCorrect: false, reason: "fails to account for sampling variability between different samples" },
      { text: "I and II only", isCorrect: false, reason: "treats sample statistics as exact population parameters and ignores sampling variability" },
      { text: "I and III only", isCorrect: false, reason: "incorrectly assumes results generalize to both the whole population and different cities" }
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
      `Statement I need not be true. The fact that ${satisfactionPercent}% of the ${sampleSize} adults ` +
      `who were surveyed responded that they were satisfied with the ${topic} in the city does not mean ` +
      `that the exact same percentage of all adults in the city will be satisfied. ` +
      `Statement II need not be true because random samples, even when they are of the same size, ` +
      `are not necessarily identical with regard to percentages of people in them who have a certain opinion. ` +
      `Statement III need not be true for the same reason that statement II need not be true: ` +
      `results from different samples can vary. The variation may be even bigger for this sample since ` +
      `it would be selected from a different city. Therefore, none of the statements must be true. ` +
      `Choice ${incorrectOptions[0].letter} is incorrect because it ${incorrectOptions[0].reason}. ` +
      `Choice ${incorrectOptions[1].letter} is incorrect because it ${incorrectOptions[1].reason}. ` +
      `Choice ${incorrectOptions[2].letter} is incorrect because it ${incorrectOptions[2].reason}.`;
    
    // STEP 5: Return question data
    return {
      questionText: `A polling agency recently surveyed ${sampleSize} adults who were selected at random ` +
        `from a large city and asked each of the adults, "Are you satisfied with the ${topic} in the city?" ` +
        `Of those surveyed, ${satisfactionPercent} percent responded that they were satisfied with the ${topic} in the city. ` +
        `Based on the results of the survey, which of the following statements must be true? ` +
        `1. Of all adults in the city, ${satisfactionPercent} percent are satisfied with the ${topic} in the city. ` +
        `2. If another ${sampleSize} adults selected at random from the city were surveyed, ${satisfactionPercent} percent ` +
        `of them would report they are satisfied with the ${topic} in the city. ` +
        `3. If ${sampleSize} adults selected at random from a different city were surveyed, ${satisfactionPercent} percent ` +
        `of them would report they are satisfied with the ${topic} in the city.`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: "None",
      explanation: explanation
    };
  }
};