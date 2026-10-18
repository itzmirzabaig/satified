import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 36
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [exponents: 4, 4, -1, 1, 5, 3 (small integers)]
 * - Difficulty factors: [Exponent rules: multiplying powers means adding exponents]
 * - Distractor patterns: [A: multiplying exponents instead of adding, C: arithmetic error on m exponent, D: multiplies m exponents but adds the others]
 * - Constraints: [Must handle negative exponents correctly]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_36 = {
  metadata: {
    id: "36",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Guard: m1*m2 must differ from m1+m2 (else distractor D duplicates the
    // correct answer, e.g. 2*2 = 2+2) and from m1+m2+1 (else D duplicates
    // distractor C, e.g. 2*3 = 2+3+1).
    let m1 = getRandomInt(2, 5);
    let m2 = getRandomInt(1, 3);
    let tries = 0;
    while ((m1 * m2 === m1 + m2 || m1 * m2 === m1 + m2 + 1) && tries++ < 50) {
      m1 = getRandomInt(2, 5);
      m2 = getRandomInt(1, 3);
    }
    if (m1 * m2 === m1 + m2 || m1 * m2 === m1 + m2 + 1) m2 = 1; // m1*1 = m1, never m1+1 or m1+2

    const q1 = getRandomInt(2, 5);
    const q2 = getRandomInt(3, 6);

    // Guard: keep the z exponent sum nonzero so the answer never shows z^{0}.
    let z1 = getRandomInt(-3, -1);
    let z2 = getRandomInt(2, 4);
    tries = 0;
    while (z1 + z2 === 0 && tries++ < 50) {
      z1 = getRandomInt(-3, -1);
      z2 = getRandomInt(2, 4);
    }
    if (z1 + z2 === 0) { z1 = -1; z2 = 2; }

    const mResult = m1 + m2;
    const qResult = q1 + q2;
    const zResult = z1 + z2;

    // A power of 1 is written as the bare variable: m, not m^{1}.
    const pw = (v: string, e: number) => (e === 1 ? v : `${v}^{${e}}`);
    const term = (m: number, q: number, z: number) => `${pw('m', m)} ${pw('q', q)} ${pw('z', z)}`;
    const correctText = `$${term(mResult, qResult, zResult)}$`;

    // Distinctness across all draws: the "multiply everything" distractor has
    // q exponent q1*q2, and q1*q2 - (q1+q2) = (q1-1)(q2-1) - 1 >= 1 for
    // q1 >= 2, q2 >= 3, so it never matches any option built on qResult.
    // The remaining pairs differ in the m exponent: mResult vs mResult+1
    // always differ, and m1*m2 differs from both by the guard above.
    const optionsData = [
      { text: `$${term(m1 * m2, q1 * q2, z1 * z2)}$`, isCorrect: false, reason: `multiplies the exponents instead of adding them` },
      { text: correctText, isCorrect: true, reason: '' },
      { text: `$${term(mResult + 1, qResult, zResult)}$`, isCorrect: false, reason: `adds the exponents but makes an arithmetic error, using $${pw('m', mResult + 1)}$ instead of $${pw('m', mResult)}$` },
      { text: `$${term(m1 * m2, qResult, zResult)}$`, isCorrect: false, reason: `multiplies the exponents of $m$ but adds the exponents of $q$ and $z$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectSentences = shuffledOptions
      .filter(opt => !opt.isCorrect)
      .map(opt => `Choice ${opt.letter} is incorrect; it ${opt.reason}.`)
      .join(' ');

    return {
      questionText: `Which expression is equivalent to $\\left(${term(m1, q1, z1)}\\right)\\left(${term(m2, q2, z2)}\\right)$, where $m$, $q$, and $z$ are positive?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. When multiplying powers with the same base, add the exponents: $x^{a} \\cdot x^{b} = x^{a+b}$. Applying this to each base gives $m^{${m1}} \\cdot m^{${m2}} = ${pw('m', mResult)}$, $q^{${q1}} \\cdot q^{${q2}} = ${pw('q', qResult)}$, and $z^{${z1}} \\cdot z^{${z2}} = ${pw('z', zResult)}$.${[m1, q1, z1, m2, q2, z2, mResult, qResult, zResult].includes(1) ? ' A variable written with no exponent has an exponent of 1.' : ''} ${incorrectSentences}`
    };
  }
};
