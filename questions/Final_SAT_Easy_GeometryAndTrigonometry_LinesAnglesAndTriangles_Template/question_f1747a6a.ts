import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: f1747a6a
*
* ORIGINAL ANALYSIS:
* - Number ranges: [angle B: 45-60, angle C: 15-25]
* - Difficulty factors: [Triangle angle sum, straightforward]
* - Distractor patterns: [Calculation error, sum of B and C]
* - Constraints: [Sum = 180]
* - Question type: [Conceptual (no figure)→Multiple Choice Text]
*/

export const generator_f1747a6a = {
  metadata: {
    // id: "f1747a6a",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const angleB = getRandomInt(45, 60);
    const angleC = getRandomInt(15, 25);
    const angleA = 180 - angleB - angleC;
    const distractorA = angleA - 90;
    const distractorB = angleA - 76;
    const distractorC = angleB + angleC;
    const correctAnswer = angleA.toString();

    const optionsData = [
      { text: `${distractorA}^{\\circ}`, isCorrect: false, reason: "results from calculation error" },
      { text: `${distractorB}^{\\circ}`, isCorrect: false, reason: "results from miscalculation" },
      { text: `${distractorC}^{\\circ}`, isCorrect: false, reason: "sums angles B and C instead of finding angle A" },
      { text: `${correctAnswer}^{\\circ}`, isCorrect: true }
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
      explanation: `Choice ${correctOption.letter} is correct. The sum of the measures of the interior angles of a triangle is $180^{\\circ}$. Therefore, $\\angle A = 180^{\\circ} - ${angleB}^{\\circ} - ${angleC}^{\\circ} = ${correctAnswer}^{\\circ}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 5733ce30
*
* ORIGINAL ANALYSIS:
* - Number ranges: [exteriorAngle: 100-130]
* - Difficulty factors: [Isosceles triangle, exterior angle, linear pair]
* - Distractor patterns: [Select exterior angle, find base angle, halves base angle]
* - Constraints: [Base angles equal, x = 180 - 2*baseAngle]
* - Question type: [Figure→Multiple Choice Text]
*/