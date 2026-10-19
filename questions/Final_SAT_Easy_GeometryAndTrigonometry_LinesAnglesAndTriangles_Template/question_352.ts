import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 352
*
* ORIGINAL ANALYSIS:
* - Number ranges: [angle A: 15-30]
* - Difficulty factors: [Congruent triangles, right triangles, corresponding angles]
* - Distractor patterns: [Measure of angle A, measure of right angle, sum of angle A and right angle]
* - Constraints: [Calculate third angle: 180 - 90 - A]
* - Question type: [Conceptual (no figure)→Multiple Choice Text]
*/

export const generator_352 = {
  metadata: {
    id: "352",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const angleA = getRandomInt(15, 30);
    const angleC = 90 - angleA;
    const distractorA = angleA;
    const distractorC = 90;
    const distractorD = 180 - angleC;
    const correctAnswer = angleC.toString();

    const optionsData = [
      { text: `${distractorA}^{\\circ}`, isCorrect: false, reason: `$${angleA}^{\\circ}$ is the measure of angle $A$, which corresponds to angle $D$, not angle $F$` },
      { text: `${correctAnswer}^{\\circ}`, isCorrect: true, reason: '' },
      { text: `${distractorC}^{\\circ}`, isCorrect: false, reason: `$90^{\\circ}$ is the measure of right angles $B$ and $E$, not angle $F$` },
      { text: `${distractorD}^{\\circ}`, isCorrect: false, reason: `$${distractorD}^{\\circ}$ is the sum of the measures of angle $A$ and a right angle, $${angleA}^{\\circ} + 90^{\\circ}$, not the measure of angle $F$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `Triangles $ABC$ and $DEF$ are congruent, where $A$ corresponds to $D$, and $B$ and $E$ are right angles. The measure of angle $A$ is $${angleA}^{\\circ}$. What is the measure of angle $F$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${correctAnswer}^{\\circ}`,
      explanation: `Choice ${correctOption.letter} is correct. The sum of the measures of the angles of a triangle is $180^{\\circ}$. In right triangle $ABC$, the measure of angle $C$ is $180^{\\circ} - 90^{\\circ} - ${angleA}^{\\circ} = ${correctAnswer}^{\\circ}$. Since triangles $ABC$ and $DEF$ are congruent with $C$ corresponding to $F$, the measure of angle $F$ is also $${correctAnswer}^{\\circ}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
