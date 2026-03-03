import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: a6dbad6b
 *
 * FIX ANALYSIS:
 * - Removed <Polygon> component entirely.
 *   - The user reported a "bent in" side or "4 vertices", which is a common rendering artifact
 *     when a polygon's edge overlaps with an existing line (z-fighting or anti-aliasing offsets).
 * - Replaced figure with strictly line-based geometry:
 *   - Top and Bottom parallel lines (segments spanning the view).
 *   - Two distinct transversal segments meeting at a point on the top line.
 * - This creates a clean "Triangle between parallel lines" visual without fill artifacts.
 */

export const generator_a6dbad6b = {
  metadata: {
    id: "a6dbad6b",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const y = getRandomInt(15, 40);
    const z = getRandomInt(40, 70);
    const x = 180 - y - z;
    
    // Geometry Construction
    // Top line (ell): y = 1.5
    // Bottom line (m): y = -1.5
    // Intersection Point on Top Line: (1, 1.5)
    // Left Transversal connects (1, 1.5) to (-3, -1.5)
    // Right Transversal connects (1, 1.5) to (3, -1.5)
    
    const mafsCode = `
      <Mafs viewBox={{ x: [-5, 5], y: [-3, 3] }}>
        {/* Line ell (Top Parallel) */}
        <Line.Segment point1={[-5, 1.5]} point2={[5, 1.5]} color="black" />
        <Text x={-4.5} y={1.8}>ℓ</Text>

        {/* Line m (Bottom Parallel) */}
        <Line.Segment point1={[-5, -1.5]} point2={[5, -1.5]} color="black" />
        <Text x={-4.5} y={-1.8}>m</Text>

        {/* Left Transversal Side */}
        <Line.Segment point1={[1, 1.5]} point2={[-3, -1.5]} color="black" />

        {/* Right Transversal Side */}
        <Line.Segment point1={[1, 1.5]} point2={[3, -1.5]} color="black" />

        {/* Labels for Interior Angles */}
        {/* x (Top Vertex) - placed just below the intersection */}
        <Text x={1} y={0.9}>x°</Text>

        {/* y (Bottom Left Vertex) - placed just above bottom line and to right of transversal */}
        <Text x={-2.2} y={-1.2}>y°</Text>

        {/* z (Bottom Right Vertex) - placed just above bottom line and to left of transversal */}
        <Text x={2.4} y={-1.2}>z°</Text>
      </Mafs>
    `;

    const correctAnswer = x.toString();
    const distractorA = 180 - z;
    const distractorC = 90;
    const distractorD = 180 - x;

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "incorrectly calculates supplementary to z" },
      { text: correctAnswer, isCorrect: true },
      { text: distractorC.toString(), isCorrect: false, reason: "assumes a right angle without calculation" },
      { text: distractorD.toString(), isCorrect: false, reason: "calculates the supplement of x instead of x itself" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure above, lines $\\ell$ and $m$ are parallel, $y=${y}$, and $z=${z}$. What is the value of $x$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. Since lines $\\ell$ and $m$ are parallel, the figure forms a triangle with vertices on these lines. The angles $x^{\\circ}$, $y^{\\circ}$, and $z^{\\circ}$ represent the interior angles of this triangle (using alternate interior angle properties for the top vertex if viewed as transversals). By the triangle angle sum theorem: $x + ${y} + ${z} = 180$, so $x = 180 - (${y} + ${z}) = ${correctAnswer}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};