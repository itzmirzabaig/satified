import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 29e9b28c
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [perimeter 18-26, sides 6-12]
 * - Difficulty factors: [Triangle perimeter with figure, solving for z]
 * - Distractor patterns: [repeats side y, repeats side x, adds x and y]
 * - Constraints: [z = perimeter - x - y]
 * - Question type: [Has Figure (Mafs), Multiple Choice Text]
 * - Figure generation: [Triangle with labeled sides]
 */

export const generator_29e9b28c = {
  metadata: {
    // id: "29e9b28c",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const sideX = getRandomInt(6, 10);
    const sideY = getRandomInt(5, 9);
    const sideZ = getRandomInt(4, 8);
    const perimeter = sideX + sideY + sideZ;

    // Triangle vertices: origin, base-right, apex.
    // Scale down by 2 so sides 6-10 fit in a compact viewBox.
    const px = sideX / 2;
    const py = sideY / 2;

    // Use Text component instead of LaTeX to avoid duplication issues
    const mafsCode = `<Mafs viewBox={{ x: [-1, ${px + 2}], y: [-1.5, ${py + 1}] }}>
  <Polygon points={[[0, 0], [${px}, 0], [${px}, ${py}]]} color="var(--mafs-blue)" />
  <Text x={${px / 2}} y={-0.9}>x = ${sideX}</Text>
  <Text x={${px + 0.7}} y={${py / 2}}>y = ${sideY}</Text>
  <Text x={${(px / 2) - 0.5}} y={${py / 2 + 0.4}}>z</Text>
</Mafs>`;

    const optionsData = [
      { text: sideZ.toString(), isCorrect: true },
      { text: sideY.toString(), isCorrect: false, reason: "repeats side y" },
      { text: sideX.toString(), isCorrect: false, reason: "repeats side x" },
      { text: (sideX + sideY).toString(), isCorrect: false, reason: "adds x and y instead of subtracting from perimeter" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The triangle shown has a perimeter of $${perimeter}$ units. If $x = ${sideX}$ units and $y = ${sideY}$ units, what is the value of $z$, in units?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: sideZ.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The perimeter is the sum of all sides, so $z = ${perimeter} - ${sideX} - ${sideY} = ${sideZ}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 3453aafc
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [length 32-42, width close to length]
 * - Difficulty factors: [Rectangle area, multiplication of similar-sized numbers]
 * - Distractor patterns: [adds length and width, perimeter, squares width]
 * - Constraints: [Area = length × width]
 * - Question type: [No figure, Multiple Choice Text]
 * - Figure generation: [None]
 */