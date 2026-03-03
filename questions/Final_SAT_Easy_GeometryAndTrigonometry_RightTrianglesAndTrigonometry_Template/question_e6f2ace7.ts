import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: e6f2ace7
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [leg1: 3 (single-digit), leg2: 7 (single-digit)]
 * - Difficulty factors: [Pythagorean theorem, square root estimation]
 * - Distractor patterns: [A: sqrt(difference), B: simple average, D: product of legs]
 * - Constraints: [Must satisfy a² + b² = c²]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with two legs labeled → Mafs code]
 */

export const generator_e6f2ace7 = {
  metadata: {
    // id: "e6f2ace7",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const leg1 = getRandomInt(2, 9);
    const leg2 = getRandomInt(2, 9);

    const hypotenuseSquared = leg1 * leg1 + leg2 * leg2;
    const hypotenuse = Math.sqrt(hypotenuseSquared);
    const roundedHypotenuse = Math.round(hypotenuse * 10) / 10;
    const distractorA = Math.sqrt(Math.abs(leg1 * leg1 - leg2 * leg2)).toFixed(1);
    const distractorB = Math.round((leg1 + leg2) / 2).toString();
    const distractorD = (leg1 * leg2).toString();

    const mafsCode = `
      <Coordinates.Cartesian xAxis={{ labels: false, axis: false }} yAxis={{ labels: false, axis: false }} />
      <Polygon points={[[0, 0], [${leg2}, 0], [0, ${leg1}]]} color="var(--mafs-fg)" fillOpacity={0.1} />
      <Text x={${leg2} / 2} y={-0.8} attach="n">${leg2}</Text>
      <Text x={-0.8} y={${leg1} / 2} attach="e">${leg1}</Text>
    `;

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "may result from calculating the square root of the difference of squares instead of the sum" },
      { text: distractorB, isCorrect: false, reason: "may result from averaging the leg lengths instead of using the Pythagorean theorem" },
      { text: roundedHypotenuse.toFixed(1), isCorrect: true },
      { text: distractorD, isCorrect: false, reason: "may result from multiplying the leg lengths instead of using the Pythagorean theorem" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: "The lengths of the legs of a right triangle are shown. Which of the following is closest to the length of the triangle's hypotenuse?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. The Pythagorean theorem states that for a right triangle, $a^2+b^2=c^2$. In the triangle shown, the legs have lengths of ${leg1} and ${leg2}. $${leg1}^2+${leg2}^2=c^2 \\Rightarrow ${leg1 * leg1}+${leg2 * leg2}=c^2 \\Rightarrow ${hypotenuseSquared}=c^2$. Thus, $c = \\sqrt{${hypotenuseSquared}} \\approx ${roundedHypotenuse}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

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

// File: generators/right-triangles-and-trigonometry/b0c5ece5.ts