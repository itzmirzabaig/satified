import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 69f4bbdc
 *
 * FIX ANALYSIS:
 * - Changed figureCode from null to mafsCode (was forcing no figure).
 * - Fixed invalid Polygon points={[,,]} to explicit coordinates [[0,0], [4,0], [0,3]].
 * - Replaced <LaTeX> with <Text> to prevent double labels.
 * - Added Right Angle marker using Line.Segment.
 * - Using a standard 3-4-5 triangle shape for clear visualization (Not to Scale),
 *   as strict scaling for 10-degree angles makes the diagram illegible.
 */

export const generator_69f4bbdc = {
  metadata: {
    id: "69f4bbdc",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const acuteAngle1 = getRandomInt(10, 35);
    const acuteAngle2 = 90 - acuteAngle1;

    // Geometry: Standard Right Triangle (Not to scale for better visibility)
    // Vertices: (0,0) [Right Angle], (4,0), (0,3)
    const mafsCode = `
      <Mafs viewBox={{ x: [-1, 5], y: [-1, 4] }}>
        <Polygon 
          points={[[0, 0], [4, 0], [0, 3]]} 
          color="black" 
          fillOpacity={0.1} 
        />
        
        {/* Right Angle Marker at (0,0) */}
        <Line.Segment point1={[0, 0.4]} point2={[0.4, 0.4]} color="black" />
        <Line.Segment point1={[0.4, 0.4]} point2={[0.4, 0]} color="black" />

        {/* Labels */}
        {/* Angle 'a' at top vertex (0,3) */}
        <Text x={0.5} y={2.5}>a°</Text>

        {/* Known angle at bottom right vertex (4,0) */}
        <Text x={3} y={0.4}>${acuteAngle1}°</Text>
      </Mafs>
    `;

    const correctAnswer = acuteAngle2.toString();
    const distractorA = acuteAngle1;
    const distractorC = 90;
    const distractorD = 180 - acuteAngle2;

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "chooses the given acute angle instead of the unknown angle" },
      { text: correctAnswer, isCorrect: true },
      { text: distractorC.toString(), isCorrect: false, reason: "selects the right angle instead of the acute angle" },
      { text: distractorD.toString(), isCorrect: false, reason: "finds the supplementary angle instead of the complementary angle" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the right triangle shown, what is the value of $a$?`,
      figureCode: mafsCode, // Fixed: passing the code instead of null
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. The sum of the interior angles of a triangle is $180^{\\circ}$. In a right triangle, the two acute angles are complementary (sum to $90^{\\circ}$). Therefore, $${acuteAngle1} + a = 90$, which results in $a = ${correctAnswer}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};