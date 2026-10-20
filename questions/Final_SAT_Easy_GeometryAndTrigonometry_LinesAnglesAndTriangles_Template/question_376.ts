import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 376
*
* ORIGINAL ANALYSIS:
* - Number ranges: [base angle: 50-75, not 60]
* - Difficulty factors: [Isosceles triangle, base angles equal, angle sum theorem]
* - Distractor patterns: [Subtracts one base angle, assumes all equal, treats as right triangle]
* - Constraints: [Base angles must be equal, sum must be 180]
* - Question type: [Conceptual (no figure)→Multiple Choice Text]
*/

export const generator_376 = {
  metadata: {
    id: "376",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 60 is skipped: the triangle would be equilateral and x would equal the
    // base angle choice.
    let baseAngle = 60;
    while (baseAngle === 60) baseAngle = getRandomInt(50, 75);
    const vertexAngle = 180 - 2 * baseAngle;
    const correctAnswer = vertexAngle.toString();

    // Each wrong choice is a real slip; the old ones were the answer minus 10,
    // plus 12, and plus 24. With 60 skipped, 180 - 2b, b, 180 - b, and 90 - b
    // never collide.
    const optionsData = [
      { text: (180 - baseAngle).toString(), isCorrect: false, reason: `it results from subtracting only one base angle from 180; angles $ABC$ and $ACB$ each measure ${baseAngle} degrees, so both must be subtracted` },
      { text: correctAnswer, isCorrect: true, reason: '' },
      { text: baseAngle.toString(), isCorrect: false, reason: `it assumes all three angles of the triangle are congruent; only the angles opposite the congruent sides, angles $ABC$ and $ACB$, are congruent` },
      { text: (90 - baseAngle).toString(), isCorrect: false, reason: `it treats the triangle as a right triangle, subtracting ${baseAngle} from 90; none of the angles of triangle $ABC$ is a right angle` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In triangle $ABC$, $AB = AC$ and the measure of angle $ABC$ is $${baseAngle}^{\\circ}$. If the measure of angle $BAC$ is $x^{\\circ}$, what is the value of $x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. Since $AB = AC$, triangle $ABC$ is isosceles, and the angles opposite the congruent sides, angles $ACB$ and $ABC$, are congruent. So angle $ACB$ also measures $${baseAngle}^{\\circ}$. The sum of the measures of the angles of a triangle is $180^{\\circ}$, so $${baseAngle} + ${baseAngle} + x = 180$, which gives $x = ${correctAnswer}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
