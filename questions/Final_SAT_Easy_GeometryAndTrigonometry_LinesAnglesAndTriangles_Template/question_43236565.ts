import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 43236565
 *
 * ANALYSIS OF FIXES:
 * 1. Replaced <Line.ThroughPoints> with <Line.Segment> to ensure rendering.
 * 2. Calculated specific endpoints for lines m, n, and k to span the viewbox.
 * 3. Adjusted label positions:
 *    - Intersection is at (-1, 2).
 *    - Line k has a slope of -2.
 *    - The Obtuse sectors (for 130-160 degrees) are Top-Right and Bottom-Left.
 *    - Moved labels to (0.2, 2.5) and (-2.2, 1.5) to sit correctly in the obtuse angles.
 */

export const generator_43236565 = {
  metadata: {
    id: "43236565",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const givenAngle = getRandomInt(130, 160);

    // Geometry calculations
    // Line m: y = 2
    // Line n: y = -2
    // Line k: passes through (-1, 2) and (1, -2). Slope = -2.
    
    const mafsCode = `
      <Mafs viewBox={{ x: [-5, 5], y: [-4.5, 4.5] }}>
        {/* Line m (Horizontal top) */}
        <Line.Segment point1={[-5, 2]} point2={[5, 2]} color="black" />
        <Text x={-4.5} y={2.4}>m</Text>

        {/* Line n (Horizontal bottom) */}
        <Line.Segment point1={[-5, -2]} point2={[5, -2]} color="black" />
        <Text x={-4.5} y={-1.6}>n</Text>

        {/* Line k (Transversal) - Slope -2 */}
        <Line.Segment point1={[-2.25, 4.5]} point2={[2.25, -4.5]} color="black" />
        <Text x={-2.4} y={4}>k</Text>

        {/* Vertical Angles at intersection (-1, 2) */}
        {/* Angle is Obtuse (130-160), so labels go in Top-Right and Bottom-Left quadrants */}
        
        {/* Top-Right Vertical Angle */}
        <Text x={0.2} y={2.5}>${givenAngle}°</Text>
        
        {/* Bottom-Left Vertical Angle */}
        <Text x={-2.2} y={1.5}>x°</Text>
      </Mafs>
    `;

    const correctAnswer = `The value of $x$ is equal to $${givenAngle}$.`;

    const optionsData = [
      { text: `The value of $x$ is less than $${givenAngle}$.`, isCorrect: false, reason: "fails to recognize vertical angles are congruent" },
      { text: `The value of $x$ is greater than $${givenAngle}$.`, isCorrect: false, reason: "fails to recognize vertical angles are congruent" },
      { text: `The value of $x$ is equal to $${givenAngle}$.`, isCorrect: true },
      { text: `The value of $x$ cannot be determined.`, isCorrect: false, reason: "incorrectly assumes insufficient information" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure, line $m$ is parallel to line $n$, and line $k$ intersects both lines. Which of the following statements is true?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. Vertical angles are congruent. In the figure, the angle with measure $x^\\circ$ and the angle with measure $${givenAngle}^\\circ$ are vertical angles. Therefore, $x = ${givenAngle}$. The fact that lines $m$ and $n$ are parallel is extra information not needed to solve the problem. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};