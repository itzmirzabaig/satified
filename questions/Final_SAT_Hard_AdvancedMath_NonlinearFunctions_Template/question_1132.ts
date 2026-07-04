import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1132
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = ax^2 + bx + c through (r1,0) and (r2,0); a > 1 integer]
 * - Difficulty factors: [Factored form from roots, a+b+c = f(1) evaluation]
 * - Distractor patterns: [sign dropped, used a=1, dropped sign + a=1]
 * - Constraints: [a + b + c = f(1) = a(1-r1)(1-r2)]
 * - Question type: [Text->Multiple Choice Text]
 * - Figure generation: [None]
 *
 * MATH: roots r1 (in [4,10]) and r2 (in [-5,-1]) give f(x) = a(x-r1)(x-r2).
 * a + b + c = f(1) = a(1-r1)(1-r2) = a*P with P = (1-r1)(1-r2) <= -6, so f(1) < 0.
 * Because a may be any integer > 1, the valid answers are exactly the negative
 * multiples a'*P (a' >= 2); each distractor is a common error that is provably NOT
 * such a value, so the item stays uniquely answerable for every draw.
 */

export const generator_1132 = {
  metadata: {
    id: "1132",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const r1 = getRandomInt(4, 10);           // positive root
    const r2 = -getRandomInt(1, 5);           // negative root
    const a = getRandomInt(2, 4);             // leading coefficient, an integer > 1

    // a + b + c = f(1) = a(1 - r1)(1 - r2) = a * P, where P = (1-r1)(1-r2).
    // For these ranges 1-r1 <= -3 and 1-r2 >= 2, so P <= -6 (always negative).
    const P = (1 - r1) * (1 - r2);
    const absP = Math.abs(P);
    const correct = a * P;                     // = -a * absP  (negative)

    // The stem asks which value "could be" a+b+c, and a is ANY integer > 1.
    // So every negative multiple a'*P with integer a' >= 2 is a valid answer.
    // Each distractor below is a distinct common error that is provably NOT
    // such a valid value, so exactly one option can be a+b+c for any draw:
    //  - A = |a*P|  : computed f(1) but dropped the sign  (positive => not valid)
    //  - B = |P|    : dropped the sign and used a = 1      (positive => not valid)
    //  - C =  P     : forgot a > 1 and used a = 1 (= 1*P, needs a=1 => not valid)
    // A and B are positive (never equal a'*P < 0); C = 1*P is excluded because a
    // must exceed 1. All four values are mutually distinct for every draw in range.
    const distractorSignDropped = a * absP;    // A
    const distractorAbsUnit = absP;            // B
    const distractorUsedAOne = P;              // C

    const values: number[] = [
      correct,
      distractorSignDropped,
      distractorAbsUnit,
      distractorUsedAOne
    ];

    const correctText = `$${correct}$`;
    const optionsData = values.map((v, i) => ({
      text: `$${v}$`,
      isCorrect: i === 0
    }));

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    // Signed factor strings so they read cleanly, e.g. (x-7)(x+3).
    const factor1 = `(x-${r1})`;
    const factor2 = r2 < 0 ? `(x+${Math.abs(r2)})` : `(x-${r2})`;
    const val1 = 1 - r1;                       // negative
    const val2 = 1 - r2;                       // positive
    const eval1 = `(1-${r1})`;
    const eval2 = r2 < 0 ? `(1+${Math.abs(r2)})` : `(1-${r2})`;

    return {
      questionText: `The function $f(x)=ax^2+bx+c$ has zeros at $x=${r1}$ and $x=${r2}$, where $a$ is an integer with $a>1$. Which of the following could be the value of $a+b+c$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Because the zeros are $x=${r1}$ and $x=${r2}$, $f(x)=a${factor1}${factor2}$. Then $a+b+c=f(1)=a${eval1}${eval2}=a(${val1})(${val2})$. Substituting $a=${a}$ gives $f(1)=${a}(${val1})(${val2})=${correct}$, which matches the correct choice. Because $a$ can be any integer greater than $1$, a possible value must be a negative multiple of $(${val1})(${val2})=${P}$, and $${correct}$ is the only option of that form. The positive options come from dropping the sign of $f(1)$, and $${P}$ mistakenly uses $a=1$, which is not permitted, so none of them can equal $a+b+c$.`
    };
  }
};
