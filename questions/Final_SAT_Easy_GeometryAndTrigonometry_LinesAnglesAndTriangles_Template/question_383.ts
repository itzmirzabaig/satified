import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 383
*
* ORIGINAL ANALYSIS:
* - Number ranges: [angle X: 20-35, angle Y: 50-70]
* - Difficulty factors: [Triangle angle sum, straightforward calculation]
* - Distractor patterns: [Subtraction error, calculation error, sum of X and Y]
* - Constraints: [Standard triangle, sum = 180]
* - Question type: [Conceptual (no figure)→Multiple Choice Text]
*
* FIX ANALYSIS:
* - Wrapped every option and the correctAnswer in $...$ so the `^{\circ}`
*   renders as math instead of literal text (was raw `55^{\circ}`).
* - Bounded retry (<=50) redraws the angles until all four option values are
*   distinct, eliminating DUP_OPTIONS (correct==sum when X+Y=90, and
*   distractorB==sum when X+Y=89) and the LETTER_MISMATCH cascade it caused.
* - Rephrased questionText/explanation so no `$` is immediately followed by a
*   digit while another `$` starts with a backslash (kills DOLLAR_RISK).
*/

export const generator_383 = {
  metadata: {
    id: "383",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Draw the two given angles; redraw until the four option VALUES are all
    // distinct so no distractor collides with the answer or another distractor.
    let angleX = 0, angleY = 0, angleZ = 0;
    let distractorA = 0, distractorB = 0, distractorD = 0;
    let tries = 0;
    do {
      angleX = getRandomInt(20, 35);
      angleY = getRandomInt(50, 70);
      angleZ = 180 - angleX - angleY;          // third angle (the answer)
      distractorA = angleY - angleX;           // subtracts X from Y erroneously
      distractorB = angleZ - 2;                 // small calculation slip
      distractorD = angleX + angleY;            // sums X and Y instead
      tries++;
    } while (
      tries < 50 &&
      new Set([angleZ, distractorA, distractorB, distractorD]).size !== 4
    );

    const correctAnswer = `$${angleZ}^{\\circ}$`;

    const optionsData = [
      { text: `$${distractorA}^{\\circ}$`, isCorrect: false, reason: "subtracts angle X from angle Y instead of finding the third angle" },
      { text: `$${distractorB}^{\\circ}$`, isCorrect: false, reason: "results from a calculation error in the angle sum" },
      { text: correctAnswer, isCorrect: true },
      { text: `$${distractorD}^{\\circ}$`, isCorrect: false, reason: "adds angles X and Y instead of subtracting their sum from 180" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In $\\triangle XYZ$, the measure of $\\angle X = ${angleX}^{\\circ}$ and the measure of $\\angle Y = ${angleY}^{\\circ}$. What is the measure of $\\angle Z$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. The interior angles of a triangle satisfy $\\angle X + \\angle Y + \\angle Z = 180^{\\circ}$, so $\\angle Z = 180^{\\circ} - \\angle X - \\angle Y = 180^{\\circ} - ${angleX}^{\\circ} - ${angleY}^{\\circ} = ${angleZ}^{\\circ}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
