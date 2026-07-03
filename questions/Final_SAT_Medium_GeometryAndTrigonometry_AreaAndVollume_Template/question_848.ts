import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 848
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base: 5, height: 3 (single-digit)]
 * - Difficulty factors: [Right triangle area, identifying base/height from figure]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Base and height must be clear from figure orientation]
 * - Question type: [Figure→Fill in blank]
 * - Figure generation: [Right triangle with legs labeled]
 *
 * FIXED:
 * - The legacy figure was a set of nested IIFEs whose SVG <text> nodes contained
 *   raw "${base" / "${height" fragments (TEMPLATE_LEFTOVER) and drew only axes,
 *   never the triangle. Rebuilt as a single self-contained SVG template literal
 *   (house style): a right triangle with the right angle at the lower-left, the
 *   horizontal leg labelled with `base` and the vertical leg labelled with
 *   `height`, plus a right-angle marker. Figure is schematic ("not drawn to
 *   scale"), so its fixed shape stays consistent with every numeric draw.
 * - Answer is a fill-in; area = base*height/2 is exact (one leg may be odd, giving
 *   a clean .5 decimal). Question text tells the student to enter a fraction or
 *   decimal so a value like 7.5 grades correctly.
 */

export const generator_848 = {
  metadata: {
    id: "848",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Leg lengths (inches). Ranges kept modest so the area is a small
    // integer or a clean x.5 decimal.
    const base = getRandomInt(4, 10);
    const height = getRandomInt(3, 8);

    // STEP 2: Area of a right triangle = (1/2) * base * height. Exact for these
    // integers (product/2 is either an integer or a single-decimal .5 value).
    const area = (base * height) / 2;
    const areaText = Number.isInteger(area) ? area.toString() : area.toFixed(1);

    // STEP 3: Figure — self-contained SVG, right angle at lower-left. Fixed
    // schematic shape; numeric labels come from the live variables.
    const figureCode = `<div style="width:100%;max-width:360px;margin:0 auto;"><svg viewBox="0 0 360 240" style="width:100%;height:auto;display:block;font-family:sans-serif;" xmlns="http://www.w3.org/2000/svg">
  <polygon points="70,190 290,190 70,50" fill="#3b82f6" fill-opacity="0.12" stroke="#3b82f6" stroke-width="2"/>
  <path d="M 70 172 L 88 172 L 88 190" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="180" y="212" text-anchor="middle" font-size="15" fill="currentColor">${base}</text>
  <text x="50" y="124" text-anchor="middle" font-size="15" fill="currentColor">${height}</text>
  <text x="180" y="232" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.7">Note: Figure not drawn to scale.</text>
</svg></div>`;

    // STEP 4: Return question data.
    return {
      questionText: `The figure shows the lengths, in inches, of the two legs of a right triangle. What is the area of the triangle, in square inches? (Enter your answer as a fraction or decimal.)`,
      figureCode,
      options: [],
      correctAnswer: areaText,
      explanation: `The area of a right triangle is $\\frac{1}{2} \\times \\text{base} \\times \\text{height}$. The two legs are the base and the height, so with a base of ${base} and a height of ${height}, the area is $\\frac{1}{2}(${base})(${height}) = ${areaText}$ square inches.`
    };
  }
};
