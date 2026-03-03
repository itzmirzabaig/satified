import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 4a422e3e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [sample size: 20, mean: 2.4]
 * - Difficulty factors: [Recognizing sampling bias - location-based selection]
 * - Distractor patterns: [A=accepts sample statistic as population parameter, B=blames sample size, C=identifies bias (correct), D=claims no bias]
 * - Constraints: [Convenience sample at playground creates bias toward families with children]
 * - Question type: [Conceptual - No figure needed]
 * - Figure generation: [None]
 */

export const generator_4a422e3e = {
  metadata: {
    // id: "4a422e3e",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Evaluating Statistical Claims Observational Studies And Experiments",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 20 families, mean 2.4 children
    const sampleSize = getRandomInt(15, 30);
    const meanChildren = (getRandomInt(12, 32) / 10).toFixed(1); // 1.2 to 3.2
    
    // Randomize context elements
    const locations = ["playground", "children's museum", "pediatrician's office waiting room", "school pickup area", "family restaurant"];
    const location = getRandomElement(locations);
    
    const researchers = ["Tabitha", "Maria", "James", "Dr. Chen", "Sarah"];
    const researcher = getRandomElement(researchers);
    
    const topics = [
      "mean number of children per household",
      "average number of pets per family",
      "average weekly hours spent on outdoor activities",
      "mean monthly spending on children's activities"
    ];
    const topic = getRandomElement(topics);
    
    const units: Record<string, string> = {
      "mean number of children per household": "children",
      "average number of pets per family": "pets",
      "average weekly hours spent on outdoor activities": "hours",
      "mean monthly spending on children's activities": "dollars"
    };
    const unit = units[topic];
    
    // STEP 2: Create options with tracking
    const optionsData = [
      { 
        text: `The ${topic} in the community is ${meanChildren}.`, 
        isCorrect: false,
        reason: "the sampling method is biased, so the sample mean cannot be assumed to equal the population mean"
      },
      { 
        text: "A determination about the " + topic + " in the community should not be made because the sample size is too small.", 
        isCorrect: false,
        reason: "a sample of this size could be sufficient if it were randomly selected; the issue is bias, not sample size"
      },
      { 
        text: "The sampling method is flawed and may produce a biased estimate of the " + topic + " in the community.", 
        isCorrect: true,
        reason: "families at a " + location + " are more likely to have children than other households, creating selection bias"
      },
      { 
        text: "The sampling method is not flawed and is likely to produce an unbiased estimate of the " + topic + " in the community.", 
        isCorrect: false,
        reason: "the location-based sampling systematically excludes households without children"
      }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 4: Return question data
    return {
      questionText: `To determine the ${topic} in a community, ${researcher} surveyed ${sampleSize} families at a ${location}. For the ${sampleSize} families surveyed, the ${topic} was ${meanChildren}. Which of the following statements must be true?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. ${correctOption.reason}. In order to use a sample statistic to estimate a population parameter, the sample must be representative of the population. The ${location} location is more likely to attract families with ${unit === "children" ? "children" : "families"} than other locations in the community, so the sample is not representative. Choice ${incorrectOptions[0].letter} is incorrect because ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect because ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect because ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 6fca0144
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [tree age: specific value, years of treatment: consecutive years]
 * - Difficulty factors: [Understanding experimental scope - randomly selected from specific age group in specific location]
 * - Distractor patterns: [A=sample only, B=wrong age group, C=geographic over-generalization, D=correct specific group]
 * - Constraints: [Random assignment to groups within specific age cohort from specific habitat]
 * - Question type: [Conceptual - No figure needed]
 * - Figure generation: [None]
 */