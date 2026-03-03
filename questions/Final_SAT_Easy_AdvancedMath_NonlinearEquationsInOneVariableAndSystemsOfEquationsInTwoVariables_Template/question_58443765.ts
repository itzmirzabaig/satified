import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 58443765
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [y = 5x + 4, y = 5x^2 + 4, solutions (0,4) and (1,9)]
 */

export const generator_58443765 = {
  metadata: {
    // id: "58443765",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(3, 7);
    const b = getRandomInt(2, 9);
    const sol1 = `(0, ${b})`;
    const sol2 = `(1, ${a + b})`;

    const optionsData = [
      { text: sol1, isCorrect: true },
      { text: `(0, 0)`, isCorrect: false },
      { text: `(${a}, ${b})`, isCorrect: false },
      { text: `(1, ${a})`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, i) => ({
      ...opt,
      letter: String.fromCharCode(65 + i)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `$$\\begin{aligned} & y=${a}x + ${b} \\\\ & y=${a}x^2 + ${b} \\end{aligned}$$ \n\n Which ordered pair $(x, y)$ is a solution to the given system of equations?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: sol1,
      explanation: `Choice ${correctOption.letter} is correct. Setting the expressions for $y$ equal gives $${a}x + ${b} = ${a}x^2 + ${b}$. Subtracting $${b}$ from both sides yields $${a}x = ${a}x^2$. Dividing by $${a}$ gives $x = x^2$, which means $x^2 - x = 0$, or $x(x - 1) = 0$. The solutions for $x$ are $x = 0$ and $x = 1$.

When $x = 0$, $y = ${a}(0) + ${b} = ${b}$.

When $x = 1$, $y = ${a}(1) + ${b} = ${a + b}$.

The valid solutions are $(0, ${b})$ and $(1, ${a + b})$. Only ${sol1} is provided in the choices.`
    };
  }
};