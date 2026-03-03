import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: e0874bc2
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [perimeter TUV: 37, perimeter XYZ: 333, TU: 18]
 * - Difficulty factors: [Similar triangles, perimeter ratio = side ratio]
 * - Distractor patterns: [A: 2, B: 18, C: 55]
 * - Constraints: [Perimeters must have clean integer ratio]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_e0874bc2 = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const ratio = getRandomInt(7, 12); // Like 9 (333/37)
    const perimeterTUV = getRandomInt(30, 50);
    const perimeterXYZ = perimeterTUV * ratio;
    const sideTU = getRandomInt(15, 25);
    
    // STEP 2: Calculate derived values
    const sideXY = sideTU * ratio;
    
    // STEP 3: Build HTML table
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Triangle</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Perimeter</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">TUV</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${perimeterTUV}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">XYZ</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${perimeterXYZ}</td>
    </tr>
  </tbody>
</table>`;
    
    // STEP 4: Create options with tracking
    const correctText = sideXY.toString();
    
    // Distractors
    const distractorA = "2";
    const distractorB = sideTU.toString(); // Same as TU
    const distractorC = Math.round(sideXY / 3).toString(); // Rough third
    
    const optionsData = [
      { text: distractorA, isCorrect: false },
      { text: distractorB, isCorrect: false },
      { text: distractorC, isCorrect: false },
      { text: correctText, isCorrect: true }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 6: Build explanation
    // FIXED: Changed \\\\times to \\times
    const explanation = `Choice ${correctLetter} is correct. For similar triangles, the ratio of corresponding sides equals the ratio of perimeters. The perimeter ratio is $${perimeterXYZ}/${perimeterTUV} = ${ratio}$. Since side TU is ${sideTU}, the corresponding side XY is ${sideTU} \\times ${ratio} = ${sideXY}$. Choice ${incorrectOptions[0].letter} is incorrect; this appears to be an arbitrary small number. Choice ${incorrectOptions[1].letter} is incorrect; this is the length of TU, not XY. Choice ${incorrectOptions[2].letter} is incorrect; this does not correspond to the correct proportional calculation.`;
    
    return {
      // FIXED: Changed \\\\overline to \\overline for proper LaTeX overline command
      questionText: `The table gives the perimeters of similar triangles $TUV$ and $XYZ$, where $\\overline{TU}$ corresponds to $\\overline{XY}$. The length of $\\overline{TU}$ is $${sideTU}$. What is the length of $\\overline{XY}$?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};