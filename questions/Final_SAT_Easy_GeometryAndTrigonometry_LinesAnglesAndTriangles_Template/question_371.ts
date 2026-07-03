import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 371
 *
 * Intent: Two lines intersect. Angle 1 and angle 2 are vertical angles, so
 * angle 2 = angle 1. angle 1 is acute. Student recognizes vertical angles are
 * congruent.
 *
 * FIX ANALYSIS:
 * - DUP_OPTIONS: distractors (180 - a) and (2a) collide at a = 60 (both 120).
 *   Kept the three pedagogically meaningful distractors (supplement, double,
 *   reflex) but added a bounded retry (<=50) that re-draws angle1 whenever any
 *   two of the four option values coincide. Only a = 60 triggers a re-draw, so
 *   this terminates immediately in practice while guaranteeing distinct options.
 * - Rebuilt the figure as a plain SVG template literal (house style): two
 *   intersecting lines with the vertical-angle pair labeled 1 and 2 in the
 *   left/right (acute) sectors, matching the geometry.
 */

export const generator_371 = {
  metadata: {
    id: "371",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    let angle1 = getRandomInt(45, 85);
    let distractorSupp = 180 - angle1;   // supplementary-angle error
    let distractorDouble = 2 * angle1;    // doubles the angle
    let distractorReflex = 360 - angle1;  // reflex-angle error

    // Guard: ensure the four option values are all distinct for this draw.
    let tries = 0;
    while (
      tries++ < 50 &&
      new Set([angle1, distractorSupp, distractorDouble, distractorReflex]).size !== 4
    ) {
      angle1 = getRandomInt(45, 85);
      distractorSupp = 180 - angle1;
      distractorDouble = 2 * angle1;
      distractorReflex = 360 - angle1;
    }

    // Figure: two lines crossing at the center of a 450x250 canvas, with the
    // vertical-angle pair (acute) labeled 1 and 2 in the left/right sectors.
    const W = 450, H = 250;
    const cx = W / 2, cy = H / 2;
    const dx = 190, dy = 95;
    const figureCode = `
      <div style="display:flex;justify-content:center;">
        <svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${W}px;height:auto;font-family:sans-serif;user-select:none;">
          <line x1="${cx - dx}" y1="${cy + dy}" x2="${cx + dx}" y2="${cy - dy}" stroke="currentColor" stroke-width="2" />
          <line x1="${cx - dx}" y1="${cy - dy}" x2="${cx + dx}" y2="${cy + dy}" stroke="currentColor" stroke-width="2" />
          <circle cx="${cx}" cy="${cy}" r="3" fill="currentColor" />
          <text x="${cx - 55}" y="${cy + 5}" text-anchor="middle" font-size="18" fill="currentColor">1</text>
          <text x="${cx + 55}" y="${cy + 5}" text-anchor="middle" font-size="18" fill="currentColor">2</text>
        </svg>
      </div>
    `;

    const correctAnswer = `${angle1}^{\\circ}`;

    const optionsData = [
      { text: correctAnswer, isCorrect: true },
      { text: `${distractorSupp}^{\\circ}`, isCorrect: false, reason: "finds the supplementary angle instead of the vertical angle" },
      { text: `${distractorDouble}^{\\circ}`, isCorrect: false, reason: "doubles the angle instead of using the vertical-angle relationship" },
      { text: `${distractorReflex}^{\\circ}`, isCorrect: false, reason: "subtracts from a full rotation instead of recognizing vertical angles" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure, two lines intersect at a point. Angle $1$ and angle $2$ are vertical angles. The measure of angle $1$ is $${angle1}^{\\circ}$. What is the measure of angle $2$?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. When two lines intersect, vertical angles are congruent (equal in measure). Since $m\\angle 1 = ${angle1}^{\\circ}$, the vertical angle satisfies $m\\angle 2 = ${angle1}^{\\circ}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
