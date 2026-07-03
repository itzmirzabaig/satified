import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 763
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 7, intercept: -84]
 * - Difficulty factors: [Finding x-intercept]
 * - Distractor patterns: [A = negative of correct, B = slope as intercept, C = slope value]
 * - Constraints: [Intercept must be divisible by slope for integer answer]
 * - Question type: [Text→Multiple Choice Text with coordinate answers]
 * - Figure generation: [None]
 */

export const generator_763 = {
  metadata: {
    id: "763",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Slope: 4-9 (single digit)
    const m = getRandomInt(4, 9);
    // x-intercept: a positive integer chosen so the constant term b = -m * xInt
    // is a clean negative multiple of the slope. Kept strictly greater than m
    // so the "slope value" distractor (m, 0) can never equal the correct answer.
    const xInt = getRandomInt(m + 1, 15);
    const b = -m * xInt; // constant term; x-intercept = -b/m = xInt

    // STEP 2: Build the correct answer coordinate
    const correctText = `(${xInt}, 0)`;

    // STEP 3: Create distractor coordinates with construction guards so that
    // no distractor equals the correct answer or another distractor.
    //   A = negative of the correct x-intercept  -> (-xInt, 0), always negative, distinct
    //   B = the slope treated as the intercept    -> (-m, 0),   always negative
    //   C = the slope value itself                -> (m, 0),    positive but < xInt (guaranteed above)
    // Since xInt > m: (xInt) != (m); (-xInt) != (-m) [xInt != m]; positives vs negatives never clash.
    const optionsData = [
      { text: `(${-xInt}, 0)`, isCorrect: false, reason: "results from a sign error when solving for x" },
      { text: `(${-m}, 0)`, isCorrect: false, reason: "confuses the slope with the intercept" },
      { text: `(${m}, 0)`, isCorrect: false, reason: "uses the slope value instead of solving for x" },
      { text: correctText, isCorrect: true }
    ];

    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // Sign string for the constant term in f(x) (b is always negative here).
    const signStr = b < 0 ? '-' : '+';
    const absB = Math.abs(b);

    // STEP 5: Return question data
    return {
      questionText: `The function $f$ is defined by $f(x)=${m}x ${signStr} ${absB}$. What is the $x$-intercept of the graph of $y=f(x)$ in the $xy$-plane?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. To find the $x$-intercept, set $f(x)=0$: $0=${m}x ${signStr} ${absB}$, so $${m}x=${absB}$, giving $x=${xInt}$. The $x$-intercept is $(${xInt}, 0)$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
