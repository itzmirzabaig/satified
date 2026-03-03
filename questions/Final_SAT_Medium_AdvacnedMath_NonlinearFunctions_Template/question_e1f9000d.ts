import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



export const generator_e1f9000d = {
  metadata: {
    // id: "e1f9000d",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const tNice = getRandomInt(10, 20);
    const h0 = 16 * tNice * tNice;
    
    const wrongA = (tNice / 2).toFixed(2);
    
    const questionText = `The function $h(t) = -16t^2 + b$ estimates an object's height, in feet, above the ground $t$ seconds after the object is dropped, where $b$ is a constant. The function estimates that the object is $${h0}$ feet above the ground when it is dropped at $t = 0$. Approximately how many seconds after being dropped does the function estimate the object will hit the ground?`;
    
    const optionsData = [
      { text: `$${wrongA}$`, isCorrect: false, reason: `this would be the time at which the height is $${Math.round(-16 * Math.pow(tNice/2, 2) + h0)}$ feet, not when it hits the ground` },
      { text: `$${tNice.toFixed(2)}$`, isCorrect: true },
      { text: `$${(tNice * 7).toFixed(2)}$`, isCorrect: false, reason: "results from conceptual or calculation errors" },
      { text: `$${(tNice * tNice).toFixed(2)}$`, isCorrect: false, reason: "this equals $t^2$, not $t$" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `${tNice.toFixed(2)}`;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. When the object hits the ground, $h(t) = 0$. Substituting $h(t) = -16t^2 + ${h0}$: $0 = -16t^2 + ${h0}$. Adding $16t^2$ to both sides: $16t^2 = ${h0}$. Dividing by 16: $t^2 = ${h0/16}$. Taking the square root: $t = ${Math.sqrt(h0/16)} = ${tNice}$. Therefore, the object hits the ground after approximately ${tNice.toFixed(2)} seconds. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};