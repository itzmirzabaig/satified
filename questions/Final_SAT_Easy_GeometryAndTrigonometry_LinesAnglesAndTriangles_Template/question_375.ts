import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 375
 *
 * Intent: Two parallel lines m and n are cut by a transversal. A given angle and
 * the angle w sit in matching (corresponding) positions, so corresponding angles
 * are congruent and w = givenAngle.
 *
 * FIX ANALYSIS:
 * - Old distractors {round(g/10), 180-g-12, 180-g} collided (round(g/10) equalled
 *   180-g-12 at g=153) and were pedagogically weak. Replaced with meaningful,
 *   pairwise-distinct distractors {180-g (supplementary error), g-10 (misread),
 *   90 (right-angle assumption)} — verified collision-free over g in [110,160].
 * - Explanation letters read from the shuffled array; each distractor explained.
 * - Cleared DOLLAR_RISK: the given measure is written in prose with a degree sign
 *   so no math segment begins with a digit (no bare $number for MathJax to pair).
 * - Figure rebuilt as plain SVG (house style) with the two marked angles in
 *   matching upper-right corners of the two intersections.
 */

export const generator_375 = {
  metadata: {
    id: "375",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const givenAngle = getRandomInt(110, 160);

    // Distractors are constructed to be pairwise distinct from the answer and
    // from each other across the entire [110,160] range (verified exhaustively).
    const dSupp = 180 - givenAngle; // treats the pair as supplementary
    const dMisread = givenAngle - 10; // careless misread of the figure
    const dRight = 90; // assumes a right angle

    // Plain SVG figure (house style): two parallel lines cut by a transversal,
    // with the given angle and w in corresponding (matching) positions.
    const figureCode = `
      <div style="display:flex;justify-content:center;">
      <svg viewBox="0 0 460 260" style="width:100%;max-width:460px;height:auto;font-family:sans-serif;user-select:none;" role="img" aria-label="Two parallel lines cut by a transversal">
        <!-- Parallel line m (top) -->
        <line x1="20" y1="70" x2="440" y2="70" stroke="currentColor" stroke-width="2" />
        <text x="28" y="62" font-size="16" font-style="italic" fill="currentColor">m</text>
        <!-- Parallel line n (bottom) -->
        <line x1="20" y1="190" x2="440" y2="190" stroke="currentColor" stroke-width="2" />
        <text x="28" y="210" font-size="16" font-style="italic" fill="currentColor">n</text>
        <!-- Transversal -->
        <line x1="160" y1="10" x2="320" y2="250" stroke="currentColor" stroke-width="2" />
        <!-- Given angle at the top intersection (upper-right) -->
        <text x="210" y="58" font-size="16" fill="currentColor">${givenAngle}&#176;</text>
        <!-- w at the bottom intersection (upper-right, corresponding position) -->
        <text x="292" y="178" font-size="16" fill="currentColor">w&#176;</text>
      </svg>
      </div>
    `;

    const correctAnswer = givenAngle.toString();

    const optionsData = [
      { text: dSupp.toString(), isCorrect: false, reason: "treats the two angles as supplementary rather than corresponding" },
      { text: dMisread.toString(), isCorrect: false, reason: "misreads the figure and subtracts 10 from the given measure" },
      { text: dRight.toString(), isCorrect: false, reason: "assumes a right angle instead of using corresponding angles" },
      { text: correctAnswer, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure, line $m$ is parallel to line $n$ and both are cut by a transversal. What is the value of $w$?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. The given angle of ${givenAngle}° and the angle $w$ lie in matching positions at the two intersections, so they are corresponding angles. When two parallel lines are cut by a transversal, corresponding angles are congruent, so $w = ${givenAngle}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
