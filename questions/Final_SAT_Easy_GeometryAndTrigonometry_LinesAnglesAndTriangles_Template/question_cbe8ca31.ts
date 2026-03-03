import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: cbe8ca31
*
* ORIGINAL ANALYSIS:
* - Number ranges: [angle X: 20-40, angle Y: 80-110]
* - Difficulty factors: [Triangle angle sum theorem, straightforward calculation]
* - Distractor patterns: [Calculation error, sum of other two angles, exceeds 180 error]
* - Constraints: [X + Y < 180]
* - Question type: [Conceptual (no figure)→Multiple Choice Text]
*/

export const generator_cbe8ca31 = {
  metadata: {
    // id: "cbe8ca31",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const angleX = getRandomInt(20, 40);
    const angleY = getRandomInt(80, 110);
    const angleZ = 180 - angleX - angleY;
    const distractorB = angleZ + 16;
    const distractorC = angleX + angleY;
    const distractorD = angleX + angleY + 90;
    const correctAnswer = angleZ.toString();

    const optionsData = [
      { text: `${correctAnswer}^{\\circ}`, isCorrect: true },
      { text: `${distractorB}^{\\circ}`, isCorrect: false, reason: "results from conceptual or calculation errors" },
      { text: `${distractorC}^{\\circ}`, isCorrect: false, reason: "sums angles X and Y instead of finding the third angle" },
      { text: `${distractorD}^{\\circ}`, isCorrect: false, reason: "results from conceptual or calculation errors" }
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
      explanation: `Choice ${correctOption.letter} is correct. The triangle angle sum theorem states that the sum of the measures of the interior angles of a triangle is $180^{\\circ}$. Therefore, $\\angle Z = 180^{\\circ} - ${angleX}^{\\circ} - ${angleY}^{\\circ} = ${correctAnswer}^{\\circ}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: c24e1bda
*
* ORIGINAL ANALYSIS:
* - Number ranges: [angle: 110-160]
* - Difficulty factors: [Parallel lines, corresponding angles, transversal]
* - Distractor patterns: [Division by 10, random error, supplementary angle]
* - Constraints: [Obtuse angle]
* - Question type: [Figure→Multiple Choice Text]
*/