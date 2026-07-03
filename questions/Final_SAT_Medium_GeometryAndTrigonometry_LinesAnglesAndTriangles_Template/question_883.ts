import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 883
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [height1: 8-15, shadow1: 4-8, shadow2: 2-4]
 * - Difficulty factors: [Similar triangles, proportion setup, shadow word problem]
 * - Distractor patterns: [A: subtracted instead of proportion, C: multiplied instead, D: reversed ratio]
 * - Constraints: [height1/shadow1 = height2/shadow2]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Two similar right triangles representing trees and shadows]
 *
 * FIXED:
 * - Rebuilt corrupted nested-IIFE figure as a plain SVG template literal drawing
 *   both right triangles (tree = vertical leg, shadow = horizontal leg, sun ray =
 *   hypotenuse); labels match the live variables every draw (h1, s1, h, s2).
 * - Collapsed \\\\ backslash runs to \\ so MathJax renders \frac correctly.
 * - Replaced structurally-colliding distractors with three distinct, integer,
 *   pedagogically-meaningful ones; a shadow1 != shadow2 guard makes all four
 *   option values provably distinct (only shadow1==shadow2 could ever collide).
 * - correctAnswer stays a plain integer string (fill-in-safe, exact option match).
 */

export const generator_883 = {
  metadata: {
    id: "883",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate integer values with a clean integer answer.
    // height/shadow ratio is constant across both similar triangles, so
    // height2 = ratio * shadow2 is always an integer.
    const ratio = getRandomInt(2, 3);          // 2:1 or 3:1 height-to-shadow
    const shadow1 = getRandomInt(4, 8);
    let shadow2 = getRandomInt(2, 4);
    // Guard: shadow1 == shadow2 is the ONLY case that lets any two option
    // values coincide. Nudge shadow2 off shadow1 (both fall in [2,8]).
    let tries = 0;
    while (shadow2 === shadow1 && tries++ < 50) {
      shadow2 = getRandomInt(2, 4);
    }
    if (shadow2 === shadow1) shadow2 = shadow1 === 4 ? 3 : shadow2; // final safety

    const height1 = ratio * shadow1;
    const height2 = ratio * shadow2;           // the answer

    // STEP 2: Build a plain SVG figure with two right triangles to relative scale.
    const W = 440, H = 300, P = 40;
    const maxH = Math.max(height1, height2);
    const baseY = H - P;                        // ground line (pixels)
    const topY = P + 10;                        // top of the tallest tree
    const usableH = baseY - topY;
    const pxH = (h: number) => baseY - (h / maxH) * usableH;   // tree top y
    // Horizontal layout: tree1 at x1, its shadow to the right; tree2 further right.
    const x1 = P + 20;
    const s1px = 26;                            // pixels per shadow unit (compact)
    const gap = 60;
    const x2 = x1 + shadow1 * s1px + gap;

    const t1TopY = pxH(height1);
    const t2TopY = pxH(height2);
    const t1ShadowX = x1 + shadow1 * s1px;
    const t2ShadowX = x2 + shadow2 * s1px;

    const figureCode = `<div style="width:100%;max-width:440px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">
      <line x1="${P - 10}" y1="${baseY}" x2="${W - P + 10}" y2="${baseY}" stroke="currentColor" stroke-width="2"/>
      <!-- Tree 1 -->
      <line x1="${x1}" y1="${baseY}" x2="${x1}" y2="${t1TopY}" stroke="#16a34a" stroke-width="3"/>
      <line x1="${x1}" y1="${baseY}" x2="${t1ShadowX}" y2="${baseY}" stroke="#3b82f6" stroke-width="3"/>
      <line x1="${x1}" y1="${t1TopY}" x2="${t1ShadowX}" y2="${baseY}" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3"/>
      <text x="${x1 - 10}" y="${(baseY + t1TopY) / 2}" text-anchor="end" font-size="13" fill="currentColor">${height1}</text>
      <text x="${(x1 + t1ShadowX) / 2}" y="${baseY + 18}" text-anchor="middle" font-size="13" fill="currentColor">${shadow1}</text>
      <!-- Tree 2 -->
      <line x1="${x2}" y1="${baseY}" x2="${x2}" y2="${t2TopY}" stroke="#16a34a" stroke-width="3"/>
      <line x1="${x2}" y1="${baseY}" x2="${t2ShadowX}" y2="${baseY}" stroke="#3b82f6" stroke-width="3"/>
      <line x1="${x2}" y1="${t2TopY}" x2="${t2ShadowX}" y2="${baseY}" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3"/>
      <text x="${x2 - 10}" y="${(baseY + t2TopY) / 2}" text-anchor="end" font-size="13" font-style="italic" fill="currentColor">h</text>
      <text x="${(x2 + t2ShadowX) / 2}" y="${baseY + 18}" text-anchor="middle" font-size="13" fill="currentColor">${shadow2}</text>
    </svg></div>`;

    // STEP 3: Create options. All integers; distinct because shadow1 != shadow2.
    const correctText = height2.toString();
    const distractorA = (height1 - shadow1 + shadow2).toString();  // additive, not proportional
    const distractorC = height1.toString();                        // assumed same height
    const distractorD = (height1 + height2).toString();            // summed both heights

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "results from adding the shadow difference to the height instead of scaling by the constant ratio" },
      { text: correctText, isCorrect: true },
      { text: distractorC, isCorrect: false, reason: "assumes the second tree is the same height as the first, ignoring the shorter shadow" },
      { text: distractorD, isCorrect: false, reason: "adds the two tree heights instead of finding the second height alone" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Two nearby trees are perpendicular to the ground, which is flat. One of these trees is $${height1}$ feet tall and has a shadow that is $${shadow1}$ feet long. At the same time, the shadow of the other tree is $${shadow2}$ feet long. How tall, in feet, is the other tree?`,
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The two trees and their shadows form similar triangles because the sun's rays strike the ground at the same angle, so the ratio of height to shadow length is constant: $\\frac{${height1}}{${shadow1}} = \\frac{h}{${shadow2}}$. Solving for $h$ gives $h = ${height1} \\times \\frac{${shadow2}}{${shadow1}} = ${height2}$ feet. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
