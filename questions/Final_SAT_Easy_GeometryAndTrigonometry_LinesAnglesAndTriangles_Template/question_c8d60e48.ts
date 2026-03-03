import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

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

export const generator_c8d60e48 = {
  metadata: {
    // id: "c8d60e48",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const baseAngle = getRandomInt(50, 75);
    const vertexAngle = 180 - 2 * baseAngle;
    const distractorA = vertexAngle - 10;
    const distractorC = vertexAngle + 12;
    const distractorD = vertexAngle + 24;
    const correctAnswer = vertexAngle.toString();

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "results from arithmetic error" },
      { text: correctAnswer, isCorrect: true },
      { text: distractorC.toString(), isCorrect: false, reason: "miscalculation of angle sum" },
      { text: distractorD.toString(), isCorrect: false, reason: "miscalculation of angle sum" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In a given triangle, $AB = AC$ and $\\angle ABC$ has a measure of $${baseAngle}^{\\circ}$. What is the value of $x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. In isosceles triangle $ABC$ with $AB = AC$, the base angles are equal: $\\angle ABC = \\angle ACB = ${baseAngle}^{\\circ}$. By the triangle angle sum theorem: $${baseAngle}^{\\circ} + ${baseAngle}^{\\circ} + x = 180^{\\circ}$, so $x = ${correctAnswer}^{\\circ}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: d5f349b7
*
* ORIGINAL ANALYSIS:
* - Number ranges: [angle Q: 15-35]
* - Difficulty factors: [Similar triangles, right triangles, corresponding angles, complementary angles]
* - Distractor patterns: [Wrong correspondence, calculation error, supplementary error]
* - Constraints: [Must be right triangles, angle P + angle Q = 90]
* - Question type: [Figure→Multiple Choice Text]
*/