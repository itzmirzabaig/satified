import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: 0d3f51dc
*
* ORIGINAL ANALYSIS:
* - Number ranges: [angle: 25-50]
* - Difficulty factors: [Parallel lines, same-side exterior angles, supplementary angles]
* - Distractor patterns: [Same angle, complementary assumption, calculation error]
* - Constraints: [x + givenAngle = 180]
* - Question type: [Figure→Multiple Choice Text]
*/

export const generator_0d3f51dc = {
  metadata: {
    // id: "0d3f51dc",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const givenAngle = getRandomInt(25, 50);
    const xValue = 180 - givenAngle;

    // Two parallel lines cut by a transversal - same-side exterior angles
    // Moved given angle label to the right (from x=1.5 to x=2.5)
    const mafsCode = `<Mafs viewBox={{ x: [-3, 5], y: [-2, 3] }}>
  <!-- Parallel line m (top) -->
  <Line.Segment point1={[-2, 1.5]} point2={[4, 1.5]} color="var(--mafs-foreground)" />
  
  <!-- Parallel line n (bottom) -->
  <Line.Segment point1={[-2, -0.5]} point2={[4, -0.5]} color="var(--mafs-foreground)" />
  
  <!-- Transversal line t -->
  <Line.Segment point1={[-1, -1.5]} point2={[3, 2.5]} color="var(--mafs-foreground)" />
  
  <!-- Angle labels - given angle moved right to avoid transversal -->
  <Text x={2.5} y={2}>${givenAngle}°</Text>
  <Text x={-0.5} y={0}>x°</Text>
</Mafs>`;

    const correctAnswer = xValue.toString();
    const distractorA = givenAngle;
    const distractorB = 90 - givenAngle;
    const distractorC = 180 - (90 - givenAngle);

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "chooses the given angle instead of finding supplementary angle" },
      { text: distractorB.toString(), isCorrect: false, reason: "incorrectly assumes complementary relationship" },
      { text: distractorC.toString(), isCorrect: false, reason: "calculation error" },
      { text: correctAnswer, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure, line $m$ is parallel to line $n$, and line $t$ intersects both lines. What is the value of $x$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. When two parallel lines are intersected by a transversal, same-side exterior angles are supplementary. Thus, $x + ${givenAngle} = 180$, which yields $x = ${correctAnswer}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: b434e103
*
* ORIGINAL ANALYSIS:
* - Number ranges: [angle R: 50-75]
* - Difficulty factors: [Triangle inequality for angles, angle sum constraint]
* - Distractor patterns: [Exceeds maximum possible sum, impossible triangle angle]
* - Constraints: [Angle S must be < 180 - angle R]
* - Question type: [Conceptual (no figure)→Multiple Choice Text]
*/