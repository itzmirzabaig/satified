import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 33
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [17 is GCF outside, 100 is 10^2]
 * - Difficulty factors: [Difference of squares pattern inside GCF]
 * - Distractor patterns: [A,B: wrong factors of 100, C: perfect square trinomial]
 * - Constraints: [Must recognize x^2 - (10y)^2 pattern]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_33 = {
  metadata: {
    id: "33",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const outer = getRandomInt(11, 20);
    const base = getRandomInt(6, 15);
    const square = base * base;
    // A coefficient of 1 is written as the bare variable.
    const ty = (k: number) => (k === 1 ? 'y' : `${k}y`);

    // Wrong factor pair of the square: the smallest factor above 1 when the
    // base is composite, otherwise 1 and the square itself. The product of the
    // constants matches, but the middle terms no longer cancel.
    let p = 1;
    for (let f = 2; f < base; f++) { if (square % f === 0) { p = f; break; } }
    const q = square / p;

    const correctText = `$${outer}(x-${base}y)(x+${base}y)$`;

    const optionsData = [
      { text: `$${outer}(x-${ty(p)})(x+${ty(q)})$`, isCorrect: false },
      { text: `$${outer}(x-${square}y)(x+${square}y)$`, isCorrect: false },
      { text: `$${outer}(x-${base}y)(x-${base}y)$`, isCorrect: false },
      { text: correctText, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const letterOf = (i: number) => shuffledOptions.find(o => o.text === optionsData[i].text)!.letter;

    return {
      questionText: `Which expression is equivalent to $${outer}\\left(x^{2}-${square}y^{2}\\right)$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The expression inside the parentheses is a difference of squares, since $${square}y^{2} = (${base}y)^{2}$. Therefore $x^{2}-${square}y^{2} = (x-${base}y)(x+${base}y)$, and $${outer}\\left(x^{2}-${square}y^{2}\\right) = ${outer}(x-${base}y)(x+${base}y)$. Choice ${letterOf(0)} is incorrect; expanding it gives a nonzero $xy$ term. Choice ${letterOf(1)} is incorrect because it uses $${square}$ instead of its square root, $${base}$. Choice ${letterOf(2)} is incorrect; $(x-${base}y)(x-${base}y)$ expands to $x^{2}-${2 * base}xy+${square}y^{2}$.`
    };
  }
};
