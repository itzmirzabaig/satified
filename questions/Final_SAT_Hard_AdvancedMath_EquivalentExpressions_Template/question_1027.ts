import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1027
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fractional coefficients, difference of squares pattern]
 * - Difficulty factors: [Recognizing difference of squares pattern, solving for k]
 * - Distractor patterns: [Using c as k, forgetting the square root, ignoring the 1/n factor]
 * - Constraints: [k must be positive; parameters chosen answer-first so all four
 *   options are distinct for every draw: integer branch uses c = 4n (k = 2n),
 *   radical branch uses (n, c) pairs with nc square-free]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_1027 = {
  metadata: {
    id: "1027",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Choose parameters answer-first.
    // Identity: (1/n)x^2 - c = (1/n)(x - k)(x + k) requires k^2/n = c, so k = sqrt(nc).
    // Branch A (integer k): c = 4n gives k = sqrt(4n^2) = 2n. (n = 4 excluded so the
    //   sqrt(c) distractor is never sqrt of a perfect square.)
    // Branch B (irrational k): (n, c) pairs with nc square-free, so k = sqrt(nc)
    //   never simplifies and never collides with the numeric options.
    let n: number;
    let c: number;
    if (getRandomInt(0, 1) === 0) {
      n = getRandomElement([2, 3, 5]);
      c = 4 * n;
    } else {
      const pair = getRandomElement([[2, 3], [2, 5], [3, 2], [3, 5], [5, 2], [5, 3], [5, 6]]);
      n = pair[0];
      c = pair[1];
    }

    const kSquared = n * c;
    const root = Math.sqrt(kSquared);
    const kIsInteger = Number.isInteger(root);
    const kDisplay = kIsInteger ? `${root}` : `\\sqrt{${kSquared}}`;
    const correctAnswer = `$${kDisplay}$`;

    // STEP 2: Options. Distinct for every draw by construction:
    // c != k (branch A: k = 2n, c = 4n; branch B: k irrational),
    // nc != c and nc != k, and sqrt(c) != sqrt(nc) since n >= 2.
    const optionsData = [
      {
        text: `$${c}$`,
        isCorrect: false,
        reason: `it uses the constant term ${c} directly as $k$; substituting $k = ${c}$ would give a constant term of $\\frac{${c}^{2}}{${n}} = \\frac{${c * c}}{${n}}$, not ${c}`
      },
      {
        text: `$${kSquared}$`,
        isCorrect: false,
        reason: `it is the value of $k^{2}$, not $k$; forgetting to take the square root of ${kSquared} leads to this answer`
      },
      {
        text: `$\\sqrt{${c}}$`,
        isCorrect: false,
        reason: `it comes from solving $k^{2} = ${c}$, which ignores the factor $\\frac{1}{${n}}$; the constant term would then be $\\frac{${c}}{${n}}$, not ${c}`
      },
      { text: correctAnswer, isCorrect: true, reason: '' }
    ];

    // STEP 3: Shuffle (choice letters are only known after shuffling)
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(opt => opt.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 4: Question text
    const questionText = `The expression $\\frac{1}{${n}}x^{2}-${c}$ can be rewritten as $\\frac{1}{${n}}(x-k)(x+k)$, where $k$ is a positive constant. What is the value of $k$?`;

    // STEP 5: Explanation (every number recomputed from the live variables)
    const explanation = `Choice ${correctLetter} is correct. Expand the rewritten form:
$$\\frac{1}{${n}}(x-k)(x+k) = \\frac{1}{${n}}(x^{2} - k^{2}) = \\frac{1}{${n}}x^{2} - \\frac{k^{2}}{${n}}$$

For this to equal $\\frac{1}{${n}}x^{2} - ${c}$, the constant terms must match:
$$\\frac{k^{2}}{${n}} = ${c}$$

Solve for $k$:
$$k^{2} = ${c} \\cdot ${n} = ${kSquared}$$

Since $k$ is positive, $k = ${kDisplay}$.

Choice ${incorrectOptions[0].letter} is incorrect because ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect because ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect because ${incorrectOptions[2].reason}.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
