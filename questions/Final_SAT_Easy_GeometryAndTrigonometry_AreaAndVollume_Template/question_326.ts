import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 326
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [perimeter 18-26, sides 6-12]
 * - Difficulty factors: [Triangle perimeter with figure, solving for z]
 * - Distractor patterns: [repeats side y, repeats side x, adds x and y]
 * - Constraints: [z = perimeter - x - y]
 * - Question type: [Has Figure (Mafs), Multiple Choice Text]
 * - Figure generation: [Triangle with labeled sides]
 */

export const generator_326 = {
  metadata: {
    id: "326",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Draw three side lengths, forcing them pairwise-distinct so the
    // distractors (which repeat x, y, or z) can never collide with the
    // correct answer or one another. x+y is always >= 11 while every single
    // side is <= 10, so that fourth option is automatically distinct too.
    // The sides must also satisfy the triangle inequality, and the triangle
    // must not be nearly flat. The figure used to be a right triangle with
    // legs x and y, which made z look like the longest side even when the
    // answer was shorter than both legs (for example x = 10, y = 9, z = 6).
    let sideX = 6, sideY = 5, sideZ = 4, apexX = 0, apexY = 0;
    do {
      sideX = getRandomInt(6, 10);
      sideY = getRandomInt(5, 9);
      sideZ = getRandomInt(4, 8);
      // Base from (0, 0) to (sideX, 0); the apex is sideZ from the left end
      // and sideY from the right end (law of cosines).
      apexX = (sideZ * sideZ - sideY * sideY + sideX * sideX) / (2 * sideX);
      apexY = Math.sqrt(Math.max(0, sideZ * sideZ - apexX * apexX));
    } while (
      sideX === sideY || sideX === sideZ || sideY === sideZ ||
      sideY + sideZ <= sideX + 1 || apexY < 2.5
    );
    const perimeter = sideX + sideY + sideZ;

    // Drawn to scale (half size), so each side's drawn length matches its label.
    const s = 0.5;
    const bx = sideX * s, ax = apexX * s, ay = apexY * s;
    const r = (n: number) => Math.round(n * 1000) / 1000;
    const mafsCode = `<Mafs viewBox={{ x: [${r(Math.min(0, ax) - 1.6)}, ${r(Math.max(bx, ax) + 1.8)}], y: [-1.3, ${r(ay + 0.8)}] }}>
  <Polygon points={[[0, 0], [${r(bx)}, 0], [${r(ax)}, ${r(ay)}]]} color="var(--mafs-blue)" />
  <Text x={${r(bx / 2)}} y={-0.8}>x = ${sideX}</Text>
  <Text x={${r((bx + ax) / 2 + 1.1)}} y={${r(ay / 2 + 0.2)}}>y = ${sideY}</Text>
  <Text x={${r(ax / 2 - 0.7)}} y={${r(ay / 2 + 0.2)}}>z</Text>
</Mafs>`;

    const optionsData = [
      { text: sideZ.toString(), isCorrect: true, reason: '' },
      { text: sideY.toString(), isCorrect: false, reason: `${sideY} is the length of side $y$, not side $z$` },
      { text: sideX.toString(), isCorrect: false, reason: `${sideX} is the length of side $x$, not side $z$` },
      { text: (sideX + sideY).toString(), isCorrect: false, reason: `${sideX + sideY} is the sum of $x$ and $y$; this sum must be subtracted from the perimeter, ${perimeter}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The triangle shown has a perimeter of $P = ${perimeter}$ units. If $x = ${sideX}$ units and $y = ${sideY}$ units, what is the value of $z$, in units?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: sideZ.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The perimeter of a triangle is the sum of its three side lengths, so $x + y + z = ${perimeter}$, or $${sideX} + ${sideY} + z = ${perimeter}$. This gives $${sideX + sideY} + z = ${perimeter}$, so $z = ${sideZ}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
