import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 97158b3a
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Rectangle area expression interpretation
 * - Number ranges: Width w, length w+29
 * - Difficulty: Medium - understanding area formula components
 * - Distractor patterns: Confusing width with length, confusing area with dimension
 */

export const generator_97158b3a = {
  metadata: {
    // id: "97158b3a",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const diff = getRandomInt(15, 35);
    
    const questionText = `The area $A$, in square centimeters, of a rectangular painting can be represented by the expression $w(w+${diff})$, where $w$ is the width, in centimeters, of the painting. Which expression represents the length, in centimeters, of the painting?`;
    
    const correctAnswer = `$(w+${diff})$`;
    
    const optionsData = [
      { text: `$w$`, isCorrect: false, reason: "represents the width, not the length" },
      { text: `$${diff}$`, isCorrect: false, reason: "represents only the difference between length and width, not the full length" },
      { text: `$(w+${diff})$`, isCorrect: true },
      { text: `$w(w+${diff})$`, isCorrect: false, reason: "represents the area, not a single dimension" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. The area of a rectangle is length × width. Since the area is $w(w+${diff})$ and $w$ is the width, the length must be $(w+${diff})$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer,
      explanation
    };
  }
};

/**
 * Question ID: 98124239
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential model from two points
 * - Number ranges: Initial ~36100, final ~68071 after 13 years
 * - Difficulty: Medium - deriving exponential equation from data points
 * - Distractor patterns: Wrong initial value, decay instead of growth
 */