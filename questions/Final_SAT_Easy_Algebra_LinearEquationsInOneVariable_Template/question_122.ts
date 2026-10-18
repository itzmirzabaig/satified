import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 122
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff1: 10-25, coeff2: 11-35, const1: 10-40]
* - Difficulty factors: [Variables on both sides]
* - Distractor patterns: [sign error, reciprocal of the solution, dividing the
*   constant by coeff2 without combining the x terms]
* - Constraints: [Clean integer result; redraw if two choices coincide]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*
* FIX NOTES:
* Two choices were the fixed fractions 3/10 and 1/3 on every draw, labeled
* "wrong fraction", unrelated to the equation shown. They are now the
* reciprocal of the solution and the constant divided by coeff2, and the
* explanation is typeset.
*/

export const generator_122 = {
  metadata: {
    id: "122",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
    // a/b in lowest terms, typeset as a fraction unless it is an integer
    const frac = (a: number, b: number) => { const g = gcd(a, b); return b / g === 1 ? `${a / g}` : `$\\frac{${a / g}}{${b / g}}$`; };

    // Redraw until dividing by coeff2 gives a value different from 1/result
    let coeff1 = 10, coeff2 = 11, diff = 1, finalResult = 2, adjustedConst1 = 2;
    do {
      coeff1 = getRandomInt(10, 25);
      coeff2 = getRandomInt(coeff1 + 2, coeff1 + 10); // diff >= 2 avoids "1x" and dividing by 1
      diff = coeff2 - coeff1;
      finalResult = getRandomInt(2, 6);
      adjustedConst1 = diff * finalResult;
    } while (adjustedConst1 * finalResult === coeff2);

    const optionsData = [
      { text: (-finalResult).toString(), isCorrect: false, reason: `it results from a sign error that gives $-${diff}x = ${adjustedConst1}$ instead of $${diff}x = ${adjustedConst1}$` },
      { text: frac(diff, adjustedConst1), isCorrect: false, reason: `it results from dividing ${diff} by ${adjustedConst1} instead of dividing ${adjustedConst1} by ${diff}` },
      { text: frac(adjustedConst1, coeff2), isCorrect: false, reason: `it results from dividing ${adjustedConst1} by ${coeff2} without first subtracting $${coeff1}x$ from both sides` },
      { text: finalResult.toString(), isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What value of $x$ is the solution to the equation $${coeff1}x + ${adjustedConst1} = ${coeff2}x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: finalResult.toString(),
      explanation: `Choice ${correctLetter} is correct. Subtracting $${coeff1}x$ from both sides of the given equation yields $${adjustedConst1} = ${diff}x$. Dividing both sides of this equation by ${diff} yields $x = ${finalResult}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
