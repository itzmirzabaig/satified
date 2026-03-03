import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



export const generator_341ba5db = {
  metadata: {
    // id: "341ba5db",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const minValue = getRandomInt(30, 80);
    
    const questionText = `What is the minimum value of the given function? $$g(x) = x^2 + ${minValue}$$`;
    
    const optionsData = [
      { text: `$$0$$`, isCorrect: false, reason: "while $0$ is the minimum value of $x^2$, the function adds ${minValue} to it" },
      { text: `$$${minValue}$$`, isCorrect: true },
      { text: `$$${2 * minValue}$$`, isCorrect: false, reason: "results from incorrectly adding ${minValue} + ${minValue}" },
      { text: `$$${minValue * minValue}$$`, isCorrect: false, reason: "results from squaring ${minValue}, which has no basis in the function's properties" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `${minValue}`;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. The function $g(x) = x^2 + ${minValue}$ represents a parabola that opens upward. Since the coefficient of $x^2$ is positive, the minimum occurs at the vertex. The term $x^2$ is always non-negative, with a minimum of $0$ when $x = 0$. Therefore, the minimum value of $g(x)$ is $0 + ${minValue} = ${minValue}$. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};