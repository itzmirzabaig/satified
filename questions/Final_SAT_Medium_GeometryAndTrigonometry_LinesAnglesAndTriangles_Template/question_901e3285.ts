import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 901e3285
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [vertex angle: 40-60 degrees]
 * - Difficulty factors: [Isosceles triangle cases, angle sum constraint]
 * - Distractor patterns: [A: valid case (base=vertex), B: valid case (A is vertex), C: valid case (A is base)]
 * - Constraints: [All valid cases must sum to 180, two angles must be equal]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [null]
 */

export const generator_901e3285 = {
  metadata: {
    // id: "901e3285",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random vertex angle
    const angleA = getRandomInt(40, 60);
    
    // Calculate valid cases
    const case1_B = angleA; // B = A (base angles)
    const case2_B = (180 - angleA) / 2; // A is vertex, B and C are base
    const case3_B = 180 - 2 * angleA; // A and C are base, B is different
    
    // Ensure case3_B is positive and valid
    let validCase3 = case3_B;
    if (case3_B <= 0 || case3_B >= 180) {
      validCase3 = getRandomInt(30, 50); // Fallback
    }
    
    // Invalid case (would be option D) - must not allow valid triangle
    // Generate an angle that makes the sum exceed 180 or creates no equal angles
    let invalidB = getRandomInt(85, 95);
    // Ensure invalidB doesn't accidentally create a valid isosceles case
    while (invalidB === angleA || (180 - angleA - invalidB) === angleA || (180 - angleA - invalidB) === invalidB) {
      invalidB = getRandomInt(85, 95);
    }
    
    // STEP 2: Create options
    const optionsData = [
      { text: `$${case1_B}^{\\circ}$`, isCorrect: false, reason: "is possible when angle B equals angle A, making angle C = " + (180 - 2 * angleA) },
      { text: `$${case2_B}^{\\circ}$`, isCorrect: false, reason: "is possible when angle A is the vertex angle and B = C" },
      { text: `$${validCase3}^{\\circ}$`, isCorrect: false, reason: "is possible when angle A equals angle C" },
      { text: `$${invalidB}^{\\circ}$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `In triangle $ABC$, the measure of angle $A$ is $${angleA}^{\\circ}$. If triangle $ABC$ is isosceles, which of the following is NOT a possible measure of angle $B$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `${invalidB}°`,
      explanation: `Choice ${correctOption.letter} is correct. The sum of the three interior angles in a triangle is 180°. It's given that angle A measures ${angleA}°. If angle B measured ${invalidB}°, the measure of angle C would be 180°-(${angleA}°+${invalidB}°) = ${180 - angleA - invalidB}°. Thus, the measures of the angles in the triangle would be ${angleA}°, ${invalidB}°, and ${180 - angleA - invalidB}°. However, an isosceles triangle has two angles of equal measure. Since none of these are equal, angle B can't measure ${invalidB}°. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 1c3d613c
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [scale factor: 2-4, angle: 15-35 degrees]
 * - Difficulty factors: [SSS similarity, corresponding angles equal]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [All sides proportional implies similar, corresponding angles equal]
 * - Question type: [No Figure→Fill in the blank]
 * - Figure generation: [null]
 */
