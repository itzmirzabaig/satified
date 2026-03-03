import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 64d1f49f
 *
 * FIX ANALYSIS:
 * - Added <Mafs> wrapper with viewBox.
 * - Replaced <Line.ThroughPoints> with <Line.Segment> to fix invisibility/crashes.
 * - Replaced <LaTeX> with <Text> to fix double-labeling.
 * - Adjusted coordinates:
 *   - Intersection centered at (0,0).
 *   - w is 120-150 (Obtuse). Labels moved to Top/Bottom sectors to match geometry.
 *   - Original code placed labels in Left/Right (Acute) sectors which contradicted the values.
 */

export const generator_64d1f49f = {
  metadata: {
    id: "64d1f49f",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const wValue = getRandomInt(120, 150);
    
    // Geometry:
    // Two intersecting lines centered at (0,0).
    // Angle w is Obtuse (120-150).
    // We create an intersection where the Top and Bottom angles are obtuse.
    // Lines with slopes approx +/- 0.4 give obtuse vertical angles top/bottom.
    
    const mafsCode = `
      <Mafs viewBox={{ x: [-5, 5], y: [-3, 3] }}>
        {/* Line 1 (Slope ~0.4) */}
        <Line.Segment point1={[-4, -1.6]} point2={[4, 1.6]} color="black" />
        
        {/* Line 2 (Slope ~-0.4) */}
        <Line.Segment point1={[-4, 1.6]} point2={[4, -1.6]} color="black" />
        
        {/* Labels for vertical angles w and z (Top and Bottom sectors - Obtuse) */}
        <Text x={0} y={2}>w°</Text>
        <Text x={0} y={-2}>z°</Text>
      </Mafs>
    `;

    const correctAnswer = wValue.toString();
    const distractorA = wValue - 100;
    const distractorB = 180 - wValue;
    const distractorC = Math.round(wValue / 2);

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "calculation error" },
      { text: distractorB.toString(), isCorrect: false, reason: "finds the supplementary angle instead of the vertical angle" },
      { text: distractorC.toString(), isCorrect: false, reason: "incorrectly halves the angle" },
      { text: correctAnswer, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure, two lines intersect at a point. If $w = ${wValue}$, what is the value of $z$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. Vertical angles are congruent (equal in measure). In the figure, the angles labeled $w^\\circ$ and $z^\\circ$ are vertical angles. Since $w = ${wValue}$, then $z = ${wValue}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};