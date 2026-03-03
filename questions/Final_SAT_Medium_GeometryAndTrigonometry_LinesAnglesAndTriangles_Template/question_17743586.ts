import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 17743586
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angles: 25-40, 45-60, 70-85 degrees]
 * - Difficulty factors: [Similar polygons, angle preservation vs side scaling]
 * - Distractor patterns: [A: divided by scale, C: unrelated, D: multiplied by scale]
 * - Constraints: [Corresponding angles are congruent in similar figures]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [null]
 */

export const generator_17743586 = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const scaleFactor = getRandomInt(2, 4);
    const angleP = getRandomInt(25, 40);
    const angleQ = getRandomInt(45, 60);
    const angleR = getRandomInt(70, 85);
    
    // STEP 2: Create options
    const distractorA = Math.round(angleP / scaleFactor);
    const distractorD = angleP * scaleFactor;
    
    // FIXED: Changed \\\\circ to \\circ for degree symbol
    const optionsData = [
      { text: `$${distractorA}^{\\circ}$`, isCorrect: false, reason: "incorrectly divides the angle measure by the scale factor" },
      { text: `$${angleP}^{\\circ}$`, isCorrect: true },
      { text: `$${angleP + 10}^{\\circ}$`, isCorrect: false, reason: "is not related to the given information" },
      { text: `$${distractorD}^{\\circ}$`, isCorrect: false, reason: "incorrectly multiplies the angle measure by the scale factor" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      // FIXED: Changed \\\\prime to \\prime and \\\\circ to \\circ
      questionText: `Quadrilateral $P^{\\prime} Q^{\\prime} R^{\\prime} S^{\\prime}$ is similar to quadrilateral $PQRS$, where $P, Q, R$, and $S$ correspond to $P^{\\prime}, Q^{\\prime}, R^{\\prime}$, and $S^{\\prime}$, respectively. The measure of angle $P$ is $${angleP}^{\\circ}$, the measure of angle $Q$ is $${angleQ}^{\\circ}$, and the measure of angle $R$ is $${angleR}^{\\circ}$. The length of each side of $P^{\\prime} Q^{\\prime} R^{\\prime} S^{\\prime}$ is $${scaleFactor}$ times the length of each corresponding side of $PQRS$. What is the measure of angle $P^{\\prime}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `${angleP}°`,
      // FIXED: Changed \\\\prime to \\prime
      explanation: `Choice ${correctOption.letter} is correct. Since quadrilateral $P^{\\prime} Q^{\\prime} R^{\\prime} S^{\\prime}$ is similar to quadrilateral $PQRS$, the corresponding angles are congruent. Since angle $P$ corresponds to angle $P^{\\prime}$, the measure of angle $P^{\\prime}$ is equal to the measure of angle $P$, which is ${angleP}°. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};