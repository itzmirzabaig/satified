import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: 42b4493b
*
* ORIGINAL ANALYSIS:
* - Number ranges: [acute angle: 40-55]
* - Difficulty factors: [Right triangle, complementary acute angles]
* - Distractor patterns: [Subtraction error, choose given angle, subtract from 100 error]
* - Constraints: [Acute angles sum to 90]
* - Question type: [Conceptual (no figure)→Multiple Choice Text]
*/

export const generator_42b4493b = {
  metadata: {
    // id: "42b4493b",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const givenAngle = getRandomInt(40, 55);
    const otherAngle = 90 - givenAngle;
    const distractorA = givenAngle - 45;
    const distractorC = 100 - givenAngle;
    const distractorD = givenAngle;
    const correctAnswer = otherAngle.toString();

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "results from calculation error" },
      { text: correctAnswer, isCorrect: true },
      { text: distractorC.toString(), isCorrect: false, reason: "subtracts from 100 instead of 90" },
      { text: distractorD.toString(), isCorrect: false, reason: "chooses the given angle instead of the complementary angle" }
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
      explanation: `Choice ${correctOption.letter} is correct. In a right triangle, the two acute angles are complementary (sum to $90^{\\circ}$). Therefore, the other acute angle is $90^{\\circ} - ${givenAngle}^{\\circ} = ${correctAnswer}^{\\circ}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

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