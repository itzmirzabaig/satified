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
    // FIXED (review): the total was drawn on its own, so the situation could be
    // impossible (4G + 14R = 301 has no whole number solution). The total is now
    // built from real token counts. The explanation lacked "The correct answer
    // is" and did not say why each coefficient is a point value.
    let greenPoints = 0, redPoints = 0, totalPoints = 0;
    do {
      greenPoints = getRandomInt(2, 15);
      redPoints = getRandomInt(greenPoints + 10, greenPoints + 50);
      const greenCount = getRandomInt(3, 20);
      const redCount = getRandomInt(2, 10);
      totalPoints = greenPoints * greenCount + redPoints * redCount;
    } while (totalPoints < 150 || totalPoints > 600);

    const difference = redPoints - greenPoints;

    return {
      questionText: `At a school fair, students can win colored tokens that are worth a different number of points depending on the color. One student won green tokens and red tokens worth a total of ${totalPoints} points. The equation $${greenPoints}G + ${redPoints}R = ${totalPoints}$ represents this situation, where $G$ is the number of green tokens and $R$ is the number of red tokens won by the student. How many more points is a red token worth than a green token?`,
      figureCode: null,
      options: [],
      correctAnswer: difference.toString(),
      explanation: `The correct answer is ${difference}. In the equation $${greenPoints}G + ${redPoints}R = ${totalPoints}$, the term $${greenPoints}G$ is the number of points from $G$ green tokens, so each green token is worth ${greenPoints} points. Likewise, the term $${redPoints}R$ is the number of points from $R$ red tokens, so each red token is worth ${redPoints} points. A red token is worth $${redPoints} - ${greenPoints} = ${difference}$ more points than a green token.`
    };
  }
};
