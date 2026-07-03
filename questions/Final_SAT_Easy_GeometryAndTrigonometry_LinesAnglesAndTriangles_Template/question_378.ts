import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 378
 *
 * Intent: Transversal c cuts parallel lines s and t. The angle x and the given
 * angle are consecutive interior (same-side interior) angles, so they are
 * supplementary: x + givenAngle = 180, giving x = 180 - givenAngle.
 *
 * FIX ANALYSIS:
 * - Old options {180-g, g, g-20, 90} collided: (180-g)==(g-20) at g=100 and
 *   (g-20)==90 at g=110. Replaced the g-20 distractor with (x-10); the set
 *   {180-g, g, 90, x-10} is verified collision-free over g in [100,140].
 * - Rebuilt the explanation to name the correct choice by its shuffled LETTER
 *   and to explain each distractor (previously it used the option's number and
 *   gave no distractor reasoning).
 * - Cleared DOLLAR_RISK: the given measure appears in prose with a degree sign,
 *   so no math segment begins with a digit.
 * - Figure rebuilt as plain SVG (house style) with both marked angles on the
 *   same side of the transversal in the interior strip between s and t.
 */

export const generator_378 = {
  metadata: {
    id: "378",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const givenAngle = getRandomInt(100, 140);
    const xValue = 180 - givenAngle; // consecutive interior angles are supplementary

    // Distractors constructed pairwise-distinct from the answer and each other
    // across the entire [100,140] range (verified exhaustively).
    const dGiven = givenAngle;      // uses the given angle directly (thinks equal)
    const dRight = 90;              // assumes a right angle
    const dMisread = xValue - 10;   // careless arithmetic

    // Plain SVG figure (house style): transversal c cutting parallel lines s and
    // t, with the given angle and x as same-side interior angles.
    const figureCode = `
      <div style="display:flex;justify-content:center;">
      <svg viewBox="0 0 460 260" style="width:100%;max-width:460px;height:auto;font-family:sans-serif;user-select:none;" role="img" aria-label="Transversal cutting two parallel lines">
        <!-- Parallel line s (top) -->
        <line x1="20" y1="70" x2="440" y2="70" stroke="currentColor" stroke-width="2" />
        <text x="28" y="62" font-size="16" font-style="italic" fill="currentColor">s</text>
        <!-- Parallel line t (bottom) -->
        <line x1="20" y1="190" x2="440" y2="190" stroke="currentColor" stroke-width="2" />
        <text x="28" y="210" font-size="16" font-style="italic" fill="currentColor">t</text>
        <!-- Transversal c -->
        <line x1="160" y1="10" x2="320" y2="250" stroke="currentColor" stroke-width="2" />
        <text x="315" y="245" font-size="16" font-style="italic" fill="currentColor">c</text>
        <!-- Given angle: same-side interior, at the top intersection -->
        <text x="163" y="92" font-size="16" fill="currentColor">${givenAngle}&#176;</text>
        <!-- x: same-side interior, at the bottom intersection -->
        <text x="248" y="174" font-size="16" fill="currentColor">x&#176;</text>
      </svg>
      </div>
    `;

    const correctAnswer = xValue.toString();

    const optionsData = [
      { text: correctAnswer, isCorrect: true },
      { text: dGiven.toString(), isCorrect: false, reason: "uses the given angle directly instead of its supplement" },
      { text: dRight.toString(), isCorrect: false, reason: "assumes a right angle instead of using supplementary angles" },
      { text: dMisread.toString(), isCorrect: false, reason: "subtracts too much from 180" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure shown, line $c$ intersects parallel lines $s$ and $t$. What is the value of $x$?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. The angle $x$ and the given angle of ${givenAngle}° are consecutive interior angles (same-side interior angles). When parallel lines are cut by a transversal, consecutive interior angles are supplementary, so $x + ${givenAngle} = 180$, which gives $x = ${xValue}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
