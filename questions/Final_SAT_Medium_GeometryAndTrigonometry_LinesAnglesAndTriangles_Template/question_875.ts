import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 875
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angle: 40-60 degrees]
 * - Difficulty factors: [Similar triangles, corresponding angles]
 * - Distractor patterns: [A: complementary angle, C: supplement, D: impossible angle]
 * - Constraints: [Corresponding angles in similar triangles are congruent]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [null]
 */

export const generator_875 = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random angle.
    // At angleM = 45 the complement (90 - angleM) equals angleM, and
    // (180 - complement) equals (180 - angleM); both would make options collide.
    // Reroll to keep all four options distinct for every draw.
    let angleM = getRandomInt(40, 60);
    let guard = 0;
    while (angleM === 45 && guard++ < 50) {
      angleM = getRandomInt(40, 60);
    }
    const complement = 90 - angleM;      // other acute angle: in [30,44] ∪ [46,50]
    const supplement = 180 - angleM;     // in [120,140]
    const supplementC = 180 - complement; // = 90 + angleM, in [130,134] ∪ [136,150]

    // STEP 2: Create options. Each renders as "$<value>^{\circ}$" so the
    // correctAnswer can equal the correct option's text exactly.
    const correctText = `$${angleM}^{\\circ}$`;

    const optionsData = [
      { text: `$${complement}^{\\circ}$`, isCorrect: false, reason: "is the measure of the other acute angle in the right triangle, not the corresponding angle" },
      { text: correctText, isCorrect: true },
      { text: `$${supplement}^{\\circ}$`, isCorrect: false, reason: "is the supplement of angle $M$, which is impossible for an interior angle of a right triangle" },
      { text: `$${supplementC}^{\\circ}$`, isCorrect: false, reason: "is impossible for an interior angle of a right triangle" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      // "$m\angle M = 55^{\circ}$" — no math segment starts with "$<digit>".
      questionText: `Right triangles $LMN$ and $PQR$ are similar, where $L$ and $M$ correspond to $P$ and $Q$, respectively. In triangle $LMN$, $m\\angle M = ${angleM}^{\\circ}$. What is the measure of angle $Q$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Because right triangles $LMN$ and $PQR$ are similar with $M$ corresponding to $Q$, and corresponding angles of similar triangles are congruent, $m\\angle Q = m\\angle M = ${angleM}^{\\circ}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
