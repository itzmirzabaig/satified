import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1295
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: double digit (20, 16), constant: -20]
 * - Difficulty factors: [Completing the square with larger numbers]
 * - Distractor patterns: [Sign errors on center, using raw coefficients]
 * - Constraints: [Must complete square correctly]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1295 = {
  metadata: {
    id: "1295",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate center coordinates (both negative for variety).
    // Let a = -h and b = -k, so a, b are in [5, 15] and positive.
    const a = getRandomInt(5, 15);
    const b = getRandomInt(5, 15);
    const h = -a; // center x, negative
    const k = -b; // center y, negative

    // STEP 2: Generate radius.
    const r = getRandomInt(5, 15);

    // STEP 3: Build the general form x^2 + Bx + y^2 + Cy = rightSide.
    // From (x - h)^2 + (y - k)^2 = r^2:
    //   x^2 - 2hx + h^2 + y^2 - 2ky + k^2 = r^2
    //   x^2 + (-2h)x + y^2 + (-2k)y = r^2 - h^2 - k^2
    const B = -2 * h; // coefficient of x = 2a (positive, in [10, 30])
    const C = -2 * k; // coefficient of y = 2b (positive, in [10, 30])
    const rightSide = r * r - h * h - k * k;

    const correctText = `(${h}, ${k})`; // (-a, -b)

    // STEP 4: Build distractors from common completing-the-square errors.
    // Each is distinct from the correct answer and from the others for all
    // a, b >= 5 (proof: any two of (+-a,+-b),(+-2a,+-2b) coincide only if a=0).
    //  - Sign error: negates the center -> (a, b).
    //  - Raw coefficients, correct sign: (-B, -C) = (2h, 2k) = (-2a, -2b).
    //  - Raw coefficients, wrong sign: (B, C) = (-2h, -2k) = (2a, 2b).
    const distractorSign = { text: `(${-h}, ${-k})`, isCorrect: false,
      reason: `this negates the center; after completing the square the center is $(h, k)$ with $h=-\\frac{B}{2}$ and $k=-\\frac{C}{2}$, not $\\left(\\frac{B}{2}, \\frac{C}{2}\\right)$` };
    const distractorRaw = { text: `(${-B}, ${-C})`, isCorrect: false,
      reason: `this uses the coefficients ${B} and ${C} without halving them` };
    const distractorRawSign = { text: `(${B}, ${C})`, isCorrect: false,
      reason: `this uses the raw coefficients without halving and with the wrong sign` };

    const optionsData = [
      { text: correctText, isCorrect: true, reason: '' },
      distractorSign,
      distractorRaw,
      distractorRawSign
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // Factored form uses (x - h) with h negative -> (x + a).
    const xHalf = B / 2; // = a
    const yHalf = C / 2; // = b

    const distractorExplanations = incorrectOptions
      .map(o => `Choice ${o.letter} is incorrect; ${o.reason}.`)
      .join(' ');

    return {
      questionText: `The equation $x^2+${B}x+y^2+${C}y=${rightSide}$ defines a circle in the $xy$-plane. What are the coordinates of the center of the circle?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Rewrite the equation in standard form $(x-h)^2+(y-k)^2=r^2$ by completing the square. For $x$, take half of ${B} to get ${xHalf} and square it to get ${xHalf * xHalf}. For $y$, take half of ${C} to get ${yHalf} and square it to get ${yHalf * yHalf}. Adding these to both sides gives $(x+${a})^2+(y+${b})^2=${r * r}$. Comparing with $(x-h)^2+(y-k)^2=r^2$, the center is $(h, k)=(${h}, ${k})$. ${distractorExplanations}`
    };
  }
};
