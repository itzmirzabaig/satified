import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 3b4b5b1e
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [obtuse angle: 120-150]
 * - Difficulty factors: [Linear pair, supplementary angles]
 * - Constraints: [x + givenAngle = 180]
 * - Question type: [Figure→Multiple Choice] (Converted from Fill-in-the-blank to match interface)
 */

export const generator_3b4b5b1e = {
  metadata: {
    id: "3b4b5b1e",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Math Logic
    const givenAngle = getRandomInt(120, 150);
    const correctVal = 180 - givenAngle;

    // 2. Geometry Setup
    // Line j (horizontal, y=0)
    // Line k (horizontal, y=-2) - added to satisfy "parallel lines" context
    // Transversal passing through (0,0) with negative slope to vary visual style
    
    // Using Unicode degree symbol (°) for labels
    const mafsCode = `
      <Mafs viewBox={{ x: [-5, 5], y: [-3, 3] }}>
        <Coordinates.Cartesian xAxis={{ labels: false, axis: false }} yAxis={{ labels: false, axis: false }} />
        
        {/* Line j */}
        <Line.Segment point1={[-4, 0]} point2={[4, 0]} />
        <Text x={4.2} y={0} attach="w">j</Text>

        {/* Line k */}
        <Line.Segment point1={[-4, -2]} point2={[4, -2]} />
        <Text x={4.2} y={-2} attach="w">k</Text>

        {/* Transversal Line */}
        {/* Passes through (0,0) with slope -1 */}
        <Line.Segment point1={[-2, 2]} point2={[2, -2]} />

        {/* Labels on Line j (y=0) at intersection (0,0) */}
        
        {/* Top-Right Angle (Obtuse, Quadrant I) */}
        <Text x={0.8} y={0.5}>${givenAngle}°</Text>
        
        {/* Top-Left Angle (Acute, Quadrant II) - variable x */}
        <Text x={-0.8} y={0.5}>x°</Text>
      </Mafs>
    `;

    // 3. Generate Options
    const optionsData = [
      { text: correctVal.toString(), isCorrect: true },
      { text: givenAngle.toString(), isCorrect: false, reason: "confuses x with the vertical angle" },
      { text: "90", isCorrect: false, reason: "assumes a right angle" },
      { text: (180 - correctVal + 10).toString(), isCorrect: false, reason: "calculation error" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // 4. Return complete QuestionData
    return {
      questionText: `In the figure above, line $j$ is parallel to line $k$. What is the value of $x$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctVal.toString(),
      explanation: `Choice ${correctOption.letter} is correct. 

The angle labeled $x^{\\circ}$ and the angle labeled $${givenAngle}^{\\circ}$ form a **linear pair** on line $j$. 

Angles that form a linear pair are supplementary, meaning their sum is $180^{\\circ}$.
$$x + ${givenAngle} = 180$$
$$x = 180 - ${givenAngle}$$
$$x = ${correctVal}$$

Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.`
    };
  }
};