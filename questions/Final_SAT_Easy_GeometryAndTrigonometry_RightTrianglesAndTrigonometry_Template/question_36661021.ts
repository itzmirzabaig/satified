import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 36661021
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [leg1: 9, leg2: 6]
 * - Difficulty factors: [Pythagorean theorem, square root estimation]
 * - Distractor patterns: [A: average, C: simple sum, D: squared sum]
 * - Constraints: [Must estimate sqrt]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with hypotenuse labeled c → Mafs code]
 */

export const generator_36661021 = {
  metadata: {
    // id: "36661021",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const leg1 = getRandomInt(5, 12);
    const leg2 = getRandomInt(5, 12);

    const sumSquares = leg1 * leg1 + leg2 * leg2;
    const hypotenuse = Math.sqrt(sumSquares);
    const roundedHypotenuse = Math.round(hypotenuse * 10) / 10;
    const distractorA = (Math.round(((leg1 + leg2) / 2) * 10) / 10).toFixed(1);
    const distractorC = (leg1 + leg2).toFixed(1);
    const distractorD = sumSquares.toFixed(1);

    const mafsCode = `
      <Coordinates.Cartesian xAxis={{ labels: false, axis: false }} yAxis={{ labels: false, axis: false }} />
      <Polygon points={[[0, 0], [${leg2}, 0], [0, ${leg1}]]} color="var(--mafs-fg)" fillOpacity={0.1} />
      <Text x={${leg2} / 2} y={-0.8} attach="n">${leg2}</Text>
      <Text x={-0.8} y={${leg1} / 2} attach="e">${leg1}</Text>
      <Text x={${leg2} / 2} y={${leg1} / 2} attach="ne">c</Text>
    `;

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "may result from averaging the leg lengths" },
      { text: roundedHypotenuse.toFixed(1), isCorrect: true },
      { text: distractorC, isCorrect: false, reason: "results from adding the leg lengths directly" },
      { text: distractorD, isCorrect: false, reason: "is the value of the hypotenuse squared" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: "In the right triangle shown, which of the following is closest to the value of $c$?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. By the Pythagorean theorem, $${leg1}^2 + ${leg2}^2 = c^2 \Rightarrow ${leg1 * leg1} + ${leg2 * leg2} = c^2 \Rightarrow ${sumSquares} = c^2$. Thus, $c = \\sqrt{${sumSquares}} \\approx ${roundedHypotenuse}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: c9f8d1e9
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [leg a: 4, leg b: 5]
 * - Difficulty factors: [Pythagorean theorem expression setup]
 * - Distractor patterns: [A: sum, B: product sqrt, C: sum sqrt]
 * - Constraints: [Must show expression]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with a, b, c labeled → Mafs code]
 */

// File: generators/right-triangles-and-trigonometry/c9f8d1e9.ts