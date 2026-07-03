import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 802
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1, 2, 3, 5, -3]
 * - Difficulty factors: [Substitution, solve for y]
 * - Distractor patterns: [-15, -9, 9, 15]
 * - Constraints: [Integer solution]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 *
 * REBUILD: original computed m3 with numerator/denominator swapped, so the
 * displayed second equation did not pass through the solution point and the
 * explanation's "double check" failed; it also produced repeating decimals.
 * Rebuilt answer-first: line 2 (m2*y = m3*x) passes through the origin, so
 * parameterizing the solution as (x,y) = (m2*t, m3*t) puts the point exactly
 * on it. Line 1 (y = m*x + b) is then fitted with integer m and b. Everything
 * is integer for every draw.
 */

export const generator_802 = {
  metadata: {
    id: "802",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Build a consistent integer system with a unique solution.
    //   Line 1: y = m*x + b        (b negative)
    //   Line 2: m2*y = m3*x        (through the origin)
    // Point (x,y) = (m2*t, m3*t) lies on line 2 for any t. Fit line 1 to it.
    let m = 0, b = 0, m2 = 0, m3 = 0, t = 0, xValue = 0, yValue = 0;
    let ok = false;
    let tries = 0;
    while (!ok && tries++ < 50) {
      m2 = getRandomInt(2, 5);
      m3 = getRandomInt(3, 8);
      t = getRandomInt(1, 2);
      m = getRandomInt(2, 5);

      xValue = m2 * t;
      yValue = m3 * t;
      b = yValue - m * xValue; // makes line 1 pass through (xValue, yValue)

      // Require: distinct positive x,y (m2 != m3), a genuinely negative and
      // bounded intercept, and non-parallel lines (unique solution).
      ok =
        m2 !== m3 &&
        b <= -1 && b >= -9 &&
        (m2 * m - m3) !== 0;
    }
    // Deterministic fallback (never hit in practice, keeps output valid).
    if (!ok) {
      m2 = 2; m3 = 5; t = 1; m = 3;
      xValue = 2; yValue = 5; b = yValue - m * xValue; // = -1
    }

    // Sign helpers for line 1 display: y = m x (+/-) |b|
    const bSign = b >= 0 ? '+' : '-';
    const absB = Math.abs(b);

    // STEP 2: Build question text
    const questionText = `In the solution to the system of equations below, what is the value of $y$?\n\n$$\\begin{cases} y = ${m}x ${bSign} ${absB} \\\\ ${m2}y = ${m3}x \\end{cases}$$`;

    // STEP 3: Create options. With x = m2*t, y = m3*t, m2 != m3, and both
    // positive, the four values below are always distinct.
    const optionsData = [
      { text: yValue.toString(), isCorrect: true },
      { text: (-yValue).toString(), isCorrect: false },
      { text: xValue.toString(), isCorrect: false },
      { text: (-xValue).toString(), isCorrect: false }
    ];

    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    // STEP 5: Explanation — substitute line 1 into line 2, all integer, all
    // math wrapped in balanced $...$.
    const distM = m2 * m;                 // coefficient of x from m2*(m*x)
    const constTerm = m2 * b;             // m2*b  (negative)
    const constSign = constTerm >= 0 ? '+' : '-';
    const absConst = Math.abs(constTerm);
    const xCoeff = distM - m3;            // (m2*m - m3), nonzero by guard
    const rhsForX = -constTerm;           // move constant to the right side

    const explanation = `Substitute the expression for $y$ from the first equation into the second.\n\nStart with $${m2}y = ${m3}x$ and replace $y$ with $${m}x ${bSign} ${absB}$:\n\n$${m2}(${m}x ${bSign} ${absB}) = ${m3}x$\n\nDistribute $${m2}$: $${distM}x ${constSign} ${absConst} = ${m3}x$.\n\nCollect the $x$ terms on one side: $${xCoeff}x = ${rhsForX}$, so $x = ${xValue}$.\n\nSubstitute $x = ${xValue}$ back into the first equation: $y = ${m}(${xValue}) ${bSign} ${absB} = ${yValue}$.\n\nSo the correct choice is $${correctLetter}$: $y = ${yValue}$.`;

    // STEP 6: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: yValue.toString(),
      explanation: explanation
    };
  }
};
