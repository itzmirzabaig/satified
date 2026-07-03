import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



export const generator_567 = {
  metadata: {
    id: "567",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // Three distinct roots by construction: r1 in [-8,-4], r2 in [-3,-2], r3 in [2,6]
    const r1 = -1 * getRandomInt(4, 8);
    const r2 = -1 * getRandomInt(2, 3);
    const r3 = getRandomInt(2, 6);
    const shift = getRandomInt(2, 5);
    const asked = getRandomElement([r1, r2, r3]);

    const sign1 = r1 >= 0 ? '-' : '+';
    const sign2 = r2 >= 0 ? '-' : '+';
    const sign3 = r3 >= 0 ? '-' : '+';

    const f1 = `(x${sign1}${Math.abs(r1)})`;
    const f2 = `(x${sign2}${Math.abs(r2)})`;
    const f3 = `(x${sign3}${Math.abs(r3)})`;
    const askedFactor = asked === r1 ? f1 : asked === r2 ? f2 : f3;

    const questionText = `The function $f$ is given by $f(x)=${f1}${f2}${f3}$. The function $g$ is defined by $g(x)=f(x)-${shift}$. What is the value of $g(${asked})$?`;

    const answer = -shift;

    return {
      questionText,
      figureCode: null,
      options: [],
      correctAnswer: `${answer}`,
      explanation: `The correct answer is ${answer}. Since $f(x)=${f1}${f2}${f3}$, substituting $x=${asked}$ makes the factor $${askedFactor}$ equal to zero, so $f(${asked})=0$. Therefore $g(${asked})=f(${asked})-${shift}=0-${shift}=${answer}$.`
    };
  }
};