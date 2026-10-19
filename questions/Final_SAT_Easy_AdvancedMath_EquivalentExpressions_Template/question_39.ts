import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 39
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2, 1, 1, 6]
 * - Difficulty factors: [Subtracting polynomials carefully]
 * - Distractor patterns: [A: keeps 2x^2 only, B: wrong middle term sign, C: wrong constant]
 * - Constraints: [Sign handling]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_39 = {
  metadata: {
    id: "39",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a1 = getRandomInt(2, 4);
    const b1 = getRandomInt(1, 3);
    const c1 = -getRandomInt(7, 10);
    const a2 = 1;
    const b2 = getRandomInt(5, 8);
    const c2 = getRandomInt(1, 4);

    const aSum = a1 + a2;
    const bSum = b1 + b2;
    const cSum = c1 + c2;

    // Signed constant term: "+5" or "-5", never "+-5".
    const sgn = (n: number) => (n < 0 ? `-${-n}` : `+${n}`);
    // The x coefficient of the first polynomial can be 1, written as plain x.
    const b1Term = b1 === 1 ? 'x' : `${b1}x`;

    const correctText = `$${aSum}x^2+${bSum}x${sgn(cSum)}$`;

    const optionsData = [
      { text: `$${a1}x^2+${bSum}x${sgn(cSum)}$`, isCorrect: false },
      { text: `$${aSum}x^2+${b2}x${sgn(cSum)}$`, isCorrect: false },
      { text: `$${aSum}x^2+${bSum}x${sgn(-cSum)}$`, isCorrect: false },
      { text: correctText, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const letterOf = (i: number) => shuffledOptions.find(o => o.text === optionsData[i].text)!.letter;

    return {
      questionText: `Which expression is equivalent to $\\left(${a1}x^2 + ${b1Term} ${c1}\\right) + \\left(x^2 + ${b2}x + ${c2}\\right)$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Combine like terms: $(${a1}+1)x^2 + (${b1}+${b2})x + (${c1}+${c2}) = ${correctText.replace(/\$/g, '')}$. Choice ${letterOf(0)} is incorrect because it leaves out the $x^2$ term of the second expression. Choice ${letterOf(1)} is incorrect because it leaves out the $${b1Term}$ term of the first expression. Choice ${letterOf(2)} is incorrect because it has the wrong sign on the constant term, since $${c1}+${c2}=${cSum}$.`
    };
  }
};
