import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1025
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [large constants, distribution and combining]
 * - Difficulty factors: [Careful distribution, combining like terms, computing a+b]
 * - Distractor patterns: [Distribution errors, sign errors, arithmetic errors]
 * - Constraints: [Result in form ay² + b, find a+b]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1025 = {
  metadata: {
    id: "1025",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const baseC = getRandomInt(5000, 8000);
    const a = getRandomInt(50, 150);
    const n = getRandomInt(5, 15);
    const m = getRandomInt(800, 1200);

    // Calculate result
    const resultA = a + n * n;
    const resultB = baseC - n * m;
    const correctAnswer = resultA + resultB;

    // Numbers of 1,000 or more inside math get a {,} thousands separator.
    const fm = (v: number) => v.toLocaleString('en-US').replace(/,/g, '{,}');

    // STEP 2: Question text
    const questionText = `The expression $$(${fm(baseC)}+${a}y^{2})+${n}(${n}y^{2}-${fm(m)})$$ can be written in the form $ay^{2}+b$, where $a$ and $b$ are constants. What is the value of $a+b$?`;

    // STEP 3: Explanation
    // The explanation used to skip "The correct answer is", use markdown
    // bullets, print "221 + -7319", and show large numbers without commas.
    const sumText = resultB < 0 ? `${resultA}-${fm(-resultB)}` : `${resultA}+${fm(resultB)}`;
    const explanation = `The correct answer is ${correctAnswer < 0 ? `$${fm(correctAnswer)}$` : correctAnswer.toLocaleString('en-US')}. Distributing ${n} to each term inside the second pair of parentheses gives $${n}(${n}y^{2}) = ${n * n}y^{2}$ and $${n}(${fm(m)}) = ${fm(n * m)}$, so the expression is equivalent to $${fm(baseC)}+${a}y^{2}+${n * n}y^{2}-${fm(n * m)}$. Combining the $y^{2}$ terms gives $${a}y^{2}+${n * n}y^{2} = ${resultA}y^{2}$, and combining the constant terms gives $${fm(baseC)}-${fm(n * m)} = ${fm(resultB)}$. So the expression is equivalent to $${resultA}y^{2}${resultB < 0 ? '-' + fm(-resultB) : '+' + fm(resultB)}$, which means $a = ${resultA}$ and $b = ${fm(resultB)}$. Therefore, $a+b = ${sumText} = ${fm(correctAnswer)}$.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: [],
      correctAnswer: correctAnswer.toString(),
      explanation: explanation
    };
  }
};
