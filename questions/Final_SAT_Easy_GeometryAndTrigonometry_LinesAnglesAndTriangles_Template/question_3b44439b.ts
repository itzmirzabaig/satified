import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 3b44439b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [obtuse angle: 135-150]
 * - Difficulty factors: [Linear pair, supplementary angles]
 * - Distractor patterns: [Finds x instead of sum, assumes right angle, chooses given angle]
 * - Constraints: [x + givenAngle = 180]
 * - Question type: [Figure→Multiple Choice Text]
 */

export const generator_3b44439b = {
  metadata: {
    id: "3b44439b",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const givenAngle = getRandomInt(135, 150);
    
    // Geometric setup:
    // Two parallel lines p (top) and q (bottom).
    // Transversal t intersects them.
    // We focus on the top intersection to show a Linear Pair.
    // Top intersection at (0, 2).
    // Transversal has slope ~1, passing through (0, 2) and (-2, 0).
    
    const mafsCode = `
      <Mafs viewBox={{ x: [-5, 5], y: [-1, 4] }}>
        <Coordinates.Cartesian xAxis={{ labels: false, axis: false }} yAxis={{ labels: false, axis: false }} />
        
        {/* Line p (top) */}
        <Line.Segment point1={[-4, 2]} point2={[4, 2]} />
        <Text x={4.2} y={2} attach="e">p</Text>
        
        {/* Line q (bottom) */}
        <Line.Segment point1={[-4, 0]} point2={[4, 0]} />
        <Text x={4.2} y={0} attach="e">q</Text>

        {/* Transversal Line t */}
        <Line.Segment point1={[-2, 0]} point2={[2, 4]} />
        <Text x={2} y={4} attach="w">t</Text>

        {/* Labels for Linear Pair on Line p */}
        {/* Left Side (Obtuse) - Quadrant II relative to intersection */}
        <Text x={-1.2} y={2.3}>${givenAngle}°</Text>
        
        {/* Right Side (Acute) - Quadrant I relative to intersection */}
        {/* Variable x */}
        <Text x={0.8} y={2.3}>x°</Text>
      </Mafs>
    `;

    // Logic: x and givenAngle are a linear pair, so they sum to 180.
    // The question asks for "x + givenAngle", which is trivially 180.
    const correctAnswer = "180";
    
    const distractorA = 180 - givenAngle; // The value of x
    const distractorB = "90";
    const distractorC = givenAngle.toString();

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "finds x instead of x + given angle" },
      { text: distractorB, isCorrect: false, reason: "assumes right angle relationship" },
      { text: distractorC, isCorrect: false, reason: "chooses the given angle" },
      { text: correctAnswer, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure above, line $p$ is parallel to line $q$, and line $t$ intersects both lines. What is the value of $x + ${givenAngle}$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. 

The angle marked $x^{\\circ}$ and the angle marked $${givenAngle}^{\\circ}$ form a **linear pair** along line $p$. 

A linear pair of angles are adjacent angles formed by intersecting lines. The measures of angles in a linear pair are supplementary, meaning their sum is $180^{\\circ}$.

Therefore, without needing to calculate $x$ individually:
$$x + ${givenAngle} = 180$$

Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};