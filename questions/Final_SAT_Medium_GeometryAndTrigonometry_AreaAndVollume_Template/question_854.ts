import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 854
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [perimeter TUV: 37, perimeter XYZ: 333, TU: 18]
 * - Difficulty factors: [Similar triangles, perimeter ratio = side ratio]
 * - Distractor patterns: [A: 2, B: 18, C: 55]
 * - Constraints: [Perimeters must have clean integer ratio]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_854 = {
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
    // Each math segment is fully wrapped in a balanced $...$ pair; numbers are
    // computed from the same live variables used to build the options.
    const explanation = `Choice ${correctLetter} is correct. For similar triangles, the ratio of corresponding sides equals the ratio of the perimeters. The perimeter ratio is $\\frac{${perimeterXYZ}}{${perimeterTUV}} = ${ratio}$. Since $\\overline{TU} = ${sideTU}$, the corresponding side is $\\overline{XY} = ${sideTU} \\times ${ratio} = ${sideXY}$. Choice ${incorrectOptions[0].letter} is incorrect; it is an arbitrary small value that ignores the perimeter ratio. Choice ${incorrectOptions[1].letter} is incorrect; this is the length of $\\overline{TU}$, not $\\overline{XY}$. Choice ${incorrectOptions[2].letter} is incorrect; it comes from taking one-third of the correct length instead of scaling up by the ratio ${ratio}.`;
    
    return {
      // Every math segment begins with a LaTeX command (\overline), so no "$"
      // is ever immediately followed by a bare digit (avoids the currency/math
      // dollar-collision heuristic). Numbers stay inside balanced $...$ pairs.
      questionText: `The table gives the perimeters of similar triangles $TUV$ and $XYZ$, where $\\overline{TU}$ corresponds to $\\overline{XY}$. Given that $\\overline{TU} = ${sideTU}$, what is the length of $\\overline{XY}$?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};