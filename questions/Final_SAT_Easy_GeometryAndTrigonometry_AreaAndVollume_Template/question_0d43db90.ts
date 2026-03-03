import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: 0d43db90
*
* ORIGINAL ANALYSIS:
* - Number ranges: [side lengths: 3-9]
* - Difficulty factors: [Triangle perimeter, solving for missing side]
* - Distractor patterns: [repeats side AB, repeats side AC, adds two sides]
* - Constraints: [BC = Perimeter - AB - AC]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_0d43db90 = {
  metadata: {
    // id: "0d43db90",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const sideAB = getRandomInt(3, 6);
    const sideAC = getRandomInt(5, 9);
    const sideBC = getRandomInt(4, 8);
    const perimeter = sideAB + sideAC + sideBC;

    const optionsData = [
      { text: sideAB.toString(), isCorrect: false, reason: "repeats the length of side AB" },
      { text: sideBC.toString(), isCorrect: true },
      { text: sideAC.toString(), isCorrect: false, reason: "repeats the length of side AC" },
      { text: (sideAB + sideAC).toString(), isCorrect: false, reason: "adds the two given sides instead of subtracting from perimeter" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The perimeter of triangle $ABC$ is $${perimeter}$ inches, the length of side $AB$ is $${sideAB}$ inches, and the length of side $AC$ is $${sideAC}$ inches. What is the length, in inches, of side $BC$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: sideBC.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The perimeter is the sum of all sides, so $BC = ${perimeter} - ${sideAB} - ${sideAC} = ${sideBC}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 0e40dfb0
*
* ORIGINAL ANALYSIS:
* - Number ranges: [length: 2-5, width: 30-50]
* - Difficulty factors: [Identifying correct area formula vs perimeter]
* - Distractor patterns: [perimeter, twice the area, sum of sides]
* - Constraints: [Area expression is length × width]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/