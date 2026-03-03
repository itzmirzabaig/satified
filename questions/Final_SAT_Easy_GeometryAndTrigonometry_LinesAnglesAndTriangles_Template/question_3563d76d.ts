import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: 3563d76d
*
* ORIGINAL ANALYSIS:
* - Number ranges: [tallHeight: 400-600, tallShadow: 250-350, smallShadow: 12-20]
* - Difficulty factors: [Similar triangles, proportions, real-world application]
* - Distractor patterns: [Incorrect proportion calculation]
* - Constraints: [Proportion yields reasonable tree height]
* - Question type: [Conceptual (no figure)→Multiple Choice Text]
*/

export const generator_3563d76d = {
  metadata: {
    // id: "3563d76d",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const tallHeight = getRandomInt(400, 600);
    const tallShadow = getRandomInt(250, 350);
    const smallShadow = getRandomInt(12, 20);
    const treeHeightRounded = Math.round((tallHeight * smallShadow) / tallShadow);
    const distractorA = Math.round(treeHeightRounded * 0.33);
    const distractorB = Math.round(treeHeightRounded * 0.67);
    const distractorD = Math.round(treeHeightRounded * 1.17);
    const correctAnswer = treeHeightRounded.toString();

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "results from incorrect proportion calculation" },
      { text: distractorB.toString(), isCorrect: false, reason: "results from incorrect proportion calculation" },
      { text: correctAnswer, isCorrect: true },
      { text: distractorD.toString(), isCorrect: false, reason: "results from incorrect proportion calculation" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `At a certain time and day, the Washington Monument in Washington, DC, casts a shadow that is $${tallShadow}$ feet long. At the same time, a nearby cherry tree casts a shadow that is $${smallShadow}$ feet long. Given that the Washington Monument is approximately $${tallHeight}$ feet tall, which of the following is closest to the height, in feet, of the cherry tree?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. Using similar triangles: $\\frac{\\text{monument height}}{\\text{monument shadow}} = \\frac{\\text{tree height}}{\\text{tree shadow}}$. So $\\frac{${tallHeight}}{${tallShadow}} = \\frac{h}{${smallShadow}}$. Cross-multiplying: $h = \\frac{${tallHeight} \\times ${smallShadow}}{${tallShadow}} \\approx ${correctAnswer}$ feet. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: dfc420b2
*
* ORIGINAL ANALYSIS:
* - Number ranges: [angle1: 15-30, x: 90-110, angle3: 35-50]
* - Difficulty factors: [Intersecting lines, triangle angle sum, vertical angles]
* - Distractor patterns: [Uses given value of x, right angle guess, calculation error]
* - Constraints: [Vertical angles and triangle sum]
* - Question type: [Figure→Multiple Choice Text]
*/