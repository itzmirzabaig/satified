import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1133
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [leading coefficient a in [-600,-300], linear coefficient b in [15000,35000]]
 * - Difficulty factors: [Quadratic revenue model, x-intercept interpretation]
 * - Distractor patterns: [revenue at price 0, max-revenue price, price at zero revenue (correct), maximum revenue]
 * - Constraints: [f(x) = 0 at the nonzero intercept means zero revenue]
 * - Question type: [Text->Multiple Choice Text]
 * - Figure generation: [None]
 *
 * MATH: f(x) = a x^2 + b x = x(a x + b) with a < 0, b > 0. The x-intercepts are
 * x = 0 and x = -b/a > 0. The nonzero intercept p = -b/a is the (positive) unit
 * price at which revenue returns to $0. This is an interpretation question, so the
 * intercept is referred to symbolically as p; no numeric value is displayed.
 */

export const generator_1133 = {
  metadata: {
    id: "1133",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const a = -getRandomInt(300, 600);        // opens downward (there is a maximum)
    const b = getRandomInt(15000, 35000);     // positive linear coefficient

    const optionsData = [
      { text: `The revenue, in dollars, when the unit price is \\$0`, isCorrect: false },
      { text: `The unit price, in dollars, that produces the maximum revenue`, isCorrect: false },
      { text: `The unit price, in dollars, at which the revenue is \\$0`, isCorrect: true },
      { text: `The maximum revenue, in dollars`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    return {
      questionText: `A store's daily revenue $f(x)$, in dollars, is modeled by $f(x)=${a}x^2+${b}x$, where $x$ is the unit price of an item in dollars. The graph of $y=f(x)$ crosses the $x$-axis at $x=0$ and at a positive value $x=p$. In this context, what does $p$ represent?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. Factoring gives $f(x)=x(${a}x+${b})$, so the revenue is \\$0 when $x=0$ or when $${a}x+${b}=0$, that is at $x=p=\\dfrac{${b}}{${-a}}$. Because $p$ is an $x$-intercept, $f(p)=0$, so $p$ is the unit price at which the revenue is \\$0. Choices about maximum revenue describe the vertex, not an intercept, and the revenue when the price is \\$0 is $f(0)=0$, not $p$.`
    };
  }
};
