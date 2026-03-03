import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

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

export const generator_c9f8d1e9 = {
  metadata: {
    // id: "c9f8d1e9",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(2, 6);
    const b = getRandomInt(2, 6);

    const mafsCode = `
      <Coordinates.Cartesian xAxis={{ labels: false, axis: false }} yAxis={{ labels: false, axis: false }} />
      <Polygon points={[[0, 0], [${b}, 0], [0, ${a}]]} color="var(--mafs-fg)" fillOpacity={0.1} />
      <Text x={${b} / 2} y={-0.8} attach="n">b</Text>
      <Text x={-0.8} y={${a} / 2} attach="e">a</Text>
      <Text x={${b} / 2} y={${a} / 2} attach="ne">c</Text>
    `;

    const optionsData = [
      { text: `$${a}+${b}$`, isCorrect: false, reason: "incorrectly adds the leg lengths instead of squaring them" },
      { text: `$\\sqrt{(${a})(${b})}$`, isCorrect: false, reason: "uses the geometric mean instead of the sum of squares" },
      { text: `$\\sqrt{${a}+${b}}$`, isCorrect: false, reason: "takes the square root of the sum of legs instead of the sum of squares" },
      { text: `$\\sqrt{${a}^2+${b}^2}$`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `For the right triangle shown, $a=${a}$ and $b=${b}$. Which expression represents the value of $c$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. According to the Pythagorean theorem, $a^2 + b^2 = c^2$. Given $a=${a}$ and $b=${b}$, the equation becomes $${a}^2 + ${b}^2 = c^2$. Solving for $c$, we get $c = \\sqrt{${a}^2 + ${b}^2}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 145337bc
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angle: 45°, leg: 24]
 * - Difficulty factors: [Isosceles right triangle properties]
 * - Distractor patterns: [B: angle measure, C: doubled leg, D: sum of angle and leg]
 * - Constraints: [Legs must be equal]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with 45° angle marked → Mafs code]
 */

// File: generators/right-triangles-and-trigonometry/145337bc.ts