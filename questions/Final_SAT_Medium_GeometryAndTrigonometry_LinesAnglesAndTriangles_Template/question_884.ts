import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 884
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angles: 45-65 degrees]
 * - Difficulty factors: [Triangle sum, solving for variable in angle expression]
 * - Distractor patterns: [A: value of k/2, B: unrelated, D: doubled incorrectly]
 * - Constraints: [Sum = 180, solve for k]
 * - Question type: [No Figure->Multiple Choice Text]
 * - Figure generation: [null]
 *
 * REBUILD NOTES:
 * - angle A = a in [45,65], angle B = 90, angle C = (k/2). Sum 180:
 *     a + 90 + k/2 = 180  =>  k/2 = 90 - a  =>  k = 180 - 2a  (= 2*halfK).
 * - Distractors are derived from live `a` and are pairwise distinct AND distinct
 *   from the correct answer for EVERY a in [45,65] (verified algebraically):
 *     d1 = 90 - a    (reports k/2 = angle C instead of k)         [25..45]
 *     d2 = 360 - 2a  (drops the 90 right angle: a + k/2 = 180)    [230..270]
 *     d3 = 90 + a    (adds instead of subtracting)                [135..155]
 *   correct = 180 - 2a in [50..90]. No two of {correct,d1,d2,d3} coincide
 *   anywhere in range, so no duplicate-option risk and no retry needed.
 */

export const generator_884 = {
  metadata: {
    id: "884",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Angle A in [45,65]; right angle at B; angle C = (k/2).
    const angleA = getRandomInt(45, 65);
    const halfK = 90 - angleA;   // measure of angle C = k/2
    const k = 2 * halfK;         // 180 - 2*angleA

    // STEP 2: Distractors from live variables — pairwise distinct across range.
    const d1 = 90 - angleA;      // answered k/2 instead of k
    const d2 = 360 - 2 * angleA; // ignored the 90 degree angle
    const d3 = 90 + angleA;      // added instead of subtracting

    const optionsData = [
      { text: d1.toString(), isCorrect: false, reason: "is the value of $\\frac{k}{2}$ (the measure of angle $C$), not $k$" },
      { text: d2.toString(), isCorrect: false, reason: "comes from omitting the $90^{\\circ}$ right angle when applying the triangle angle sum" },
      { text: k.toString(), isCorrect: true },
      { text: d3.toString(), isCorrect: false, reason: "comes from adding instead of subtracting the given angles" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `In triangle $ABC$, the measure of angle $A$ is $${angleA}^{\\circ}$, the measure of angle $B$ is $90^{\\circ}$, and the measure of angle $C$ is $\\left(\\frac{k}{2}\\right)^{\\circ}$. What is the value of $k$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: k.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The sum of the interior angles of a triangle is $180^{\\circ}$. The interior angles of triangle $ABC$ are $${angleA}^{\\circ}$, $90^{\\circ}$, and $\\left(\\frac{k}{2}\\right)^{\\circ}$, so $${angleA}+90+\\frac{k}{2}=180$, or $${angleA + 90}+\\frac{k}{2}=180$. Subtracting $${angleA + 90}$ from each side gives $\\frac{k}{2}=${halfK}$, and multiplying each side by $2$ gives $k=${k}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
