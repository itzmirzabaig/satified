import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: 087cdcfd
*
* ORIGINAL ANALYSIS:
* - Number ranges: [x: 50-80, y: 60-90]
* - Difficulty factors: [Angles on a straight line sum to 180]
* - Distractor patterns: [Adds x and y, calculation errors]
* - Constraints: [x + y + z = 180]
* - Question type: [Figure→Multiple Choice Text]
*/

export const generator_087cdcfd = {
  metadata: {
    // id: "087cdcfd",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const xValue = getRandomInt(50, 80);
    const yValue = getRandomInt(60, 90);
    const zValue = 180 - xValue - yValue;

    // Three angles on a straight line: x, y, z summing to 180
    const mafsCode = `<Mafs viewBox={{ x: [-3, 3], y: [-1, 2] }}>
  <!-- Straight horizontal line -->
  <Line.Segment point1={[-2, 0]} point2={[2, 0]} color="var(--mafs-foreground)" />
  
  <!-- Two rays from origin creating three angles -->
  <!-- First ray at angle x (opening upward left) -->
  <Line.Segment point1={[0, 0]} point2={[-1.5, 1]} color="var(--mafs-foreground)" />
  
  <!-- Second ray at angle x+y from first (creates angle y in middle) -->
  <Line.Segment point1={[0, 0]} point2={[0.5, 1.2]} color="var(--mafs-foreground)" />
  
  <!-- Third ray continuing to right (completes straight line) -->
  <Line.Segment point1={[0, 0]} point2={[2, 0]} color="var(--mafs-foreground)" />
  
  <!-- Angle labels -->
  <Text x={-1.2} y={0.3}>x</Text>
  <Text x={0.2} y={0.6}>y</Text>
  <Text x={1} y={0.3}>z</Text>
</Mafs>`;

    const correctAnswer = zValue.toString();
    const distractorA = xValue + yValue;
    const distractorB = 80;
    const distractorD = 20;

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "adds x and y instead of finding z" },
      { text: distractorB.toString(), isCorrect: false, reason: "calculation error" },
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
      questionText: `In the figure, three lines intersect at a point on a straight line. Letters x, y, and z represent the measures of the angles in degrees. If $x=${xValue}$ and $y=${yValue}$, what is the value of $z$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. The sum of angles on a straight line is $180^{\\circ}$. Therefore, $${xValue} + ${yValue} + z = 180$, so $z = ${correctAnswer}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: afa3c48b
*
* ORIGINAL ANALYSIS:
* - Number ranges: [acute angle: 20-40]
* - Difficulty factors: [Parallel lines, consecutive interior angles supplementary]
* - Distractor patterns: [Divide by 2, choose same angle, double angle]
* - Constraints: [x + givenAngle = 180]
* - Question type: [Figure→Multiple Choice Text]
*/