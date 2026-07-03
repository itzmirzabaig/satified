import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 353
*
* ORIGINAL ANALYSIS:
* - Number ranges: [angle: 25-50]
* - Difficulty factors: [Parallel lines, same-side exterior angles, supplementary angles]
* - Distractor patterns: [Same angle, complementary assumption, calculation error]
* - Constraints: [x + givenAngle = 180]
* - Question type: [Figure→Multiple Choice Text]
*
* FIXED:
* - Old distractors collided at givenAngle = 45: (90 - g) equaled g, and
*   (90 + g) equaled the correct answer (180 - g), causing DUP_OPTIONS and the
*   downstream LETTER_MISMATCH. Rebuilt so all four options are distinct for
*   every draw in [25, 50]:
*     correct = 180 - g            (in [130, 155])
*     d1      = g                  (congruent misconception, in [25, 50])
*     d2      = 90 - g             (complementary misconception, in [40, 65];
*                                   nudged if it equals d1 at g = 45)
*     d3      = arithmetic slip on the correct answer, kept >= 100 so it can
*               never collide with d1/d2, and != correct.
*/

export const generator_353 = {
  metadata: {
    id: "353",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const givenAngle = getRandomInt(25, 50);
    const xValue = 180 - givenAngle; // correct answer, in [130, 155]

    // Two parallel lines cut by a transversal - same-side exterior angles.
    const mafsCode = `<Mafs viewBox={{ x: [-3, 5], y: [-2, 3] }}>
  <!-- Parallel line m (top) -->
  <Line.Segment point1={[-2, 1.5]} point2={[4, 1.5]} color="var(--mafs-foreground)" />

  <!-- Parallel line n (bottom) -->
  <Line.Segment point1={[-2, -0.5]} point2={[4, -0.5]} color="var(--mafs-foreground)" />

  <!-- Transversal line t -->
  <Line.Segment point1={[-1, -1.5]} point2={[3, 2.5]} color="var(--mafs-foreground)" />

  <!-- Angle labels -->
  <Text x={2.5} y={2}>${givenAngle}°</Text>
  <Text x={-0.5} y={0}>x°</Text>
</Mafs>`;

    const correctAnswer = xValue.toString();

    // Concept distractors (both always < correct).
    const dCongruent = givenAngle;          // thinks the angles are congruent
    let dComplement = 90 - givenAngle;      // wrongly assumes a complementary pair
    if (dComplement === dCongruent) dComplement += 5; // only at g = 45; stays in range and distinct

    // Arithmetic-slip distractor near the correct answer, guaranteed distinct
    // from correct and kept >= 100 so it cannot collide with the two concept
    // distractors (which are <= 65).
    const used = new Set<number>([xValue, dCongruent, dComplement]);
    let dSlip = 0;
    let tries = 0;
    while (tries++ < 50) {
      const delta = getRandomInt(1, 9) * (Math.random() < 0.5 ? -1 : 1);
      const candidate = xValue + delta;
      if (candidate >= 100 && candidate < 180 && !used.has(candidate)) { dSlip = candidate; break; }
    }
    if (dSlip === 0) {
      let filler = 1;
      while (used.has(xValue + filler)) filler++;
      dSlip = xValue + filler;
    }

    const optionsData = [
      { text: dCongruent.toString(), isCorrect: false, reason: "uses the given angle, assuming the two angles are congruent rather than supplementary" },
      { text: dComplement.toString(), isCorrect: false, reason: "incorrectly assumes the two angles are complementary" },
      { text: dSlip.toString(), isCorrect: false, reason: "makes an arithmetic error when subtracting from 180" },
      { text: correctAnswer, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure, line $m$ is parallel to line $n$, and line $t$ intersects both lines. What is the value of $x$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. When two parallel lines are cut by a transversal, same-side exterior angles are supplementary, so their measures add to 180 degrees. This gives $x + ${givenAngle} = 180$, so $x = 180 - ${givenAngle} = ${correctAnswer}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
