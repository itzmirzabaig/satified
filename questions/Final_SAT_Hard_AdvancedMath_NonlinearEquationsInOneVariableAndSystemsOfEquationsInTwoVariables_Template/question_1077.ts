import { getRandomInt, isPerfectSquare } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1077
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [quadratic: 2x²-8x-7=0, discriminant gives 120]
 * - Difficulty factors: [Quadratic formula, simplifying radical, identifying k in form with radical]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Must simplify to form (8±√k)/4]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1077 = {
  metadata: {
    id: "1077",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty.
    // Original: 2x² - 8x - 7 = 0, one solution (8-√120)/4.
    // Pattern: ax² + bx + c = 0 whose solutions are (-b ± √D)/(2a), D = b² - 4ac.
    // The stem shows one solution as (-b - √k)/(2a), so k MUST equal the
    // discriminant of the equation that is actually displayed: k = b² - 4a·c.
    //
    // ROOT-CAUSE FIX: choose integer coefficients directly (no rounding), then
    // derive k from the exact displayed equation. Guard that k > 0 and is not a
    // perfect square, so the radical form is genuine (√k does not collapse to an
    // integer) — matching the original's unsimplified (8-√120)/4 style.

    const a = getRandomInt(2, 5);
    const b = -2 * getRandomInt(3, 8); // Even, negative → clean "(-b - √k)/(2a)".

    // Pick c (a live integer) so that k = b² - 4ac is positive and non-square.
    let c = 0;
    let kValue = 0;
    let tries = 0;
    do {
      c = -getRandomInt(3, 30); // Negative c keeps discriminant large & positive.
      kValue = b * b - 4 * a * c; // Exact discriminant of the DISPLAYED equation.
      tries++;
    } while ((kValue <= 0 || isPerfectSquare(kValue)) && tries < 50);

    // Fallback guarantees a valid, non-square discriminant if the loop is unlucky.
    if (kValue <= 0 || isPerfectSquare(kValue)) {
      c = -7;
      kValue = b * b - 4 * a * c;
    }

    // STEP 2: The answer is k, the value under the radical in the displayed form.
    // STEP 3: No figure needed.
    const figureCode = null;

    return {
      questionText: `One solution to the given equation can be written as $\\frac{${-b}-\\sqrt{k}}{${2 * a}}$, where $k$ is a constant. What is the value of $k$?\n\n$${a}x^2 ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c} = 0$`,
      figureCode: figureCode,
      options: [],
      correctAnswer: kValue.toString(),
      explanation: `The correct answer is $${kValue}$. Using the quadratic formula on $${a}x^2 ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c}=0$: $x=\\frac{${-b}\\pm\\sqrt{(${b})^2-4(${a})(${c})}}{2(${a})}=\\frac{${-b}\\pm\\sqrt{${kValue}}}{${2 * a}}$. Comparing $\\frac{${-b}-\\sqrt{${kValue}}}{${2 * a}}$ to $\\frac{${-b}-\\sqrt{k}}{${2 * a}}$, we get $k=${kValue}$.`
    };
  }
};
