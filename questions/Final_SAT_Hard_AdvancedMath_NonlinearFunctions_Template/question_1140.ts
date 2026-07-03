import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1140
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = (x-a)(x-b)(x-c); a in [3,8], b in [1,4], c in [-4,-1]]
 * - Difficulty factors: [Function transformation, cubic, finding roots of g]
 * - Constraints: [g(x) = f(x-1) shifts every root right by 1; sum of g roots = a+b+c+3]
 * - Question type: [Text->Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIXED:
 * - Removed |sum| distractor that always duplicated sum (sum is always > 0 here).
 * - Rebuilt distractors (S, S-3, -(S+3)) with a bounded retry so all four are distinct.
 * - Sign-safe factor formatting so g's roots never render as "(x--3)" or "(x-0)".
 * - correctAnswer now equals the exact option string (was bare number -> CORRECT_FUZZY).
 */

export const generator_1140 = {
  metadata: {
    id: "1140",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    let a = getRandomInt(3, 8);
    let b = getRandomInt(1, 4);
    let c = -getRandomInt(1, 4);

    // Roots of g(x) = f(x-1): each root of f shifts right by 1.
    // sum = (a+1)+(b+1)+(c+1) = a+b+c+3.
    const sumOf = (x: number, y: number, z: number) => x + y + z + 3;

    // Distractors: S (forgot the shift), S-3 (shifted the wrong way),
    // -(S+3) (sign error). Only clash is at a+b+c === 0, so regenerate then.
    const distinct = (x: number, y: number, z: number) => {
      const S = x + y + z;
      return new Set([S + 3, S, S - 3, -(S + 3)]).size === 4;
    };
    let tries = 0;
    while (tries++ < 50 && !distinct(a, b, c)) {
      a = getRandomInt(3, 8);
      b = getRandomInt(1, 4);
      c = -getRandomInt(1, 4);
    }

    const S = a + b + c;
    const sum = sumOf(a, b, c); // = S + 3, the correct sum of g's roots
    const gRoots = [a + 1, b + 1, c + 1];

    const correctText = `$${sum}$`;
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `$${S}$`, isCorrect: false },
      { text: `$${S - 3}$`, isCorrect: false },
      { text: `$${-(S + 3)}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    // Sign-safe factor: root r -> "(x-r)" for r>0, "(x+|r|)" for r<0, "x" for r=0.
    const factor = (r: number) => (r > 0 ? `(x-${r})` : r < 0 ? `(x+${-r})` : `x`);
    const fFactors = [a, b, c].map(factor).join('');
    const gFactors = gRoots.map(factor).join('');

    return {
      questionText: `$f(x)=${fFactors}$ and $g(x)=f(x-1)$. If $g$ has x-intercepts at $(p,0),(q,0),(r,0)$, what is $p+q+r$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Replacing $x$ with $x-1$ shifts each root of $f$ one unit right, so $g(x)=${gFactors}$ with roots ${gRoots.join(', ')}. Their sum is $p+q+r=${gRoots[0]}+(${gRoots[1]})+(${gRoots[2]})=${sum}$.`
    };
  }
};
