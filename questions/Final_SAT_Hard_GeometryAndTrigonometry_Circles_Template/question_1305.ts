import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1305
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center coordinates: double digit (-4, 19), radius: 11]
 * - Difficulty factors: [Understanding circle bounds, inequality solving]
 * - Distractor patterns: [Using diameter instead of radius, sign errors on center]
 * - Constraints: [Point must be within circle bounds]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1305 = {
  metadata: {
    id: "1305",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate center coordinates (larger numbers for difficulty)
    const h = getRandomInt(-15, 5);
    const k = getRandomInt(10, 30); // Keep y positive and larger

    // STEP 2: Generate radius (not too large)
    const r = getRandomInt(8, 20);

    // STEP 3: Calculate x-bounds of the circle: xMin <= a <= xMax
    const xMin = h - r;
    const xMax = h + r;

    // STEP 4: Correct answer — a value clearly inside the interval (never on boundary)
    const correctA = getRandomInt(xMin + 2, xMax - 2);

    // STEP 5: Distractors — all strictly OUTSIDE [xMin, xMax], all distinct.
    // Distractor A: just left of the left bound (sign/setup error).
    // Distractor C: right of the right bound (used diameter, or added instead of subtracting).
    // Distractor D: far right of the right bound.
    // Build with a bounded retry so no two options (and not the correct value) collide.
    let distractorA = 0, distractorC = 0, distractorD = 0;
    let tries = 0;
    do {
      distractorA = xMin - getRandomInt(1, 4);
      distractorC = xMax + getRandomInt(2, 8);
      distractorD = xMax + getRandomInt(9, 18);
      tries++;
    } while (
      tries < 50 &&
      new Set([correctA, distractorA, distractorC, distractorD]).size !== 4
    );

    const correctText = correctA.toString();

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distractorC.toString(), isCorrect: false },
      { text: distractorD.toString(), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // Map each shuffled distractor string back to WHY it is wrong, so the
    // explanation letters always match the shuffled order.
    const reasonFor = (text: string): string => {
      const v = parseInt(text, 10);
      if (v < xMin) return `$a = ${v}$ is less than ${xMin}, so it lies to the left of the circle`;
      return `$a = ${v}$ is greater than ${xMax}, so it lies to the right of the circle`;
    };

    return {
      questionText: `$$(x${h >= 0 ? '-' : '+'}${Math.abs(h)})^{2}+(y-${k})^{2}=${r * r}$$\nThe graph of the given equation is a circle in the $xy$-plane. The point $(a, b)$ lies on the circle. Which of the following is a possible value for $a$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The circle has center $(${h}, ${k})$ and radius ${r}. Every point on the circle has an $x$-coordinate $a$ satisfying $a \\geq h - r$ and $a \\leq h + r$; with these values that means $a$ ranges from ${xMin} to ${xMax}. The value ${correctA} falls within this interval, so it is a possible value for $a$. Choice ${incorrectOptions[0].letter} is incorrect because ${reasonFor(incorrectOptions[0].text)}. Choice ${incorrectOptions[1].letter} is incorrect because ${reasonFor(incorrectOptions[1].text)}. Choice ${incorrectOptions[2].letter} is incorrect because ${reasonFor(incorrectOptions[2].text)}.`
    };
  }
};
