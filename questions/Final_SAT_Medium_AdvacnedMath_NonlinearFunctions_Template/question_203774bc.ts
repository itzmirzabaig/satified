import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



export const generator_203774bc = {
  metadata: {
    // id: "203774bc",
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
    
    const optionsData = [
      { text: `$${Math.floor(y/2)}$`, isCorrect: false, reason: `if the smaller number were ${Math.floor(y/2)}, the product would not equal ${product}` },
      { text: `$${y}$`, isCorrect: true },
      { text: `$${x}$`, isCorrect: false, reason: "this is the larger integer, not the smaller one" },
      { text: `$${2 * x}$`, isCorrect: false, reason: "this value is too large to satisfy the given conditions" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `${y}`;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. Let the two integers be $x$ and $y$, where $x > y$. We have $xy = ${product}$ and $x = ${k}y + ${d}$. Substituting: $(${k}y + ${d})y = ${product}$, which gives $${k}y^2 + ${d}y - ${product} = 0$. Using the quadratic formula or factoring, we find $y = ${y}$ (discarding the negative solution). Then $x = ${k}(${y}) + ${d} = ${x}$. The smaller integer is ${y}$. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};