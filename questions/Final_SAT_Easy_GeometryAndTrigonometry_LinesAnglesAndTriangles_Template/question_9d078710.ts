import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 9d078710
 *
 * FIX ANALYSIS:
 * - Added <Mafs> wrapper with viewBox.
 * - Replaced broken <Line.ThroughPoints> with <Line.Segment>.
 * - Replaced <LaTeX> with <Text> to fix double-labeling.
 * - Explicitly calculated coordinates for intersections to ensure labels are placed correctly.
 * - Setup:
 *   - Line j (top) parallel to Line k (bottom).
 *   - Transversal intersects both.
 *   - 'baseAngle' is Top-Right (Acute) at top intersection.
 *   - 'w' is Top-Right (Acute) at bottom intersection. (Corresponding -> Equal).
 *   - 'x' is Top-Left (Obtuse). (Same-side interior -> Supplementary).
 *   - 'y' is Bottom-Left (Acute). (Alternate Exterior -> Equal).
 *   - 'z' is Bottom-Right (Obtuse). (Vertical to Same-Side Interior -> Supplementary).
 * - Distractors updated to be unambiguously false for the visual provided.
 */

export const generator_9d078710 = {
  metadata: {
    id: "9d078710",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const baseAngle = getRandomInt(35, 55); // Acute angle
    const supplementaryAngle = 180 - baseAngle;
    
    // Coordinates
    // Line j: y = 1.5
    // Line k: y = -1.5
    // Transversal: through (0,0) slope ~1.5
    // Top intersection: (1, 1.5)
    // Bottom intersection: (-1, -1.5)
    
    const mafsCode = `
      <Mafs viewBox={{ x: [-5, 5], y: [-3, 3] }}>
        {/* Line j (Top) */}
        <Line.Segment point1={[-5, 1.5]} point2={[5, 1.5]} color="black" />
        <Text x={-4.5} y={1.8}>j</Text>

        {/* Line k (Bottom) */}
        <Line.Segment point1={[-5, -1.5]} point2={[5, -1.5]} color="black" />
        <Text x={-4.5} y={-1.2}>k</Text>

        {/* Transversal l */}
        <Line.Segment point1={[-2.5, -3.75]} point2={[2.5, 3.75]} color="black" />
        <Text x={2.6} y={3.5}>ℓ</Text>

        {/* Top Intersection (1, 1.5) */}
        {/* Base Angle: Top-Right (Acute) */}
        <Text x={1.6} y={1.8}>${baseAngle}°</Text>

        {/* Bottom Intersection (-1, -1.5) */}
        {/* w: Top-Right (Acute) -> Corresponding to Base */}
        <Text x={-0.4} y={-1}>w</Text>
        
        {/* x: Top-Left (Obtuse) */}
        <Text x={-1.8} y={-1}>x</Text>
        
        {/* y: Bottom-Left (Acute) */}
        <Text x={-1.6} y={-2}>y</Text>
        
        {/* z: Bottom-Right (Obtuse) */}
        <Text x={-0.2} y={-2}>z</Text>
      </Mafs>
    `;

    // Correct Condition: Corresponding angles are equal
    const correctCondition = `w = ${baseAngle}`;

    // Distractors
    // x is Obtuse. Claiming x = baseAngle is False.
    // y is Acute. Claiming y = supplementaryAngle is False.
    // z is Obtuse. Claiming z = baseAngle is False.
    
    const optionsData = [
      { text: correctCondition, isCorrect: true },
      { text: `x = ${baseAngle}`, isCorrect: false, reason: "x is obtuse while the given angle is acute" },
      { text: `y = ${supplementaryAngle}`, isCorrect: false, reason: "y is acute while the supplementary angle is obtuse" },
      { text: `z = ${baseAngle}`, isCorrect: false, reason: "z is obtuse while the given angle is acute" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure shown, line $\\ell$ intersects lines $j$ and $k$. Which additional piece of information is sufficient to prove that lines $j$ and $k$ are parallel?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctCondition,
      explanation: `Choice ${correctOption.letter} is correct. If $w = ${baseAngle}$, then $w$ and the angle measuring $${baseAngle}^{\\circ}$ are congruent corresponding angles. The converse of the Corresponding Angles Postulate states that if two lines are cut by a transversal so that corresponding angles are congruent, then the lines are parallel. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};