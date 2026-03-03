import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 3828f53d
 * ORIGINAL ANALYSIS:
 * Number ranges: [givenAngle: 120-140]
 * Difficulty factors: [Parallel lines, angle relationships]
 * Distractor patterns: [Calculation error, confuses with angle a]
 * Constraints: [Based on specific geometric configuration]
 * Question type: [Figure→Multiple Choice Text]
 */
export const generator_3828f53d = {
  metadata: {
    id: "3828f53d",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const givenAngle = getRandomInt(120, 140);
    const correctAnswerVal = 180 - givenAngle;

    // Visual setup:
    // Parallel lines at y=0 and y=2.
    // Transversal y = x + 1 (slope 1).
    // Top intersection: (1, 2). Bottom intersection: (-1, 0).
    // Top interior angle (right side) is obtuse (matches givenAngle).
    // Bottom interior angle (right side) is acute (matches b).
    
    // FIX: Use Unicode degree symbol (°) instead of LaTeX (^\circ) inside Text components
    const mafsCode = `
      <Mafs viewBox={{ x: [-5, 5], y: [-1, 4] }}>
        <Coordinates.Cartesian xAxis={{ labels: false, axis: false }} yAxis={{ labels: false, axis: false }} />
        
        {/* Parallel Line m */}
        <Line.Segment point1={[-4, 2]} point2={[4, 2]} />
        <Text x={4.2} y={2} attach="e">m</Text>
        
        {/* Parallel Line n */}
        <Line.Segment point1={[-4, 0]} point2={[4, 0]} />
        <Text x={4.2} y={0} attach="e">n</Text>

        {/* Transversal Line */}
        <Line.Segment point1={[-2.5, -1.5]} point2={[2.5, 3.5]} />

        {/* Label for given angle (Obtuse interior) */}
        {/* Positioned inside the angle at top-right of intersection (1,2) */}
        <Text x={1.6} y={1.7}>${givenAngle}°</Text>
        
        {/* Label for b (Acute interior) */}
        {/* Positioned inside the angle at bottom-right of intersection (-1,0) */}
        <Text x={-0.4} y={0.3}>b</Text>
      </Mafs>
    `;

    const optionsData = [
      { text: `${correctAnswerVal}`, isCorrect: true },
      { text: `${givenAngle}`, isCorrect: false, reason: "confuses with angle a" },
      { text: `${Math.abs(givenAngle - 90)}`, isCorrect: false, reason: "calculation error" },
      { text: "90", isCorrect: false, reason: "calculation error" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure above, lines $m$ and $n$ are parallel. What is the value of $b$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 

The angle labeled ${givenAngle}° and the angle labeled $b$ are **consecutive interior angles** (also known as same-side interior angles). 

Because lines $m$ and $n$ are parallel, consecutive interior angles are supplementary, meaning their measures add up to $180°$.

$$b + ${givenAngle}° = 180°$$
$$b = 180 - ${givenAngle}$$
$$b = ${correctAnswerVal}$$

Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.`
    };
  }
};