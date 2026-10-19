import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 361
*
* ORIGINAL ANALYSIS:
* - Number ranges: [acute angle: 40-55, not 45]
* - Difficulty factors: [Right triangle, complementary acute angles]
* - Distractor patterns: [Given angle, subtracts from 180, adds 90]
* - Constraints: [Acute angles sum to 90]
* - Question type: [Conceptual (no figure)→Multiple Choice Text]
*
* Intent: the two acute angles of a right triangle are complementary, so the
* other acute angle is 90 - givenAngle.
*/

export const generator_361 = {
  metadata: {
    id: "361",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 45 is skipped: the other angle would also be 45, matching the "given
    // angle" choice, and 180 - 45 would equal 90 + 45.
    let givenAngle = 45;
    while (givenAngle === 45) givenAngle = getRandomInt(40, 55);
    const otherAngle = 90 - givenAngle; // correct: 35-50
    const correctAnswer = otherAngle.toString();

    // Each wrong choice is a real slip; the old ones included "subtracts from
    // 100" and the answer plus 10 or minus 5. With 45 skipped, the values
    // 90 - g, g, 180 - g, and 90 + g never collide.
    const optionsData = [
      { text: correctAnswer, isCorrect: true, reason: "" },
      { text: givenAngle.toString(), isCorrect: false, reason: `${givenAngle} is the measure of the given acute angle; the two acute angles of a right triangle have the same measure only when each is 45 degrees` },
      { text: (180 - givenAngle).toString(), isCorrect: false, reason: `it results from subtracting ${givenAngle} from 180 instead of from 90; the right angle accounts for 90 of the 180 degrees in the triangle` },
      { text: (90 + givenAngle).toString(), isCorrect: false, reason: `it is the sum of the measures of the right angle and the given angle, $90 + ${givenAngle}$, not the measure of the other acute angle` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In a right triangle, the measure of one of the acute angles is $${givenAngle}^{\\circ}$. What is the measure, in degrees, of the other acute angle?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. The sum of the measures of the angles of a triangle is $180^{\\circ}$, and a right triangle has one $90^{\\circ}$ angle, so the measures of its two acute angles add to $90^{\\circ}$. Therefore, the measure of the other acute angle is $90^{\\circ} - ${givenAngle}^{\\circ} = ${correctAnswer}^{\\circ}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
