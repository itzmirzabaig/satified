import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: d3fe472f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [scale factor: 2-4, side length: 10-30]
 * - Difficulty factors: [Similar triangles, scale factor application]
 * - Distractor patterns: [A: subtracted scale, B: no change (scale 1), C: added scale]
 * - Constraints: [XY = 2 * AB]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [null]
 */

export const generator_d3fe472f = {
  metadata: {
    // id: "d3fe472f",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const scaleFactor = getRandomInt(2, 4);
    const AB = getRandomInt(10, 30) * 2; // Ensure even for clean answer
    const XY = scaleFactor * AB;
    
    // STEP 2: Create options
    const distractorA = AB - scaleFactor;
    const distractorB = AB;
    const distractorC = AB + scaleFactor;
    
    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "results from subtracting the scale factor instead of multiplying" },
      { text: distractorB.toString(), isCorrect: false, reason: "implies the triangles are congruent (scale factor of 1)" },
      { text: distractorC.toString(), isCorrect: false, reason: "results from adding the scale factor instead of multiplying" },
      { text: XY.toString(), isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `Triangle $ABC$ is similar to triangle $XYZ$, such that $A$, $B$, and $C$ correspond to $X$, $Y$, and $Z$ respectively. The length of each side of triangle $XYZ$ is $${scaleFactor}$ times the length of its corresponding side in triangle $ABC$. The measure of side $AB$ is $${AB}$. What is the measure of side $XY$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: XY.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Since triangle $ABC$ is similar to triangle $XYZ$ with corresponding vertices $A \\\\leftrightarrow X$ and $B \\\\leftrightarrow Y$, side $AB$ corresponds to side $XY$. The scale factor is ${scaleFactor}, so $XY = ${scaleFactor} \\\\times AB = ${scaleFactor} \\\\times ${AB} = ${XY}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: fd8745fc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base angles: 35-55 degrees]
 * - Difficulty factors: [Isosceles triangle properties, triangle sum theorem]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Two angles equal, sum = 180]
 * - Question type: [No Figure→Fill in the blank]
 * - Figure generation: [null]
 */
