import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



export const generator_cb29c54c = {
  metadata: {
    // id: "cb29c54c",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const coefficient = -1 * getRandomInt(10, 25);
    const h = (getRandomInt(10, 100) / 10);
    const k = getRandomInt(100, 900);
    
    const questionText = `A physics class is planning an experiment about a toy rocket. The equation $y=${coefficient}(x-${h})^{2}+${k}$ gives the estimated height $y$, in feet, of the toy rocket $x$ seconds after it is launched into the air. Which of the following is the best interpretation of the vertex of the graph of the equation in the xy-plane?`;
    
    const optionsData = [
      { text: `This toy rocket reaches an estimated maximum height of ${coefficient} feet ${h} seconds after it is launched into the air.`, isCorrect: false, reason: "confuses the coefficient (${coefficient}) with the maximum height" },
      { text: `This toy rocket reaches an estimated maximum height of ${k} feet ${h} seconds after it is launched into the air.`, isCorrect: true },
      { text: `This toy rocket reaches an estimated maximum height of ${k} feet ${coefficient} seconds after it is launched into the air.`, isCorrect: false, reason: "confuses the coefficient with the time value" },
      { text: `This toy rocket reaches an estimated maximum height of ${h} feet ${k} seconds after it is launched into the air.`, isCorrect: false, reason: "swaps the x and y coordinates of the vertex" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = correctOption!.text;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. The vertex of the graph of a quadratic equation is where it reaches its minimum or maximum value. When a quadratic equation is written in the form $y=a(x-h)^{2}+k$, the vertex of the parabola represented by the equation is $(x, y)=(h, k)$. In the given equation $y=${coefficient}(x-${h})^{2}+${k}$, the value of $h$ is ${h} and the value of $k$ is ${k}. It follows that the vertex of the graph of this equation in the xy-plane is $(x, y)=(${h},${k})$. Additionally, since $a=${coefficient}$ in the given equation (and ${coefficient} < 0$), the graph of the quadratic equation opens down, and the vertex represents a maximum. It's given that the value of $y$ represents the estimated height, in feet, of the toy rocket $x$ seconds after it is launched into the air. Therefore, this toy rocket reaches an estimated maximum height of ${k} feet ${h} seconds after it is launched into the air. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};