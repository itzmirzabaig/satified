import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 5bf0f84a
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Quadratic function interpretation - initial height
 * - Number ranges: Coefficient 16, linear coefficient 110, constant 72
 * - Difficulty: Medium - identifying y-intercept meaning in context
 * - Distractor patterns: Confusing initial height with max height, speed vs height
 */

export const generator_5bf0f84a = {
  metadata: {
    // id: "5bf0f84a",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const gravityCoeff = 16;
    const linearCoeff = getRandomInt(80, 120);
    const initialHeight = getRandomInt(50, 100);
    
    const questionText = `The function $h(t)=-${gravityCoeff} t^{2}+${linearCoeff} t+${initialHeight}$ models the height $h$, in feet, of an object above ground $t$ seconds after being launched straight up in the air. What does the number ${initialHeight} represent in the function?`;
    
    const correctAnswer = "The initial height, in feet, of the object";
    
    const optionsData = [
      { text: `The initial height, in feet, of the object`, isCorrect: true },
      { text: `The maximum height, in feet, of the object`, isCorrect: false, reason: "confuses initial value with maximum value" },
      { text: `The initial speed, in feet per second, of the object`, isCorrect: false, reason: "confuses height with velocity (the linear coefficient represents initial velocity)" },
      { text: `The maximum speed, in feet per second, of the object`, isCorrect: false, reason: "confuses height with speed" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. In the function $h(t)=-${gravityCoeff} t^{2}+${linearCoeff} t+${initialHeight}$, the variable $t$ represents seconds after launch. When $t=0$, the height is $h(0)=-${gravityCoeff}(0)^{2}+${linearCoeff}(0)+${initialHeight}=${initialHeight}$ feet. This is the initial height. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
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
 * Question ID: 70ebd3d0
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential decay interpretation - percent decrease
 * - Number ranges: Initial 115, decay base 0.90, depth in hundreds of meters
 * - Difficulty: Medium - understanding exponential decay rate interpretation
 * - Distractor patterns: Confusing linear vs exponential, wrong unit scale
 */