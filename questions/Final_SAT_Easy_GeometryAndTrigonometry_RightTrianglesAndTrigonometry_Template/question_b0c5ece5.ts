import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: b0c5ece5
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [leg1: 4 (single-digit), hypotenuse: 19 (double-digit, 15-25 range)]
 * - Difficulty factors: [Pythagorean theorem equation setup, identifying legs vs hypotenuse]
 * - Distractor patterns: [A: multiplication, B: addition, D: subtraction]
 * - Constraints: [Hypotenuse must be the largest side]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with labeled sides including variable → Mafs code]
 */

export const generator_b0c5ece5 = {
  metadata: {
    // id: "b0c5ece5",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const leg1 = getRandomInt(3, 9);
    const hypotenuse = getRandomInt(15, 25);
    const adj = Math.sqrt(hypotenuse ** 2 - leg1 ** 2);

    const mafsCode = `
      <Coordinates.Cartesian xAxis={{ labels: false, axis: false }} yAxis={{ labels: false, axis: false }} />
      <Polygon points={[[0, 0], [${adj}, 0], [0, ${leg1}]]} color="var(--mafs-fg)" fillOpacity={0.1} />
      <Text x={${adj} / 2} y={-0.8} attach="n">b</Text>
      <Text x={-0.8} y={${leg1} / 2} attach="e">${leg1}</Text>
      <Text x={${adj} / 2} y={${leg1} / 2} attach="ne">${hypotenuse}</Text>
    `;

    const optionsData = [
      { text: `$${leg1}b=${hypotenuse}$`, isCorrect: false, reason: "incorrectly multiplies the leg by the variable instead of using the Pythagorean theorem" },
      { text: `$${leg1}+b=${hypotenuse}$`, isCorrect: false, reason: "incorrectly adds the values instead of squaring them" },
      { text: `$${leg1}^{2}+b^{2}=${hypotenuse}^{2}$`, isCorrect: true },
      { text: `$${leg1}^{2}-b^{2}=${hypotenuse}^{2}$`, isCorrect: false, reason: "incorrectly subtracts the square of the side length" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: "Which equation shows the relationship between the side lengths of the given triangle?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. The Pythagorean theorem states that in a right triangle, the sum of the squares of the lengths of the two legs is equal to the square of the length of the hypotenuse. For the given right triangle, the legs are ${leg1} and $b$, and the hypotenuse is ${hypotenuse}. Thus, $${leg1}^{2}+b^{2}=${hypotenuse}^{2}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 64c1f044
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [opposite: 26 (double-digit), adjacent: 7 (single-digit)]
 * - Difficulty factors: [Tangent ratio identification, opposite over adjacent]
 * - Distractor patterns: [A: reciprocal, B: difference ratio, D: sum ratio]
 * - Constraints: [Must be right triangle]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with angle x marked → Mafs code]
 */

// File: generators/right-triangles-and-trigonometry/64c1f044.ts