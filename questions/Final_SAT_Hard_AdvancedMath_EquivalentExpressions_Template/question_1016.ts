import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1016
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [cubic and quadratic polynomials]
 * - Difficulty factors: [Factoring cubic, factoring quadratic, simplifying rational expressions, domain restriction]
 * - Distractor patterns: [Canceling wrong factors, forgetting x factor, wrong remainder]
 * - Constraints: [x > 3 so we can cancel (x-3)]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_1016 = {
  metadata: {
    id: "1016",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate polynomials
    // Before: a and b could be equal, which made the answer x(x+a)/(x+a)
    // (really just x) and gave g(x) a 0x term. Redraw until they differ.
    let a = 0, b = 0;
    do {
      a = getRandomInt(2, 5);
      b = getRandomInt(1, 4);
    } while (a === b);

    // f(x) = x^3 - a^2 x = x(x-a)(x+a)
    // g(x) = x^2 + (b-a)x - ab = (x-a)(x+b)
    const gConst = -a * b;
    const gLinear = b - a;

    // Format g(x) = x^2 + (b-a)x - ab cleanly for every draw (b-a may be ±1)
    const linTerm = gLinear === 1 ? ' + x'
      : gLinear === -1 ? ' - x'
      : gLinear > 0 ? ` + ${gLinear}x`
      : ` - ${Math.abs(gLinear)}x`;
    const gPoly = `x^{2}${linTerm} - ${a * b}`;

    // STEP 2: Create options
    // Before: "1/(x+b)" was explained as canceling the x factor, which does
    // not produce it, and the explanation used markdown style line breaks.
    // Every wrong choice now comes from a real factoring slip.
    const correctAnswer = `$\\frac{x(x+${a})}{x+${b}}$`;

    const optionsData = [
      { text: correctAnswer, isCorrect: true, reason: '' },
      { text: `$\\frac{x+${a}}{x+${b}}$`, isCorrect: false, reason: `this expression leaves out the common factor $x$ of $f(x)$, factoring $x^{3} - ${a * a}x$ as if it were $(x-${a})(x+${a})$` },
      { text: `$\\frac{x(x-${a})}{x+${b}}$`, isCorrect: false, reason: `this expression results from factoring $x^{2} - ${a * a}$ as $(x-${a})^{2}$ instead of $(x-${a})(x+${a})$` },
      { text: `$\\frac{x(x-${a})}{x-${b}}$`, isCorrect: false, reason: `this expression results from factoring $g(x)$ with the signs reversed, as $(x+${a})(x-${b})$, and then canceling $x+${a}$` }
    ];

    // STEP 3: Shuffle
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 4: Question text
    const questionText = `The functions $f$ and $g$ are defined by $f(x) = x^{3} - ${a * a}x$ and $g(x) = ${gPoly}$. Which of the following expressions is equivalent to $\\frac{f(x)}{g(x)}$, for $x > ${a}$?`;

    // STEP 5: Explanation (plain sentences, inline math)
    const explanation = `Choice ${correctOption.letter} is correct. Factoring out $x$ and then using the difference of squares gives $f(x) = x(x^{2} - ${a * a}) = x(x-${a})(x+${a})$. For $g(x)$, the two numbers that multiply to $${gConst}$ and add to $${gLinear}$ are $${-a}$ and $${b}$, so $g(x) = (x-${a})(x+${b})$. Therefore $\\frac{f(x)}{g(x)} = \\frac{x(x-${a})(x+${a})}{(x-${a})(x+${b})}$. Since $x > ${a}$, the factor $x-${a}$ is not zero, so it can be canceled, which gives $\\frac{x(x+${a})}{x+${b}}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
