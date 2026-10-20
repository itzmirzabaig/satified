import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 374
*
* ORIGINAL ANALYSIS:
* - Number ranges: [angle R: 50-75]
* - Difficulty factors: [Triangle inequality for angles, angle sum constraint]
* - Distractor patterns: [Exceeds maximum possible sum, impossible triangle angle]
* - Constraints: [Angle S must be < 180 - angle R]
* - Question type: [Conceptual (no figure)→Multiple Choice Text]
*/

export const generator_374 = {
  metadata: {
    id: "374",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const angleR = getRandomInt(50, 75);
    const bound = 180 - angleR;                       // angle S + angle T
    const validAngleS = bound - getRandomInt(2, 12);  // leaves angle T positive
    const atBound = bound;                            // would leave angle T = 0
    const overBound = bound + getRandomInt(6, 12);    // would make angle T negative
    const correctAnswer = validAngleS.toString();

    // The old reasons read "exceeds maximum possible angle sum" (also for the
    // value equal to the bound) and "it a triangle angle cannot equal 180°".
    const optionsData = [
      { text: correctAnswer, isCorrect: true, reason: '' },
      { text: atBound.toString(), isCorrect: false, reason: `if the measure of angle $S$ were ${atBound} degrees, the measure of angle $T$ would be $${bound} - ${atBound} = 0$ degrees, which is not possible` },
      { text: overBound.toString(), isCorrect: false, reason: `${overBound} is greater than ${bound}, so the measures of angles $R$ and $S$ alone would add to more than 180 degrees` },
      { text: "180", isCorrect: false, reason: `the measures of all three angles of a triangle add to 180 degrees, so no single angle can measure 180 degrees` }
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
      explanation: `Choice ${correctOption.letter} is correct. The sum of the measures of the angles of a triangle is $180^{\\circ}$. Since the measure of angle $R$ is $${angleR}^{\\circ}$, the measures of angles $S$ and $T$ add to $180^{\\circ} - ${angleR}^{\\circ} = ${bound}^{\\circ}$. The measure of angle $T$ must be greater than 0, so the measure of angle $S$ must be less than ${bound} degrees. Of the choices, only ${correctAnswer} is less than ${bound}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
