import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: 5733ce30
*
* ORIGINAL ANALYSIS:
* - Number ranges: [exteriorAngle: 100-130]
* - Difficulty factors: [Isosceles triangle, exterior angle, linear pair]
* - Distractor patterns: [Select exterior angle, find base angle, halves base angle]
* - Constraints: [Base angles equal, x = 180 - 2*baseAngle]
* - Question type: [Figure→Multiple Choice Text]
*/

export const generator_5733ce30 = {
  metadata: {
    // id: "5733ce30",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const exteriorAngle = getRandomInt(100, 130);
    const baseAngle = 180 - exteriorAngle;
    const vertexAngle = 180 - 2 * baseAngle;
    const mafsCode = `
      <Coordinates.Cartesian xAxis={{ labels: false, axis: false }} yAxis={{ labels: false, axis: false }} />
      <Polygon points={[,,]} />
      <Line.Segment point1={} point2={} />
      <LaTeX at={[4.5, 0.3]} tex="${exteriorAngle}^{\\circ}" />
      <LaTeX at={[2, 2.5]} tex="x" />
    `;
    const correctAnswer = vertexAngle.toString();
    const distractorA = exteriorAngle;
    const distractorB = baseAngle;
    const distractorC = Math.round(baseAngle / 2);

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "selects exterior angle instead of interior angle x" },
      { text: distractorB.toString(), isCorrect: false, reason: "finds base angle instead of vertex angle" },
      { text: distractorC.toString(), isCorrect: false, reason: "incorrectly halves the base angle" },
      { text: correctAnswer, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the given figure, AC extends to point D. If the measure of $\\angle BAC$ is equal to the measure of $\\angle BCA$, what is the value of $x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. $\\angle BCA = 180^{\\circ} - ${exteriorAngle}^{\\circ} = ${baseAngle}^{\\circ}$. Since $\\angle BAC = \\angle BCA$, then $\\angle BAC = ${baseAngle}^{\\circ}$. In $\\triangle ABC$, $x = 180^{\\circ} - ${baseAngle}^{\\circ} - ${baseAngle}^{\\circ} = ${correctAnswer}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 3b4b5b1e
*
* ORIGINAL ANALYSIS:
* - Number ranges: [obtuse angle: 120-150]
* - Difficulty factors: [Linear pair, supplementary angles]
* - Constraints: [x + givenAngle = 180]
* - Question type: [Figure→Fill in the blank]
*/