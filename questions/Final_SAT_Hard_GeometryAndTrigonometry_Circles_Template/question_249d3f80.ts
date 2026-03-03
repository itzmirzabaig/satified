import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 249d3f80
 * Skill: Circles (Central Angles)
 * Difficulty: Hard
 * 
 * Description: Relationship between central angle and intercepted arc measure.
 * Fixes:
 * - Replaced double-escaped `\\\\circ` with standard LaTeX `^\\circ` inside math delimiters.
 */
export const generator_249d3f80 = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // ----------------------------------------------------------------------
    // 1. GENERATE VALUES
    // ----------------------------------------------------------------------
    const arcMeasure = getRandomInt(45, 150);
    
    // ----------------------------------------------------------------------
    // 2. RETURN DATA
    // ----------------------------------------------------------------------
    return {
      questionText: `Point $O$ is the center of a circle. The measure of arc $RS$ on this circle is $${arcMeasure}^\\circ$. What is the measure, in degrees, of its associated angle $ROS$?`,
      figureCode: null,
      options: null, // Fill-in-the-blank
      correctAnswer: arcMeasure.toString(),
      explanation: `
        The correct answer is ${arcMeasure}.
        <br/><br/>
        A central angle is an angle whose vertex is the center of the circle ($O$) and whose sides pass through points on the circle ($R$ and $S$).
        <br/>
        The measure of a central angle is defined as being equal to the measure of its intercepted arc.
        <br/><br/>
        Given:
        $$ \\text{Measure of arc } RS = ${arcMeasure}^\\circ $$
        <br/>
        Therefore:
        $$ m\\angle ROS = ${arcMeasure}^\\circ $$
        <br/>
        The measure, in degrees, is ${arcMeasure}.
      `
    };
  }
};