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
    // Before: the answer was always the zero revenue price, b had no comma, p was an
    // unreduced fraction, and wrong choices had no reasons. Now the asked feature varies,
    // and a and p are chosen so the intercept and vertex are exact whole numbers.
    const fmt = (n: number) => n.toLocaleString('en-US').replace(/,/g, '{,}');
    const a = -5 * getRandomInt(4, 12);       // opens downward (there is a maximum)
    const p = 2 * getRandomInt(15, 30);       // even, so the vertex is at a whole number
    const b = -a * p;
    const vertexX = p / 2;
    const vertexY = a * vertexX * vertexX + b * vertexX;
    const money = `\\$${vertexY.toLocaleString('en-US')}`;

    const features = [
      {
        key: 'zeroPrice',
        asked: `the positive value of $x$ at which the graph crosses the $x$-axis`,
        text: `The unit price, in dollars, at which the revenue is \\$0`,
        why: `The graph crosses the $x$-axis where $f(x)=0$, which means the revenue is \\$0. Factoring gives $x(${a}x+${fmt(b)})=0$, so $x=0$ or $x=${p}$. The positive value, $${p}$, is the unit price in dollars at which the revenue is \\$0.`,
        reason: `the unit price at which the revenue is \\$0 is the positive solution of $f(x)=0$, which is $x=${p}$`
      },
      {
        key: 'bestPrice',
        asked: `the $x$-coordinate of the vertex of the graph`,
        text: `The unit price, in dollars, that produces the maximum revenue`,
        why: `The coefficient of $x^2$ is negative, so the parabola opens downward and its vertex is its highest point. The $x$-coordinate of the vertex is $x=-\\frac{${fmt(b)}}{2(${a})}=${vertexX}$, so a unit price of \\$${vertexX} produces the greatest revenue.`,
        reason: `the unit price that produces the maximum revenue is the $x$-coordinate of the vertex, $x=${vertexX}$`
      },
      {
        key: 'maxRevenue',
        asked: `the $y$-coordinate of the vertex of the graph`,
        text: `The maximum revenue, in dollars`,
        why: `The coefficient of $x^2$ is negative, so the parabola opens downward and its vertex is its highest point. The vertex is at $x=-\\frac{${fmt(b)}}{2(${a})}=${vertexX}$, and $f(${vertexX})=${fmt(vertexY)}$, so the greatest possible daily revenue is ${money}.`,
        reason: `the maximum revenue is the $y$-coordinate of the vertex, which is ${money}`
      },
      {
        key: 'freeRevenue',
        asked: `the $y$-coordinate of the $y$-intercept of the graph`,
        text: `The revenue, in dollars, when the unit price is \\$0`,
        why: `The $y$-intercept occurs where $x=0$, which is a unit price of \\$0. Its $y$-coordinate is $f(0)=0$, the revenue in dollars at that price.`,
        reason: `the revenue when the unit price is \\$0 is the $y$-coordinate of the $y$-intercept, $f(0)=0$`
      }
    ];
    const target = features[getRandomInt(0, features.length - 1)];

    const optionsData = features.map(f => ({
      text: f.text,
      isCorrect: f.key === target.key,
      reason: f.key === target.key ? '' : f.reason
    }));

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A store's daily revenue, in dollars, from selling an item is modeled by $f(x)=${a}x^2+${fmt(b)}x$, where $x$ is the unit price of the item, in dollars. When $y=f(x)$ is graphed in the $xy$-plane, what does ${target.asked} represent?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. ${target.why} ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
