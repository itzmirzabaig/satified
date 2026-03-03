import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: f9d40000
*
* ORIGINAL ANALYSIS:
* - Number ranges: [angle X: 20-35, angle Y: 50-70]
* - Difficulty factors: [Triangle angle sum, straightforward calculation]
* - Distractor patterns: [Subtraction error, calculation error, sum of X and Y]
* - Constraints: [Standard triangle, sum = 180]
* - Question type: [Conceptual (no figure)→Multiple Choice Text]
*/

export const generator_f9d40000 = {
  metadata: {
    // id: "f9d40000",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const angleX = getRandomInt(20, 35);
    const angleY = getRandomInt(50, 70);
    const angleZ = 180 - angleX - angleY;
    const distractorA = angleY - angleX;
    const distractorB = angleZ - 2;
    const distractorD = angleX + angleY;
    const correctAnswer = angleZ.toString();

    const optionsData = [
      { text: `${distractorA}^{\\circ}`, isCorrect: false, reason: "subtracts angle X from angle Y erroneously" },
      { text: `${distractorB}^{\\circ}`, isCorrect: false, reason: "calculation error" },
      { text: `${correctAnswer}^{\\circ}`, isCorrect: true },
      { text: `${distractorD}^{\\circ}`, isCorrect: false, reason: "sums angles X and Y instead of finding third angle" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In $\\triangle XYZ$, the measure of $\\angle X$ is $${angleX}^{\\circ}$ and the measure of $\\angle Y$ is $${angleY}^{\\circ}$. What is the measure of $\\angle Z$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${correctAnswer}^{\\circ}`,
      explanation: `Choice ${correctOption.letter} is correct. The sum of the interior angles of a triangle is $180^{\\circ}$. Given $\\angle X = ${angleX}^{\\circ}$ and $\\angle Y = ${angleY}^{\\circ}$, the measure of $\\angle Z = 180^{\\circ} - ${angleX}^{\\circ} - ${angleY}^{\\circ} = ${correctAnswer}^{\\circ}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

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