import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: f67255ea
 * 
 * FIXES:
 * - Fixed LaTeX "Missing open brace" error by correcting `^\\\\circ` to `^{\\circ}`.
 * - Removed unused variable `c`.
 * - Clarified the variable `w` in the question text versus the calculated value in the answer.
 * - Improved explanation formatting for the algebraic steps.
 */

export const generator_f67255ea = {
  metadata: {
    id: "f67255ea",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate coefficients
    // Acute angle = ax - b
    const a = getRandomInt(7, 12);
    const b = getRandomInt(400, 600);
    
    // STEP 2: Calculate w
    // 1 Acute + 3 Obtuse angles sum
    // Obtuse = 180 - Acute = 180 - (ax - b) = -ax + 180 + b
    // Sum = (ax - b) + 3(-ax + 180 + b)
    // Sum = ax - b - 3ax + 540 + 3b
    // Sum = -2ax + 2b + 540
    
    // The question states the sum is (-2ax + w)
    // Therefore, w = 2b + 540
    const wVal = 2 * b + 540;
    
    // Coefficient of x in the sum expression (usually negative)
    const coeffX = -2 * a; 

    return {
      questionText: `A line intersects two parallel lines, forming four acute angles and four obtuse angles. The measure of one of the acute angles is $(${a}x - ${b})^{\\circ}$. The sum of the measures of one of the acute angles and three of the obtuse angles is $(${coeffX}x + w)^{\\circ}$. What is the value of $w$?`,
      figureCode: null,
      options: null, // Fill-in-the-blank
      correctAnswer: wVal.toString(),
      explanation: `Let the measure of the acute angle be $A = ${a}x - ${b}$.
Since the four acute angles are congruent and the four obtuse angles are congruent, and an acute angle and an obtuse angle form a linear pair (sum to $180^{\\circ}$), the measure of an obtuse angle $O$ is:
$O = 180 - (${a}x - ${b}) = -${a}x + ${180 + b}$

The problem asks for the sum of one acute angle and three obtuse angles:
Sum $= A + 3O$
Sum $= (${a}x - ${b}) + 3(-${a}x + ${180 + b})$
Sum $= ${a}x - ${b} - ${3 * a}x + ${3 * (180 + b)}$
Sum $= -${2 * a}x + ${2 * b + 540}$

We are given that the sum is $(${coeffX}x + w)^{\\circ}$. By comparing the constant terms:
$w = ${2 * b + 540}$`
    };
  }
};