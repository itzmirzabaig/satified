import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 2085e10e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angles: 40-50 and 85-95 degrees]
 * - Difficulty factors: [AA similarity, determining sufficiency of information]
 * - Distractor patterns: [A: redundant info, B: redundant info, C: redundant info]
 * - Constraints: [AA similarity requires only two angles]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [null]
 */

export const generator_2085e10e = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random angles
    const angleD = getRandomInt(40, 50);
    const angleE = getRandomInt(85, 95);
    
    // STEP 2: Create options
    const optionsData = [
      { text: "The measure of angle $F$", isCorrect: false, reason: "is redundant since the third angle can be calculated and is not needed for AA similarity" },
      { text: "The measure of angle $T$", isCorrect: false, reason: "is redundant for the same reason as option A" },
      { text: "The measure of angle $F$ and the measure of angle $T$", isCorrect: false, reason: "is redundant; knowing all three angles is not necessary once two pairs are known to be congruent" },
      { text: "No additional information is needed.", isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      // FIXED: Changed \\\\circ to \\circ for degree symbol
      questionText: `In triangle $DEF$, the measure of angle $D$ is $${angleD}^{\\circ}$ and the measure of angle $E$ is $${angleE}^{\\circ}$. In triangle $RST$, the measure of angle $R$ is $${angleD}^{\\circ}$ and the measure of angle $S$ is $${angleE}^{\\circ}$. Which of the following additional pieces of information is needed to determine whether triangle $DEF$ is similar to triangle $RST$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: "No additional information is needed.",
      explanation: `Choice ${correctOption.letter} is correct. To determine if two triangles are similar, we can use the Angle-Angle (AA) Similarity Postulate. Since angle $D$ (${angleD}°) corresponds to angle $R$ (${angleD}°) and angle $E$ (${angleE}°) corresponds to angle $S$ (${angleE}°), we have two pairs of congruent angles. Therefore, the triangles are similar by AA, and no additional information is required. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};