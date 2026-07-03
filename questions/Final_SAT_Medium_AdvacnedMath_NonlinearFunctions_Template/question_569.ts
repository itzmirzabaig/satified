import { getRandomInt, getRandomNonZeroInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 569
 *
 * ANALYSIS:
 * - Context: Quadratic model for stock price.
 * - Task: Interpret a specific point (x, y).
 * - Logic: y = ax^2 + bx + c.
 * - Generate random a, b, c such that for a small integer x (1 to 5), y is a
 *   clean positive dollar amount (a is limited to binary-exact decimals, so
 *   y is always an integer or an exact .25/.5/.75 value).
 */
export const generator_569 = {
  metadata: {
    id: "569",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Math Setup: y = ax^2 + bx + c evaluated at a small integer x.
    // Bounded retry keeps the price positive and distinct from x, so the
    // swapped-variables distractor can never duplicate the correct option.
    let xVal = 2;
    let a: number = 1;
    let b = 2;
    let c = 50;
    let yVal = 58;
    let tries = 0;
    do {
      xVal = getRandomInt(1, 5);
      // a: binary-exact values only, so a*x^2 never produces float artifacts
      a = getRandomElement([0.25, 0.5, 1, 2, -0.5, -1]);
      b = getRandomNonZeroInt(-10, 10);
      c = getRandomInt(50, 150);
      yVal = a * xVal * xVal + b * xVal + c;
    } while ((yVal <= 0 || yVal === xVal) && ++tries < 50);
    if (yVal <= 0 || yVal === xVal) {
      // Deterministic safe fallback
      xVal = 2; a = 1; b = 2; c = 50;
      yVal = a * xVal * xVal + b * xVal + c; // 58
    }

    // Money display: integer as-is, otherwise exactly two decimals
    const yDisplay = Number.isInteger(yVal) ? yVal.toString() : yVal.toFixed(2);

    // Construct equation string with clean signs/coefficients
    const termA = a === 1 ? 'x^2' : a === -1 ? '-x^2' : `${a}x^2`;
    const bAbs = Math.abs(b);
    const termB = `${b > 0 ? '+' : '-'} ${bAbs === 1 ? '' : bAbs}x`;
    const termC = `+ ${c}`;
    const equation = `y = ${termA} ${termB} ${termC}`;

    const questionText = `The equation $${equation}$ gives the estimated stock price $y$, in dollars, for a certain company $x$ days after a new product launched, for values of $x$ from 0 to 20. Which statement is the best interpretation of $(x, y) = (${xVal}, ${yDisplay})$ in this context?`;

    const dayWordX = xVal === 1 ? 'day' : 'days';
    const optionsData = [
      {
        text: `The company's estimated stock price increased every day after the new product launched.`,
        isCorrect: false,
        reason: "the equation is quadratic, so the price changes at a varying rate rather than increasing every day"
      },
      {
        text: `The company's estimated stock price increased by \\$${yDisplay} every ${xVal === 1 ? 'day' : `${xVal} days`} after the new product launched.`,
        isCorrect: false,
        reason: "it interprets the coordinate pair as a rate of change rather than as a specific value at a specific time"
      },
      {
        text: `${xVal} ${dayWordX} after the new product launched, the company's estimated stock price is \\$${yDisplay}.`,
        isCorrect: true,
        reason: ""
      },
      {
        text: `${yDisplay} ${yVal === 1 ? 'day' : 'days'} after the new product launched, the company's estimated stock price is \\$${xVal}.`,
        isCorrect: false,
        reason: "it swaps the input (days) and the output (price): the first coordinate is the number of days, not the price"
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const distractorLines = incorrectOptions
      .map(opt => `Choice ${opt.letter} is incorrect because ${opt.reason}.`)
      .join('\n');

    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct.

1.  **Identify the variables:**
    In the given context:
    - $x$ represents the number of days after the launch.
    - $y$ represents the estimated stock price, in dollars.

2.  **Interpret the point:**
    The coordinate pair $(x, y) = (${xVal}, ${yDisplay})$ means that when $x = ${xVal}$, the value of $y$ is ${yDisplay}. In context, ${xVal} ${dayWordX} after the new product launched, the company's estimated stock price is \\$${yDisplay}.

${distractorLines}`
    };
  }
};
