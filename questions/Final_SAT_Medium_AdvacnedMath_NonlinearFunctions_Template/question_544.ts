import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



export const generator_544 = {
  metadata: {
    id: "544",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const y = getRandomInt(10, 20);
    const k = getRandomInt(2, 3);
    const d = getRandomInt(5, 15);
    const x = k * y + d;
    const product = x * y;
    
    const questionText = `The product of two positive integers is ${product}. If the first integer is ${d} greater than ${k} times the second integer, what is the smaller of the two integers?`;
    
    const half = Math.floor(y / 2);
    const optionsData = [
      { text: `$${half}$`, isCorrect: false, reason: `if the smaller integer were ${half}, the larger integer would be ${k * half + d} and the product would be ${(k * half + d) * half}, not ${product}` },
      { text: `$${y}$`, isCorrect: true },
      { text: `$${x}$`, isCorrect: false, reason: "this is the larger of the two integers, not the smaller one" },
      { text: `$${2 * x}$`, isCorrect: false, reason: `this is twice the larger integer; neither of the two integers equals ${2 * x}` }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `$${y}$`;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. Let the smaller integer be $y$ and the larger integer be $x$. Then $xy = ${product}$ and $x = ${k}y + ${d}$. Substituting the second equation into the first gives $(${k}y + ${d})y = ${product}$, which rearranges to $(${k}y + ${d})y - ${product} = 0$ and factors as $(y - ${y})(${k}y + ${x}) = 0$. So $y = ${y}$ or $y = -\\frac{${x}}{${k}}$, and since both integers are positive, $y = ${y}$. The larger integer is then $x = ${k}(${y}) + ${d} = ${x}$, so the smaller of the two integers is $y = ${y}$. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};