import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 709
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 4, -9, 3]
 * - Difficulty factors: [Finding slope in standard form, parallel lines concept]
 * - Distractor patterns: [A: reciprocal, B: correct, C: sign error, D: wrong coefficient]
 * - Constraints: [Clean fraction slope, A != B so options stay distinct]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_709 = {
  metadata: {
    id: "709",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Standard-form line Ax - By = C. Slope of that line is A/B.
    // Require A != B so the slope A/B is not 1 (which would collide with its
    // reciprocal B/A) and so the -A and -B distractors stay distinct.
    const A = getRandomInt(2, 12);
    let B = getRandomInt(2, 12);
    let tries = 0;
    while (B === A && tries++ < 50) B = getRandomInt(2, 12);
    if (B === A) B = A === 12 ? 11 : A + 1;
    const C = getRandomInt(1, 20);

    // STEP 2: Build options. Correct slope is A/B. Because A != B:
    //   - reciprocal B/A != A/B (both positive, unequal ratios),
    //   - -A != -B, and neither negative equals the positive correct slope.
    const optionsData = [
      { text: `$\\frac{${A}}{${B}}$`, isCorrect: true, reason: "" },
      { text: `$\\frac{${B}}{${A}}$`, isCorrect: false, reason: "this is the reciprocal of the slope, which would be the slope of a perpendicular relationship, not a parallel one" },
      { text: `$-${A}$`, isCorrect: false, reason: "this uses only the $x$-coefficient and drops the division by the $y$-coefficient" },
      { text: `$-${B}$`, isCorrect: false, reason: "this uses only the $y$-coefficient and has the wrong sign" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `Line $r$ is defined by the equation $${A}x - ${B}y = ${C}$. Line $s$ is parallel to line $r$ in the $xy$-plane. What is the slope of line $s$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. Solve the equation of line $r$ for $y$: from $${A}x - ${B}y = ${C}$ subtract $${A}x$ to get $-${B}y = -${A}x + ${C}$, then divide by $-${B}$ to get $y = \\frac{${A}}{${B}}x - \\frac{${C}}{${B}}$. The slope of line $r$ is $\\frac{${A}}{${B}}$. Parallel lines have equal slopes, so the slope of line $s$ is also $\\frac{${A}}{${B}}$. ${incorrectOptions.map(opt => `Choice ${opt.letter} is incorrect because ${opt.reason}`).join('. ')}.`
    };
  }
};
