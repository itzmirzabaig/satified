import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1274
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [scale factor: 6, area ABCD: 54]
 * - Difficulty factors: [Similar rectangles, large scale factor makes numbers big]
 * - Distractor patterns: [A: 9 (dividing), B: 36 (just scale factor squared), C: 324 (linear scaling), D: 1944 (correct)]
 * - Constraints: [Area calculation with large numbers]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1274 = {
  metadata: {
    id: "1274",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate scale factor and base area.
    // Force baseArea to be an exact multiple of scaleFactor so the "divides
    // instead of multiplies" distractor is a clean integer, then guard that
    // all four values are pairwise distinct. The only collision across the
    // range is A (a/k) == B (k^2) when a/k lands in [16, 64]; a bounded retry
    // keeps the intended distractor structure.
    let scaleFactor = getRandomInt(4, 8);
    let baseArea = getRandomInt(5, 14) * scaleFactor; // multiple of k, spans ~20..112
    let tries = 0;
    while (tries++ < 50) {
      const correct = baseArea * scaleFactor * scaleFactor;
      const dA = baseArea / scaleFactor;   // dividing
      const dB = scaleFactor * scaleFactor; // scale factor squared only
      const dC = baseArea * scaleFactor;    // linear scaling
      if (new Set([correct, dA, dB, dC]).size === 4) break;
      scaleFactor = getRandomInt(4, 8);
      baseArea = getRandomInt(5, 14) * scaleFactor;
    }

    // STEP 2: Calculate scaled area
    const scaledArea = baseArea * scaleFactor * scaleFactor;
    const areaFactor = scaleFactor * scaleFactor;

    // STEP 3: Create distractors
    const distractorA = baseArea / scaleFactor;   // Dividing instead of multiplying
    const distractorB = scaleFactor * scaleFactor; // Just the scale factor squared
    const distractorC = baseArea * scaleFactor;    // Linear scaling

    const correctText = scaledArea.toLocaleString('en-US');

    const optionsData = [
      { text: distractorA.toLocaleString('en-US'), isCorrect: false, kind: 'divide' },
      { text: distractorB.toLocaleString('en-US'), isCorrect: false, kind: 'sfSquared' },
      { text: distractorC.toLocaleString('en-US'), isCorrect: false, kind: 'linear' },
      { text: correctText, isCorrect: true, kind: 'correct' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const letterOf = (kind: string) => shuffledOptions.find(o => o.kind === kind)!.letter;

    return {
      questionText: `Rectangles $ABCD$ and $EFGH$ are similar. The length of each side of $EFGH$ is $${scaleFactor}$ times the length of the corresponding side of $ABCD$. The area of $ABCD$ is $${baseArea}$ square units. What is the area, in square units, of $EFGH$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The area ratio is the square of the linear scale factor: $${scaleFactor}^2 = ${areaFactor}$. The area of $EFGH$ is $${baseArea} \\times ${areaFactor} = ${correctText}$ square units. Choice ${letterOf('divide')} is incorrect because it divides by the scale factor instead of multiplying by the squared scale factor. Choice ${letterOf('sfSquared')} is incorrect because it gives only the squared scale factor without multiplying by the base area. Choice ${letterOf('linear')} is incorrect because it uses the linear scale factor instead of the area scale factor.`
    };
  }
};
