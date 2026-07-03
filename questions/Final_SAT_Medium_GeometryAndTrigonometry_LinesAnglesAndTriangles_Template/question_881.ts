import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 881
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [vertex angle: 40-60 degrees]
 * - Difficulty factors: [Isosceles triangle cases, angle sum constraint]
 * - Distractor patterns: [A: valid case (base=vertex), B: valid case (A is vertex), C: valid case (A is base)]
 * - Constraints: [All valid cases must sum to 180, two angles must be equal]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [null]
 *
 * REBUILD NOTES:
 * - Given angle A = a (even, 40..58) in an isosceles triangle ABC, the three
 *   POSSIBLE measures of angle B are exactly:
 *     P1 = a            (B equals A; then C = 180 - 2a)
 *     P2 = 180 - 2a     (A and C are the base pair, so A = C = a, B is apex)
 *     P3 = (180 - a)/2  (A is apex, so B = C = (180-a)/2)
 *   These three collide with each other ONLY at a = 60, so restricting a to
 *   even values in [40,58] makes all three distinct integers for every draw.
 * - The NOT-possible answer (correct choice) is invalidB in [85,95], chosen by
 *   bounded retry so the triangle (a, invalidB, 180-a-invalidB) has NO two
 *   equal angles (i.e. is not isosceles), and so it differs from P1/P2/P3.
 */

export const generator_881 = {
  metadata: {
    id: "881",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Given angle A, even in [40,58] so (180-a)/2 is an integer and the
    // three possible B-values never collide (they coincide only at a = 60).
    const angleA = getRandomInt(20, 29) * 2; // 40, 42, ..., 58

    // The three genuinely possible measures of angle B (all distinct integers).
    const p1 = angleA;                 // B = A
    const p2 = 180 - 2 * angleA;       // B is apex; A = C = a
    const p3 = (180 - angleA) / 2;     // A is apex; B = C

    // STEP 2: Choose the NOT-possible value of angle B. Bounded retry ensures the
    // resulting triangle has no two equal angles, so it is not isosceles and its
    // value differs from every possible measure p1/p2/p3.
    let invalidB = getRandomInt(85, 95);
    let tries = 0;
    while (
      tries++ < 50 &&
      (() => {
        const angleC = 180 - angleA - invalidB;          // third angle
        const isIsosceles =
          angleA === invalidB || angleA === angleC || invalidB === angleC;
        const collides = invalidB === p1 || invalidB === p2 || invalidB === p3;
        return angleC <= 0 || isIsosceles || collides;
      })()
    ) {
      invalidB = getRandomInt(85, 95);
    }
    const invalidC = 180 - angleA - invalidB;

    // STEP 3: Build options. Reasons are computed from the live possible values.
    const optionsData = [
      {
        text: `$${p1}^{\\circ}$`,
        isCorrect: false,
        reason: `is possible when angle $B$ equals angle $A$, making angle $C$ measure $${180 - 2 * angleA}^{\\circ}$`
      },
      {
        text: `$${p2}^{\\circ}$`,
        isCorrect: false,
        reason: `is possible when angle $B$ is the vertex angle and angles $A$ and $C$ are the equal base angles`
      },
      {
        text: `$${p3}^{\\circ}$`,
        isCorrect: false,
        reason: `is possible when angle $A$ is the vertex angle and angle $B$ equals angle $C$`
      },
      { text: `$${invalidB}^{\\circ}$`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `In triangle $ABC$, the measure of angle $A$ is $${angleA}^{\\circ}$. If triangle $ABC$ is isosceles, which of the following is NOT a possible measure of angle $B$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$${invalidB}^{\\circ}$`,
      explanation: `Choice ${correctOption.letter} is correct. The sum of the three interior angles in a triangle is $180^{\\circ}$. It's given that angle $A$ measures $${angleA}^{\\circ}$. If angle $B$ measured $${invalidB}^{\\circ}$, then angle $C$ would measure $180^{\\circ}-(${angleA}^{\\circ}+${invalidB}^{\\circ})=${invalidC}^{\\circ}$, so the three angles would be $${angleA}^{\\circ}$, $${invalidB}^{\\circ}$, and $${invalidC}^{\\circ}$. An isosceles triangle must have two angles of equal measure, but no two of these are equal, so angle $B$ can't measure $${invalidB}^{\\circ}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
