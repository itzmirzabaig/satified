import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: ebbf23ae
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coordinates: single digit (2,4) to (2,14), vertical line]
 * - Difficulty factors: [Finding center from diameter endpoints, radius calculation]
 * - Distractor patterns: [Using full diameter as radius, midpoint errors]
 * - Constraints: [Vertical diameter means same x-coordinate]
 * - Question type: [Conceptual→Fill in blank]
 * - Figure generation: [None]
 */

export const generator_ebbf23ae = {
  metadata: {
    // id: "ebbf23ae",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate x-coordinate for vertical diameter
    const x = getRandomInt(-8, 8);
    
    // STEP 2: Generate y-coordinates for endpoints
    const y1 = getRandomInt(-10, 0);
    const y2 = getRandomInt(5, 15); // Ensure positive and separated
    
    // STEP 3: Calculate diameter and radius
    const diameter = Math.abs(y2 - y1);
    const radius = diameter / 2;
    
    // STEP 4: Calculate center
    const centerY = (y1 + y2) / 2;
    
    // STEP 5: Verify clean numbers
    if (!Number.isInteger(radius) || !Number.isInteger(centerY)) {
      // Adjust to ensure integers - use while loop instead of recursion
      let validY1 = y1;
      let validY2 = y2;
      let validRadius = radius;
      let validCenterY = centerY;
      let attempts = 0;
      
      while ((!Number.isInteger(validRadius) || !Number.isInteger(validCenterY)) && attempts < 20) {
        const newY1 = getRandomInt(-10, 0);
        const newY2 = newY1 + 2 * getRandomInt(3, 10); // Even diameter
        validY1 = newY1;
        validY2 = newY2;
        validRadius = Math.abs(newY2 - newY1) / 2;
        validCenterY = (newY1 + newY2) / 2;
        attempts++;
      }
      
      // Return with valid values
      const finalY1 = validY1;
      const finalY2 = validY2;
      const finalRadius = validRadius;
      const finalCenterY = validCenterY;
      const finalDiameter = Math.abs(finalY2 - finalY1);
      
      return {
        questionText: `A circle in the xy-plane has a diameter with endpoints $(${x}, ${finalY1})$ and $(${x}, ${finalY2})$. An equation of this circle is $(x${x >= 0 ? '-' : '+'}${Math.abs(x)})^{2}+(y-${finalCenterY})^{2}=r^{2}$, where $r$ is a positive constant. What is the value of $r$?`,
        figureCode: null,
        options: null,
        correctAnswer: finalRadius.toString(),
        explanation: `The center of the circle is the midpoint of the diameter: $\\left(\\\\frac{${x}+${x}}{2}, \\\\frac{${finalY1}+${finalY2}}{2}\\\\right) = (${x}, ${finalCenterY})$. The radius is half the diameter length: $r = \\\\frac{|${finalY2} - ${finalY1}|}{2} = \\\\frac{${finalDiameter}}{2} = ${finalRadius}$.`
      };
    }
    
    return {
      questionText: `A circle in the xy-plane has a diameter with endpoints $(${x}, ${y1})$ and $(${x}, ${y2})$. An equation of this circle is $(x${x >= 0 ? '-' : '+'}${Math.abs(x)})^{2}+(y-${centerY})^{2}=r^{2}$, where $r$ is a positive constant. What is the value of $r$?`,
      figureCode: null,
      options: null,
      correctAnswer: radius.toString(),
      explanation: `The center of the circle is the midpoint of the diameter: $\\left(\\\\frac{${x}+${x}}{2}, \\\\frac{${y1}+${y2}}{2}\\\\right) = (${x}, ${centerY})$. The radius is half the diameter length: $r = \\\\frac{|${y2} - ${y1}|}{2} = \\\\frac{${diameter}}{2} = ${radius}$.`
    };
  }
};

/**
 * Question ID: b8a225ff
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center: (-5, 5), radius: 2, scale factor: 2]
 * - Difficulty factors: [Circle equation manipulation, radius scaling]
 * - Distractor patterns: [Scaling area instead of radius, wrong center]
 * - Constraints: [Scale factor applied to radius]
 * - Question type: [Conceptual→Fill in blank]
 * - Figure generation: [None]
 */