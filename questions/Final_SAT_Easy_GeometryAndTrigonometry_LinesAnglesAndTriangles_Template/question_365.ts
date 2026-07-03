import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 365
 *
 * Intent: Two lines intersect. Angle w and angle z are vertical angles, so
 * z = w. w is obtuse. Student must recognize vertical angles are congruent.
 *
 * FIX ANALYSIS:
 * - DUP_OPTIONS: original distractors (180-w, round(w/2)) both hit 60 when
 *   w=120, and (w-100 vs 180-w) collided at w=140. Redesigned distractors to
 *   live in mutually disjoint numeric bands across the full w range so no two
 *   options (or the correct answer) can ever coincide:
 *     correct = w        in [122,150]
 *     supplement = 180-w in [30, 58]
 *     reflex = 360-w     in [210,238]
 *     halved = round(w/2) in [61, 75]
 *   (w lower bound tightened from 120 to 122 to keep supplement<halved.)
 * - Rebuilt the figure as a plain SVG template literal (house style): two
 *   intersecting lines with the vertical-angle pair w and z labeled in the
 *   top/bottom (obtuse) sectors, matching the geometry.
 */

export const generator_365 = {
  metadata: {
    id: "365",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const wValue = getRandomInt(122, 150);

    const correctAnswer = wValue.toString();
    const distractorSupp = 180 - wValue;      // supplementary-angle error
    const distractorReflex = 360 - wValue;    // reflex-angle error
    const distractorHalf = Math.round(wValue / 2); // halves the angle

    // Figure: two lines crossing at the center of a 450x250 canvas. The lines
    // are chosen so the top and bottom sectors are obtuse (matching w, z).
    const W = 450, H = 250;
    const cx = W / 2, cy = H / 2;
    // Line 1: gentle positive slope; Line 2: gentle negative slope.
    const dx = 190, dy = 55;
    const figureCode = `
      <div style="display:flex;justify-content:center;">
        <svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${W}px;height:auto;font-family:sans-serif;user-select:none;">
          <line x1="${cx - dx}" y1="${cy + dy}" x2="${cx + dx}" y2="${cy - dy}" stroke="currentColor" stroke-width="2" />
          <line x1="${cx - dx}" y1="${cy - dy}" x2="${cx + dx}" y2="${cy + dy}" stroke="currentColor" stroke-width="2" />
          <circle cx="${cx}" cy="${cy}" r="3" fill="currentColor" />
          <text x="${cx}" y="${cy - 40}" text-anchor="middle" font-size="18" fill="currentColor">w&#176;</text>
          <text x="${cx}" y="${cy + 52}" text-anchor="middle" font-size="18" fill="currentColor">z&#176;</text>
        </svg>
      </div>
    `;

    const optionsData = [
      { text: correctAnswer, isCorrect: true },
      { text: distractorSupp.toString(), isCorrect: false, reason: "gives the supplementary angle instead of the vertical angle" },
      { text: distractorReflex.toString(), isCorrect: false, reason: "gives the reflex angle instead of the vertical angle" },
      { text: distractorHalf.toString(), isCorrect: false, reason: "incorrectly halves the angle" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure, two lines intersect at a point. If $w = ${wValue}$, what is the value of $z$?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. When two lines intersect, the angles opposite each other (vertical angles) are congruent. In the figure, $w^\\circ$ and $z^\\circ$ are vertical angles, so $z = w = ${wValue}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
