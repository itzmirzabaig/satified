import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 4993b828
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Rectangle area expression interpretation
 * - Number ranges: Width w, length w+9
 * - Difficulty: Medium - same as 97158b3a
 */

export const generator_4993b828 = {
  metadata: {
    // id: "4993b828",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const diff = getRandomInt(5, 15);
    
    const questionText = `The area $A$, in square centimeters, of a rectangular cutting board can be represented by the expression $w(w+${diff})$, where $w$ is the width, in centimeters, of the cutting board. Which expression represents the length, in centimeters, of the cutting board?`;
    
    const correctAnswer = `$(w+${diff})$`;
    
    const optionsData = [
      { text: `$w(w+${diff})$`, isCorrect: false, reason: "represents the area, not a dimension" },
      { text: `$w$`, isCorrect: false, reason: "represents the width, not the length" },
      { text: `$${diff}$`, isCorrect: false, reason: "represents only the difference, not the full length" },
      { text: `$(w+${diff})$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. Area = length × width. Since area = $w(w+${diff})$ and width = $w$, the length must be $(w+${diff})$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
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
 * Question ID: 981aca65
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Rational function transformation
 * - Number ranges: Translation 3 down, 4 right
 * - Difficulty: Medium - horizontal and vertical shifts
 */