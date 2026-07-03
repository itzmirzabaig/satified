import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 793
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [system: y > 14 and 4x + y < 18, y: 53]
 * - Difficulty factors: [System solving with one known coordinate]
 * - Distractor patterns: [B/C/D = do not satisfy the second inequality]
 * - Constraints: [Must satisfy y > minY AND slope*x + y < intercept with y = targetY]
 * - Question type: [System -> Multiple Choice Text]
 * - Figure generation: [None]
 *
 * Rebuilt: the original question text never stated the system, so it was
 * unanswerable, and its distractors could collide. This version presents the
 * system explicitly and constructs an exact integer boundary so exactly one
 * choice satisfies both inequalities.
 */

export const generator_793 = {
  metadata: {
    id: "793",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Answer-first construction so the x-boundary is an exact integer.
    // System: y > minY  and  slope*x + y < intercept, evaluated at y = targetY.
    // Since targetY > minY always, the binding constraint is
    //   slope*x + targetY < intercept  <=>  x < (intercept - targetY)/slope.
    // Pick a negative integer boundary xBoundary and derive targetY from it so
    // that (intercept - targetY)/slope == xBoundary exactly.
    const slope = getRandomInt(2, 5);
    const intercept = getRandomInt(12, 24);
    const xBoundary = -getRandomInt(2, 6); // negative integer boundary
    const targetY = intercept - slope * xBoundary; // = intercept + slope*|xBoundary| > intercept

    // minY must be below targetY (so y > minY holds). targetY >= intercept + 2 >= 14,
    // so any minY in [8,13] is safely less than targetY.
    const minY = getRandomInt(8, 13);

    // STEP 2: Build four strictly ordered, distinct integer choices.
    // Correct choice is strictly below the boundary (satisfies x < xBoundary).
    // The three distractors are at or above the boundary (each fails the
    // second inequality). Strict ordering guarantees no duplicate options.
    const correctX = xBoundary - getRandomInt(1, 3);
    const wrongX1 = xBoundary;                       // slope*x + y == intercept -> not < intercept
    const wrongX2 = xBoundary + getRandomInt(1, 2);  // above boundary
    const wrongX3 = wrongX2 + getRandomInt(1, 3);    // further above boundary

    const optionsData = [
      { text: `$${correctX}$`, isCorrect: true },
      { text: `$${wrongX1}$`, isCorrect: false },
      { text: `$${wrongX2}$`, isCorrect: false },
      { text: `$${wrongX3}$`, isCorrect: false }
    ];

    // STEP 3: Shuffle and assign letters.
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    // STEP 4: Explanation from live values; letter from shuffled array. The
    // whole system is one math span (a cases environment) that starts with a
    // letter, so there is no bare "$<digit>" and no currency-collision risk.
    const rhs = intercept - targetY; // negative constant after subtracting targetY
    const explanation = `Choice ${correctOption.letter} is correct. The point $(x, ${targetY})$ must satisfy both inequalities. First, $y > ${minY}$ becomes $${targetY} > ${minY}$, which is true for any $x$. Second, substitute $y = ${targetY}$ into $${slope}x + y < ${intercept}$ to get $${slope}x + ${targetY} < ${intercept}$. Subtracting ${targetY} from both sides gives $${slope}x < ${rhs}$, and dividing by ${slope} gives $x < ${xBoundary}$. Among the choices, only $${correctX}$ is less than ${xBoundary}; the values ${wrongX1}, ${wrongX2}, and ${wrongX3} are all greater than or equal to ${xBoundary}, so they make $${slope}x + y$ at least ${intercept} and fail the second inequality.`;

    // STEP 5: Return question data. The system is shown as a cases environment.
    return {
      questionText: `In the $xy$-plane, the point $(x, ${targetY})$ is a solution to the system of inequalities $\\begin{cases} y > ${minY} \\\\ ${slope}x + y < ${intercept} \\end{cases}$ Which of the following could be the value of $x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$${correctX}$`,
      explanation: explanation
    };
  }
};
