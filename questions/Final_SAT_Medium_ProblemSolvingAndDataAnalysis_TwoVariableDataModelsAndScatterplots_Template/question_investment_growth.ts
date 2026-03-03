import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: investment_growth_model
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Percentage: 0.49%]
 * - Difficulty factors: [Understanding exponential growth vs linear growth]
 * - Distractor patterns: [Decreasing exponential, Decreasing linear, Increasing exponential (correct), Increasing linear]
 * - Constraints: [Fixed percentage growth = exponential, increase = positive]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [null - conceptual question]
 */

export const generator_investment_growth = {
  metadata: {
    // id: "investment_growth_model",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const percent = (getRandomInt(4, 8) / 10).toFixed(2);
    
    const optionsData = [
      { 
        text: "Decreasing exponential", 
        isCorrect: false,
        reason: "is incorrect because the value is increasing, not decreasing"
      },
      { 
        text: "Decreasing linear", 
        isCorrect: false,
        reason: "is incorrect because the change is based on a percentage, not a fixed amount, and it is increasing"
      },
      { 
        text: "Increasing exponential", 
        isCorrect: true,
        reason: ""
      },
      { 
        text: "Increasing linear", 
        isCorrect: false,
        reason: "is incorrect because a linear model would imply the value increases by the same fixed dollar amount each year, not a percentage of the changing value"
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
      questionText: `Each year, the value of an investment increases by ${percent}% of its value the previous year. Which of the following functions best models how the value of the investment changes over time?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. When a quantity changes by a constant percentage or rate relative to its current value, it is modeled by an exponential function. Since the increase is a percentage (${percent}%) of the previous year's value, this represents exponential growth. The problem explicitly states that the value increases, so the function must be increasing. Choice ${incorrectOptions[0].letter} ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} ${incorrectOptions[2].reason}.`
    };
  }
};