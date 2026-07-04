import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1191
 *
 * ORIGINAL ANALYSIS:
 * - Skill: Linear Equations In Two Variables (perpendicular lines, a constant to determine)
 * - Question type: [Text -> Multiple Choice Text]
 * - Figure generation: [None]
 *
 * REBUILD (root-cause fix for WRONG_ANSWER / unanswerable):
 *   The previous version asked about "the given pair of equations" but never
 *   presented any system (figureCode was null and no equations appeared in the
 *   stem), and its answer options contained the undefined letters a and b as
 *   raw text. With a and b unconstrained and no system shown, perpendicularity
 *   was mathematically indeterminate, so the "correct" choice was arbitrary.
 *
 *   The question is rebuilt to be fully self-contained and uniquely answerable:
 *   a concrete pair of lines is printed in the stem, one of them containing a
 *   single unknown constant k. The lines are stated to be perpendicular, and the
 *   student solves for k. The answer is a live computation from the drawn
 *   coefficients.
 *
 *   Math: line 1 is a1*x + b1*y = c1 with slope -a1/b1; line 2 is a2*x + k*y = c2
 *   with slope -a2/k. Perpendicular <=> (-a1/b1)(-a2/k) = -1 <=> k = -(a1*a2)/b1.
 *
 *   Distractors are the three other classic slope-condition mistakes
 *   (dropping the negative, and using the PARALLEL condition with/without the
 *   sign): {-K}, {D}, {-D} where D = (a2*b1)/a1 is the parallel-condition value.
 *   Draws are constrained so all four values are integers and mutually distinct.
 */

export const generator_1191 = {
  metadata: {
    id: "1191",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    let questionText = '';
    let correctText = '';
    let explanation = '';
    let options: string[] = [];

    let tries = 0;
    while (tries++ < 200) {
      // Coefficients of the two printed lines.
      const a1 = getRandomInt(2, 8);
      const b1 = getRandomInt(2, 6);
      const a2 = getRandomInt(2, 8);
      const c1 = getRandomInt(1, 12);
      const c2 = getRandomInt(1, 12);

      // Correct value: perpendicular condition k = -(a1*a2)/b1 (must be integer).
      if ((a1 * a2) % b1 !== 0) continue;
      const K = -(a1 * a2) / b1;

      // Parallel-condition value (the tempting wrong method): equate slopes,
      // -a1/b1 = -a2/k  =>  k = (a2*b1)/a1 (must be integer to stay a clean option).
      if ((a2 * b1) % a1 !== 0) continue;
      const D = (a2 * b1) / a1;

      // Four candidate answers: {K, -K, D, -D}. Require all distinct and nonzero.
      const cand = [K, -K, D, -D];
      if (cand.some(v => v === 0)) continue;
      if (new Set(cand).size !== 4) continue;

      const optionsData = [
        {
          text: `k = ${K}`,
          isCorrect: true
        },
        {
          text: `k = ${-K}`,
          isCorrect: false,
          reason: "drops the negative sign from the perpendicular condition (this makes the slopes' product $+1$, not $-1$)"
        },
        {
          text: `k = ${D}`,
          isCorrect: false,
          reason: "comes from setting the slopes equal, which would make the lines parallel rather than perpendicular"
        },
        {
          text: `k = ${-D}`,
          isCorrect: false,
          reason: "combines the parallel-slope setup with a sign error, so it is neither the perpendicular nor a correct value"
        }
      ];

      const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
        ...opt,
        letter: String.fromCharCode(65 + index)
      }));

      const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
      const correctLetter = correctOption.letter;
      const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

      correctText = `${correctLetter}. $${correctOption.text}$`;
      options = shuffledOptions.map(o => `${o.letter}. $${o.text}$`);

      questionText = `In the $xy$-plane, the graphs of the equations $${a1}x + ${b1}y = ${c1}$ and $${a2}x + ky = ${c2}$ are perpendicular lines, where $k$ is a constant. What is the value of $k$?`;

      explanation = `Choice ${correctLetter} is correct. Rewriting each line in slope-intercept form, the first line $${a1}x + ${b1}y = ${c1}$ has slope $-\\frac{${a1}}{${b1}}$, and the second line $${a2}x + ky = ${c2}$ has slope $-\\frac{${a2}}{k}$. Two lines are perpendicular exactly when the product of their slopes is $-1$: $\\left(-\\frac{${a1}}{${b1}}\\right)\\left(-\\frac{${a2}}{k}\\right) = -1$, which gives $\\frac{${a1 * a2}}{${b1}k} = -1$, so $k = -\\frac{${a1 * a2}}{${b1}} = ${K}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
      break;
    }

    return {
      questionText,
      figureCode: null,
      options,
      correctAnswer: correctText,
      explanation
    };
  }
};
