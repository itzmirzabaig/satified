import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1472
 * 
 * ANALYSIS:
 * - Context: Exponential Decay.
 * - Equation: f(x) = Initial * (1 - rate)^x.
 * - Given: Initial value, rate %.
 * - Find: Correct equation.
 */
export const generator_1472 = {
  metadata: {
    id: "1472",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    const initial = getRandomInt(1000, 5000); // e.g. 3000
    const percent = getRandomInt(2, 15); // e.g. 2%
    
    // Decay factor = 1 - p/100
    const factor = (1 - percent / 100).toFixed(2);
    
    // 2. Options
    const correctEq = `f(x) = ${initial}(${factor})^x`;
    
    // Distractor 1: Growth instead of decay
    const growthFactor = (1 + percent / 100).toFixed(2);
    const d1 = `f(x) = ${initial}(${growthFactor})^x`;
    
    // Distractor 2: Rate as base (extreme decay)
    const rateBase = (percent / 100).toFixed(2);
    const d2 = `f(x) = ${initial}(${rateBase})^x`;
    
    // Distractor 3: Subtracting percent linearly (not exponential base) or just weird algebra
    const d3 = `f(x) = ${initial}(1 - ${percent}x)`;

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
      questionText: `A population of ${initial} organisms decreases by ${percent}% each year. Which function $f$ models the population of the organisms $x$ years after the population starts decreasing?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1.  **Identify Model Type:**
    The population decreases by a fixed percentage each year, which indicates an exponential decay model: $f(x) = a(b)^x$.
    
2.  **Determine Constants:**
    - Initial amount ($a$) = ${initial}.
    - Decay rate = ${percent}%, so the decay factor ($b$) = $1 - \\frac{${percent}}{100} = ${factor}$.

3.  **Construct Equation:**
    Substituting these values gives $f(x) = ${initial}(${factor})^x$.`
    };
  }
};
