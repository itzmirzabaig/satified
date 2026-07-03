import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1270
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [surface area: 54]
 * - Difficulty factors: [Surface area to volume, cube formulas]
 * - Distractor patterns: [A: 18 (6×3), B: 27 (correct), C: 36 (6²), D: 81 (9²)]
 * - Constraints: [SA must be divisible by 6 for integer side]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1270 = {
  metadata: {
    id: "1270",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate side length. Note s = 6 is excluded because a cube of
    // side 6 has surface area (6·6² = 216) equal to its volume (6³ = 216),
    // which would make the "gave surface area instead of volume" distractor
    // collide with the correct answer. Every other side length keeps all four
    // options distinct (verified over the range).
    let side = getRandomInt(3, 8);
    let guard = 0;
    while (side === 6 && guard++ < 50) side = getRandomInt(3, 8);

    // STEP 2: Calculate surface area and volume.
    const surfaceArea = 6 * side * side; // 6s²
    const volume = side * side * side; // s³

    // STEP 3: Create pedagogically meaningful distractors.
    const distractorEdge = 6 * side; // multiplied 6 by s (linear misread)
    const distractorSurface = surfaceArea; // reported surface area instead of volume
    const distractorPower = side * side * side * side; // s⁴ (over-raised the power)

    const correctText = volume.toString();

    const optionsData = [
      { text: distractorEdge.toString(), isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distractorSurface.toString(), isCorrect: false },
      { text: distractorPower.toString(), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    // Map each distractor to its post-shuffle letter by value (all four distinct).
    const letterOf = (val: number) =>
      shuffledOptions.find(o => o.text === val.toString())!.letter;
    const letterEdge = letterOf(distractorEdge);
    const letterSurface = letterOf(distractorSurface);
    const letterPower = letterOf(distractorPower);

    return {
      questionText: `A cube has a surface area of $${surfaceArea}$ square meters. What is the volume, in cubic meters, of the cube?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The surface area of a cube is $S = 6s^2$. Setting $S = ${surfaceArea}$ gives $s^2 = ${side * side}$, so $s = ${side}$. The volume is $V = s^3 = ${volume}$ cubic meters. Choice ${letterEdge} is incorrect because it multiplies the side length by six ($s \\cdot 6$) instead of cubing it. Choice ${letterSurface} is incorrect because it reports the surface area ($S = 6s^2$) instead of the volume. Choice ${letterPower} is incorrect because it raises the side length to the fourth power ($s^4$) instead of the third.`
    };
  }
};