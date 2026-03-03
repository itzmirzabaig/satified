import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 145337bc
 *
 * FIX ANALYSIS:
 * - Added <Mafs> wrapper with fixed viewBox to ensure visibility.
 * - Decoupled rendering size from value size:
 *   - Draws a fixed-size triangle (4x4 units) for stability.
 *   - Labels it with the random 'legValue' (10-40).
 * - Fixed the "unsolvable" issue by explicitly adding the 45-degree angle label.
 * - Added a Right Angle marker for geometric clarity.
 * - Replaced <LaTeX> with <Text> to prevent double-labeling.
 */

export const generator_145337bc = {
  metadata: {
    id: "145337bc",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const legValue = getRandomInt(10, 40);
    const doubleLeg = legValue * 2;
    const sumAngleLeg = 45 + legValue;
    
    // Geometry Construction
    // Fixed drawing size (4 units) ensures the figure always fits the viewbox.
    // We label this fixed shape with the dynamic 'legValue'.
    
    const mafsCode = `
      <Mafs viewBox={{ x: [-1, 5], y: [-1, 5] }}>
        {/* Triangle Vertices: (0,0), (4,0), (0,4) */}
        <Polygon points={[[0, 0], [4, 0], [0, 4]]} color="black" fillOpacity={0.1} />
        
        {/* Right Angle Marker at (0,0) */}
        <Line.Segment point1={[0, 0.4]} point2={[0.4, 0.4]} color="black" />
        <Line.Segment point1={[0.4, 0.4]} point2={[0.4, 0]} color="black" />

        {/* Labels */}
        {/* Bottom Leg: Label with legValue */}
        <Text x={2} y={-0.4}>${legValue}</Text>
        
        {/* Left Leg: Label with x */}
        <Text x={-0.4} y={2}>x</Text>
        
        {/* Angle Label at Bottom Right (4,0) */}
        {/* Placing it slightly inside to indicate the angle */}
        <Text x={3.2} y={0.3}>45°</Text>
      </Mafs>
    `;

    const optionsData = [
      { text: `${legValue}`, isCorrect: true },
      { text: `45`, isCorrect: false, reason: "confuses the angle measure with the side length" },
      { text: `${doubleLeg}`, isCorrect: false, reason: "incorrectly doubles the given leg length" },
      { text: `${sumAngleLeg}`, isCorrect: false, reason: "incorrectly adds the angle measure and the leg length" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: "In the triangle shown, what is the value of $x$?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The figure shows a right triangle with one acute angle measuring $45^{\\circ}$. Since the sum of angles in a triangle is $180^{\\circ}$ and the right angle is $90^{\\circ}$, the third angle must be $180 - 90 - 45 = 45^{\\circ}$. A triangle with two equal angles is isosceles, meaning its two legs are equal in length. Therefore, $x = ${legValue}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};