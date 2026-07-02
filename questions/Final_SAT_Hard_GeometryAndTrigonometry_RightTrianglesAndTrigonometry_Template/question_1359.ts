import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1359
 * 
 * FIXES:
 * - LaTeX Formatting: Reduced excessive escaping (e.g., `\\frac` instead of `\\\\frac`) to ensure proper rendering.
 * - Logic: Given cos(K), find cos(L) in a right triangle where J=90.
 * - Relationship: K and L are complementary angles. cos(L) = sin(K).
 * - However, in a right triangle JKL (J=90), adj(K)=JK, hyp=KL. adj(L)=JL.
 * - This asks for cos(L). cos(L) = JL/KL.
 * - We are given cos(K) = JK/KL.
 * - So we need to find JL using Pythagoras.
 */

export const generator_1359 = {
  metadata: {
    id: "1359",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Generate using Pythagorean triple
    const triple = getRandomElement([
      [8, 15, 17],
      [5, 12, 13],
      [7, 24, 25],
      [20, 21, 29]
    ]) as [number, number, number];
    
    // Shuffle the legs so we don't always give the smaller one
    const isFirstLegAdjacent = Math.random() < 0.5;
    const adjacentToK = isFirstLegAdjacent ? triple[0] : triple[1];
    const oppositeToK = isFirstLegAdjacent ? triple[1] : triple[0];
    const hypotenuse = triple[2];
    
    // cos(K) = adjacent / hypotenuse
    // We want cos(L).
    // In Triangle JKL (J=90):
    // K and L are complementary.
    // cos(L) = adjacent_to_L / hypotenuse = JL / KL.
    // JK is adjacent to K. JL is opposite to K.
    // So JL = oppositeToK.
    // Thus cos(L) = oppositeToK / hypotenuse.

    return {
      questionText: `In triangle $JKL$, $\\cos(K) = \\frac{${adjacentToK}}{${hypotenuse}}$ and angle $J$ is a right angle. What is the value of $\\cos(L)$?`,
      figureCode: null,
      options: null, // Fill in the blank
      correctAnswer: `${oppositeToK}/${hypotenuse}`,
      explanation: `It is given that angle $J$ is the right angle in triangle $JKL$. Therefore, the angles $K$ and $L$ are the acute angles of the triangle and are complementary ($K + L = 90^{\\circ}$).
      
For complementary angles, the cosine of one angle is equal to the sine of the other, but simpler:
$\\cos(K) = \\frac{\\text{Adjacent to } K}{\\text{Hypotenuse}} = \\frac{JK}{KL} = \\frac{${adjacentToK}}{${hypotenuse}}$.

To find $\\cos(L)$, we need the side adjacent to $L$, which is $JL$.
By the Pythagorean theorem: $JK^2 + JL^2 = KL^2$.
Using the ratio values: $(${adjacentToK})^2 + JL^2 = (${hypotenuse})^2$
$${adjacentToK*adjacentToK} + JL^2 = ${hypotenuse*hypotenuse}$
$JL^2 = ${hypotenuse*hypotenuse} - ${adjacentToK*adjacentToK} = ${oppositeToK*oppositeToK}$
$JL = ${oppositeToK}$.

Therefore, $\\cos(L) = \\frac{\\text{Adjacent to } L}{\\text{Hypotenuse}} = \\frac{JL}{KL} = \\frac{${oppositeToK}}{${hypotenuse}}$.`
    };
  }
};
