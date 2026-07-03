import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



export const generator_558 = {
  metadata: {
    id: "558",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // r1 is always negative, r2 is always positive, so the two x-intercepts
    // are distinct and exactly one of them has a positive x-coordinate.
    const r1 = -1 * getRandomInt(2, 8);
    const r2 = getRandomInt(2, 8);

    const questionText = `If the given function $f(x)=(x+${Math.abs(r1)})(x-${r2})$ is graphed in the $xy$-plane, where $y=f(x)$, what is the positive $x$-coordinate of an $x$-intercept of the graph?`;

    const correctAnswer = `${r2}`;

    return {
      questionText: questionText,
      figureCode: null,
      options: [],
      correctAnswer: correctAnswer,
      explanation: `The $x$-intercepts occur where $f(x) = 0$. By the zero product property, either $x+${Math.abs(r1)} = 0$ or $x-${r2} = 0$. Solving these gives $x = ${r1}$ or $x = ${r2}$. The $x$-intercept with a positive $x$-coordinate is $(${r2}, 0)$, so the answer is ${r2}.`
    };
  }
};