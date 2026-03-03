import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: b434e103
*
* ORIGINAL ANALYSIS:
* - Number ranges: [angle R: 50-75]
* - Difficulty factors: [Triangle inequality for angles, angle sum constraint]
* - Distractor patterns: [Exceeds maximum possible sum, impossible triangle angle]
* - Constraints: [Angle S must be < 180 - angle R]
* - Question type: [Conceptual (no figure)→Multiple Choice Text]
*/

export const generator_b434e103 = {
  metadata: {
    // id: "b434e103",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const angleR = getRandomInt(50, 75);
    const maxAngleS = 180 - angleR - 1;
    const validAngleS = maxAngleS - 1;
    const invalidOption1 = maxAngleS + 1;
    const invalidOption2 = maxAngleS + 9;
    const invalidOption3 = 180;
    const correctAnswer = validAngleS.toString();

    const optionsData = [
      { text: correctAnswer, isCorrect: true },
      { text: invalidOption1.toString(), isCorrect: false, reason: "exceeds maximum possible angle sum" },
      { text: invalidOption2.toString(), isCorrect: false, reason: "exceeds maximum possible angle sum" },
      { text: invalidOption3.toString(), isCorrect: false, reason: "a triangle angle cannot equal 180°" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In $\\triangle RST$, the measure of $\\angle R$ is $${angleR}^{\\circ}$. Which of the following could be the measure, in degrees, of $\\angle S$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. The sum of interior angles is $180^{\\circ}$. With $\\angle R = ${angleR}^{\\circ}$, we have $\\angle S + \\angle T = ${180 - angleR}^{\\circ}$. Since $\\angle T > 0$, we need $\\angle S < ${180 - angleR}^{\\circ}$. Only ${correctAnswer} satisfies this condition. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 69f4bbdc
*
* ORIGINAL ANALYSIS:
* - Number ranges: [acute angle: 10-35]
* - Difficulty factors: [Right triangle, complementary angles]
* - Distractor patterns: [Given angle, right angle, supplementary error]
* - Constraints: [Sum of acute angles = 90]
* - Question type: [Figure→Multiple Choice Text]
*/