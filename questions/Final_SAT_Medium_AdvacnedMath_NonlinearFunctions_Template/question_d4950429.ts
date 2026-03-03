import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



export const generator_d4950429 = {
  metadata: {
    // id: "d4950429",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const diff = getRandomInt(10, 20);
    const x1 = getRandomInt(15, 25);
    const area = x1 * (x1 - diff);
    const x2 = x1 - diff;
    
    const questionText = `A rectangle has a length of $x$ units and a width of $(x-${diff})$ units. If the rectangle has an area of ${area} square units, what is the value of $x$?`;
    
    const optionsData = [
      { text: `$${Math.abs(x2)}$`, isCorrect: false, reason: `if $x=${Math.abs(x2)}$, the width would be ${Math.abs(x2) - diff} (negative), which is impossible` },
      { text: `$${x1}$`, isCorrect: true },
      { text: `$${x1 + diff}$`, isCorrect: false, reason: "results from miscalculating the solution to the quadratic" },
      { text: `$${area}$`, isCorrect: false, reason: "this is the area, not the value of x" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `${x1}`;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. The area formula gives $x(x-${diff}) = ${area}$. Expanding: $x^2 - ${diff}x = ${area}$. Rearranging: $x^2 - ${diff}x - ${area} = 0$. Factoring: $(x-${x1})(x+${Math.abs(x2)}) = 0$. So $x = ${x1}$ or $x = ${x2}$. Since length must be positive and greater than ${diff} (for width to be positive), $x = ${x1}$. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};