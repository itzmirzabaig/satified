import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: e0d2e21a
 *
 * FIX ANALYSIS:
 * - Geometric Consistency:
 *   - Chosen specific coordinates to ensure the triangles are clearly Scalene (no right angles).
 *   - Triangle ABC: Base 3, Height 2, Top vertex offset 1. Angle A ≈ 63°.
 *   - Triangle XYZ: Created by adding a fixed offset to X, then scaling ABC's relative coordinates by 1.3.
 *   - This ensures strict geometric similarity and prevents visual ambiguity.
 * - Labeling: 
 *   - Changed side label to just "d".
 * - ViewBox:
 *   - Expanded to fit the new coordinates comfortably.
 */

export const generator_e0d2e21a = {
  metadata: {
    id: "e0d2e21a",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const d = getRandomInt(12, 20);
    const scaleFactor = getRandomInt(2, 4);
    const angleA = getRandomInt(50, 70);
    
    // Geometry Construction
    // Triangle ABC (Original) - Scalene
    // A at (0,0)
    // B at (3,0)
    // C at (1, 2)
    // Check: Angle A = atan(2/1) ≈ 63.4° (Fits range 50-70 perfectly)
    // Check: Angle B = atan(2/2) = 45°
    // Check: Angle C = 180 - 63.4 - 45 = 71.6°
    // No right angles.
    
    // Triangle XYZ (Dilated) - Visual Scale 1.3
    // Shift X to start at x=4
    const shiftX = 4;
    const visualScale = 1.3;
    
    // X corresponds to A
    const X = [shiftX, 0];
    
    // Y corresponds to B
    // B is (3,0) relative to A. So Y is (3*1.3, 0) relative to X.
    const Y = [shiftX + (3 * visualScale), 0]; // (7.9, 0)
    
    // Z corresponds to C
    // C is (1,2) relative to A. So Z is (1*1.3, 2*1.3) relative to X.
    const Z = [shiftX + (1 * visualScale), 2 * visualScale]; // (5.3, 2.6)
    
    const mafsCode = `
      <Mafs viewBox={{ x: [-1, 9], y: [-1, 4] }}>
        {/* Triangle ABC */}
        <Polygon points={[[0, 0], [3, 0], [1, 2]]} color="black" fillOpacity={0.1} />
        <Text x={-0.3} y={-0.3}>A</Text>
        <Text x={3.3} y={-0.3}>B</Text>
        <Text x={0.9} y={2.3}>C</Text>
        
        {/* Angle A Label */}
        <Text x={0.6} y={0.4}>${angleA}°</Text>
        
        {/* Side AB Label */}
        <Text x={1.5} y={-0.4}>d</Text>


        {/* Triangle XYZ */}
        <Polygon points={[[${X[0]}, ${X[1]}], [${Y[0]}, ${Y[1]}], [${Z[0]}, ${Z[1]}]]} color="black" fillOpacity={0.1} />
        <Text x={${X[0]} - 0.2} y={-0.3}>X</Text>
        <Text x={${Y[0]} + 0.2} y={-0.3}>Y</Text>
        <Text x={${Z[0]}} y={${Z[1]} + 0.3}>Z</Text>
        
        {/* Angle X Label (Unknown) */}
        <Text x={${X[0]} + 0.8} y={0.5}>?</Text>
      </Mafs>
    `;

    const correctAnswer = angleA.toString();
    const distractorA = angleA - 40;
    const distractorB = angleA - 3;
    const distractorD = angleA + 3;

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "results from a calculation error" },
      { text: distractorB.toString(), isCorrect: false, reason: "results from a calculation error" },
      { text: correctAnswer, isCorrect: true },
      { text: distractorD.toString(), isCorrect: false, reason: "results from a calculation error" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `For the triangles shown, triangle $ABC$ is dilated by a scale factor of $${scaleFactor}$ to obtain triangle $XYZ$, where $d = ${d}$. What is the measure, in degrees, of angle $X$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. Dilation is a transformation that changes the size of a figure but not its shape, producing similar figures. In similar triangles, corresponding angles are congruent (equal in measure). Angle $A$ corresponds to angle $X$. Therefore, the measure of angle $X$ is equal to the measure of angle $A$, which is $${correctAnswer}^{\\circ}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};