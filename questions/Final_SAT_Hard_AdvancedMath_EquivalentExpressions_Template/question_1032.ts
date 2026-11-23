import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1032
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [nested radicals]
 * - Difficulty factors: [Nested radical simplification, exponent rules with multiple operations]
 * - Distractor patterns: [Wrong interpretation of nesting, wrong exponent addition, wrong final form]
 * - Constraints: [Interpretation of sqrt((a+c)³ * sqrt(a+c)) vs sqrt((a+c)³) * sqrt(a+c)]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_1032 = {
  metadata: {
    id: "1032",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // This question used to be identical on every draw (always a and c, always
    // the answer a^2 + 2ac + c^2), with reasons that did not start with the
    // value. The variable names and the power now vary:
    //   sqrt(u^(2P-1)) * sqrt(u) = u^((2P-1)/2 + 1/2) = u^P, where u = a + c, P = 2 or 3.
    const [a, c] = getRandomElement([['a', 'c'], ['x', 'y'], ['m', 'n'], ['p', 'q'], ['r', 's']]);
    const P = getRandomInt(2, 3);
    const r = 2 * P - 1;
    const u = `${a}+${c}`;

    const sq = `${a}^{2}+2${a}${c}+${c}^{2}`;
    const cube = `${a}^{3}+3${a}^{2}${c}+3${a}${c}^{2}+${c}^{3}`;

    type Opt = { text: string; isCorrect: boolean; reason: string };
    let optionsData: Opt[];
    if (P === 2) {
      optionsData = [
        { text: `$${sq}$`, isCorrect: true, reason: '' },
        { text: `$${u}$`, isCorrect: false, reason: `$${u}$ results from subtracting the exponents $\\frac{3}{2}$ and $\\frac{1}{2}$ instead of adding them, which gives an exponent of 1` },
        { text: `$${a}^{2}+${c}^{2}$`, isCorrect: false, reason: `$${a}^{2}+${c}^{2}$ results from squaring each term of $${u}$ separately and leaving out the middle term $2${a}${c}$` },
        { text: `$${a}^{2}${c}^{2}$`, isCorrect: false, reason: `$${a}^{2}${c}^{2}$ is equivalent to $(${a}${c})^{2}$, which treats the sum $${u}$ as if it were the product $${a}${c}$` }
      ];
    } else {
      optionsData = [
        { text: `$${cube}$`, isCorrect: true, reason: '' },
        { text: `$${sq}$`, isCorrect: false, reason: `$${sq}$ is $(${u})^{2}$, which results from subtracting the exponents $\\frac{5}{2}$ and $\\frac{1}{2}$ instead of adding them` },
        { text: `$${a}^{3}+${c}^{3}$`, isCorrect: false, reason: `$${a}^{3}+${c}^{3}$ results from cubing each term of $${u}$ separately and leaving out the middle terms $3${a}^{2}${c}$ and $3${a}${c}^{2}$` },
        { text: `$${a}^{3}${c}^{3}$`, isCorrect: false, reason: `$${a}^{3}${c}^{3}$ is equivalent to $(${a}${c})^{3}$, which treats the sum $${u}$ as if it were the product $${a}${c}$` }
      ];
    }

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // The expression is the PRODUCT of two separate radicals (not one nested radical),
    // so it simplifies exactly to (a+c)^P for all positive a, c.
    const questionText = `If $${a}$ and $${c}$ are positive numbers, which of the following is equivalent to $\\sqrt{(${u})^{${r}}}\\cdot\\sqrt{${u}}$?`;

    const expandText = P === 2
      ? `Expanding gives $(${u})^{2} = ${sq}$.`
      : `Since $(${u})^{2} = ${sq}$, expanding gives $(${u})^{3} = (${u})(${sq}) = ${cube}$.`;

    const explanation = `Choice ${correctOption.letter} is correct. Rewriting each radical with a rational exponent gives $\\sqrt{(${u})^{${r}}} = (${u})^{\\frac{${r}}{2}}$ and $\\sqrt{${u}} = (${u})^{\\frac{1}{2}}$. Multiplying powers with the same base means adding the exponents, so the product is $(${u})^{\\frac{${r}}{2}+\\frac{1}{2}} = (${u})^{${P}}$. ${expandText} ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
