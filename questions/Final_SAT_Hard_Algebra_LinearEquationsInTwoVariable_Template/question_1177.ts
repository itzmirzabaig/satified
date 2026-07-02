import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1177
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 5, 45, total: 380]
 * - Difficulty factors: [Interpreting coefficients as point values in context]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Difference of coefficients gives answer]
 * - Question type: [Text → Fill in blank]
 * - Figure generation: [None]
 */

export const generator_1177 = {
  metadata: {
    id: "1177",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const greenPoints = getRandomInt(2, 15);
    const redPoints = getRandomInt(greenPoints + 10, greenPoints + 50);
    const totalPoints = getRandomInt(200, 500);
    
    const difference = redPoints - greenPoints;
    
    return {
      questionText: `At a school fair, students can win colored tokens that are worth a different number of points depending on the color. One student won green tokens and red tokens worth a total of ${totalPoints} points. The equation $${greenPoints}G + ${redPoints}R = ${totalPoints}$ represents this situation, where $G$ is the number of green tokens and $R$ is the number of red tokens won by one student. How many more points is a red token worth than a green token?`,
      figureCode: null,
      options: null,
      correctAnswer: difference.toString(),
      explanation: `The coefficient ${greenPoints} represents points per green token and ${redPoints} represents points per red token. The difference is $${redPoints}-${greenPoints}=${difference}$ points.`
    };
  }
};
