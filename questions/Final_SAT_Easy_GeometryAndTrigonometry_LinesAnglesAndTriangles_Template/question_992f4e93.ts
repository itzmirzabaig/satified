import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 992f4e93
 *
 * FIX ANALYSIS:
 * - Added <Mafs> wrapper with viewBox.
 * - Replaced broken <Line.ThroughPoints> with <Line.Segment>.
 * - Replaced <LaTeX> with <Text> to fix double-labeling issues.
 * - Geometric Setup:
 *   - Parallel lines at y=1.5 and y=-1.5.
 *   - Transversal with negative slope (-1.5).
 *   - Intersection 1 (Top): (-1, 1.5).
 *   - Intersection 2 (Bottom): (1, -1.5).
 *   - Placed 'a' (Obtuse) and 'givenAngle' (Acute) as Consecutive Interior angles (Same Side Interior),
 *     which confirms the relationship a + given = 180.
 */

export const generator_992f4e93 = {
  metadata: {
    id: "992f4e93",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const givenAngle = getRandomInt(55, 75);
    const aValue = 180 - givenAngle;
    
    // Geometry Construction
    // Line ell: y = 1.5
    // Line k: y = -1.5
    // Transversal: Passes through (-1, 1.5) and (1, -1.5).
    
    const mafsCode = `
      <Mafs viewBox={{ x: [-5, 5], y: [-3, 3] }}>
        {/* Line ell (top) */}
        <Line.Segment point1={[-5, 1.5]} point2={[5, 1.5]} color="black" />
        <Text x={-4.5} y={1.8}>ℓ</Text>

        {/* Line k (bottom) */}
        <Line.Segment point1={[-5, -1.5]} point2={[5, -1.5]} color="black" />
        <Text x={-4.5} y={-1.2}>k</Text>

        {/* Transversal */}
        <Line.Segment point1={[-2.5, 3.75]} point2={[2.5, -3.75]} color="black" />

        {/* Labels */}
        {/* We need Consecutive Interior Angles (Sum to 180) */}
        
        {/* Angle 'a' (Obtuse) at Top Intersection (-1, 1.5) */}
        {/* Bottom-Left sector of top intersection is Obtuse */}
        <Text x={-1.6} y={1}>a°</Text>

        {/* Given Angle (Acute) at Bottom Intersection (1, -1.5) */}
        {/* Top-Left sector of bottom intersection is Acute */}
        <Text x={0.4} y={-1}>${givenAngle}°</Text>
      </Mafs>
    `;

    const correctAnswer = aValue.toString();
    const distractorA = 90 - givenAngle;
    const distractorB = givenAngle;
    const distractorD = 180 - (90 - givenAngle);

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "incorrectly assumes a complementary relationship" },
      { text: distractorB.toString(), isCorrect: false, reason: "chooses the given angle instead of the supplementary angle" },
      { text: correctAnswer, isCorrect: true },
      { text: distractorD.toString(), isCorrect: false, reason: "calculation error" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure above, lines $\\ell$ and $k$ are parallel. What is the value of $a$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. The angle labeled $a^\\circ$ and the angle labeled $${givenAngle}^\\circ$ are consecutive interior angles (or same-side interior angles). When two parallel lines are cut by a transversal, consecutive interior angles are supplementary (sum to $180^\\circ$). Therefore, $a + ${givenAngle} = 180$, so $a = 180 - ${givenAngle} = ${correctAnswer}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};