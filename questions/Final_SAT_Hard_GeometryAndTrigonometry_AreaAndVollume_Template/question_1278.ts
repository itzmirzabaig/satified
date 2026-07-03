import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1278
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [volume ratio built from radius/height scale factors]
 * - Difficulty factors: [Cylinder volume scaling, R^2 * H relationship]
 * - Distractor patterns: [swap R/H, use R^2, use H^2]
 * - Constraints: [R^2 * H = volumeRatio; all four (R,H) options distinct]
 * - Question type: [Multiple choice text]
 * - Figure generation: [Cylinder cross-section diagram, plain SVG]
 */

export const generator_1278 = {
  metadata: {
    id: "1278",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // The volume of a cylinder is V = pi r^2 h. A second cylinder whose volume
    // is `volumeRatio` times as large satisfies R^2 * H = volumeRatio * r^2 * h.
    // We choose integer scale factors R = A (radius) and H = B (height) so that
    // A^2 * B = volumeRatio exactly, then present distractors that misapply the
    // relationship.
    const A = getRandomInt(2, 6);   // radius scale factor (R = A r)
    const B = getRandomInt(2, 9);   // height scale factor (H = B h)
    const volumeRatio = A * A * B;  // A^2 * B  (exact integer)

    // Build the four (R, H) pairs as strings and guarantee they are all
    // distinct AND that no distractor accidentally satisfies R^2*H = volumeRatio
    // (which would make it a second correct answer). Distractors:
    //   d1: swap the roles       -> R = B, H = A^2
    //   d2: square the radius    -> R = A^2, H = B
    //   d3: square the height    -> R = A, H = B^2
    const pairText = (r: number, h: number) => `$R=${r}r$ and $H=${h}h$`;
    const check = (r: number, h: number) => r * r * h; // must not equal volumeRatio for a distractor

    const correctR = A, correctH = B;
    const candidates = [
      { r: B,     h: A * A }, // d1: swapped
      { r: A * A, h: B },     // d2: R^2 instead of R
      { r: A,     h: B * B }, // d3: H^2 instead of H
    ];

    // Reasons align 1:1 with the candidate list above.
    const reasons = [
      "swaps the radius and height scale factors",
      "squares the radius scale factor instead of leaving it as $R$",
      "squares the height scale factor instead of leaving it as $H$",
    ];

    // Assemble distractors, replacing any that collide (equal correct value, or
    // duplicate an already-chosen pair) with a freshly generated wrong pair.
    const used = new Set<string>([pairText(correctR, correctH)]);
    const distractors: { text: string; reason: string }[] = [];
    for (let i = 0; i < candidates.length; i++) {
      let { r, h } = candidates[i];
      let text = pairText(r, h);
      let tries = 0;
      while ((used.has(text) || check(r, h) === volumeRatio) && tries++ < 50) {
        // Perturb into a guaranteed-wrong, unused pair.
        r = getRandomInt(2, 9);
        h = getRandomInt(2, 9);
        text = pairText(r, h);
      }
      used.add(text);
      distractors.push({ text, reason: reasons[i] });
    }

    const optionsData = [
      { text: pairText(correctR, correctH), isCorrect: true, reason: "" },
      ...distractors.map(d => ({ text: d.text, isCorrect: false, reason: d.reason })),
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctText = correctOption.text;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // ── Figure: cylinder cross-section (rectangle) labelled r (width) and h (height).
    const W = 450, Hpx = 250;
    const cx = W / 2;
    const rectW = 120, rectH = 150;
    const left = cx - rectW / 2, right = cx + rectW / 2;
    const top = 45, bottom = top + rectH;
    const ellH = 22; // ellipse rise for the top/bottom caps
    const figureCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${Hpx}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      `<line x1="${left}" y1="${top}" x2="${left}" y2="${bottom}" stroke="currentColor" stroke-width="2"/>` +
      `<line x1="${right}" y1="${top}" x2="${right}" y2="${bottom}" stroke="currentColor" stroke-width="2"/>` +
      `<ellipse cx="${cx}" cy="${bottom}" rx="${rectW / 2}" ry="${ellH}" fill="none" stroke="currentColor" stroke-width="2"/>` +
      `<path d="M ${left} ${top} A ${rectW / 2} ${ellH} 0 0 0 ${right} ${top}" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3"/>` +
      `<path d="M ${left} ${top} A ${rectW / 2} ${ellH} 0 0 1 ${right} ${top}" fill="none" stroke="currentColor" stroke-width="2"/>` +
      `<line x1="${cx}" y1="${top}" x2="${right}" y2="${top}" stroke="#3b82f6" stroke-width="2"/>` +
      `<circle cx="${cx}" cy="${top}" r="3" fill="#3b82f6"/>` +
      `<text x="${(cx + right) / 2}" y="${top - 8}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor">r</text>` +
      `<line x1="${right + 16}" y1="${top}" x2="${right + 16}" y2="${bottom}" stroke="currentColor" stroke-width="1.5"/>` +
      `<text x="${right + 28}" y="${(top + bottom) / 2 + 4}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor">h</text>` +
      `</svg></div>`;

    return {
      questionText: `A second right circular cylinder (not shown) has a volume that is ${volumeRatio} times as large as the volume of the cylinder shown, which has radius $r$ and height $h$. Which of the following could represent the radius $R$, in terms of $r$, and the height $H$, in terms of $h$, of the second cylinder?`,
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The volume of a cylinder is $V = \\pi r^2 h$. The second cylinder has volume $\\pi R^2 H = ${volumeRatio}\\,\\pi r^2 h$, so $R^2 H = ${volumeRatio}\\,r^2 h$. With $R = ${correctR}r$ and $H = ${correctH}h$, $R^2 H = (${correctR}r)^2(${correctH}h) = ${correctR * correctR} \\times ${correctH}\\,r^2 h = ${volumeRatio}\\,r^2 h$, which matches. Choice ${incorrectOptions[0].letter} is incorrect because it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect because it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect because it ${incorrectOptions[2].reason}.`
    };
  }
};
