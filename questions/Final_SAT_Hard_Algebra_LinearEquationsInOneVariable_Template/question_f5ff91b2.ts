import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: f5ff91b2
 * 
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Equations In One Variable
 * - Concept: Zero Product Property.
 * - Equation: (x-a)/b = (x-a)/c.
 * - Logic: If b != c, then x-a must be 0.
 * - Fix: Corrected LaTeX fraction escaping from \\\\frac to \\frac.
 */

export const generator_f5ff91b2 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Generate Constants
    const a = getRandomInt(3, 12);
    
    // Ensure denominators are distinct so the solution is unique (x-a = 0)
    let b = getRandomInt(4, 9);
    let c = getRandomInt(10, 15);
    while (b === c) {
      c = getRandomInt(10, 15);
    }
    
    // The value we solve for is y = x - a.
    // y/b = y/c => y(1/b - 1/c) = 0 => y = 0.
    
    // 2. Options
    // We need pairs of values. The correct pair must enclose 0.
    
    // Distractor 1: Negative range (e.g., -15 to -4)
    const minNeg = Math.min(-c, -b);
    const maxNeg = Math.max(-c, -b);
    
    const optionsData = [
      { text: `$${minNeg}$ and $${maxNeg}$`, isCorrect: false },
      { text: `$-3$ and $3$`, isCorrect: true }, // Correct because -3 < 0 < 3
      { text: `$4.5$ and $5.5$`, isCorrect: false },
      { text: `$6.75$ and $9.25$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    
    // 3. Explanation
    const explanation = `
      Let $y = x - ${a}$. The equation can be written as:
      $$ \\frac{y}{${b}} = \\frac{y}{${c}} $$
      Subtract $\\frac{y}{${c}}$ from both sides:
      $$ \\frac{y}{${b}} - \\frac{y}{${c}} = 0 $$
      Factor out $y$:
      $$ y \\left( \\frac{1}{${b}} - \\frac{1}{${c}} \\right) = 0 $$
      Since $${b} \\neq ${c}$, the term in the parentheses is not zero. Therefore, we can divide by it to get:
      $$ y = 0 $$
      So, the value of $x - ${a}$ is $0$.
      <br/><br/>
      We check which pair of values includes $0$:
      <ul>
        <li>Between $${minNeg}$ and $${maxNeg}$: No (both are negative).</li>
        <li>Between $-3$ and $3$: Yes (since $-3 < 0 < 3$).</li>
        <li>Between $4.5$ and $5.5$: No (both are positive).</li>
        <li>Between $6.75$ and $9.25$: No (both are positive).</li>
      </ul>
      Therefore, the correct choice is ${correctOption.letter}.
    `;
    
    return {
      questionText: `If $\\frac{x-${a}}{${b}} = \\frac{x-${a}}{${c}}$, the value of $x-${a}$ is between which of the following pairs of values?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};