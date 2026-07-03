import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1272
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [areas: 648 and 72, longest side: 36]
 * - Difficulty factors: [Similar rectangles, area ratio = (linear ratio)²]
 * - Distractor patterns: [scaled wrong direction, area ratio as length, larger rectangle's side]
 * - Constraints: [Area ratio must be perfect square for clean answer]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 *
 * REBUILD NOTE: answer-first construction. The EFGH longest side is chosen as a
 * clean integer first; every other quantity (larger side, both areas, all
 * distractors) is an integer multiple of it, so no draw can produce a float
 * artifact. Distractors are guarded for distinctness with a bounded retry, and
 * each distractor's explanation is keyed to its post-shuffle letter by role.
 */

export const generator_1272 = {
  metadata: {
    id: "1272",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Linear scale factor between the two similar rectangles (ABCD : EFGH).
    // Area ratio is its square, guaranteed a perfect square (4, 9, 16, 25).
    let scaleFactor = 0;
    let areaRatio = 0;

    // EFGH (smaller) longest side chosen FIRST as a clean integer; every other
    // length/area is an integer multiple, so nothing ever divides to a float.
    let smallerLongestSide = 0;
    let largerLongestSide = 0;
    let smallerArea = 0;
    let largerArea = 0;

    // Distractor values (all integers by construction).
    let scaledWrongWay = 0; // multiplied instead of divided
    let ratioAsLength = 0;  // used the area ratio as the side length
    let largerSide = 0;     // reported the larger rectangle's side

    // Bounded retry: redraw until the four option values are all distinct.
    let tries = 0;
    do {
      scaleFactor = getRandomInt(2, 5);
      areaRatio = scaleFactor * scaleFactor;

      smallerLongestSide = getRandomInt(4, 15);
      largerLongestSide = smallerLongestSide * scaleFactor;

      smallerArea = getRandomInt(30, 100);
      largerArea = smallerArea * areaRatio;

      scaledWrongWay = largerLongestSide * scaleFactor;
      ratioAsLength = areaRatio;
      largerSide = largerLongestSide;
    } while (
      new Set([smallerLongestSide, scaledWrongWay, ratioAsLength, largerSide]).size !== 4 &&
      tries++ < 50
    );

    const correctText = smallerLongestSide.toString();

    // Tag each option with a role so its explanation can find its shuffled letter.
    const optionsData = [
      { text: correctText, role: 'correct', isCorrect: true },
      { text: scaledWrongWay.toString(), role: 'scaledWrong', isCorrect: false },
      { text: ratioAsLength.toString(), role: 'ratioLen', isCorrect: false },
      { text: largerSide.toString(), role: 'largerSide', isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const letterOf = (role: string) => shuffledOptions.find(o => o.role === role)!.letter;
    const correctLetter = letterOf('correct');

    return {
      questionText: `Rectangle $ABCD$ is similar to rectangle $EFGH$. The area of rectangle $ABCD$ is $A_{ABCD} = ${largerArea}$ square inches, and the area of rectangle $EFGH$ is $A_{EFGH} = ${smallerArea}$ square inches. The length of the longest side of rectangle $ABCD$ is $\\ell = ${largerLongestSide}$ inches. What is the length, in inches, of the longest side of rectangle $EFGH$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. For similar figures, the ratio of the areas equals the square of the ratio of corresponding sides. The ratio of the areas (larger to smaller) is $\\frac{${largerArea}}{${smallerArea}} = ${areaRatio}$, so the ratio of the corresponding side lengths is $\\sqrt{${areaRatio}} = ${scaleFactor}$. The longest side of $EFGH$ is therefore $\\frac{${largerLongestSide}}{${scaleFactor}} = ${smallerLongestSide}$ inches. Choice ${letterOf('scaledWrong')} is incorrect because it multiplies the given side by ${scaleFactor} instead of dividing, scaling in the wrong direction. Choice ${letterOf('ratioLen')} is incorrect because it uses the area ratio (a factor of $\\times ${areaRatio}$) as a length rather than taking its square root. Choice ${letterOf('largerSide')} is incorrect because it gives the longest side of the larger rectangle, $ABCD$, instead of $EFGH$.`
    };
  }
};
