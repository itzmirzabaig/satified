import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1308
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radius: single digit (9), perimeter: double digit (31)]
 * - Difficulty factors: [Isosceles triangle properties, basic algebra]
 * - Distractor patterns: [Confusing with right triangle, using wrong formula]
 * - Constraints: [Triangle inequality satisfied automatically with radii]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1308 = {
  metadata: {
    id: "1308",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate radius (single digit to match original difficulty)
    const radius = getRandomInt(5, 12);
    const twoRadii = 2 * radius;

    // Distractor built from the radius (does not depend on QR):
    // the hypotenuse a student gets if they wrongly treat PQR as an
    // isosceles RIGHT triangle with legs = radius.
    const distractorHyp = Math.round(radius * Math.sqrt(2) * 10) / 10;
    const distractorHypText = distractorHyp.toString().replace(/\.0$/, '');

    // STEP 2: Pick QR so that PQ + PR + QR forms a valid, non-equilateral
    // triangle AND all four option strings end up distinct.
    // Triangle inequality: QR < PQ + PR = 2*radius (and QR > 0).
    // QR != radius keeps it non-equilateral.
    let qrLength = 0;
    let perimeter = 0;
    let distractorOneRadius = 0; // used only one radius: perimeter - radius = radius + QR
    let tries = 0;
    do {
      // QR strictly between radius+2 and 2*radius-1 => valid triangle, not equilateral.
      qrLength = getRandomInt(radius + 2, twoRadii - 1);
      perimeter = twoRadii + qrLength;
      distractorOneRadius = perimeter - radius; // = radius + qrLength
      tries++;
    } while (
      tries < 50 &&
      new Set([
        qrLength.toString(),
        distractorHypText,
        radius.toString(),
        distractorOneRadius.toString()
      ]).size !== 4
    );

    const correctText = qrLength.toString();

    const optionsData = [
      { text: distractorHypText, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: radius.toString(), isCorrect: false },
      { text: distractorOneRadius.toString(), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // Explain each distractor by matching its string back to its cause, so the
    // letters follow the shuffled order.
    const reasonFor = (text: string): string => {
      if (text === distractorHypText) return `this would be the hypotenuse if $\\triangle PQR$ were an isosceles right triangle with legs equal to the radius`;
      if (text === radius.toString()) return `this is just the radius, which assumes an equilateral triangle`;
      return `this results from subtracting only one radius, computing $QR = ${perimeter} - ${radius}$ instead of subtracting both radii`;
    };

    return {
      questionText: `Points $Q$ and $R$ lie on a circle with center $P$. The radius of this circle is ${radius} inches. Triangle $PQR$ has a perimeter of ${perimeter} inches. What is the length, in inches, of $\\overline{QR}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Because $P$ is the center and $Q$ and $R$ lie on the circle, $\\overline{PQ}$ and $\\overline{PR}$ are both radii of length ${radius} inches. The perimeter is $PQ + PR + QR = ${radius} + ${radius} + QR = ${perimeter}$, so $QR = ${perimeter} - ${twoRadii} = ${qrLength}$ inches. Choice ${incorrectOptions[0].letter} is incorrect because ${reasonFor(incorrectOptions[0].text)}. Choice ${incorrectOptions[1].letter} is incorrect because ${reasonFor(incorrectOptions[1].text)}. Choice ${incorrectOptions[2].letter} is incorrect because ${reasonFor(incorrectOptions[2].text)}.`
    };
  }
};
