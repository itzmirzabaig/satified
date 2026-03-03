import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 3918e8bc
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Quadratic projectile - initial height identification
 * - Number ranges: Coefficient 4.9, linear 7, constant 9
 * - Difficulty: Medium - identifying constant term meaning
 */

export const generator_3918e8bc = {
  metadata: {
    // id: "3918e8bc",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const gravityCoeff = 4.9;
    const velocityCoeff = getRandomInt(5, 12);
    const initialHeight = getRandomInt(5, 15);
    
    const questionText = `An object is kicked from a platform. The equation $h = -${gravityCoeff}t^2 + ${velocityCoeff}t + ${initialHeight}$ represents this situation, where $h$ is the height of the object above the ground, in meters, $t$ seconds after it is kicked. Which number represents the height, in meters, from which the object was kicked?`;
    
    const correctAnswer = initialHeight.toString();
    
    const optionsData = [
      { text: "0", isCorrect: false, reason: "represents ground level, not the starting height" },
      { text: gravityCoeff.toString(), isCorrect: false, reason: "represents half the acceleration due to gravity" },
      { text: velocityCoeff.toString(), isCorrect: false, reason: "represents the initial vertical velocity" },
      { text: initialHeight.toString(), isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. When $t=0$ (at the moment of being kicked), $h = -${gravityCoeff}(0)^2 + ${velocityCoeff}(0) + ${initialHeight} = ${initialHeight}$ meters. This is the initial height. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
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
 * Question ID: 7e5a3640
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential growth - doubling time calculation
 * - Number ranges: Initial 300000, doubles every 3 hours, after 15 hours
 * - Difficulty: Medium - calculating multiple doubling periods
 */