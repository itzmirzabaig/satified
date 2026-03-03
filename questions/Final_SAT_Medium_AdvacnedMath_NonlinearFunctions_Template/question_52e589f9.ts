import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 52e589f9
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Function notation interpretation m(330) ≈ 362
 * - Number ranges: Days 330, mass 362 kg
 * - Difficulty: Medium - interpreting function output in context
 */

export const generator_52e589f9 = {
  metadata: {
    // id: "52e589f9",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const days = getRandomInt(200, 400);
    const mass = getRandomInt(300, 500);
    
    const questionText = `The function $m$ gives the predicted body mass $m(t)$, in kilograms (kg), of a certain animal $t$ days after it was born in a wildlife reserve, where $t \\leq 390$. Which of the following is the best interpretation of the statement "$m(${days})$ is approximately equal to ${mass}$" in this context?`;
    
    const correctAnswer = `The predicted body mass of the animal was approximately ${mass} kg ${days} days after it was born.`;
    
    const optionsData = [
      { text: `The predicted body mass of the animal was approximately ${days} kg ${mass} days after it was born.`, isCorrect: false, reason: "swaps the input and output values" },
      { text: `The predicted body mass of the animal was approximately ${mass} kg ${days} days after it was born.`, isCorrect: true },
      { text: `The predicted body mass of the animal was approximately ${mass} kg $\\frac{${days}}{7}$ days after it was born.`, isCorrect: false, reason: "incorrectly converts days to weeks" },
      { text: `The predicted body mass of the animal was approximately $\\frac{${days}}{7}$ kg ${mass} days after it was born.`, isCorrect: false, reason: "swaps values and incorrectly converts units" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. The function $m(t)$ gives the mass in kg at $t$ days. So $m(${days}) \\approx ${mass}$ means that after ${days} days, the mass is approximately ${mass} kg. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
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
 * Question ID: 4993b828
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Rectangle area expression interpretation
 * - Number ranges: Width w, length w+9
 * - Difficulty: Medium - same as 97158b3a
 */