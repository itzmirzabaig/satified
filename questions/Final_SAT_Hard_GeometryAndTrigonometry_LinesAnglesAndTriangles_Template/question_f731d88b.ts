import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: f731d88b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angle B = 139°, angle D = 174°, answer: 47°]
 * - Difficulty factors: [Parallel lines, pentagon angles, exterior angles, transversals]
 * - Distractor patterns: [N/A - fill in the blank]
 * - Constraints: [AB || DE, convex pentagon, angle sum properties]
 * - Question type: [Text→Fill in the blank]
 */

export const generator_f731d88b = {
  metadata: {
    // id: "f731d88b",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate angles that work with the exterior angle logic
    const angleB = getRandomInt(130, 145);
    const exteriorB = 180 - angleB;
    
    const angleD = getRandomInt(165, 175);
    const exteriorD = 180 - angleD;
    
    // STEP 2: Calculate angle C using exterior angle theorem
    const angleC = exteriorB + exteriorD;
    
    // Verify it's a reasonable angle for a convex pentagon
    if (angleC >= 30 && angleC <= 70) {
      return {
        questionText: `In convex pentagon $ABCDE$, segment $AB$ is parallel to segment $DE$. The measure of angle $B$ is ${angleB} degrees, and the measure of angle $D$ is ${angleD} degrees. What is the measure, in degrees, of angle $C$?`,
        figureCode: null,
        options: null,
        correctAnswer: angleC.toString(),
        explanation: `The exterior angle at $B$ is $180 - ${angleB} = ${exteriorB}$ degrees. The exterior angle at $D$ is $180 - ${angleD} = ${exteriorD}$ degrees. Since $AB \\\\parallel DE$, these are alternate interior angles with respect to transversal $BC$ extended and $CD$ extended. By the exterior angle theorem, angle $C = ${exteriorB} + ${exteriorD} = ${angleC}$ degrees.`
      };
    }
    
    // Fallback with guaranteed valid values
    const fallbackAngleB = 139;
    const fallbackAngleD = 174;
    const fallbackExteriorB = 41;
    const fallbackExteriorD = 6;
    const fallbackAngleC = 47;
    
    return {
      questionText: `In convex pentagon $ABCDE$, segment $AB$ is parallel to segment $DE$. The measure of angle $B$ is ${fallbackAngleB} degrees, and the measure of angle $D$ is ${fallbackAngleD} degrees. What is the measure, in degrees, of angle $C$?`,
      figureCode: null,
      options: null,
      correctAnswer: fallbackAngleC.toString(),
      explanation: `The exterior angle at $B$ is $180 - ${fallbackAngleB} = ${fallbackExteriorB}$ degrees. The exterior angle at $D$ is $180 - ${fallbackAngleD} = ${fallbackExteriorD}$ degrees. Since $AB \\\\parallel DE$, these are alternate interior angles with respect to transversal $BC$ extended and $CD$ extended. By the exterior angle theorem, angle $C = ${fallbackExteriorB} + ${fallbackExteriorD} = ${fallbackAngleC}$ degrees.`
    };
  }
};

/**
 * Question ID: 17912810
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [a=43, b=122, answer: 50.5]
 * - Difficulty factors: [Parallel lines, triangle angles, supplementary angles]
 * - Distractor patterns: [N/A - fill in the blank]
 * - Constraints: [g || t, angles a and b given, find w]
 * - Question type: [Figure→Fill in the blank]
 */

// File: generators/lines-angles-and-triangles/17912810.ts