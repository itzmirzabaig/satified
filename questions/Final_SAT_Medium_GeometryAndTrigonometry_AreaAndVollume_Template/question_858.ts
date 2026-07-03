import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 858
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [AB, QR, QT small integers]
 * - Difficulty factors: [Similar rectangles, proportion calculation]
 * - Distractor patterns: [A: added the two given sides, C: added the side
 *   difference instead of scaling, D: QT itself (forgot to scale)]
 * - Constraints: [Similar rectangles with clean integer ratio]
 * - Question type: [Figure -> Multiple Choice Text]
 * - Figure generation: [Plain SVG: two similar rectangles]
 *
 * FIXED (rebuild):
 * - Original figure IIFE was corrupted (syntax errors, literal ${...} leftovers,
 *   \\\\ runs, wrong import path). Rebuilt as a self-contained plain-SVG template.
 * - Answer-first construction: pick integer ratio k and integer QR, QT, then
 *   AB = k*QR and AD = k*QT, so AB/QR = AD/QT = k exactly and AD is always a
 *   clean integer (no float artifacts).
 * - Distractors guarded by a bounded retry (<=50) so all four options are
 *   distinct integers for every draw.
 * - Explanation reads the correct/incorrect letters from the shuffled array.
 */

export const generator_858 = {
  metadata: {
    id: "858",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Answer-first parameters with a clean integer similarity ratio.
    // AB/QR = AD/QT = k, so AB = k*QR and AD = k*QT are integers.
    let k = 2, qr = 4, qt = 5;
    let ab = 8, ad = 10;
    let distAdded = 0, distDiff = 0, distQt = 0;

    let tries = 0;
    do {
      k = getRandomInt(2, 3);       // clean similarity ratio
      qr = getRandomInt(3, 6);      // QRST width
      qt = getRandomInt(4, 9);      // QRST height (corresponds to AD)
      ab = k * qr;                  // ABCD width (given)
      ad = k * qt;                  // ABCD height = correct answer

      // Distractors (common similar-figure errors):
      distAdded = ab + qt;          // added the two given sides
      distDiff = qt + (ab - qr);    // added the side difference instead of scaling
      distQt = qt;                  // just QT (forgot to scale at all)
      tries++;
    } while (
      new Set([ad, distAdded, distDiff, distQt]).size !== 4 &&
      tries < 50
    );

    // STEP 2: Build the figure — two similar rectangles (fixed pixel layout,
    // labelled with the live values; AD is shown as the unknown).
    const figureCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 450 250" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">
      <!-- Rectangle ABCD (left) -->
      <rect x="45" y="55" width="150" height="140" fill="none" stroke="#3b82f6" stroke-width="2"/>
      <text x="40" y="50" text-anchor="end" font-size="13" font-weight="bold" fill="currentColor">A</text>
      <text x="200" y="50" text-anchor="start" font-size="13" font-weight="bold" fill="currentColor">B</text>
      <text x="200" y="210" text-anchor="start" font-size="13" font-weight="bold" fill="currentColor">C</text>
      <text x="40" y="210" text-anchor="end" font-size="13" font-weight="bold" fill="currentColor">D</text>
      <text x="120" y="42" text-anchor="middle" font-size="13" fill="currentColor">${ab}</text>
      <text x="32" y="130" text-anchor="middle" font-size="13" fill="currentColor">?</text>

      <!-- Rectangle QRST (right) -->
      <rect x="290" y="85" width="105" height="95" fill="none" stroke="#3b82f6" stroke-width="2"/>
      <text x="285" y="80" text-anchor="end" font-size="13" font-weight="bold" fill="currentColor">Q</text>
      <text x="400" y="80" text-anchor="start" font-size="13" font-weight="bold" fill="currentColor">R</text>
      <text x="400" y="195" text-anchor="start" font-size="13" font-weight="bold" fill="currentColor">S</text>
      <text x="285" y="195" text-anchor="end" font-size="13" font-weight="bold" fill="currentColor">T</text>
      <text x="342" y="76" text-anchor="middle" font-size="13" fill="currentColor">${qr}</text>
      <text x="278" y="137" text-anchor="middle" font-size="13" fill="currentColor">${qt}</text>

      <text x="225" y="240" text-anchor="middle" font-size="11" font-style="italic" fill="currentColor" opacity="0.75">Note: Figure not drawn to scale.</text>
    </svg></div>`;

    // STEP 3: Options with correctness tracking.
    const correctText = ad.toString();
    const optionsData = [
      { text: distAdded.toString(), isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distDiff.toString(), isCorrect: false },
      { text: distQt.toString(), isCorrect: false }
    ];

    // STEP 4: Shuffle, then assign letters from the shuffled order.
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const byText = (t: string) => shuffledOptions.find(o => o.text === t)!.letter;
    const letterAdded = byText(distAdded.toString());
    const letterDiff = byText(distDiff.toString());
    const letterQt = byText(distQt.toString());

    // STEP 5: Explanation — numbers from the same live variables.
    const explanation = `Choice ${correctLetter} is correct. Because rectangles $ABCD$ and $QRST$ are similar with $A, B, C, D$ corresponding to $Q, R, S, T$, the ratio of corresponding sides is constant: $\\frac{AB}{QR} = \\frac{AD}{QT}$. Here $\\frac{AB}{QR} = \\frac{${ab}}{${qr}} = ${k}$, so $AD = ${k} \\times QT = ${k} \\times ${qt} = ${ad}$ inches. Choice ${letterAdded} is incorrect; it adds the two given side lengths ($AB + QT = ${ab} + ${qt}$) instead of using the proportion. Choice ${letterDiff} is incorrect; it adds the difference of the given widths ($AB - QR = ${ab} - ${qr}$) to $QT$ rather than scaling by the ratio. Choice ${letterQt} is incorrect; this is the length of $QT$, not $AD$.`;

    return {
      questionText: `Rectangles $ABCD$ and $QRST$ shown are similar, where $A$, $B$, $C$, and $D$ correspond to $Q$, $R$, $S$, and $T$, respectively. What is the length, in inches, of $\\overline{AD}$?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation
    };
  }
};
