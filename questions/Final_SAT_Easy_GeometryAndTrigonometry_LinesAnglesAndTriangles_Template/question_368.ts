import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 368
 *
 * Intent: Triangles EFG and JKL are congruent with E<->J, F<->K, G<->L.
 * Corresponding angles are equal, so m(J) = m(E). Conceptual, no figure.
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angle E: 30-80, angle F: 20-50]
 * - Difficulty factors: [Congruent triangles, corresponding angles, vertex correspondence]
 * - Distractor patterns: [Wrong correspondence, supplementary angle errors]
 * - Constraints: [Angles must sum to less than 180]
 *
 * FIX ANALYSIS:
 * - DUP_OPTIONS / LETTER_MISMATCH: when angleE == angleF (ranges overlap on
 *   [30,50]) the correct answer (angleE) collided with distractorA (angleF),
 *   and simultaneously distractorC (180-E) collided with distractorD (180-F).
 *   That also made correctAnswer match two options, so findIndex resolved the
 *   wrong slot and the explanation letter was wrong. Added a bounded retry
 *   (<=50) forcing angleF != angleE, which removes both collisions.
 * - DOLLAR_RISK: rewrote every math span so it begins with a letter/command
 *   (e.g. "$m\angle E = 45^\circ$") rather than "$45^\circ$", so no "$<digit>"
 *   sequence exists to be mistaken for currency.
 */

export const generator_368 = {
  metadata: {
    id: "368",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const angleE = getRandomInt(30, 80);
    let angleF = getRandomInt(20, 50);
    // Guard: angleF must differ from angleE so no two options coincide.
    let tries = 0;
    while (tries++ < 50 && angleF === angleE) {
      angleF = getRandomInt(20, 50);
    }

    const correctAngle = angleE;
    const distractorA = angleF;          // wrong correspondence (uses angle F)
    const distractorC = 180 - angleE;    // supplementary-angle error on E
    const distractorD = 180 - angleF;    // supplementary-angle error on F

    const optionsData = [
      { text: `${distractorA}^{\\circ}`, isCorrect: false, reason: "uses the measure of angle F, an incorrect correspondence" },
      { text: `${correctAngle}^{\\circ}`, isCorrect: true },
      { text: `${distractorC}^{\\circ}`, isCorrect: false, reason: "subtracts the measure of angle E from 180 (supplementary-angle error)" },
      { text: `${distractorD}^{\\circ}`, isCorrect: false, reason: "subtracts the measure of angle F from 180 (supplementary-angle error)" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `Triangles $EFG$ and $JKL$ are congruent, where $E$, $F$, and $G$ correspond to $J$, $K$, and $L$, respectively. In triangle $EFG$, $m\\angle E = ${angleE}^{\\circ}$ and $m\\angle F = ${angleF}^{\\circ}$. What is the measure of angle $J$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${correctAngle}^{\\circ}`,
      explanation: `Choice ${correctOption.letter} is correct. Because triangle $EFG$ is congruent to triangle $JKL$ with correspondence $E \\leftrightarrow J$, $F \\leftrightarrow K$, $G \\leftrightarrow L$, corresponding angles are equal. Therefore $m\\angle J = m\\angle E = ${correctAngle}^{\\circ}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
