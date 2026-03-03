import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 4ff7b652
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angle: 40-60 degrees]
 * - Difficulty factors: [Similar triangles, corresponding angles]
 * - Distractor patterns: [A: complementary angle, C: supplement, D: impossible angle]
 * - Constraints: [Corresponding angles in similar triangles are congruent]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [null]
 */

export const generator_4ff7b652 = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random angle
    const angleM = getRandomInt(40, 60);
    const complement = 90 - angleM;
    
    // STEP 2: Create options
    // FIXED: Changed \\\\circ to \\circ for degree symbol
    const optionsData = [
      { text: `$${complement}^{\\circ}$`, isCorrect: false, reason: "is the measure of the third angle in the triangle, not the corresponding angle" },
      { text: `$${angleM}^{\\circ}$`, isCorrect: true },
      { text: `$${180 - angleM}^{\\circ}$`, isCorrect: false, reason: "is the supplement of angle M, which is geometrically impossible for an interior angle of a right triangle" },
      { text: `$${180 - complement}^{\\circ}$`, isCorrect: false, reason: "is geometrically impossible for an interior angle of a right triangle" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      // FIXED: Changed \\\\circ to \\circ for degree symbol
      questionText: `Right triangles $LMN$ and $PQR$ are similar, where $L$ and $M$ correspond to $P$ and $Q$, respectively. Angle $M$ has a measure of $${angleM}^{\\circ}$. What is the measure of angle $Q$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `${angleM}°`,
      explanation: `Choice ${correctOption.letter} is correct. The question states that the right triangles $LMN$ and $PQR$ are similar with $M$ corresponding to $Q$. Since corresponding angles of similar triangles are congruent, the measure of angle $Q$ equals the measure of angle $M$, which is ${angleM}°. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};