import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1053
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radical equation sqrt(ax+b)+c=x+d with c > d]
 * - Difficulty factors: [Isolate radical, square both sides, check extraneous solutions, set notation]
 * - Distractor patterns: [only the extraneous root, both roots unchecked, both roots plus 0]
 * - Constraints: [exactly one valid root and one genuinely extraneous root for every draw; b > 0]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1053 = {
  metadata: {
    id: "1053",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Equation: sqrt(a*x + b) + c = x + d, with e = d - c = -eAbs < 0.
    // Isolating: sqrt(a*x + b) = x - eAbs. Squaring gives
    //   x^2 - (2*eAbs + a)x + (eAbs^2 - b) = 0,
    // whose roots sum to a + 2*eAbs. Construction (answer-first):
    //   validSol      = a + eAbs + k  -> validSol - eAbs = a + k > 0 (genuine root)
    //   extraneousSol = eAbs - k      -> extraneousSol - eAbs = -k < 0 (extraneous)
    // k > eAbs forces extraneousSol < 0, which also guarantees
    //   b = eAbs^2 - validSol*extraneousSol > 0 (clean radicand) and
    //   extraneousSol != 0 (so the "includes 0" distractor never collapses).
    const a = getRandomInt(2, 4);
    const eAbs = getRandomInt(2, 4);           // c - d
    const k = getRandomInt(eAbs + 1, 5);       // 3..5, always > eAbs
    const validSol = a + eAbs + k;             // 7..13
    const extraneousSol = eAbs - k;            // -3..-1
    const b = eAbs * eAbs - validSol * extraneousSol; // >= 11, always positive
    const d = getRandomInt(1, 4);
    const c = d + eAbs;                        // 3..8

    // Live values used in the worked solution.
    const sqrtAtValid = validSol - eAbs;       // sqrt(a*validSol + b) = a + k
    const radicandAtValid = a * validSol + b;  // = sqrtAtValid^2
    const linearCoef = 2 * eAbs + a;           // quadratic: x^2 - linearCoef*x - constTerm = 0
    const constTerm = b - eAbs * eAbs;         // = -validSol*extraneousSol > 0

    const correctSet = `$\\{${validSol}\\}$`;
    const onlyExtraneous = `$\\{${extraneousSol}\\}$`;
    const bothRoots = `$\\{${extraneousSol}, ${validSol}\\}$`;
    const withZero = `$\\{0, ${extraneousSol}, ${validSol}\\}$`;

    const optionsData = [
      { text: onlyExtraneous, isCorrect: false, reason: `includes only the extraneous value $x = ${extraneousSol}$, which does not satisfy the original equation` },
      { text: correctSet, isCorrect: true, reason: "" },
      { text: bothRoots, isCorrect: false, reason: `includes the extraneous value $x = ${extraneousSol}$; squaring both sides can introduce values that fail the original equation, so each candidate must be checked` },
      { text: withZero, isCorrect: false, reason: `incorrectly includes both the extraneous value $x = ${extraneousSol}$ and the value zero, neither of which satisfies the original equation` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Subtracting ${c} from both sides isolates the radical: $\\sqrt{${a}x+${b}} = x - ${eAbs}$. Squaring both sides gives $x^2 - ${2 * eAbs}x + ${eAbs * eAbs} = ${a}x + ${b}$, which rearranges to $x^2 - ${linearCoef}x - ${constTerm} = 0$. This factors as $(x - ${validSol})(x + ${-extraneousSol}) = 0$, so $x = ${validSol}$ or $x = ${extraneousSol}$. Checking $x = ${validSol}$ in the original equation: the left side is $\\sqrt{${radicandAtValid}} + ${c} = ${sqrtAtValid} + ${c} = ${validSol + d}$ and the right side is $x + ${d} = ${validSol + d}$, so it is a solution. Checking $x = ${extraneousSol}$: the right side of the isolated equation becomes $(${extraneousSol}) - ${eAbs} = ${extraneousSol - eAbs}$, which is negative, and a square root cannot equal a negative number, so $x = ${extraneousSol}$ is extraneous. The solution set is $\\{${validSol}\\}$.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `$\\sqrt{${a}x+${b}} + ${c} = x + ${d}$\n\nWhat is the solution set of the equation above?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
