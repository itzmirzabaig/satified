import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 64c1f044
 *
 * FIX ANALYSIS:
 * - Fixed logical error: Angle x was placed at the right angle (0,0). 
 *   Moved Angle x to the vertex at (4,0).
 *   This ensures the vertical side is "Opposite" and horizontal is "Adjacent", 
 *   matching the answer logic (tan x = opp/adj).
 * - Fixed scaling: Decoupled drawing size from random values.
 *   Draws a fixed 3x4 triangle to fit the viewbox, labels it with the random values (5-10, 20-30).
 * - Added Right Angle marker.
 * - Replaced <LaTeX> with <Text> to prevent double-labeling.
 */

export const generator_64c1f044 = {
  metadata: {
    id: "64c1f044",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const opposite = getRandomInt(20, 30);
    const adjacent = getRandomInt(5, 10);

    const mafsCode = `
      <Mafs viewBox={{ x: [-2, 5], y: [-1, 4] }}>
        {/* Triangle Vertices: C(0,0), A(4,0), B(0,3) */}
        <Polygon points={[[0, 0], [4, 0], [0, 3]]} color="black" fillOpacity={0.1} />
        
        {/* Right Angle Marker at C(0,0) */}
        <Line.Segment point1={[0, 0.4]} point2={[0.4, 0.4]} color="black" />
        <Line.Segment point1={[0.4, 0.4]} point2={[0.4, 0]} color="black" />

        {/* Labels */}
        {/* Adjacent Side (Bottom) */}
        <Text x={2} y={-0.5}>${adjacent}</Text>
        
        {/* Opposite Side (Left) */}
        <Text x={-0.8} y={1.5}>${opposite}</Text>
        
        {/* Angle x at Vertex A (4,0) */}
        {/* This makes the vertical side 'opposite' and horizontal 'adjacent' */}
        <Text x={3.2} y={0.4}>x°</Text>
      </Mafs>
    `;

    const optionsData = [
      { text: `$\\frac{1}{${opposite}}$`, isCorrect: false, reason: "uses the reciprocal of the opposite side length" },
      { text: `$\\frac{${opposite - adjacent}}{${opposite}}$`, isCorrect: false, reason: "uses an incorrect calculation involving the difference of side lengths" },
      { text: `$\\frac{${opposite}}{${adjacent}}$`, isCorrect: true },
      { text: `$\\frac{${opposite + adjacent}}{${adjacent}}$`, isCorrect: false, reason: "incorrectly adds the sides before forming the ratio" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: "In the triangle shown, what is the value of $\\tan x^{\\circ}$?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. The tangent of an acute angle in a right triangle is the ratio of the length of the side opposite the angle to the length of the side adjacent to the angle. In the triangle shown, relative to angle $x^{\\circ}$, the opposite side has length ${opposite} and the adjacent side has length ${adjacent}. Thus, $\\tan x^{\\circ} = \\frac{\\text{opposite}}{\\text{adjacent}} = \\frac{${opposite}}{${adjacent}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};