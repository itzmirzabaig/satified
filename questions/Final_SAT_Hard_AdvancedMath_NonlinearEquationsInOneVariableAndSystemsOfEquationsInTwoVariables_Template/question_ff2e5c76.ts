import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: ff2e5c76
 * 
 * ANALYSIS:
 * - Domain: Advanced Math
 * - Skill: Nonlinear Equations (Quadratic)
 * - Concept: Sum of roots (Vieta's Formulas)
 * - Equation: x² + bx + c = 0. Sum = -b/a.
 * - Fix: Corrected string formatting to ensure signs (+/-) appear correctly between terms.
 */

export const generator_ff2e5c76 = {
  metadata: {
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Generate coefficients
    // Equation: x^2 + bx + c = 0
    // We want the sum of solutions to be a positive integer, so b should be negative.
    const b = -1 * getRandomInt(30, 60); // e.g., -42
    let c = getRandomInt(-20, 20);
    
    // Avoid c=0 just for standard trinomial appearance, though mathematically valid
    if (c === 0) c = 7;

    const sumOfRoots = -b; // Since a=1, sum = -b/1 = -b

    // 2. Format Equation String
    // Logic: explicitly determine sign for clean formatting
    const signB = b < 0 ? "-" : "+"; // Will be '-' based on generation above
    const valB = Math.abs(b);
    
    const signC = c < 0 ? "-" : "+";
    const valC = Math.abs(c);

    const equation = `x^2 ${signB} ${valB}x ${signC} ${valC} = 0`;

    // 3. Options
    const optionsData = [
      { text: `${sumOfRoots}`, isCorrect: true },
      { text: "0", isCorrect: false }, // Common misconception
      { text: `${Math.floor(sumOfRoots / 2)}`, isCorrect: false }, // Distractor
      { text: `${Math.floor(sumOfRoots / 10)}`, isCorrect: false } // Distractor (e.g. 4 if sum is 40)
    ];
    
    const shuffledOptions = shuffle(optionsData);
    const correctLetter = String.fromCharCode(65 + shuffledOptions.findIndex(o => o.isCorrect));

    // 4. Explanation
    const explanation = `
      For a quadratic equation in the form $ax^2 + bx + c = 0$, the sum of the solutions is given by the formula $-\\frac{b}{a}$.
      <br/>
      In the given equation $${equation}$:
      <ul>
        <li>$a = 1$</li>
        <li>$b = ${b}$</li>
        <li>$c = ${c}$</li>
      </ul>
      Using the formula:
      $$ \\text{Sum} = -\\frac{${b}}{1} = -(${b}) = ${sumOfRoots} $$
    `;
    
    return {
      questionText: `What is the sum of the solutions to the given equation?\n\n$$${equation}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctLetter,
      explanation: explanation
    };
  }
};