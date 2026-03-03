import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: 36200a38
*
* ORIGINAL ANALYSIS:
* - Number ranges: [angle1: 60-80, angle2: 40-60]
* - Difficulty factors: [Triangle exterior angle theorem or sum of remote interior angles]
* - Distractor patterns: [Calculation error in exterior angle, incorrectly calculates supplementary angle]
* - Constraints: [x = angle1 + angle2]
* - Question type: [Figure→Multiple Choice Text]
*/

export const generator_36200a38 = {
  metadata: {
    // id: "36200a38",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const angle1 = getRandomInt(60, 80);
    const angle2 = getRandomInt(40, 60);
    const thirdAngle = 180 - angle1 - angle2;
    const exteriorAngle = angle1 + angle2;

    // Triangle with left side extended upward
    // x marks the exterior angle at the top left (where extended side meets triangle)
    const mafsCode = `<Mafs viewBox={{ x: [-1, 5], y: [-1, 3] }}>
  <!-- Triangle -->
  <Polygon points={[[0, 0], [2, 0], [1, 1.5]]} color="var(--mafs-blue)" fillOpacity={0.2} />
  
  <!-- Extended base to the right -->
  <Line.Segment point1={[2, 0]} point2={[4, 0]} color="var(--mafs-foreground)" />
  
  <!-- Extended LEFT side upward -->
  <Line.Segment point1={[1, 1.5]} point2={[0, 3]} color="var(--mafs-foreground)" />
  
  <!-- Angle labels -->
  <Text x={0.3} y={0.3}>${angle1}°</Text>
  <Text x={1.5} y={0.3}>${angle2}°</Text>
  
  <!-- x at top left exterior angle (between extended left side and right side of triangle) -->
  <Text x={0.2} y={1.8}>x</Text>
</Mafs>`;

    const correctAnswer = exteriorAngle.toString();
    const distractorA = exteriorAngle - 10;
    const distractorC = exteriorAngle + 10;
    const distractorD = 180 - thirdAngle + 20;

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "calculation error in exterior angle" },
      { text: correctAnswer, isCorrect: true },
      { text: distractorC.toString(), isCorrect: false, reason: "calculation error" },
      { text: distractorD.toString(), isCorrect: false, reason: "incorrectly calculates supplementary angle" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure above, two sides of a triangle are extended. What is the value of x?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. By the exterior angle theorem, the exterior angle equals the sum of the two remote interior angles: $x = ${angle1}^{\\circ} + ${angle2}^{\\circ} = ${correctAnswer}^{\\circ}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};