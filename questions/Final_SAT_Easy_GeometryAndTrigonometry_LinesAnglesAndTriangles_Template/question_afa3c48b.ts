import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: afa3c48b
 *
 * FIX ANALYSIS:
 * - Added <Mafs> wrapper with viewBox.
 * - Replaced broken <Line.ThroughPoints> with <Line.Segment>.
 * - Replaced <LaTeX> with <Text> to fix double-labeling.
 * - Geometric Setup:
 *   - Parallel lines m (top) and n (bottom) at y = +/- 1.5.
 *   - Transversal with slope 0.5 passing through origin.
 *   - Intersection 1 (Top): (3, 1.5).
 *   - Intersection 2 (Bottom): (-3, -1.5).
 *   - Labels placed as "Consecutive Interior Angles" (Same side interior).
 *   - 'givenAngle' (Acute) placed at Top-Left Interior.
 *   - 'x' (Obtuse) placed at Bottom-Left Interior.
 *   - This visually confirms x + given = 180.
 */

export const generator_afa3c48b = {
  metadata: {
    id: "afa3c48b",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const givenAngle = getRandomInt(20, 40);
    const xValue = 180 - givenAngle;
    
    // Geometry Construction
    // Transversal segment: (-4, -2) to (4, 2). Slope = 0.5.
    // Angle with horizontal approx 26.5 degrees (matches givenAngle range).
    
    const mafsCode = `
      <Mafs viewBox={{ x: [-5, 5], y: [-3, 3] }}>
        {/* Line m (Top) */}
        <Line.Segment point1={[-5, 1.5]} point2={[5, 1.5]} color="black" />
        <Text x={-4.5} y={1.8}>m</Text>

        {/* Line n (Bottom) */}
        <Line.Segment point1={[-5, -1.5]} point2={[5, -1.5]} color="black" />
        <Text x={-4.5} y={-1.2}>n</Text>

        {/* Transversal */}
        <Line.Segment point1={[-4, -2]} point2={[4, 2]} color="black" />

        {/* Labels for Consecutive Interior Angles (Left side) */}
        
        {/* givenAngle (Acute) at Top Intersection (3, 1.5) - Interior is Left/Down */}
        <Text x={1.8} y={1.2}>${givenAngle}°</Text>
        
        {/* x (Obtuse) at Bottom Intersection (-3, -1.5) - Interior is Left/Up */}
        <Text x={-3.2} y={-0.6}>x</Text>
      </Mafs>
    `;

    const correctAnswer = xValue.toString();
    const distractorA = Math.round(givenAngle / 2);
    const distractorB = givenAngle;
    const distractorC = givenAngle * 2;

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "divides the given angle by 2 erroneously" },
      { text: distractorB.toString(), isCorrect: false, reason: "chooses the given angle instead of the supplementary angle" },
      { text: distractorC.toString(), isCorrect: false, reason: "doubles the given angle erroneously" },
      { text: correctAnswer, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure shown, line $m$ is parallel to line $n$. What is the value of $x$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. In the figure, $x$ and the angle labeled $${givenAngle}^{\\circ}$ are consecutive interior angles (or same-side interior angles). When parallel lines are cut by a transversal, consecutive interior angles are supplementary. Therefore, $x + ${givenAngle} = 180$, which gives $x = ${correctAnswer}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};