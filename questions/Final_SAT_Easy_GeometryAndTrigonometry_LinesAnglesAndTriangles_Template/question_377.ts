import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 377
*
* ORIGINAL ANALYSIS:
* - Number ranges: [angle X: 20-40, angle Y: 80-110]
* - Difficulty factors: [Triangle angle sum theorem, straightforward calculation]
* - Distractor patterns: [Sum of the two angles, subtracts from 360, subtracts only one angle]
* - Constraints: [X + Y < 180]
* - Question type: [Conceptual (no figure)→Multiple Choice Text]
*/

export const generator_377 = {
  metadata: {
    id: "377",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Each wrong choice is a real slip; two of the old ones were the answer
    // plus 16 and the sum plus 90. Redraw until the four values differ
    // (X = 20 and Y = 80 make 180 - Y equal X + Y).
    let angleX = 20, angleY = 80, angleZ = 80;
    do {
      angleX = getRandomInt(20, 40);
      angleY = getRandomInt(80, 110);
      angleZ = 180 - angleX - angleY;
    } while (new Set([angleZ, angleX + angleY, 360 - angleX - angleY, 180 - angleY]).size < 4);
    const correctAnswer = angleZ.toString();

    const optionsData = [
      { text: `${correctAnswer}^{\\circ}`, isCorrect: true, reason: '' },
      { text: `${360 - angleX - angleY}^{\\circ}`, isCorrect: false, reason: `it results from subtracting the two given measures from $360^{\\circ}$ instead of $180^{\\circ}$` },
      { text: `${angleX + angleY}^{\\circ}`, isCorrect: false, reason: `it is the sum of the measures of angles $X$ and $Y$, which must be subtracted from $180^{\\circ}$` },
      { text: `${180 - angleY}^{\\circ}`, isCorrect: false, reason: `it results from subtracting only the measure of angle $Y$ from $180^{\\circ}$; the measure of angle $X$ must also be subtracted` }
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
      explanation: `Choice ${correctOption.letter} is correct. The triangle angle sum theorem states that the sum of the measures of the interior angles of a triangle is $180^{\\circ}$. Therefore, the measure of angle $Z$ is $180^{\\circ} - ${angleX}^{\\circ} - ${angleY}^{\\circ} = ${correctAnswer}^{\\circ}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
