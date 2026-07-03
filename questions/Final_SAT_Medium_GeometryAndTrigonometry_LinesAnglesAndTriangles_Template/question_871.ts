import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 871
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angles: 25-40, 45-60, 70-85 degrees]
 * - Difficulty factors: [Similar polygons, angle preservation vs side scaling]
 * - Distractor patterns: [A: divided by scale, C: unrelated, D: multiplied by scale]
 * - Constraints: [Corresponding angles are congruent in similar figures]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [null]
 */

export const generator_871 = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const scaleFactor = getRandomInt(2, 4);
    const angleP = getRandomInt(25, 40);
    const angleQ = getRandomInt(45, 60);
    const angleR = getRandomInt(70, 85);

    // STEP 2: Build distractors.
    // Corresponding angles are congruent, so the answer is angleP.
    // distractorA = angleP / scale  (in [6,20], never collides with angleP..angleP+10)
    // distractorD = angleP * scale  (in [50,160], never collides with the above)
    // distractorC = angleP + 10     (an arbitrary shift; distinct from the other two)
    const distractorA = Math.round(angleP / scaleFactor);
    const distractorC = angleP + 10;
    const distractorD = angleP * scaleFactor;

    // Every option renders as a self-contained "$<value>^{\circ}$" string, so the
    // correctAnswer can equal the correct option's text exactly.
    const correctText = `$${angleP}^{\\circ}$`;

    const optionsData = [
      { text: `$${distractorA}^{\\circ}$`, isCorrect: false, reason: "incorrectly divides the angle measure by the scale factor" },
      { text: correctText, isCorrect: true },
      { text: `$${distractorC}^{\\circ}$`, isCorrect: false, reason: "adds an arbitrary value to the angle measure instead of preserving it" },
      { text: `$${distractorD}^{\\circ}$`, isCorrect: false, reason: "incorrectly multiplies the angle measure by the scale factor" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      // Angle measures are written as "$m\angle P = 40^{\circ}$" so no math segment
      // begins with "$<digit>", keeping the currency heuristic clear.
      questionText: `Quadrilateral $P^{\\prime} Q^{\\prime} R^{\\prime} S^{\\prime}$ is similar to quadrilateral $PQRS$, where $P$, $Q$, $R$, and $S$ correspond to $P^{\\prime}$, $Q^{\\prime}$, $R^{\\prime}$, and $S^{\\prime}$, respectively. In quadrilateral $PQRS$, $m\\angle P = ${angleP}^{\\circ}$, $m\\angle Q = ${angleQ}^{\\circ}$, and $m\\angle R = ${angleR}^{\\circ}$. The length of each side of $P^{\\prime} Q^{\\prime} R^{\\prime} S^{\\prime}$ is ${scaleFactor} times the length of each corresponding side of $PQRS$. What is the measure of angle $P^{\\prime}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Since quadrilateral $P^{\\prime} Q^{\\prime} R^{\\prime} S^{\\prime}$ is similar to quadrilateral $PQRS$, the corresponding angles are congruent. Angle $P$ corresponds to angle $P^{\\prime}$, so $m\\angle P^{\\prime} = m\\angle P = ${angleP}^{\\circ}$. The scale factor changes only the side lengths, not the angle measures. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
