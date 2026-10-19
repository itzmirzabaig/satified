import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 340
*
* ORIGINAL ANALYSIS:
* - Number ranges: [sideJK: 10-20, perimeterJKL: 2*sideJK+2 to 2*sideJK+16, scaleFactor: 5-10]
* - Difficulty factors: [Similar triangles, scale factor from sides applied to perimeter]
* - Distractor patterns: [multiplies perimeter by side, squares the scale factor]
* - Constraints: [Scale factor = RS/JK, RST perimeter = scale factor × JKL perimeter, perimeter > 2 × JK]
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
* - The stem states lengths in words ("The length of JK is 14") instead of
*   setting a segment equal to a number.
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
    // The perimeter must be more than twice JK, or the other two sides could
    // not add up to more than JK (JK = 20 with a perimeter of 30 was possible).
    let sideJK = getRandomInt(10, 20);
    let perimeterJKL = getRandomInt(2 * sideJK + 2, 2 * sideJK + 16);
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
      perimeterJKL = getRandomInt(2 * sideJK + 2, 2 * sideJK + 16);
      scaleFactor = getRandomInt(5, 10);
    }

    const sideRS = sideJK * scaleFactor;
    const perimeterRST = perimeterJKL * scaleFactor;

    // Self-contained SVG: two similar oblique triangles (RST is JKL scaled by
    // 5/3). They used to be drawn as right triangles, which the side lengths
    // do not imply. The scale factor in the problem is 5 to 10, so the figure
    // carries a "not drawn to scale" note. Only vertex letters are labelled.
    const figureCode = `<div style="width:100%;max-width:360px;margin:0 auto;"><svg viewBox="0 0 360 215" style="width:100%;height:auto;display:block;font-family:sans-serif;" xmlns="http://www.w3.org/2000/svg">
  <!-- Triangle JKL -->
  <polygon points="30,150 120,150 80,95" fill="#3b82f6" fill-opacity="0.12" stroke="currentColor" stroke-width="2"/>
  <text x="22" y="165" text-anchor="middle" font-size="14" fill="currentColor">J</text>
  <text x="128" y="165" text-anchor="middle" font-size="14" fill="currentColor">K</text>
  <text x="80" y="87" text-anchor="middle" font-size="14" fill="currentColor">L</text>
  <!-- Triangle RST, similar and larger -->
  <polygon points="180,175 330,175 263,83" fill="#3b82f6" fill-opacity="0.12" stroke="currentColor" stroke-width="2"/>
  <text x="172" y="190" text-anchor="middle" font-size="14" fill="currentColor">R</text>
  <text x="338" y="190" text-anchor="middle" font-size="14" fill="currentColor">S</text>
  <text x="263" y="75" text-anchor="middle" font-size="14" fill="currentColor">T</text>
  <text x="180" y="210" text-anchor="middle" font-size="12" font-style="italic" fill="currentColor">Note: Figure not drawn to scale.</text>
</svg></div>`;

    const fmt = (n: number) => n.toLocaleString('en-US');
    const optionsData = [
      { text: fmt(perimeterRST), isCorrect: true, reason: '' },
      { text: fmt(perimeterJKL * sideJK), isCorrect: false, reason: `it results from multiplying the perimeter of triangle $JKL$ by the length of side $JK$, ${sideJK}, instead of by the scale factor, ${scaleFactor}` },
      { text: fmt(perimeterJKL * scaleFactor * scaleFactor), isCorrect: false, reason: `it results from multiplying the perimeter of triangle $JKL$ by the square of the scale factor, $${scaleFactor}^2$; the square of the scale factor is the ratio of the areas, not the perimeters` },
      { text: fmt(perimeterJKL + sideRS), isCorrect: false, reason: `it results from adding the length of side $RS$, ${sideRS}, to the perimeter of triangle $JKL$ instead of multiplying the perimeter by the scale factor` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `In the figure shown, triangle $JKL$ is similar to triangle $RST$, where $J$ corresponds to $R$ and $K$ corresponds to $S$. The length of $\\overline{JK}$ is ${sideJK}, the length of $\\overline{RS}$ is ${sideRS}, and the perimeter of triangle $JKL$ is ${perimeterJKL}. What is the perimeter of triangle $RST$?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: fmt(perimeterRST),
      explanation: `Choice ${correctOption.letter} is correct. Since $\\overline{RS}$ corresponds to $\\overline{JK}$, the scale factor from triangle $JKL$ to triangle $RST$ is $\\frac{${sideRS}}{${sideJK}} = ${scaleFactor}$. Because the triangles are similar, the ratio of their perimeters equals the scale factor, so the perimeter of triangle $RST$ is $${scaleFactor}(${perimeterJKL}) = ${fmt(perimeterRST)}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
