import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 901
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

export const generator_901 = {
  metadata: {
    id: "901",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Evaluating Statistical Claims Observational Studies And Experiments",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values for variation
    // University system types
    const uniSystems = [
      "California State Universities",
      "University of Texas System",
      "State University of New York",
      "University of North Carolina System",
      "Pennsylvania State System"
    ];
    const uniSystem = getRandomElement(uniSystems);
    
    // Academic disciplines
    const disciplines = [
      "history",
      "mathematics",
      "biology",
      "economics",
      "psychology",
      "literature"
    ];
    const discipline = getRandomElement(disciplines);
    
    // Survey topics (textbook related)
    const topics = [
      "publishers of their current texts",
      "cost of required textbooks",
      "frequency of textbook updates",
      "use of digital textbooks",
      "open educational resources"
    ];
    const topic = getRandomElement(topics);
    
    // STEP 2: Create options with tracking
    // Correct answer: specific to the sampled population
    const correctText = `All ${discipline} professors at all ${uniSystem}`;
    
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `All professors in the United States`, isCorrect: false, reason: "overgeneralizes beyond the sampling frame" },
      { text: `All ${discipline} professors in the United States`, isCorrect: false, reason: "overgeneralizes beyond the specific university system surveyed" },
      { text: `All professors at all ${uniSystem}`, isCorrect: false, reason: "expands beyond the specific discipline surveyed" }
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
      `Selecting a sample at random when conducting a survey allows the results to be generalized ` +
      `to the population from which the sample was selected, but not beyond this population. ` +
      `In this situation, the population that the sample was selected from is ${discipline} professors ` +
      `from the ${uniSystem}. Therefore, the largest population to which the results can be generalized ` +
      `is all ${discipline} professors at all ${uniSystem}. ` +
      `Choice ${incorrectOptions[0].letter} is incorrect because it ${incorrectOptions[0].reason}. ` +
      `Choice ${incorrectOptions[1].letter} is incorrect because it ${incorrectOptions[1].reason}. ` +
      `Choice ${incorrectOptions[2].letter} is incorrect because it ${incorrectOptions[2].reason}.`;
    
    // STEP 5: Return question data
    return {
      questionText: `A survey was conducted using a sample of ${discipline} professors selected at random ` +
        `from the ${uniSystem}. The professors surveyed were asked to name the ${topic}. ` +
        `What is the largest population to which the results of the survey can be generalized?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
