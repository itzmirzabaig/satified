import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1273
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [scale factor: 2, area ABCD: 5]
 * - Difficulty factors: [Similar parallelograms, area scales as square of linear ratio]
 * - Distractor patterns: [A: 7 (adding), B: 10 (linear scaling), C: 20 (correct), D: 25 (squaring area)]
 * - Constraints: [Clean integer answer]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1273 = {
  metadata: {
    id: "1273",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate scale factor and base area.
    // Guard so the correct answer and all three distractors are pairwise
    // distinct for the chosen draw. Known collisions across the range:
    //   correct (a*k^2) == D (a^2)  when a === k^2   (e.g. a=4,k=2; a=9,k=3)
    //   B (a*k)       == D (a^2)    when a === k     (e.g. a=k=3,4,5)
    // Distractor A (a+k) never collides. Bounded retry keeps the intended
    // four-value distractor structure intact.
    let scaleFactor = getRandomInt(2, 5);
    let baseArea = getRandomInt(3, 15);
    let tries = 0;
    while (tries++ < 50) {
      const correct = baseArea * scaleFactor * scaleFactor;
      const dA = baseArea + scaleFactor;
      const dB = baseArea * scaleFactor;
      const dD = baseArea * baseArea;
      const vals = [correct, dA, dB, dD];
      if (new Set(vals).size === 4) break;
      scaleFactor = getRandomInt(2, 5);
      baseArea = getRandomInt(3, 15);
    }

    // STEP 2: Calculate scaled area
    const scaledArea = baseArea * scaleFactor * scaleFactor;
    const areaFactor = scaleFactor * scaleFactor;

    // STEP 3: Create distractors
    const distractorA = baseArea + scaleFactor; // Adding
    const distractorB = baseArea * scaleFactor; // Linear scaling
    const distractorD = baseArea * baseArea; // Squaring the area itself

    const correctText = scaledArea.toString();

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, kind: 'add' },
      { text: distractorB.toString(), isCorrect: false, kind: 'linear' },
      { text: correctText, isCorrect: true, kind: 'correct' },
      { text: distractorD.toString(), isCorrect: false, kind: 'squareArea' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const letterOf = (kind: string) => shuffledOptions.find(o => o.kind === kind)!.letter;

    return {
      questionText: `Parallelogram $ABCD$ is similar to parallelogram $PQRS$. The length of each side of parallelogram $PQRS$ is $${scaleFactor}$ times the length of its corresponding side of parallelogram $ABCD$. The area of parallelogram $ABCD$ is $${baseArea}$ square centimeters. What is the area, in square centimeters, of parallelogram $PQRS$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. For similar figures, the ratio of areas equals the square of the ratio of corresponding side lengths. The linear scale factor is $${scaleFactor}$, so the area scale factor is $${scaleFactor}^2 = ${areaFactor}$. The area of $PQRS$ is $${baseArea} \\times ${areaFactor} = ${scaledArea}$ square centimeters. Choice ${letterOf('add')} is incorrect because it adds the scale factor to the area instead of multiplying by the squared scale factor. Choice ${letterOf('linear')} is incorrect because it uses the linear scale factor instead of the area scale factor. Choice ${letterOf('squareArea')} is incorrect because it squares the area instead of applying the scale factor.`
    };
  }
};
