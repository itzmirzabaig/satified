import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: aa43b41f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [yes: 28%, no: 70% (doesn't sum to 100% - implies "don't know/no opinion" or rounding)]
 * - Difficulty factors: [Understanding voluntary response bias, non-random sampling]
 * - Distractor patterns: [A=percentages don't sum (mathematically wrong reason), B=not random sample (correct), C=expects 50/50 split, D=time constraint]
 * - Constraints: [Voluntary response poll, specific media audience, self-selection bias]
 * - Question type: [Conceptual - No figure needed]
 * - Figure generation: [None]
 */

export const generator_aa43b41f = {
  metadata: {
    // id: "aa43b41f",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Evaluating Statistical Claims Observational Studies And Experiments",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Generate percentages that don't sum to 100% (like original 28% + 70% = 98%)
    const yesPercent = getRandomInt(20, 45);
    const noPercent = getRandomInt(60, 80);
    // The "missing" percentage represents other responses or rounding
    
    // Randomize context elements
    const mediaTypes = ["cable news", "network news", "radio talk", "streaming news"];
    const mediaType = getRandomElement(mediaTypes);
    
    const showTypes = ["political talk show", "morning news program", "evening news broadcast", "weekend roundtable"];
    const showType = getRandomElement(showTypes);
    
    const topics = [
      "the new federal infrastructure policy",
      "the proposed education reform bill",
      "the recent tax legislation",
      "the new environmental regulations",
      "the healthcare policy changes"
    ];
    const topic = getRandomElement(topics);
    
    const timing = ["Near the end", "During the middle", "At the beginning"];
    const time = getRandomElement(timing);
    
    // STEP 2: Create options with tracking
    const optionsData = [
      { 
        text: "The percentages do not add up to 100%, so any possible conclusions from the poll are invalid.", 
        isCorrect: false,
        reason: "percentages not summing to 100% can occur due to rounding or a third response category, and doesn't invalidate the representativeness issue"
      },
      { 
        text: "Those who responded to the poll were not a random sample of the population of the United States.", 
        isCorrect: true,
        reason: "the poll relied on voluntary response from viewers with specific media access and interest, creating selection bias"
      },
      { 
        text: "There were not 50% \"Yes\" responses and 50% \"No\" responses.", 
        isCorrect: false,
        reason: "an even split is not expected or required for a representative sample"
      },
      { 
        text: "The show did not allow viewers enough time to respond to the poll.", 
        isCorrect: false,
        reason: "time constraints do not explain why the sample is unrepresentative of the general population"
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
      questionText: `${time} of a US ${mediaType} ${showType}, the host invited viewers to respond to a poll on the show's website that asked, "Do you support ${topic} discussed during the show?" At the end of the show, the host reported that ${yesPercent}% responded "Yes," and ${noPercent}% responded "No." Which of the following best explains why the results are unlikely to represent the sentiments of the population of the United States?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. ${correctOption.reason}. In order for poll results from a sample to represent an entire population, the sample must be representative. The people who responded were those with access to ${mediaType} and websites, who chose to watch the show, and who chose to respond. These self-selected individuals are not representative of the entire US population because they were not randomly selected. Choice ${incorrectOptions[0].letter} is incorrect because ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect because ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect because ${incorrectOptions[2].reason}.`
    };
  }
};

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