import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 157
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients: 5-12, constant: 50-200]
* - Difficulty factors: [Combining like terms, simple isolation]
* - Constraints: [Clean integer result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_157 = {
  metadata: {
    id: "157",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const diff = 1;
    const coeff2 = getRandomInt(5, 12);
    const coeff1 = coeff2 + diff;
    const result = getRandomInt(50, 200);
    const const1 = getRandomInt(50, 200);
    const total = diff * result + const1;

    return {
      questionText: `What value of $x$ is the solution to the given equation? $$${coeff1}x - ${coeff2}x + ${const1} = ${total}$$`,
      figureCode: null,
      options: null,
      correctAnswer: result.toString(),
      explanation: `To find the value of $x$, combine like terms: $$(${coeff1}x - ${coeff2}x) + ${const1} = ${total}$$ $$x + ${const1} = ${total}$$ Subtract ${const1} from both sides: $$x = ${total} - ${const1}$$ $$x = ${result}$$ Therefore, the value is ${result}.`
    };
  }
};
