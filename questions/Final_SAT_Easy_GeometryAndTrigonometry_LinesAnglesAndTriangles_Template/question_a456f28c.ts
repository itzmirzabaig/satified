import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: a456f28c
 *
 * FIX ANALYSIS:
 * - Added <Mafs> wrapper with viewBox to define coordinate system.
 * - Replaced <Line.ThroughPoints> with <Line.Segment> to fix rendering visibility.
 * - Replaced <LaTeX> with <Text> to fix double-labeling bug.
 * - Defined intersection at (0,0) with slopes +/- 0.5.
 * - Placed labels "1" and "2" in the left/right sectors (Acute angles) to match the random range (45-85).
 */

export const generator_a456f28c = {
  metadata: {
    id: "a456f28c",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const angle1 = getRandomInt(45, 85);
    
    // Geometry:
    // Line 1: (-4, -2) to (4, 2) -> Slope 0.5
    // Line 2: (-4, 2) to (4, -2) -> Slope -0.5
    // Intersection: (0,0)
    // The angle between vector (1, 0.5) and (1, -0.5) is approx 53 degrees (Acute).
    // The Left and Right sectors are the acute angles.
    
    const mafsCode = `
      <Mafs viewBox={{ x: [-5, 5], y: [-3, 3] }}>
        {/* Line 1 */}
        <Line.Segment point1={[-4, -2]} point2={[4, 2]} color="black" />
        
        {/* Line 2 */}
        <Line.Segment point1={[-4, 2]} point2={[4, -2]} color="black" />
        
        {/* Labels for vertical angles 1 and 2 */}
        {/* Placed in Left and Right sectors (Acute) */}
        <Text x={-2.5} y={0}>1</Text>
        <Text x={2.5} y={0}>2</Text>
      </Mafs>
    `;

    const correctAnswer = angle1.toString();
    const distractorB = 180 - angle1;
    const distractorC = angle1 * 2;
    const distractorD = 360 - angle1;

    const optionsData = [
      { text: `${correctAnswer}^{\\circ}`, isCorrect: true },
      { text: `${distractorB}^{\\circ}`, isCorrect: false, reason: "finds supplementary angle instead of vertical angle" },
      { text: `${distractorC}^{\\circ}`, isCorrect: false, reason: "doubles the angle erroneously" },
      { text: `${distractorD}^{\\circ}`, isCorrect: false, reason: "subtracts from full rotation instead of recognizing vertical angles" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure, two lines intersect at a point. Angle $1$ and angle $2$ are vertical angles. The measure of angle $1$ is $${angle1}^{\\circ}$. What is the measure of angle $2$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${correctAnswer}^{\\circ}`,
      explanation: `Choice ${correctOption.letter} is correct. Vertical angles are congruent (equal in measure). Since $m\\angle 1 = ${angle1}^{\\circ}$, then $m\\angle 2 = ${correctAnswer}^{\\circ}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};