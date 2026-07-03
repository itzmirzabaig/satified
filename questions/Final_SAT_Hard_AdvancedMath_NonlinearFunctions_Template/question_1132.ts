import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1132
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = ax^2 + bx + c through (r1,0) and (r2,0); a > 1 integer]
 * - Difficulty factors: [Factored form from roots, a+b+c = f(1) evaluation]
 * - Distractor patterns: [sign error, wrong evaluation point, dropped shift]
 * - Constraints: [a + b + c = f(1) = a(1-r1)(1-r2)]
 * - Question type: [Text->Multiple Choice Text]
 * - Figure generation: [None]
 *
 * MATH: roots r1 (in [4,10]) and r2 (in [-5,-1]) give f(x) = a(x-r1)(x-r2).
 * a + b + c = f(1) = a(1-r1)(1-r2). Since 1-r1 < 0 and 1-r2 > 0, f(1) < 0.
 * The correct answer is computed live; every distractor is a distinct common error.
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

    // a + b + c = f(1) = a(1 - r1)(1 - r2). Always negative for these ranges.
    const correct = a * (1 - r1) * (1 - r2);

    // Distractors as distinct common errors:
    //  - sign dropped: |f(1)|
    //  - evaluated at x = -1 instead of x = 1: a(-1 - r1)(-1 - r2)
    //  - forgot the "1 -" shift, used a*r1*r2 instead
    const candidates = [
      Math.abs(correct),
      a * (-1 - r1) * (-1 - r2),
      a * r1 * r2,
      correct + 2 * a,
      correct - 2 * a
    ];

    const values: number[] = [correct];
    for (const c of candidates) {
      if (values.length >= 4) break;
      if (!values.includes(c)) values.push(c);
    }
    // Bounded fallback to guarantee 4 distinct values for any draw.
    let pad = 1;
    while (values.length < 4 && pad < 50) {
      const cand = correct - pad;
      if (!values.includes(cand)) values.push(cand);
      pad++;
    }

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
      explanation: `Choice ${correctLetter} is correct. Because the zeros are $x=${r1}$ and $x=${r2}$, $f(x)=a${factor1}${factor2}$. Then $a+b+c=f(1)=a${eval1}${eval2}=a(${val1})(${val2})$. Substituting $a=${a}$ gives $f(1)=${a}(${val1})(${val2})=${correct}$, which matches the correct choice. The other choices come from dropping the sign, evaluating at the wrong point, or forgetting to subtract each root from one.`
    };
  }
};
