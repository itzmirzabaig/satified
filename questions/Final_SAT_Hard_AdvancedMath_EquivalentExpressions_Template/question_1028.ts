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
    // For n = 4 the middle term used to show as the unreduced 2ab/4; it is now ab/2.
    const middleBody = n === 2 ? 'ab' : n === 4 ? `\\frac{ab}{2}` : `\\frac{2ab}{${n}}`;
    const correctBody = `a^{2}+${middleBody}+\\frac{b^{2}}{${nSq}}`;
    const correctAnswer = `$${correctBody}$`;

    // STEP 2: Create options (all four are structurally distinct for every n)
    // Reasons now start with the value, and the explanation no longer uses
    // markdown bullets; it is one paragraph in the standard format.
    const optionsData = [
      {
        text: `$a^{2}+\\frac{b^{2}}{${n}}$`,
        isCorrect: false,
        reason: `$a^{2}+\\frac{b^{2}}{${n}}$ results from omitting the middle term and not squaring the denominator; $\\left(\\frac{b}{${n}}\\right)^{2} = \\frac{b^{2}}{${nSq}}$, not $\\frac{b^{2}}{${n}}$`
      },
      {
        text: `$a^{2}+\\frac{b^{2}}{${nSq}}$`,
        isCorrect: false,
        reason: `$a^{2}+\\frac{b^{2}}{${nSq}}$ results from squaring each term separately and omitting the middle term $${middleBody}$, which is twice the product of $a$ and $\\frac{b}{${n}}$`
      },
      {
        text: `$a^{2}+\\frac{ab}{${n}}+\\frac{b^{2}}{${nSq}}$`,
        isCorrect: false,
        reason: `$a^{2}+\\frac{ab}{${n}}+\\frac{b^{2}}{${nSq}}$ results from using the product $\\frac{ab}{${n}}$ as the middle term instead of twice the product`
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
    const explanation = `Choice ${correctLetter} is correct. Using the identity $(x+y)^{2} = x^{2} + 2xy + y^{2}$ with $x = a$ and $y = \\frac{b}{${n}}$ gives $\\left(a+\\frac{b}{${n}}\\right)^{2} = a^{2} + 2(a)\\left(\\frac{b}{${n}}\\right) + \\left(\\frac{b}{${n}}\\right)^{2}$. The middle term is $\\frac{2ab}{${n}}${n === 3 ? '' : ` = ${middleBody}`}$, and the last term is $\\left(\\frac{b}{${n}}\\right)^{2} = \\frac{b^{2}}{${nSq}}$. So the expression is equivalent to $${correctBody}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
