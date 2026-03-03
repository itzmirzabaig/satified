import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 686b5212
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angles: 40-60 degrees for base angles, use simple linear relationship y = 2x + 8]
 * - Difficulty factors: [Parallel lines, same-side interior angles, supplementary angles, simple algebra]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [y and base angle must be supplementary (sum to 180), y = 2x + 8]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Parallel lines with transversal, angle labels]
 */

export const generator_686b5212 = {
  metadata: {
    // id: "686b5212",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Generate x first to ensure clean integer, then derive y and base angle
    // x should be reasonable (20-50 range)
    const x = getRandomInt(20, 50);
    
    // y = 2x + 8
    const y = 2 * x + 8;
    
    // y and baseAngle are supplementary (same-side interior angles)
    const baseAngle = 180 - y;
    
    // Validate that baseAngle is in reasonable range (40-130)
    // If not, regenerate x
    let finalX = x;
    let finalY = y;
    let finalBaseAngle = baseAngle;
    
    if (baseAngle < 40 || baseAngle > 130) {
      // Regenerate with constraints
      finalX = getRandomInt(30, 45); // This gives y = 68-98, baseAngle = 82-112
      finalY = 2 * finalX + 8;
      finalBaseAngle = 180 - finalY;
    }
    
    // STEP 2: Build Mafs code with randomized positions
    const lineY1 = 1.5;
    const lineY2 = -1.5;
    const transversalX1 = -2;
    const transversalY1 = -3;
    const transversalX2 = 1;
    const transversalY2 = 2;
    
    const mafsCode = null;

    // STEP 3: Return question data
    return {
      questionText: `In the figure, line $q$ is parallel to line $r$, and both lines are intersected by line $s$. If $y = 2x + 8$, what is the value of $x$?`,
      figureCode: null,
      options: null,
      correctAnswer: finalX.toString(),
      explanation: `The correct answer is ${finalX}. Based on the figure, the angle with measure $y^{\\\\circ}$ and the angle vertical to the angle with measure ${finalBaseAngle}^{\\\\circ}$ are same side interior angles. Since vertical angles are congruent, the angle vertical to the angle with measure ${finalBaseAngle}^{\\\\circ}$ also has measure ${finalBaseAngle}^{\\\\circ}$. Since lines $q$ and $r$ are parallel, same side interior angles are supplementary. It follows that $y + ${finalBaseAngle} = 180$, so $y = ${finalY}$. Substituting $2x + 8$ for $y$ yields $2x + 8 = ${finalY}$. Solving for $x$ gives $2x = ${finalY - 8}$, so $x = ${finalX}$.`
    };
  }
};

/**
 * Question ID: 81b664bc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [AB: single/double digit 5-15, BC: 15-25, FE: 5-12]
 * - Difficulty factors: [Parallel lines, proportional segments, solving proportion equation]
 * - Distractor patterns: [A: rounding error, C: swapped ratio, D: added instead of multiplied]
 * - Constraints: [AB/BC = FE/ED, all values positive]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Three parallel lines cut by two transversals]
 */
