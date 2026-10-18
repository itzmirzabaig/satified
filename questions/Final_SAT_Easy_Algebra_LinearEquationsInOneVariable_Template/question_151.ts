import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 151
*
* ORIGINAL ANALYSIS:
* - Number ranges: [b: 3-4, w: -20 to -5, c: 3-8]
* - Difficulty factors: [Distributing, collecting like terms]
* - Distractor patterns: [dividing by the opposite coefficient (-w), value of
*   (1 - b)w, distributing b to w only (w + c)]
* - Constraints: [Integer result; left constant never 0]
*
* FIX NOTES:
* The wrong choices were the fixed numbers 5, 0 and -30 on every draw, with
* reasons like "incorrectly assumes w=0", and the left constant could be 0
* ("w - 0"). Each distractor now comes from a real error in this equation.
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_151 = {
  metadata: {
    id: "151",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Equation: w - a = b(w + c), so (1 - b)w = bc + a. b is 3 or 4 so that the
    // "forgot to divide" value (1 - b)w differs from -w; redraw if a = 0, which
    // would print "w - 0".
    let b = 3, w = -10, c = 5, a = 0;
    do {
      b = getRandomInt(3, 4);
      w = getRandomInt(-20, -5);
      c = getRandomInt(3, 8);
      a = w - b * (w + c);
    } while (a === 0);
    const aStr = a > 0 ? ` - ${a}` : ` + ${Math.abs(a)}`;
    const rhs = b * c + a;
    const coeff = 1 - b;

    // Distinct: w < 0 < -w < rhs = (b - 1)|w|; distributing b to w only gives
    // (c + a) / (1 - b) = w + c, which is at most 3, so it is below -w and rhs
    // and differs from w since c >= 3.
    const optionsData = [
      { text: (-w).toString(), isCorrect: false, reason: `it results from dividing ${rhs} by ${-coeff} instead of by ${coeff}` },
      { text: (w + c).toString(), isCorrect: false, reason: `it results from multiplying only $w$ by ${b} when distributing, which gives $w${aStr} = ${b}w + ${c}$` },
      { text: rhs.toString(), isCorrect: false, reason: `it is the value of $${coeff}w$, not the value of $w$` },
      { text: w.toString(), isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `For what value of $w$ does $w${aStr} = ${b}(w + ${c})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: w.toString(),
      explanation: `Choice ${correctLetter} is correct. Distributing ${b} on the right side of the given equation yields $w${aStr} = ${b}w + ${b * c}$. Subtracting $${b}w$ from both sides and ${a > 0 ? `adding ${a} to` : `subtracting ${-a} from`} both sides yields $${coeff}w = ${rhs}$. Dividing both sides of this equation by ${coeff} yields $w = ${w}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
