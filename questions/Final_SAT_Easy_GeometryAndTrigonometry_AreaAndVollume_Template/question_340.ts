import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 340
*
* ORIGINAL ANALYSIS:
* - Number ranges: [sideJK: 10-20, perimeterJKL: 30-50, sideRS: 100-150]
* - Difficulty factors: [Similar triangles, scale factor from sides applied to perimeter]
* - Distractor patterns: [multiplies perimeter by side, squares the scale factor]
* - Constraints: [Scale factor = RS/JK, RST perimeter = scale factor × JKL perimeter]
* - Question type: [Has Figure (SVG), Multiple Choice Text]
* - Figure generation: [Similar triangles with labels]
*
* FIXED:
* - sideRS is now sideJK * scaleFactor so the scale factor RS/JK is exactly the
*   integer scaleFactor (5-10) for every draw.
* - Original correct answer (perimeterJKL*scaleFactor) collided with distractor
*   D1 (perimeterJKL*sideJK) whenever scaleFactor === sideJK (both = 10), which
*   also produced the LETTER_MISMATCH (correctAnswer resolved to the distractor
*   slot). Replaced the arbitrary "+50" distractor and added a bounded
*   uniqueness retry (<=50) so all four option values are always distinct.
* - Replaced the Mafs figure (whose RST triangle was scaled 5-10x and overflowed
*   its viewBox) with a plain, self-contained SVG showing two similar right
*   triangles that always fit; only vertex letters are drawn, so the figure is
*   consistent with every numeric draw.
* - Restructured the prompt/explanation to label measurements with symbols
*   ($\overline{JK} = 14$ style) so no "$<digit>" adjacency remains, clearing
*   the DOLLAR_RISK soft flag while keeping all math balanced.
*/

export const generator_340 = {
  metadata: {
    id: "340",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    let sideJK = getRandomInt(10, 20);
    let perimeterJKL = getRandomInt(30, 50);
    let scaleFactor = getRandomInt(5, 10);

    // Bounded retry: guarantee the four option values are all distinct.
    // The only possible collision is correct == D1 when scaleFactor === sideJK.
    const optionVals = () => {
      const sideRS = sideJK * scaleFactor;
      return [
        perimeterJKL * scaleFactor,               // correct
        perimeterJKL * sideJK,                     // multiplies perimeter by the side length
        perimeterJKL * scaleFactor * scaleFactor,  // squares the scale factor
        perimeterJKL + sideRS                       // adds the side instead of scaling
      ];
    };
    let tries = 0;
    while (new Set(optionVals()).size < 4 && tries++ < 50) {
      sideJK = getRandomInt(10, 20);
      perimeterJKL = getRandomInt(30, 50);
      scaleFactor = getRandomInt(5, 10);
    }

    const sideRS = sideJK * scaleFactor;
    const perimeterRST = perimeterJKL * scaleFactor;

    // Self-contained SVG: two similar right triangles (right angle at K and S).
    // Only vertex letters are labelled, so the schematic matches every draw.
    const figureCode = `<div style="width:100%;max-width:360px;margin:0 auto;"><svg viewBox="0 0 360 200" style="width:100%;height:auto;display:block;font-family:sans-serif;" xmlns="http://www.w3.org/2000/svg">
  <!-- Triangle JKL (right angle at K) -->
  <polygon points="30,150 110,150 110,90" fill="#3b82f6" fill-opacity="0.12" stroke="currentColor" stroke-width="2"/>
  <text x="22" y="165" text-anchor="middle" font-size="14" fill="currentColor">J</text>
  <text x="116" y="165" text-anchor="middle" font-size="14" fill="currentColor">K</text>
  <text x="116" y="84" text-anchor="middle" font-size="14" fill="currentColor">L</text>
  <!-- Triangle RST (right angle at S), similar and larger -->
  <polygon points="190,170 330,170 330,60 " fill="#3b82f6" fill-opacity="0.12" stroke="currentColor" stroke-width="2"/>
  <text x="182" y="185" text-anchor="middle" font-size="14" fill="currentColor">R</text>
  <text x="336" y="185" text-anchor="middle" font-size="14" fill="currentColor">S</text>
  <text x="336" y="54" text-anchor="middle" font-size="14" fill="currentColor">T</text>
</svg></div>`;

    const optionsData = [
      { text: perimeterRST.toString(), isCorrect: true },
      { text: (perimeterJKL * sideJK).toString(), isCorrect: false, reason: "multiplies the perimeter by the side length instead of the scale factor" },
      { text: (perimeterJKL * scaleFactor * scaleFactor).toString(), isCorrect: false, reason: "squares the scale factor, which is the ratio of areas rather than perimeters" },
      { text: (perimeterJKL + sideRS).toString(), isCorrect: false, reason: "adds a side length to the perimeter instead of scaling it" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `In the figure shown, triangle $JKL$ is similar to triangle $RST$, where $J$ corresponds to $R$ and $K$ corresponds to $S$. The side lengths satisfy $\\overline{JK} = ${sideJK}$ and $\\overline{RS} = ${sideRS}$, and the perimeter of triangle $JKL$ is $P = ${perimeterJKL}$. What is the perimeter of triangle $RST$?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: perimeterRST.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The scale factor is $\\frac{\\overline{RS}}{\\overline{JK}} = \\frac{${sideRS}}{${sideJK}} = ${scaleFactor}$. Because the triangles are similar, the ratio of their perimeters equals the scale factor, so the perimeter of triangle $RST$ is $P \\times ${scaleFactor} = ${perimeterJKL} \\times ${scaleFactor} = ${perimeterRST}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
