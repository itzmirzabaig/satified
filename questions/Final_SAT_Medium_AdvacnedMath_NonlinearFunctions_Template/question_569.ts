import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 569
 * 
 * ANALYSIS:
 * - Context: Quadratic model for stock price.
 * - Task: Interpret a specific point (x, y).
 * - Logic: y = ax^2 + bx + c.
 * - Generate random a, b, c such that for a small integer x (e.g., 1, 2, 3), y is a clean number.
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
