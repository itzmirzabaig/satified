import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



export const generator_50e40f08 = {
  metadata: {
    // id: "50e40f08",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const r1 = -1 * getRandomInt(2, 8);
    const r2 = getRandomInt(2, 8);
    
    const questionText = `If the given function $f(x)=(x${r1 >= 0 ? '-' : '+'}${Math.abs(r1)})(x-${r2})$ is graphed in the $xy$-plane, where $y=f(x)$, what is the $x$-coordinate of an $x$-intercept of the graph?`;
    
    const correctAnswer = `${r1}, ${r2}`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `The x-intercepts occur where $f(x) = 0$. By the zero product property, either $(x${r1 >= 0 ? '-' : '+'}${Math.abs(r1)}) = 0$ or $(x-${r2}) = 0$. Solving: $x = ${r1}$ or $x = ${r2}$. Either value is a correct answer.`
    };
  }
};