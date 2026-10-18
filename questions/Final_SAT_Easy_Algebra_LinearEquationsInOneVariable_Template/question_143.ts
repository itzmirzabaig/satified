import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 143
*
* ORIGINAL ANALYSIS:
* - Number ranges: [d1: 1-3, factor: 2-3]
* - Difficulty factors: [Fraction arithmetic, common denominators]
* - Distractor patterns: [subtracting in the wrong order, the combined
*   coefficient (1/x), subtracting the denominators]
* - Constraints: [Clean integer result; d1 >= 2]
*
* FIX NOTES:
* One choice was 1/3 on every draw ("wrong operation"), the others were -x and
* 2x labeled "negative value error" and "calculation error", and d1 could be
* 1, printing "1/1 x" in the stem. Each distractor now comes from a real error.
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_143 = {
  metadata: {
    id: "143",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // d1 = (f - 1)m and d2 = f * d1, so x = d2 / (f - 1) = f * m is an integer.
    // Redraw if d1 = 1, which would print "1/1 x".
    let f = 2, m = 2, d1 = 2;
    do {
      f = getRandomInt(1, 3) + 1;
      m = getRandomInt(1, 4);
      d1 = (f - 1) * m;
    } while (d1 === 1);
    const d2 = d1 * f;
    const xValue = f * m;
    // Distinct: -x < 0 < 1/x < 1 <= d2 - d1 = m(f - 1)^2, and m(f - 1)^2 = fm
    // has no solution in integers, so d2 - d1 never equals x.
    const optionsData = [
      { text: (-xValue).toString(), isCorrect: false, reason: `it results from subtracting $\\frac{1}{${d1}}x$ from $\\frac{1}{${d2}}x$ instead of subtracting $\\frac{1}{${d2}}x$ from $\\frac{1}{${d1}}x$` },
      { text: `$\\frac{1}{${xValue}}$`, isCorrect: false, reason: `it is equal to the coefficient of $x$ after the fractions are combined, $\\frac{${f - 1}}{${d2}}$, not the value of $x$` },
      { text: xValue.toString(), isCorrect: true, reason: '' },
      { text: (d2 - d1).toString(), isCorrect: false, reason: `it results from subtracting the denominators, $${d2} - ${d1}$, instead of subtracting the fractions` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `If $\\frac{1}{${d1}}x - \\frac{1}{${d2}}x = 1$, what is the value of $x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: xValue.toString(),
      explanation: `Choice ${correctLetter} is correct. The least common denominator of the fractions is ${d2}, and $\\frac{1}{${d1}} = \\frac{${f}}{${d2}}$. So the equation can be rewritten as $\\frac{${f}}{${d2}}x - \\frac{1}{${d2}}x = 1$, or $\\frac{${f - 1}}{${d2}}x = 1$. ${f - 1 === 1 ? `Multiplying both sides by ${d2}` : `Multiplying both sides by the reciprocal $\\frac{${d2}}{${f - 1}}$`} yields $x = ${xValue}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
