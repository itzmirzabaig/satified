import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: 0bb39de4
*
* ORIGINAL ANALYSIS:
* - Number ranges: [angle A: 15-30]
* - Difficulty factors: [Congruent triangles, right triangles, corresponding angles]
* - Distractor patterns: [Measure of angle A, measure of right angle, sum of angle A and right angle]
* - Constraints: [Calculate third angle: 180 - 90 - A]
* - Question type: [Conceptual (no figure)→Multiple Choice Text]
*/

export const generator_0bb39de4 = {
  metadata: {
    // id: "0bb39de4",
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
      { text: `${distractorA}^{\\circ}`, isCorrect: false, reason: "is the measure of angle A, not angle F" },
      { text: `${correctAnswer}^{\\circ}`, isCorrect: true },
      { text: `${distractorC}^{\\circ}`, isCorrect: false, reason: "is the measure of the right angle, not angle F" },
      { text: `${distractorD}^{\\circ}`, isCorrect: false, reason: "is the sum of angles A and the right angle, not angle F" }
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
      explanation: `Choice ${correctOption.letter} is correct. In right triangle $ABC$, $\\angle C = 180^{\\circ} - 90^{\\circ} - ${angleA}^{\\circ} = ${correctAnswer}^{\\circ}$. Since triangles $ABC$ and $DEF$ are congruent with $C$ corresponding to $F$, we have $\\angle F = ${correctAnswer}^{\\circ}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 43236565
*
* ORIGINAL ANALYSIS:
* - Number ranges: [obtuse angle: 130-160]
* - Difficulty factors: [Vertical angles are congruent]
* - Distractor patterns: [x < givenAngle, x > givenAngle, insufficient information]
* - Constraints: [Vertical angles equal]
* - Question type: [Figure→Multiple Choice Text]
*/