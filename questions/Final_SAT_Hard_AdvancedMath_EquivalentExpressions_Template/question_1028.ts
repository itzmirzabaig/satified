import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1028
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [binomial expansion with fraction, n in 2..4]
 * - Difficulty factors: [(a + b/n)^2 expansion, careful with middle term and fraction squared]
 * - Distractor patterns: [Missing middle term, wrong fraction square, wrong middle term coefficient]
 * - Constraints: [None]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_1028 = {
  metadata: {
    id: "1028",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const n = getRandomInt(2, 4);
    const nSq = n * n;

    // (a + b/n)^2 = a^2 + 2ab/n + b^2/n^2; for n = 2 the middle term simplifies to ab.
    const middleBody = n === 2 ? 'ab' : `\\frac{2ab}{${n}}`;
    const correctBody = `a^{2}+${middleBody}+\\frac{b^{2}}{${nSq}}`;
    const correctAnswer = `$${correctBody}$`;

    // STEP 2: Create options (all four are structurally distinct for every n)
    const optionsData = [
      {
        text: `$a^{2}+\\frac{b^{2}}{${n}}$`,
        isCorrect: false,
        reason: `it omits the middle term and does not square the denominator: $\\left(\\frac{b}{${n}}\\right)^{2} = \\frac{b^{2}}{${nSq}}$, not $\\frac{b^{2}}{${n}}$`
      },
      {
        text: `$a^{2}+\\frac{b^{2}}{${nSq}}$`,
        isCorrect: false,
        reason: `it squares each term separately and omits the middle term $\\frac{2ab}{${n}}$, which comes from twice the product of $a$ and $\\frac{b}{${n}}$`
      },
      {
        text: `$a^{2}+\\frac{ab}{${n}}+\\frac{b^{2}}{${nSq}}$`,
        isCorrect: false,
        reason: `it uses $\\frac{ab}{${n}}$ as the middle term instead of $\\frac{2ab}{${n}}$; the middle term is twice the product of the two terms being squared`
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
    const questionText = `Which of the following is equivalent to $\\left(a+\\frac{b}{${n}}\\right)^{2}$?`;

    // STEP 5: Explanation (computed from the same live variables as the options)
    const explanation = `Choice ${correctLetter} is correct. Use the formula $(x+y)^{2} = x^{2} + 2xy + y^{2}$ with $x = a$ and $y = \\frac{b}{${n}}$.

$$\\left(a+\\frac{b}{${n}}\\right)^{2} = a^{2} + 2 \\cdot a \\cdot \\frac{b}{${n}} + \\left(\\frac{b}{${n}}\\right)^{2}$$

Simplify each term:
- First term: $a^{2}$
- Middle term: $\\frac{2ab}{${n}}${n === 2 ? ' = ab' : ''}$
- Last term: $\\left(\\frac{b}{${n}}\\right)^{2} = \\frac{b^{2}}{${nSq}}$

So the expression is equivalent to $${correctBody}$.

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
