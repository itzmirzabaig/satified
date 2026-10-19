import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 355
*
* ORIGINAL ANALYSIS:
* - Number ranges: [tallHeight: 555 (the real height), tallShadow: 225-350, smallShadow: 10-20]
* - Difficulty factors: [Similar triangles, proportions, real-world application]
* - Distractor patterns: [Inverted ratio, shadow taken as height, additive difference]
* - Constraints: [Proportion yields reasonable tree height]
* - Question type: [Conceptual (no figure)→Multiple Choice Text]
*/

export const generator_355 = {
  metadata: {
    id: "355",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // The Washington Monument is about 555 feet tall; the old code drew a
    // height from 400 to 600, which misstated it on most draws. Only the
    // shadows vary now.
    // Draws whose exact height is within 0.1 of a half are redone, so the
    // rounded value in the explanation clearly points to one choice.
    const tallHeight = 555;
    let tallShadow = 225, smallShadow = 10, exactHeight = 0;
    do {
      tallShadow = getRandomInt(225, 350);
      smallShadow = getRandomInt(10, 20);
      exactHeight = (tallHeight * smallShadow) / tallShadow;
    } while (Math.abs((exactHeight % 1) - 0.5) < 0.1);
    const treeHeightRounded = Math.round(exactHeight);
    const correctAnswer = treeHeightRounded.toString();

    // Each wrong choice is a real slip; the old ones were the answer times
    // 0.33, 0.67, and 1.17. The answer is at least 1.58 times the tree's
    // shadow and the inverted ratio is at most 0.64 times it, so the four
    // values never collide.
    const inverted = Math.round((tallShadow * smallShadow) / tallHeight);
    const additive = smallShadow + (tallHeight - tallShadow);
    const optionsData = [
      { text: inverted.toString(), isCorrect: false, reason: `it results from inverting one of the ratios, $\\frac{${tallShadow}}{${tallHeight}} = \\frac{h}{${smallShadow}}$; the ratio of height to shadow length must be the same for both objects` },
      { text: smallShadow.toString(), isCorrect: false, reason: `${smallShadow} feet is the length of the tree's shadow, not its height` },
      { text: correctAnswer, isCorrect: true, reason: '' },
      { text: additive.toString(), isCorrect: false, reason: `it results from adding the difference between the monument's height and its shadow length, $${tallHeight} - ${tallShadow}$, to the tree's shadow length; heights and shadow lengths are proportional, not separated by a constant difference` }
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
      explanation: `Choice ${correctOption.letter} is correct. At the same time and place, the sun's rays strike both objects at the same angle, so each object and its shadow form similar right triangles. Therefore, the ratio of each object's height to its shadow length is the same. If $h$ is the height, in feet, of the cherry tree, then $\\frac{${tallHeight}}{${tallShadow}} = \\frac{h}{${smallShadow}}$. Multiplying both sides by ${smallShadow} gives $h = \\frac{${tallHeight}(${smallShadow})}{${tallShadow}}$, which is approximately ${exactHeight.toFixed(1)}. Of the given choices, ${correctAnswer} is closest to the height of the cherry tree. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
