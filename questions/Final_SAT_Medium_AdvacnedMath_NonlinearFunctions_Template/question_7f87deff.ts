import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 7f87deff
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Cubic equation x-intercepts (multi-answer)
 * - Number ranges: Roots from -14 to 14
 * - Difficulty: Medium - factoring cubic and finding all roots
 * - Multi-accept: Any of the three roots is acceptable
 */

export const generator_7f87deff = {
  metadata: {
    // id: "7f87deff",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // Generate three distinct integer roots
    const root1 = getRandomInt(2, 8);
    const root2 = getRandomInt(-8, -2);
    const root3 = getRandomInt(9, 15);
    
    // Format factors cleanly
    const factor1 = `(x - ${root1})`;
    const factor2 = root2 >= 0 ? `(x - ${root2})` : `(x + ${Math.abs(root2)})`;
    const factor3 = `(x - ${root3})`;
    
    const questionText = `What is an x-coordinate of an x-intercept of the graph of $y=3${factor1}${factor2}${factor3}$ in the xy-plane?`;
    
    const correctAnswer = `${root1}, ${root2}, ${root3}`;
    
    const explanation = `To find the x-intercepts, set $y=0$: $3${factor1}${factor2}${factor3}=0$. By the zero product property: ${factor1}=0 gives $x=${root1}$; ${factor2}=0 gives $x=${root2}$; ${factor3}=0 gives $x=${root3}$. Any of these values is a correct answer.`;
    
    return {
      questionText,
      figureCode: null,
      options: null, // Fill-in-the-blank
      correctAnswer,
      explanation
    };
  }
};

/**
 * Question ID: 97158b3a
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Rectangle area expression interpretation
 * - Number ranges: Width w, length w+29
 * - Difficulty: Medium - understanding area formula components
 * - Distractor patterns: Confusing width with length, confusing area with dimension
 */