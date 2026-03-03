import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 735a0a00
 * 
 * ANALYSIS:
 * - Context: Quadratic model for stock price.
 * - Task: Interpret a specific point (x, y).
 * - Logic: y = ax^2 + bx + c.
 * - Generate random a, b, c such that for a small integer x (e.g., 1, 2, 3), y is a clean number.
 */
export const generator_735a0a00 = {
  metadata: {
    id: "735a0a00",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // 1. Math Setup
    // y = ax^2 + bx + c
    // Let x = a small integer (1 to 5)
    const xVal = getRandomInt(1, 5);
    
    // Choose coefficients
    // a: small decimal or integer (e.g., 0.25, 0.5, 1, 2)
    const a = getRandomElement([0.25, 0.5, 1, 2, -0.5, -1]);
    const b = getRandomInt(-10, 10);
    const c = getRandomInt(50, 150);
    
    // Calculate y
    const yVal = a * xVal * xVal + b * xVal + c;
    
    // Check if yVal is an integer to avoid messy decimals in text options
    // With chosen 'a', yVal might have .25 or .5. That's fine for money ($).
    const yDisplay = Number.isInteger(yVal) ? yVal.toString() : yVal.toFixed(2);
    
    // Construct equation string
    // Handle signs correctly for display
    const termA = `${a}x^2`;
    const termB = b >= 0 ? `+ ${b}x` : `- ${Math.abs(b)}x`;
    const termC = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
    const equation = `y = ${termA} ${termB} ${termC}`;

    const questionText = `The equation $${equation}$ gives the estimated stock price, in dollars, for a certain company $x$ days after a new product launched, where $0 \\le x \\le 20$. Which statement is the best interpretation of $(x, y) = (${xVal}, ${yDisplay})$ in this context?`;
    
    const optionsData = [
      { 
        text: `The company's estimated stock price increased every day after the new product launched.`, 
        isCorrect: false, 
        reason: "the equation is quadratic, implying the price fluctuates (increases/decreases) rather than increasing constantly" 
      },
      { 
        text: `The company's estimated stock price increased by $${yDisplay} every ${xVal} days after the new product launched.`, 
        isCorrect: false, 
        reason: "this interprets the coordinate pair as a rate of change rather than a specific value at a specific time" 
      },
      { 
        text: `${xVal} ${xVal === 1 ? 'day' : 'days'} after the new product launched, the company's estimated stock price is $${yDisplay}.`, 
        isCorrect: true,
        reason: ""
      },
      { 
        text: `${yDisplay} days after the new product launched, the company's estimated stock price is $${xVal}.`, 
        isCorrect: false, 
        reason: "this swaps the input (days) and output (price) variables" 
      }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1.  **Identify Variables:**
    In the given context:
    - $x$ represents the number of days after the launch.
    - $y$ represents the estimated stock price in dollars.

2.  **Interpret the Point:**
    The coordinate pair $(x, y) = (${xVal}, ${yDisplay})$ means that when $x = ${xVal}$ (days), the value of $y$ is $${yDisplay}$ (dollars).

3.  **Match to Options:**
    Therefore, ${xVal} ${xVal === 1 ? 'day' : 'days'} after the launch, the stock price is estimated to be $${yDisplay}.`
    };
  }
};

/**
 * Question ID: 68607eca
 * 
 * ANALYSIS:
 * - Context: Exponential Growth with Periodic Rate.
 * - Logic:
 *   Initial amount: P
 *   Growth rate: r% (e.g. 70%)
 *   Period: d days (e.g. every 2 days)
 *   Equation: y = P * (1 + r/100)^(x/d)
 *   Or "increases by factor of k every d days": y = P * k^(x/d)
 */
export const generator_68607eca = {
  metadata: {
    id: "68607eca",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    const initial = getRandomInt(100, 500); // e.g. 233
    const period = getRandomInt(2, 5);      // e.g. 2 days
    
    // Choose between "increases by p%" or "multiplies by factor k"
    // Original prompt analysis mentions "growth: 70%", base 1.70.
    const percent = getRandomInt(20, 90); // e.g. 70%
    const baseVal = 1 + percent / 100;    // e.g. 1.70
    
    // Equation form: y = initial * (base)^(x/period)
    
    // 2. Options
    // Correct: P(1.r)^(x/d)
    const correctEq = `${initial}(${baseVal.toFixed(2)})^{\\frac{x}{${period}}}`;
    
    // Distractor 1: Wrong base (1 - r) -> Decay
    const wrongBase = (1 - percent / 100).toFixed(2);
    const d1 = `${initial}(${wrongBase})^{\\frac{x}{${period}}}`;
    
    // Distractor 2: Wrong exponent (period * x instead of x / period)
    const d2 = `${initial}(${baseVal.toFixed(2)})^{${period}x}`;
    
    // Distractor 3: Wrong base and exponent (decay with wrong exponent) or simple interest
    const d3 = `${initial}(${wrongBase})^{${period}x}`;
    
    const optionsData = [
      { text: correctEq, isCorrect: true },
      { text: d1, isCorrect: false },
      { text: d2, isCorrect: false },
      { text: d3, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `A population of bacteria begins with ${initial} organisms and increases by ${percent}% every ${period} days. Which of the following equations models the population, $P$, of the bacteria $x$ days after the population begins increasing?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1.  **Identify Model Type:**
    The population increases by a fixed percentage over regular intervals, which indicates an exponential growth model: $P = a(b)^{\\frac{x}{d}}$.
    
2.  **Determine Constants:**
    - Initial amount ($a$) = ${initial}.
    - Growth rate = ${percent}%, so the growth factor ($b$) = $1 + \\frac{${percent}}{100} = ${baseVal.toFixed(2)}$.
    - The growth happens every ${period} days, so the exponent is $\\frac{x}{${period}}$.

3.  **Construct Equation:**
    Substituting these values gives $P = ${initial}(${baseVal.toFixed(2)})^{\\frac{x}{${period}}}$.`
    };
  }
};

// Helper for random element if not already imported
function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}