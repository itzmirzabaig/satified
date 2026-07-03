import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 706
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 9, point: (0,-5)]
 * - Difficulty factors: [Identifying slope from equation form]
 * - Distractor patterns: [Not applicable - fill in blank]
 * - Constraints: [Direct identification]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_706 = {
  metadata: {
    id: "706",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const slope = getRandomInt(2, 15);
    const intercept = getRandomInt(-10, 5);
    
    return {
      questionText: `A line in the xy-plane has a slope of ${slope} and passes through the point \\( (0,${intercept}) \\). The equation \\( y=px+r \\) defines the line, where \\( p \\) and \\( r \\) are constants. What is the value of \\( p \\) ?`,
      figureCode: null,
      options: [],
      correctAnswer: slope.toString(),
      explanation: `The correct answer is ${slope}. It's given that the equation \\( y=px+r \\) defines the line. In this equation, \\( p \\) represents the slope of the line and \\( r \\) represents the y-coordinate of the y-intercept of the line. It's given that the line has a slope of ${slope}. Therefore, the value of \\( p \\) is ${slope}.`
    };
  }
};
