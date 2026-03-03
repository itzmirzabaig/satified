import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



export const generator_beca03de = {
  metadata: {
    // id: "beca03de",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const multiplier = getRandomInt(5, 25);
    
    const questionText = `A rectangle has a length that is $${multiplier}$ times its width. The function $y = (${multiplier}w)(w)$ represents this situation, where $y$ is the area, in square feet, of the rectangle and $y > 0$. Which of the following is the best interpretation of $${multiplier}w$ in this context?`;
    
    const optionsData = [
      { text: `The length of the rectangle, in feet`, isCorrect: true },
      { text: `The area of the rectangle, in square feet`, isCorrect: false, reason: "confuses the entire product (area) with one factor" },
      { text: `The difference between the length and the width of the rectangle, in feet`, isCorrect: false, reason: "incorrectly suggests subtraction rather than multiplication relationship" },
      { text: `The width of the rectangle, in feet`, isCorrect: false, reason: "confuses the width (w) with the length expression" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = correctOption!.text;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. The problem states that "A rectangle has a length that is $${multiplier}$ times its width." In the function $y = (${multiplier}w)(w)$, the term $w$ represents the width. Since the length is $${multiplier}$ times the width, the expression for length is $${multiplier}w$. This is one of the factors being multiplied to give the area $y$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};