import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 776
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [minimum value translation]
 * - Difficulty factors: ["Minimum value" ≥ translation, phrase parsing]
 * - Distractor patterns: [≤ instead of ≥, reversed subtraction with ≤, reversed subtraction with ≥]
 * - Constraints: [x ≥ multiplier*n - subtract]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_776 = {
  metadata: {
    id: "776",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // "The minimum value of x is `subtract` less than `multiplier` times n"
    //   -> x >= multiplier*n - subtract
    const multiplier = getRandomInt(4, 10);
    const subtract = getRandomInt(5, 20);

    // STEP 2: Options, tagged by kind so the explanation can reference each
    // one's post-shuffle letter by identity (never by fixed position).
    //  correct : x >= multiplier*n - subtract
    //  wrongSign      : x <= multiplier*n - subtract  (maximum, not minimum)
    //  reversedLeq    : x <= subtract - multiplier*n  (wrong sign + reversed)
    //  reversedGeq    : x >= subtract - multiplier*n  (right sign, reversed)
    const optionsData = [
      { text: `$x \\geq ${multiplier}n - ${subtract}$`, isCorrect: true, kind: 'correct' },
      { text: `$x \\leq ${multiplier}n - ${subtract}$`, isCorrect: false, kind: 'wrongSign' },
      { text: `$x \\leq ${subtract} - ${multiplier}n$`, isCorrect: false, kind: 'reversedLeq' },
      { text: `$x \\geq ${subtract} - ${multiplier}n$`, isCorrect: false, kind: 'reversedGeq' }
    ];

    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const letterOf = (kind: string) => shuffledOptions.find(o => o.kind === kind)!.letter;

    // STEP 4: Build explanation. Numbers stay as plain text and only variables
    // sit inside $...$, so no bare currency-style "$number" can pair up.
    const explanation = `Choice ${correctOption.letter} is correct. "Minimum value of $x$" means $x$ is at least the expression, so the sign is $\\geq$ (not $\\leq$). "${subtract} less than ${multiplier} times $n$" translates to $${multiplier}n - ${subtract}$ (not $${subtract} - ${multiplier}n$). Therefore $x \\geq ${multiplier}n - ${subtract}$. Choice ${letterOf('wrongSign')} uses $\\leq$, which would describe a maximum rather than a minimum. Choice ${letterOf('reversedLeq')} both uses the wrong sign and reverses the subtraction. Choice ${letterOf('reversedGeq')} has the correct sign but reverses the subtraction.`;

    // STEP 5: Return question data
    return {
      questionText: `The minimum value of $x$ is ${subtract} less than ${multiplier} times another number $n$. Which inequality shows the possible values of $x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
