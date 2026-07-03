import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1179
 *
 * ORIGINAL ANALYSIS:
 * - Equation: ax + ky = 6, where a and k are unknown constants (shown as letters).
 * - Two points on the line: (x1, y1) and (0, y2).
 * - Number ranges: [y2 divides 6 so k is an integer; a, x1 nonzero integers; y1 derived to lie on the line]
 * - Difficulty factors: [Recognizing that the point (0, y2) isolates k directly]
 * - Distractor patterns: [correct k; value of a; sign error (-k); a common miscalculation]
 * - Constraints: [k = 6 / y2; second point kept consistent by construction]
 * - Question type: [Text -> Multiple Choice Text]
 * - Figure generation: [None]
 *
 * Answer-first / integer-clean construction:
 *   k is fixed by y2 (y2 in {+/-1,+/-2,+/-3,+/-6}).  a and x1 are nonzero
 *   integers; y1 = (6 - a*x1)/k is forced to be an integer via a bounded retry
 *   so the second point genuinely lies on the line. The equation is displayed
 *   with LITERAL a and k (never their numeric values), so the question is not
 *   given away and no signed-coefficient glitches can appear.
 */

export const generator_1179 = {
  metadata: {
    id: "1179",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: y-intercept point (0, y2) with y2 dividing 6 => integer k.
    const validYs = [-6, -3, -2, -1, 1, 2, 3, 6];
    const y2 = getRandomElement(validYs);
    const k = 6 / y2; // integer in {-1,-2,-3,-6,6,3,2,1}

    // STEP 2: Second point (x1, y1). Choose nonzero a, x1; force y1 integer.
    let a = 0, x1 = 0, y1 = 0;
    let tries = 0;
    do {
      a = getRandomInt(-5, 5);
      x1 = getRandomInt(-5, 5);
      tries++;
      if (a === 0 || x1 === 0) continue;
      const rem = 6 - a * x1;                 // need k | rem for integer y1
      if (rem % k !== 0) continue;
      y1 = rem / k;                           // (x1, y1) lies exactly on ax + ky = 6
      // Keep y1 in a natural display window and distinct-looking from y2.
      if (y1 < -12 || y1 > 12) continue;
      break;
    } while (tries < 50);
    // Deterministic fallback guaranteeing an exact integer point if retries fail.
    if (a === 0 || x1 === 0 || (6 - a * x1) % k !== 0 || y1 < -12 || y1 > 12) {
      a = 1; x1 = 1; y1 = (6 - a * x1) / k; // k | (6-1)=5 only when k=+/-1,+/-5; ensure integer
      if (!Number.isInteger(y1)) { x1 = 6; a = 1; y1 = (6 - a * x1) / k; } // 6-6=0 divisible by any k
    }

    // STEP 3: Build 4 distinct integer options (correct = k) with a guard.
    const chosen: number[] = [k];
    const reasons: Record<number, string> = {};
    const consider = (val: number, why: string) => {
      if (chosen.length >= 4) return;
      if (!Number.isInteger(val)) return;
      if (chosen.includes(val)) return;
      chosen.push(val);
      reasons[val] = why;
    };
    consider(a, "is the value of $a$, not $k$");
    consider(-k, "comes from a sign error when solving $k\\,y_2 = 6$");
    consider(k + 1, "is a common off-by-one miscalculation");
    consider(k - 1, "results from a computational slip");
    consider(2 * k, "doubles the correct value");
    consider(-a, "is the opposite of $a$, not $k$");
    // Absolute fallbacks (kept distinct) in case the range was unlucky.
    let filler = 1;
    while (chosen.length < 4) { consider(filler, "does not satisfy the given point"); filler++; }

    const optionsData = chosen.map((val, idx) => ({
      text: `${val}`,
      isCorrect: idx === 0,
      reason: idx === 0 ? "" : reasons[val]
    }));

    // STEP 4: Shuffle and assign letters.
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const displayOptions = shuffledOptions.map(o => ({ text: `${o.letter}. ${o.text}` }));

    const y1Disp = y1;

    return {
      questionText: `The graph of the equation $ax+ky=6$ is a line in the $xy$-plane, where $a$ and $k$ are constants. If the line contains the points $(${x1}, ${y1Disp})$ and $(0, ${y2})$, what is the value of $k$?`,
      figureCode: null,
      options: displayOptions,
      correctAnswer: correctOption ? `${correctOption.letter}. ${correctOption.text}` : "",
      explanation: `Choice ${correctLetter} is correct. Substituting the point $(0, ${y2})$ into $ax+ky=6$ gives $a(0)+k(${y2})=6$, so $k(${y2})=6$ and $k=\\frac{6}{${y2}}=${k}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
