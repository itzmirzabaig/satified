import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: 2289659
*
* ORIGINAL ANALYSIS:
* - Number ranges: [angle: 120-175]
* - Difficulty factors: [Parallel lines, corresponding angles, transversal properties]
* - Distractor patterns: [Division error, supplementary angle, random calculation error]
* - Constraints: [Obtuse angle, lines must be parallel]
* - Question type: [Figure→Multiple Choice Text]
*/

export const generator_2289659 = {
  metadata: {
    // id: "2289659",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const givenAngle = getRandomInt(120, 175);
    const yTop = 2;
    const yBottom = 0;

    // Two parallel lines cut by a transversal - corresponding angles
    // Fixed: Moved given angle label to the LEFT side of transversal where angle actually is
    const mafsCode = `<Mafs viewBox={{ x: [-3, 5], y: [-1, 4] }}>
  <!-- Parallel line m (top) -->
  <Line.Segment point1={[-2, ${yTop}]} point2={[4, ${yTop}]} color="var(--mafs-foreground)" />
  
  <!-- Parallel line n (bottom) -->
  <Line.Segment point1={[-2, ${yBottom}]} point2={[4, ${yBottom}]} color="var(--mafs-foreground)" />
  
  <!-- Transversal line t -->
  <Line.Segment point1={[-1, -1]} point2={[3, 3.5]} color="var(--mafs-foreground)" />
  
  <!-- Angle labels - given angle moved LEFT to mark the actual angle, not on the line -->
  <Text x={0.5} y={${yTop + 0.5}}>${givenAngle}°</Text>
  <Text x={0.5} y={${yBottom - 0.5}}>w°</Text>
</Mafs>`;

    const correctAnswer = givenAngle.toString();
    const distractorA = Math.round(givenAngle / 10);
    const distractorB = 180 - givenAngle;
    const distractorC = givenAngle - 100;

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "divides angle by 10 erroneously" },
      { text: distractorB.toString(), isCorrect: false, reason: "finds supplementary angle instead of corresponding angle" },
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
      questionText: `Note: Figure not drawn to scale. In the figure, line $m$ is parallel to line $n$. What is the value of $w$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. It's given that lines $m$ and $n$ are parallel. Since line $t$ intersects both lines $m$ and $n$, it's a transversal. The angles marked as $${givenAngle}^{\\circ}$ and $w^{\\circ}$ are corresponding angles. When two parallel lines are intersected by a transversal, corresponding angles are congruent. Therefore, $w = ${givenAngle}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: c8d60e48
*
* ORIGINAL ANALYSIS:
* - Number ranges: [base angle: 50-75]
* - Difficulty factors: [Isosceles triangle, base angles equal, angle sum theorem]
* - Distractor patterns: [Arithmetic error, miscalculation of angle sum]
* - Constraints: [Base angles must be equal, sum must be 180]
* - Question type: [Conceptual (no figure)→Multiple Choice Text]
*/