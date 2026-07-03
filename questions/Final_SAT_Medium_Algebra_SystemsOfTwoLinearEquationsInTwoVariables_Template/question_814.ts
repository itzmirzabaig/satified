import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 814
 *
 * ANALYSIS:
 * - Skill: Systems of Linear Equations (Word Problems) — "set up the system".
 * - Issue Fixed: Options B and D were byte-identical (both used the discount
 *   decimals), and swapped-remaining option A could equal the correct option
 *   when the two discounts were equal — both triggered DUP_OPTIONS.
 * - Rebuild: four structurally distinct coefficient pairs
 *   (r1,r2)/(r2,r1)/(d1,d2)/(d2,d1); prices/discounts chosen so the combined
 *   sale price is an exact integer (no rounding fudge in the correct equation).
 * - Currency stays escaped as \$; coefficients are math, not currency.
 */

export const generator_814 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Choose integer prices (multiples of 20) and discounts (multiples
    // of 5). This guarantees each remaining amount r*price is an integer, so the
    // combined sale price is exact — no rounding artifact in the correct model.
    const m = 20 * getRandomInt(1, 4); // mirror original price, e.g. 20..80
    const v = 20 * getRandomInt(1, 4); // vase original price
    const totalOriginal = m + v;

    // Distinct discounts; guard against the single overlap value (35) so the
    // swapped-rate distractors can never coincide with another option.
    const discount1 = getRandomElement([15, 20, 25, 30, 35]); // mirror discount %
    let discount2 = 35;
    let tries = 0;
    do {
      discount2 = getRandomElement([35, 40, 45, 50, 55]);       // vase discount %
      tries++;
    } while (discount2 === discount1 && tries < 50);
    // Fallback (should never trigger): force a difference.
    if (discount2 === discount1) discount2 = discount1 === 35 ? 40 : 35;

    // Remaining fractions (fraction of price actually paid).
    const remPct1 = (100 - discount1) / 100; // mirror
    const remPct2 = (100 - discount2) / 100; // vase

    // Exact integer combined sale price.
    const totalSale = remPct1 * m + remPct2 * v;
    const sale = Math.round(totalSale); // exact by construction

    // Trim helper: 0.65 -> "0.65", 0.50 -> "0.5", 0.20 -> "0.2".
    const dec = (x: number): string => x.toFixed(2).replace(/\.?0+$/, '');

    const r1 = dec(remPct1);
    const r2 = dec(remPct2);
    const d1 = dec(discount1 / 100);
    const d2 = dec(discount2 / 100);

    // STEP 2: Build question text. Currency escaped; variables in math mode.
    const questionText = `The combined original price of a mirror and a vase is \\$${totalOriginal}. A ${discount1}% discount is applied to the mirror and a ${discount2}% discount is applied to the vase, making the combined sale price of the two items \\$${sale}. Which system of equations gives the original price $m$, in dollars, of the mirror and the original price $v$, in dollars, of the vase?`;

    // STEP 3: Build the four systems. Each shares m + v = totalOriginal and
    // differs only in the second equation's coefficients.
    const firstEq = `$m+v=${totalOriginal}$`;
    const correctText = `${firstEq}\n$${r1}m+${r2}v=${sale}$`;   // correct: remaining amounts
    const swapRemText = `${firstEq}\n$${r2}m+${r1}v=${sale}$`;   // remaining amounts swapped
    const discText    = `${firstEq}\n$${d1}m+${d2}v=${sale}$`;   // used discount %, not remaining
    const swapDiscText = `${firstEq}\n$${d2}m+${d1}v=${sale}$`;  // discount % swapped

    const optionsData = [
      { text: correctText, isCorrect: true, kind: 'correct' },
      { text: swapRemText, isCorrect: false, kind: 'swapRem' },
      { text: discText, isCorrect: false, kind: 'disc' },
      { text: swapDiscText, isCorrect: false, kind: 'swapDisc' }
    ];

    // STEP 4: Shuffle and assign letters.
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const letterOfKind = (kind: string) => shuffledOptions.find(o => o.kind === kind)!.letter;

    // STEP 5: Build explanation — computed from the same live values, letters
    // taken from the shuffled array.
    const explanation = `The combined original price of the mirror and the vase is \\$${totalOriginal}. Letting $m$ be the mirror's original price and $v$ be the vase's original price gives the first equation:
$$m + v = ${totalOriginal}$$

For the sale price, each item is reduced by its discount, so you pay the remaining fraction of each price.

1. The mirror has a ${discount1}% discount, so its sale price is $100\\% - ${discount1}\\% = ${100 - discount1}\\%$ of $m$, that is $${r1}m$.
2. The vase has a ${discount2}% discount, so its sale price is $100\\% - ${discount2}\\% = ${100 - discount2}\\%$ of $v$, that is $${r2}v$.

The combined sale price is \\$${sale}, giving the second equation:
$$${r1}m + ${r2}v = ${sale}$$

This system is choice ${correctLetter}.

Why the other options are incorrect:
- Choice ${letterOfKind('swapRem')} swaps the two remaining fractions, applying the vase's rate to the mirror and the mirror's rate to the vase.
- Choice ${letterOfKind('disc')} multiplies by the discount fractions ($${d1}$ and $${d2}$) instead of the remaining fractions, which would model the amount saved rather than the amount paid.
- Choice ${letterOfKind('swapDisc')} uses the discount fractions and swaps them as well.`;

    // STEP 6: Return question data.
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
