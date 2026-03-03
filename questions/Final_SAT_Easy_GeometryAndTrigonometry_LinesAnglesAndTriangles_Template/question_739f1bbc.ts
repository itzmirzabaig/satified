import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: 739f1bbc
*
* ORIGINAL ANALYSIS:
* - Number ranges: [sideLength: 3000-9900]
* - Difficulty factors: [Equilateral triangle definition, all sides equal]
* - Distractor patterns: [Incorrect scaling by powers of 10]
* - Constraints: [Must match exact given value for equilateral proof]
* - Question type: [Conceptual (no figure)→Multiple Choice Text]
*/

export const generator_739f1bbc = {
  metadata: {
    // id: "739f1bbc",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const sideLength = getRandomInt(3, 9) * 1000 + getRandomInt(100, 900);
    const distractorB = Math.round(sideLength / 10);
    const distractorC = Math.round(sideLength / 100);
    const distractorD = Math.round(sideLength / 1000);
    const correctAnswer = sideLength.toString();

    const optionsData = [
      { text: `$${correctAnswer}$ mm`, isCorrect: true },
      { text: `$${distractorB}$ mm`, isCorrect: false, reason: "incorrectly scales by factor of 10" },
      { text: `$${distractorC}$ mm`, isCorrect: false, reason: "incorrectly scales by factor of 100" },
      { text: `$${distractorD}$ mm`, isCorrect: false, reason: "incorrectly scales by factor of 1000" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In triangle $ABC$, $AB = ${sideLength}$ millimeters (mm) and $BC = ${sideLength}$ mm. Which statement is sufficient to prove that triangle $ABC$ is equilateral?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${correctAnswer}$ mm`,
      explanation: `Choice ${correctOption.letter} is correct. In an equilateral triangle, all three sides have the same length. Since $AB = ${sideLength}$ mm and $BC = ${sideLength}$ mm, if $AC = ${sideLength}$ mm, then all three sides are equal and triangle $ABC$ is equilateral. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: e0d2e21a
*
* ORIGINAL ANALYSIS:
* - Number ranges: [d: 12-20, scale factor: 2-4, angle: 50-70]
* - Difficulty factors: [Dilation preserves angles, similar triangles]
* - Distractor patterns: [Calculation error]
* - Constraints: [Angle measure preserved under dilation]
* - Question type: [Figure→Multiple Choice Text]
*/