import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: df0ef054
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2-5, constant: -5 to -2]
 * - Difficulty factors: [Polynomial multiplication, FOIL method]
 * - Distractor patterns: [A: wrong sign on middle term, B: wrong sign on last term, C: adds instead of multiplies, D: correct]
 */

export const generator_df0ef054 = {
  metadata: {
    // id: "df0ef054",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(2, 5);
    const b = getRandomInt(2, 5);
    const d = getRandomInt(-5, -2);

    const coeff6 = a;
    const coeff4 = (a * d) + b;
    const coeff2 = b * d;
    const dSign = d >= 0 ? "+" : "-";
    const dAbs = Math.abs(d);
    const c4Sign = coeff4 >= 0 ? "+" : "-";
    const c4Abs = Math.abs(coeff4);
    const c2Sign = coeff2 >= 0 ? "+" : "-";
    const c2Abs = Math.abs(coeff2);

    const correctAnswer = `${coeff6}x^6 ${c4Sign} ${c4Abs}x^4 ${c2Sign} ${c2Abs}x^2`.replace(/\+ /g, '').replace(/\- /g, '-');

    // Distractor: wrong sign on middle term
    const wrongMiddleSign = `${coeff6}x^6 ${coeff4 >= 0 ? "-" : "+"} ${c4Abs}x^4 ${c2Sign} ${c2Abs}x^2`.replace(/\+ /g, '').replace(/\- /g, '-');
    
    // Distractor: wrong sign on last term
    const wrongLastSign = `${coeff6}x^6 ${c4Sign} ${c4Abs}x^4 ${coeff2 >= 0 ? "-" : "+"} ${c2Abs}x^2`.replace(/\+ /g, '').replace(/\- /g, '-');
    
    // Distractor: adds instead of multiplies for outer/inner
    const wrongAdd = `${coeff6}x^6 ${(a + d + b) >= 0 ? "+" : "-"} ${Math.abs(a + d + b)}x^4 ${c2Sign} ${c2Abs}x^2`.replace(/\+ /g, '').replace(/\- /g, '-');

    const optionsData = [
      { text: `$${wrongMiddleSign}$`, isCorrect: false },
      { text: `$${wrongLastSign}$`, isCorrect: false },
      { text: `$${wrongAdd}$`, isCorrect: false },
      { text: `$${correctAnswer}$`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `$$(${a}x^{3} + ${b}x)(x^{3} ${dSign} ${dAbs}x)$$

Which of the following is equivalent to the expression above?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${correctAnswer}$`,
      explanation: `Choice ${correctOption.letter} is correct. To multiply the polynomials, distribute each term of the first polynomial to every term of the second (FOIL):

1. **First:** $${a}x^3 \\cdot x^3 = ${coeff6}x^6$
2. **Outer:** $${a}x^3 \\cdot (${dSign}${dAbs}x) = ${a * d}x^4$
3. **Inner:** $${b}x \\cdot x^3 = ${b}x^4$
4. **Last:** $${b}x \\cdot (${dSign}${dAbs}x) = ${coeff2}x^2$

Combine the $x^4$ terms: $(${a * d} + ${b})x^4 = ${coeff4}x^4$.

The resulting expression is $${coeff6}x^6 ${c4Sign} ${c4Abs}x^4 ${c2Sign} ${c2Abs}x^2$.`
    };
  }
};