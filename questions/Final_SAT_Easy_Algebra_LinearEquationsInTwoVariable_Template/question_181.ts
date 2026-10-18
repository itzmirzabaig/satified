import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 181
 *
 * ORIGINAL ANALYSIS: [Mixture equation percentages]
 * - Number ranges: [pct1: 50-70, pct2: 30-49, total: 150-350]
 * - Difficulty factors: [Converting percentages to decimals]
 * - Constraints: [pct1 != pct2 so the swap/integer distractors never collide]
 *
 * FIXED:
 * - Was converting with .toFixed(1): 64% became "0.6" (rounded) — mathematically
 *   wrong. Now pct/100 rendered with .toFixed(2), which is EXACT for an integer
 *   percent (64 -> "0.64", 50 -> "0.50"), so the equation is always true.
 * - pct2 range tightened to 30-49 so pct1 (>=50) is always strictly greater than
 *   pct2. This removes the pct1==pct2==50 draw where the correct option and its
 *   "swap" distractor (and the two integer distractors) were identical
 *   (DUP_OPTIONS) and the explanation letter no longer matched (LETTER_MISMATCH).
 * - correctAnswer and the choice letter are both read from the shuffled correct
 *   option, so they can never drift out of sync.
 */

export const generator_181 = {
  metadata: {
    id: "181",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // pct1 in [50,70], pct2 in [30,49]  ->  pct1 > pct2 for every draw,
    // so dec1 != dec2 and no two options can coincide.
    const pct1 = getRandomInt(50, 70);
    const pct2 = getRandomInt(30, 49);
    const total = getRandomInt(150, 350);

    // pct/100 with two decimals is exact for an integer percent (no rounding).
    const dec1 = (pct1 / 100).toFixed(2);
    const dec2 = (pct2 / 100).toFixed(2);

    const correctText = `$${dec1}x + ${dec2}y = ${total}$`;

    const optionsData = [
      { key: 'correct', text: correctText, isCorrect: true },
      { key: 'swap', text: `$${dec2}x + ${dec1}y = ${total}$`, isCorrect: false },
      { key: 'ints', text: `$${pct1}x + ${pct2}y = ${total}$`, isCorrect: false },
      { key: 'intsSwap', text: `$${pct2}x + ${pct1}y = ${total}$`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correct = shuffled.find(o => o.isCorrect)!;
    const letterOf = (key: string) => shuffled.find(o => o.key === key)!.letter;

    return {
      questionText: `Fertilizer A is ${pct1}% filler by weight, and Fertilizer B is ${pct2}% filler by weight. A mixture of $x$ pounds of Fertilizer A and $y$ pounds of Fertilizer B contains a total of ${total} pounds of filler. Which equation represents this situation?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correct.text,
      explanation: `Choice ${correct.letter} is correct. Written as decimals, ${pct1}% is ${dec1} and ${pct2}% is ${dec2}. So $x$ pounds of Fertilizer A contain $${dec1}x$ pounds of filler, and $y$ pounds of Fertilizer B contain $${dec2}y$ pounds of filler. The total amount of filler is ${total} pounds, so $${dec1}x + ${dec2}y = ${total}$. Choice ${letterOf('swap')} is incorrect because it applies each percent to the wrong fertilizer. Choice ${letterOf('ints')} is incorrect because it uses the percents as whole numbers instead of writing them as decimals. Choice ${letterOf('intsSwap')} is incorrect because it uses the percents as whole numbers and applies each to the wrong fertilizer.`
    };
  }
};
