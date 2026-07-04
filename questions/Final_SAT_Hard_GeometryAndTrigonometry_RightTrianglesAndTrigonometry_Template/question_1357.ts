import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1357
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [tan(A) = √3, DF = 125]
 * - Difficulty factors: [tan value implies angle, 30-60-90 triangle properties, cosine relationship]
 * - Constraints: [tan(A) = √3 means A = 60°, cos(60°) = 1/2]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with angle labels]
 *
 * FIXES (was RENDER):
 * - Collapsed every quadruple-backslash LaTeX macro (\\\\frac, \\\\sqrt, \\\\tan,
 *   \\\\cos, \\\\implies, \\\\circ) to the single-rendered form (\\frac, \\sqrt …).
 *   At runtime the old strings carried TWO backslashes, which KaTeX reads as a
 *   line break, so no fraction/root rendered. The sibling questions use the
 *   single-backslash form.
 * - Rebuilt the distractors as explicit, well-formed per-angle option sets. The
 *   old first distractor concatenated a stray brace ('\\sqrt{3}}') with a literal
 *   '{' between interpolations, producing the malformed '\\frac{1{2}' (numerator
 *   never closed) whenever the 60° branch was chosen. New options are guaranteed
 *   balanced and are checked to never collide numerically with the answer.
 * - Replaced the meaningless bare-axes figure with an actual right triangle whose
 *   vertices D, E, F are labeled and whose right angle sits at F, matching the
 *   question.
 */

export const generator_1357 = {
  metadata: {
    id: "1357",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // tan(A) = tan(D) fixes the acute angle D. F is the right angle, so DF is
    // the leg adjacent to D and DE is the hypotenuse: cos(D) = DF/DE, hence
    // DE = DF / cos(D).
    const angles = [
      { angle: 30, tan: "\\frac{1}{\\sqrt{3}}", cos: "\\frac{\\sqrt{3}}{2}" },
      { angle: 60, tan: "\\sqrt{3}", cos: "\\frac{1}{2}" }
    ];

    const angleData = getRandomElement(angles);
    const df = getRandomInt(50, 200);

    // Correct hypotenuse DE = DF / cos(D).
    //   angle 60: cos = 1/2  -> DE = 2·df                    (clean integer)
    //   angle 30: cos = √3/2 -> DE = 2·df/√3                 (leave as fraction)
    let de: string;
    if (angleData.angle === 60) {
      de = (2 * df).toString();
    } else {
      de = `\\frac{${2 * df}}{\\sqrt{3}}`;
    }

    // Distractors, defined explicitly per angle so every option is well-formed
    // LaTeX and none equals the correct value. Chosen from classic errors
    // (using sine, using tangent, multiplying/dividing by √3, halving).
    let distractors: { text: string; reason: string }[];
    if (angleData.angle === 60) {
      distractors = [
        { text: `\\frac{${2 * df}}{\\sqrt{3}}`, reason: "divides by sin 60° instead of cos 60°" },
        { text: `${df}\\sqrt{3}`, reason: "multiplies by tan 60° instead of dividing by cos 60°" },
        { text: `\\frac{${df}}{2}`, reason: "multiplies by cos 60° instead of dividing by it" }
      ];
    } else {
      distractors = [
        { text: `${2 * df}`, reason: "divides by sin 30° instead of cos 30°" },
        { text: `\\frac{${df}}{\\sqrt{3}}`, reason: "multiplies by tan 30° instead of dividing by cos 30°" },
        { text: `${df}\\sqrt{3}`, reason: "multiplies by √3 instead of dividing by cos 30°" }
      ];
    }

    // Figure: an actual right triangle DEF with the right angle at F. Screen
    // coordinates only need to be schematic (not to scale) and match the labels.
    const W = 420, H = 300;
    const Dx = 60, Dy = 250;          // acute angle D (bottom-left)
    const Fx = 340, Fy = 250;         // right angle F (bottom-right)
    const Ex = 340, Ey = 70;          // E (top-right), so EF ⟂ DF at F
    const figureCode = `
      <svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:420px;height:auto;display:block;margin:0 auto;font-family:sans-serif;">
        <polygon points="${Dx},${Dy} ${Fx},${Fy} ${Ex},${Ey}"
          fill="#3b82f6" fill-opacity="0.08" stroke="currentColor" stroke-width="2" />
        <polyline points="${Fx - 16},${Fy} ${Fx - 16},${Fy - 16} ${Fx},${Fy - 16}"
          fill="none" stroke="currentColor" stroke-width="1.2" />
        <text x="${Dx - 12}" y="${Dy + 6}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">D</text>
        <text x="${Fx + 14}" y="${Fy + 6}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">F</text>
        <text x="${Ex + 14}" y="${Ey}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">E</text>
        <text x="${(Dx + Fx) / 2}" y="${Fy + 22}" text-anchor="middle" font-size="13" fill="currentColor">${df}</text>
      </svg>
    `;

    const optionsData = [
      { text: distractors[0].text, isCorrect: false, reason: distractors[0].reason },
      { text: distractors[1].text, isCorrect: false, reason: distractors[1].reason },
      { text: distractors[2].text, isCorrect: false, reason: distractors[2].reason },
      { text: de, isCorrect: true, reason: `correct: cos ${angleData.angle}° = adjacent/hypotenuse, so hypotenuse = adjacent / cos ${angleData.angle}°` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Since $\\tan A = ${angleData.tan}$ and $A$ corresponds to $D$, angle $D = ${angleData.angle}^{\\circ}$. In right triangle $DEF$ the right angle is at $F$, so $DF = ${df}$ is the leg adjacent to $D$ and $DE$ is the hypotenuse. Then $\\cos ${angleData.angle}^{\\circ} = \\frac{DF}{DE}$, so $DE = \\frac{DF}{\\cos ${angleData.angle}^{\\circ}} = \\frac{${df}}{${angleData.cos}} = ${de}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `Triangle $ABC$ is similar to triangle $DEF$, where $A$ corresponds to $D$ and $C$ corresponds to $F$. Angles $C$ and $F$ are right angles. If $\\tan(A) = ${angleData.tan}$ and $DF = ${df}$, what is the length of $\\overline{DE}$?`,
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: de,
      explanation: explanation
    };
  }
};
