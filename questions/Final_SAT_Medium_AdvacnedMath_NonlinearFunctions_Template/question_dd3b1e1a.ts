import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



export const generator_dd3b1e1a = {
  metadata: {
    // id: "dd3b1e1a",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const coeff5 = getRandomInt(1, 3);
    const coeff1 = getRandomInt(5, 15);
    const constant = getRandomInt(10, 30);
    
    const b = constant;
    
    const questionText = `For the given function $f$, the graph of $y = f(x)$ in the $xy$-plane passes through the point $(0, b)$, where $b$ is a constant. What is the value of $b$? $$f(x) = ${coeff5}x^5 + ${coeff1}x + ${constant}$$`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: null,
      correctAnswer: `${b}`,
      explanation: `To find $b$, evaluate $f(0)$: $f(0) = ${coeff5}(0)^5 + ${coeff1}(0) + ${constant} = 0 + 0 + ${constant} = ${b}$. Since the point is $(0, b)$, we have $b = ${b}$.`
    };
  }
};