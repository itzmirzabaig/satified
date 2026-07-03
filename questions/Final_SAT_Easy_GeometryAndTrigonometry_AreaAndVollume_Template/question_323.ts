import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 323
*
* ORIGINAL ANALYSIS:
* - Number ranges: [side lengths: AB 3-6, AC 5-9, BC 4-8]
* - Difficulty factors: [Triangle perimeter, solving for missing side]
* - Distractor patterns: [repeats side AB, repeats side AC, adds two given sides]
* - Constraints: [BC = Perimeter - AB - AC; three sides distinct; triangle inequality]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_323 = {
  metadata: {
    id: "323",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Draw three side lengths that are pairwise distinct and form a valid
    // triangle. Distinctness keeps the "repeats side AB/AC" distractors from
    // colliding with the correct answer (BC); the triangle inequality
    // AB + AC > BC keeps the "adds the two given sides" distractor (AB + AC)
    // strictly greater than BC, so it can never equal the answer either.
    // Bounded retry (<= 50) — valid combinations are plentiful in these ranges.
    let sideAB = 0, sideAC = 0, sideBC = 0;
    let tries = 0;
    do {
      sideAB = getRandomInt(3, 6);
      sideAC = getRandomInt(5, 9);
      sideBC = getRandomInt(4, 8);
      tries++;
    } while (
      tries < 50 &&
      (
        sideAB === sideAC || sideAB === sideBC || sideAC === sideBC ||
        sideAB + sideAC <= sideBC ||
        sideAB + sideBC <= sideAC ||
        sideAC + sideBC <= sideAB
      )
    );

    const perimeter = sideAB + sideAC + sideBC;

    const optionsData = [
      { text: sideAB.toString(), isCorrect: false, reason: "repeats the length of side $AB$" },
      { text: sideBC.toString(), isCorrect: true },
      { text: sideAC.toString(), isCorrect: false, reason: "repeats the length of side $AC$" },
      { text: (sideAB + sideAC).toString(), isCorrect: false, reason: "adds the two given sides instead of subtracting their sum from the perimeter" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The perimeter of triangle $ABC$ is ${perimeter} inches, the length of side $AB$ is ${sideAB} inches, and the length of side $AC$ is ${sideAC} inches. What is the length, in inches, of side $BC$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: sideBC.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The perimeter is the sum of the three side lengths, so $BC = ${perimeter} - ${sideAB} - ${sideAC} = ${sideBC}$ inches. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
