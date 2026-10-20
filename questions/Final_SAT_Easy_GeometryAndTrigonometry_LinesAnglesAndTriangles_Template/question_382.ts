import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 382
*
* ORIGINAL ANALYSIS:
* - Number ranges: [angle B: 45-60, angle C: 15-25]
* - Difficulty factors: [Triangle angle sum, straightforward]
* - Distractor patterns: [Sum of B and C, subtracts from 360, subtracts only B]
* - Constraints: [Sum = 180]
* - Question type: [Conceptual (no figure)→Multiple Choice Text]
*/

export const generator_382 = {
  metadata: {
    id: "382",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const angleB = getRandomInt(45, 60);
    const angleC = getRandomInt(15, 25);
    const angleA = 180 - angleB - angleC;
    const correctAnswer = angleA.toString();

    // Each wrong choice is a real slip; two of the old ones were angle A minus
    // 90 and minus 76. With B from 45 to 60 and C from 15 to 25, the values
    // A (95 to 120), B + C (60 to 85), 360 - B - C (275 to 300), and 180 - B
    // (120 to 135, never equal to A since C > 0) never collide.
    const optionsData = [
      { text: `${360 - angleB - angleC}^{\\circ}`, isCorrect: false, reason: `it results from subtracting the two given measures from $360^{\\circ}$ instead of $180^{\\circ}$` },
      { text: `${180 - angleB}^{\\circ}`, isCorrect: false, reason: `it results from subtracting only the measure of angle $B$ from $180^{\\circ}$; the measure of angle $C$ must also be subtracted` },
      { text: `${angleB + angleC}^{\\circ}`, isCorrect: false, reason: `it is the sum of the measures of angles $B$ and $C$, which must be subtracted from $180^{\\circ}$` },
      { text: `${correctAnswer}^{\\circ}`, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In triangle $ABC$, the measure of angle $B$ is $${angleB}^{\\circ}$ and the measure of angle $C$ is $${angleC}^{\\circ}$. What is the measure of angle $A$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${correctAnswer}^{\\circ}`,
      explanation: `Choice ${correctOption.letter} is correct. The sum of the measures of the interior angles of a triangle is $180^{\\circ}$. Therefore, the measure of angle $A$ is $180^{\\circ} - ${angleB}^{\\circ} - ${angleC}^{\\circ} = ${correctAnswer}^{\\circ}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
