import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 7ac5d686
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Conceptual - no numbers]
 * - Difficulty factors: [Understanding linear vs exponential models, interpreting constant rate]
 * - Distractor patterns: [A (positive slope - wrong direction), C (exponential growth), D (exponential decay)]
 * - Constraints: [Constant rate = linear, decreasing quantity = negative slope]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [null - conceptual question]
 */

export const generator_7ac5d686 = {
  metadata: {
    // id: "7ac5d686",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const optionsData = [
      { 
        text: "A linear model with a positive slope", 
        isCorrect: false,
        reason: "is incorrect and may result from incorrectly reasoning about the slope"
      },
      { 
        text: "A linear model with a negative slope", 
        isCorrect: true,
        reason: ""
      },
      { 
        text: "An exponential growth model", 
        isCorrect: false,
        reason: "is incorrect and may result from not identifying the constant rate of work as a characteristic of a linear model"
      },
      { 
        text: "An exponential decay model", 
        isCorrect: false,
        reason: "is incorrect and may result from not identifying the constant rate of work as a characteristic of a linear model"
      }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: "An inspector begins a day of work with a large sample of shirts that need to be checked for defects. The inspector works at a constant rate throughout the morning. What type of model is best to model the number of shirts remaining to be checked for defects at any given time throughout the morning?",
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. Since the work is done at a constant rate, a linear model best models the situation. The number of shirts remaining is dependent on the length of time the inspector has worked; therefore, if the relationship were graphed, time would be the variable of the horizontal axis and the number of remaining shirts would be the variable of the vertical axis. Since the number of shirts decreases as the time worked increases, it follows that the slope of this graph is negative. Choice ${incorrectOptions[0].letter} ${incorrectOptions[0].reason}. Choices ${incorrectOptions[1].letter} and ${incorrectOptions[2].letter} ${incorrectOptions[1].reason}.`
    };
  }
};

/**
 * Question ID: 7fd284ac
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x-values: 1400-6100, y-values: 74-92, slope: ~0.0017, intercept: ~78.95]
 * - Difficulty factors: [Reading scatterplot with scaled axes, finding highest point, calculating residual]
 * - Distractor patterns: [10%, 7% (correct), 4%, 1%]
 * - Constraints: [Must have point at approximately (3700, 92) as highest]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Scatterplot with positive trend, specific axis labels]
 */