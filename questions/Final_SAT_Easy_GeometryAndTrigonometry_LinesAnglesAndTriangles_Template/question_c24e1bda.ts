import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: c24e1bda
 *
 * FIX ANALYSIS:
 * - Added <Mafs> wrapper with viewBox.
 * - Replaced broken <Line.ThroughPoints> with <Line.Segment>.
 * - Replaced <LaTeX> with <Text> to fix double-labeling.
 * - Geometric Setup:
 *   - Line m (top) at y = 1.5.
 *   - Line n (bottom) at y = -1.5.
 *   - Transversal: (-3, 3) to (3, -3) [Slope -1].
 *   - Top Intersection: (-1.5, 1.5).
 *   - Bottom Intersection: (1.5, -1.5).
 *   - Angles: Obtuse (110-160). 
 *   - Placed labels in Top-Right sectors of both intersections (Corresponding positions).
 *   - Top-Right sector for slope -1 is 135 degrees (Obtuse), matching the random range.
 */

export const generator_c24e1bda = {
  metadata: {
    id: "c24e1bda",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const givenAngle = getRandomInt(110, 160);
    
    // Geometry Construction
    // Transversal passing through (-1.5, 1.5) and (1.5, -1.5)
    // Slope = -1
    
    const mafsCode = `
      <Mafs viewBox={{ x: [-5, 5], y: [-3, 3] }}>
        {/* Line m (Top) */}
        <Line.Segment point1={[-5, 1.5]} point2={[5, 1.5]} color="black" />
        <Text x={-4.5} y={1.8}>m</Text>

        {/* Line n (Bottom) */}
        <Line.Segment point1={[-5, -1.5]} point2={[5, -1.5]} color="black" />
        <Text x={-4.5} y={-1.2}>n</Text>

        {/* Transversal */}
        <Line.Segment point1={[-3, 3]} point2={[3, -3]} color="black" />

        {/* Labels for Corresponding Angles (Top-Right sectors, Obtuse) */}
        
        {/* givenAngle at Top Intersection (-1.5, 1.5) */}
        <Text x={-0.5} y={1.8}>${givenAngle}°</Text>
        
        {/* w at Bottom Intersection (1.5, -1.5) */}
        <Text x={2.5} y={-1.2}>w°</Text>
      </Mafs>
    `;

    const correctAnswer = givenAngle.toString();
    const distractorA = Math.round(givenAngle / 10);
    const distractorB = 180 - givenAngle - 12; // Arbitrary calculation error
    const distractorC = 180 - givenAngle;

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "divides by 10 erroneously" },
      { text: distractorB.toString(), isCorrect: false, reason: "results from a calculation error" },
      { text: distractorC.toString(), isCorrect: false, reason: "finds the supplementary angle instead of the corresponding angle" },
      { text: correctAnswer, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure, line $m$ is parallel to line $n$. What is the value of $w$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. In the figure, the angle labeled $${givenAngle}^{\\circ}$ and the angle labeled $w^{\\circ}$ are corresponding angles. When two parallel lines are cut by a transversal, corresponding angles are congruent (equal in measure). Therefore, $w = ${givenAngle}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};