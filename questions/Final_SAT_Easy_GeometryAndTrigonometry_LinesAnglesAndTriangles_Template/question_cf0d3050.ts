import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: cf0d3050
 *
 * FIX ANALYSIS:
 * - Added <Mafs> wrapper with viewBox.
 * - Replaced broken <Line.ThroughPoints> with <Line.Segment>.
 * - Replaced <LaTeX> with <Text> to fix double-labeling.
 * - Geometric Setup:
 *   - Line s (Top) at y = 1.5.
 *   - Line t (Bottom) at y = -1.5.
 *   - Transversal with slope 1 (passing through origin).
 *   - Top Intersection (1.5, 1.5): Left-Down sector is Obtuse. Placed givenAngle there.
 *   - Bottom Intersection (-1.5, -1.5): Left-Up sector is Acute. Placed x there.
 *   - This arrangement correctly depicts Consecutive Interior angles.
 */

export const generator_cf0d3050 = {
  metadata: {
    id: "cf0d3050",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const givenAngle = getRandomInt(100, 140);
    const xValue = 180 - givenAngle;
    
    const mafsCode = `
      <Mafs viewBox={{ x: [-5, 5], y: [-3, 3] }}>
        {/* Line s (Top) */}
        <Line.Segment point1={[-5, 1.5]} point2={[5, 1.5]} color="black" />
        <Text x={-4.5} y={1.8}>s</Text>

        {/* Line t (Bottom) */}
        <Line.Segment point1={[-5, -1.5]} point2={[5, -1.5]} color="black" />
        <Text x={-4.5} y={-1.2}>t</Text>

        {/* Transversal c (Slope 1) */}
        <Line.Segment point1={[-3, -3]} point2={[3, 3]} color="black" />
        <Text x={3} y={2.5}>c</Text>

        {/* Labels for Consecutive Interior Angles (Left side) */}
        
        {/* givenAngle (Obtuse) at Top Intersection (1.5, 1.5) */}
        {/* Positioned in the interior (down-left from intersection) */}
        <Text x={0.2} y={1}>${givenAngle}°</Text>
        
        {/* x (Acute) at Bottom Intersection (-1.5, -1.5) */}
        {/* Positioned in the interior (up-left from intersection) */}
        <Text x={-2.5} y={-1}>x</Text>
      </Mafs>
    `;

    // Generating standard options since 'null' can cause issues in some renderers,
    // even for what might conceptually be a fill-in-the-blank question.
    const optionsData = [
      { text: xValue.toString(), isCorrect: true },
      { text: givenAngle.toString(), isCorrect: false, reason: "chooses the given angle instead of the supplementary angle" },
      { text: (givenAngle - 20).toString(), isCorrect: false, reason: "calculation error" },
      { text: "90", isCorrect: false, reason: "assumes a right angle" }
    ];

    const shuffledOptions = shuffle(optionsData);

    return {
      questionText: `In the figure shown, line $c$ intersects parallel lines $s$ and $t$. What is the value of $x$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: xValue.toString(),
      explanation: `Choice ${shuffledOptions.find(o => o.isCorrect)?.text} is correct. In the figure, $x$ and the angle labeled $${givenAngle}^{\\circ}$ are consecutive interior angles (also known as same-side interior angles). When parallel lines are cut by a transversal, consecutive interior angles are supplementary. Therefore, $x + ${givenAngle} = 180$, which gives $x = ${xValue}$.`
    };
  }
};