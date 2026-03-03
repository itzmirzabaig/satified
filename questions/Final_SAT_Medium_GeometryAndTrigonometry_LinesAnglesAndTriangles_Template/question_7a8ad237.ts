import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 7a8ad237
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [acute angle: 55-75 degrees]
 * - Difficulty factors: [Congruent triangles, corresponding angles, triangle sum]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Corresponding angles equal, sum = 180]
 * - Question type: [No Figure→Fill in the blank]
 * - Figure generation: [null]
 */

export const generator_7a8ad237 = {
  metadata: {
    // id: "7a8ad237",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const angleA = getRandomInt(55, 75);
    const angleF = 90 - angleA; // Since angle E = 90, angle D = angle A
    
    // STEP 2: Return question data
    return {
      questionText: `Triangles $ABC$ and $DEF$ are congruent, where $A$ corresponds to $D$, and $B$ and $E$ are right angles. The measure of angle $A$ is $${angleA}^{\\circ}$. What is the measure, in degrees, of angle $F$?`,
      figureCode: null,
      options: null,
      correctAnswer: angleF.toString(),
      explanation: `The correct answer is ${angleF}. It's given that triangles $ABC$ and $DEF$ are congruent with angle $A$ corresponding to angle $D$. Corresponding angles of congruent triangles are congruent and, therefore, have equal measure. It's given that the measure of angle $A$ is ${angleA}°. It follows that the measure of angle $D$ is also ${angleA}°. It's given that angle $E$ is a right angle. Therefore, the measure of angle $E$ is $90^{\\\\circ}$. Let $x$ represent the measure, in degrees, of angle $F$. Since the measures of the angles in a triangle sum to $180^{\\\\circ}$, it follows that ${angleA}+90+x=180$, or ${angleA + 90}+x=180$. Subtracting ${angleA + 90} from both sides of this equation yields $x=${angleF}$. Therefore, the measure, in degrees, of angle $F$ is ${angleF}.`
    };
  }
};

/**
 * Question ID: 6dd463ca
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angles: 55-65 and 60-70 degrees]
 * - Difficulty factors: [Parallel lines, triangle sum, corresponding angles]
 * - Distractor patterns: [A: took angle BDC directly, C: took angle ACE directly, D: sum of two angles]
 * - Constraints: [AE || BD, triangle ACE sum = 180]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Triangle with parallel line segment]
 */
