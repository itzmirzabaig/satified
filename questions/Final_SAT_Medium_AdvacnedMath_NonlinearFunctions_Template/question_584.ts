import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



export const generator_584 = {
  metadata: {
    id: "584",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const constant = getRandomInt(20, 99);
    
    const questionText = `$$p(x)+${constant}=x^2$$ The given equation relates the value of $x$ and its corresponding value of $p(x)$ for the function $p$. What is the minimum value of the function $p$?`;
    
    const negativeSquared = -1 * constant * constant;
    const positiveConstant = constant;
    const positiveSquared = constant * constant;
    
    const optionsData = [
      { text: `$${negativeSquared}$`, isCorrect: false, reason: `results from squaring ${constant} and then attaching a negative sign, instead of finding the minimum value of $p(x) = x^2 - ${constant}$` },
      { text: `$-${constant}$`, isCorrect: true, reason: "" },
      { text: `$${positiveConstant}$`, isCorrect: false, reason: `results from dropping the negative sign after rewriting the equation as $p(x) = x^2 - ${constant}$` },
      { text: `$${positiveSquared}$`, isCorrect: false, reason: `results from squaring ${constant} and ignoring the negative sign` }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `$-${constant}$`;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. To find the minimum value of the function $p$, first rewrite the given equation by subtracting ${constant} from both sides: $$p(x) = x^2 - ${constant}$$ Since the coefficient of the $x^2$ term is positive, the graph of $p$ is a parabola that opens upward, so the minimum value of the function occurs at the vertex of the parabola. The equation $p(x) = x^2 - ${constant}$ can be written as $p(x) = (x-0)^2 - ${constant}$. Comparing this to the vertex form $p(x) = a(x-h)^2 + k$, where $(h, k)$ is the vertex, shows that the vertex is at $(0, -${constant})$. Since the parabola opens upward, the $y$-coordinate of the vertex is the minimum value of the function. Therefore, the minimum value of the function $p$ is $-${constant}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};