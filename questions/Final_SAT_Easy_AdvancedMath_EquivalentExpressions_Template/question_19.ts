import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 19
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2, -4, -3, 2, -7]
 * - Difficulty factors: [Distributing negative sign, combining like terms]
 * - Distractor patterns: [B: wrong sign on middle term, C: adding x^2 terms wrong, D: wrong signs throughout]
 * - Constraints: [Careful with negatives]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_19 = {
  metadata: {
    id: "19",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Joins signed terms into one expression: zero terms drop out, a
    // coefficient of 1 or -1 is written as the bare variable, and every term
    // after the first carries its own + or - sign.
    const poly = (terms: [number, string][]): string => {
      let s = '';
      for (const [c, v] of terms) {
        if (c === 0) continue;
        const abs = Math.abs(c);
        const body = v && abs === 1 ? v : `${abs}${v}`;
        s += s ? (c < 0 ? ' - ' : ' + ') + body : (c < 0 ? '-' : '') + body;
      }
      return s || '0';
    };

    let a: number, b: number, c2: number, d2: number, e2: number;
    do {
      a = getRandomInt(2, 4);
      b = getRandomInt(-5, -2);
      c2 = -getRandomInt(2, 4);
      d2 = getRandomInt(2, 4);
      e2 = -getRandomInt(5, 9);
      // a + c2 is the x^2 coefficient of the distractors that forget to
      // distribute the negative, and b - e2 is the constant of the answer;
      // neither may be zero or the expression would show a 0 term.
    } while (a + c2 === 0 || b - e2 === 0);

    const x2Coeff = a - c2;
    const xCoeff = -d2;
    const constTerm = b - e2;

    const correctExpr = poly([[x2Coeff, 'x^2'], [xCoeff, 'x'], [constTerm, '']]);
    const correctText = `$${correctExpr}$`;

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `$${poly([[x2Coeff, 'x^2'], [d2, 'x'], [constTerm, '']])}$`, isCorrect: false },
      { text: `$${poly([[a + c2, 'x^2'], [xCoeff, 'x'], [constTerm, '']])}$`, isCorrect: false },
      { text: `$${poly([[a + c2, 'x^2'], [d2, 'x'], [b + e2, '']])}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    const distributed = poly([[a, 'x^2'], [b, ''], [-c2, 'x^2'], [-d2, 'x'], [-e2, '']]);

    return {
      questionText: `Which expression is equivalent to $(${poly([[a, 'x^2'], [b, '']])}) - (${poly([[c2, 'x^2'], [d2, 'x'], [e2, '']])})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Distribute the negative sign: $${distributed}$. Combine like terms: $(${a} + ${-c2})x^2 - ${d2}x + (${b} + ${-e2}) = ${correctExpr}$.`
    };
  }
};
