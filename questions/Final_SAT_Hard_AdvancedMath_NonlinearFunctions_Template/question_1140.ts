import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1140
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = (x-a)(x-b)(x-c); a in [3,8], b in [1,4], c in [-4,-2]]
 * - Difficulty factors: [Function transformation, cubic, finding roots of g]
 * - Constraints: [g(x) = f(x-1) shifts every root right by 1; sum of g roots = a+b+c+3]
 * - Question type: [Text->Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIXED:
 * - Removed |sum| distractor that always duplicated sum (sum is always > 0 here).
 * - Rebuilt distractors (S, S-3, -(S+3)) so all four are distinct.
 * - Sign-safe factor formatting so g's roots never render as "(x--3)" or "(x-0)".
 * - correctAnswer now equals the exact option string (was bare number -> CORRECT_FUZZY).
 * - a could equal b, which gave g only two x-intercepts while the stem names
 *   three. The roots are now distinct, and c = -1 is out so g has no bare x factor.
 * - Every wrong choice now has a reason naming its slip.
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
    let c = -getRandomInt(2, 4);

    // Distractors: S (forgot the shift), S-3 (shifted the wrong way),
    // -(S+3) (added the constants in g's factors). They clash at S = 0.
    const distinct = (x: number, y: number, z: number) => {
      const S = x + y + z;
      return x !== y && new Set([S + 3, S, S - 3, -(S + 3)]).size === 4;
    };
    while (!distinct(a, b, c)) {
      a = getRandomInt(3, 8);
      b = getRandomInt(1, 4);
      c = -getRandomInt(2, 4);
    }

    const S = a + b + c;
    const sum = S + 3; // the correct sum of g's roots
    const gRoots = [a + 1, b + 1, c + 1];

    const correctText = `$${sum}$`;
    const optionsData = [
      { text: correctText, isCorrect: true, reason: '' },
      { text: `$${S}$`, isCorrect: false, reason: `$${S}$ is the sum of the zeros of $f$, which leaves out the shift of 1 unit to the right` },
      { text: `$${S - 3}$`, isCorrect: false, reason: `$${S - 3}$ comes from shifting each zero of $f$ 1 unit to the left instead of to the right` },
      { text: `$${-(S + 3)}$`, isCorrect: false, reason: `$${-(S + 3)}$ is the sum of the constants in the factors of $g(x)$, which are the opposites of its zeros` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // Sign-safe factor: root r -> "(x-r)" for r>0, "(x+|r|)" for r<0.
    const factor = (r: number) => (r > 0 ? `(x-${r})` : `(x+${-r})`);
    const fFactors = [a, b, c].map(factor).join('');
    const gFactors = gRoots.map(factor).join('');

    return {
      questionText: `The functions $f$ and $g$ are defined by $f(x)=${fFactors}$ and $g(x)=f(x-1)$. In the $xy$-plane, the graph of $y=g(x)$ has $x$-intercepts at $(p,0)$, $(q,0)$, and $(r,0)$. What is the value of $p+q+r$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The zeros of $f$ are $${a}$, $${b}$, and $${c}$. Replacing $x$ with $x-1$ shifts the graph 1 unit to the right, so each zero increases by 1 and $g(x)=${gFactors}$. The zeros of $g$ are $${gRoots[0]}$, $${gRoots[1]}$, and $${gRoots[2]}$, so $p+q+r=${gRoots[0]}+${gRoots[1]}+(${gRoots[2]})=${sum}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
