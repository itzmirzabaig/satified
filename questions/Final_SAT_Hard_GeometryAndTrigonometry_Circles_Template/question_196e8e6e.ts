import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 196e8e6e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [dx: 1-3, dySquared: 48, 63, 80, 99, 102, 120, 143, 168]
 * - Difficulty factors: [Isosceles right triangle, distance formula, Pythagorean theorem]
 * - Distractor patterns: [Forgetting to square, confusing with non-right triangle]
 * - Constraints: [AC = BC = radius, right angle at C]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_196e8e6e = {
  metadata: {
    // id: "196e8e6e",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Generate offset that gives clean answer
    const dx = getRandomInt(1, 3);
    const dySquaredValues = [48, 63, 80, 99, 102, 120, 143, 168];
    const dySquared = getRandomElement(dySquaredValues);

    // For the math to work: AC = √(dx² + dy²), AB = √(2(dx² + dy²))
    const acSquared = dx * dx + dySquared;
    const abSquared = 2 * acSquared;

    // Format the answer
    let abDisplay: string;
    const ab = Math.sqrt(abSquared);
    if (Number.isInteger(ab)) {
      abDisplay = ab.toString();
    } else {
      // Factor out perfect squares
      let remaining = abSquared;
      let perfectSquare = 1;
      for (let i = 2; i * i <= remaining; i++) {
        while (remaining % (i * i) === 0) {
          perfectSquare *= i;
          remaining /= i * i;
        }
      }
      if (perfectSquare === 1) {
        abDisplay = `\\sqrt{${abSquared}}`;
      } else if (remaining === 1) {
        abDisplay = perfectSquare.toString();
      } else {
        abDisplay = `${perfectSquare}\\sqrt{${remaining}}`;
      }
    }

    // Generate distractors
    const distractorB = `${2 * dx}\\sqrt{${dySquared}}`;
    const distractorC = `${acSquared}\\sqrt{2}`;
    const distractorD = `${acSquared}\\sqrt{3}`;

    const correctText = `\\sqrt{${abSquared}}`;

    const optionsData = [
      { text: `$${correctText}$`, isCorrect: true },
      { text: `$${distractorB}$`, isCorrect: false },
      { text: `$${distractorC}$`, isCorrect: false },
      { text: `$${distractorD}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `Circle O has center $(h, k)$ and contains point $C=(h, k)$. Point $A$ lies on the circle with coordinates $(h+${dx}, k+\\sqrt{${dySquared}})$. If triangle $ABC$ is an isosceles right triangle with the right angle at $C$, what is the length of $AB$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${correctText}$`,
      explanation: `Choice ${correctOption.letter} is correct. Since $AC = BC$ (radii) and angle $C$ is $90°$, triangle $ABC$ is an isosceles right triangle. By the Pythagorean theorem, $AB = \sqrt{AC^2 + BC^2} = \sqrt{2 \cdot AC^2} = \sqrt{2(${dx}^2 + ${dySquared})} = \sqrt{${abSquared}}$.`
    };
  }
};

/**
 * Question ID: 6933b3d9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [RS = √48, ST = 14, RT = 16 (Pythagorean triple)]
 * - Difficulty factors: [Complementary angles, cofunction identity]
 * - Constraints: [cos(RSW) = sin(WST) because angles sum to 90°]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Right triangle with right angle at S]
 */
