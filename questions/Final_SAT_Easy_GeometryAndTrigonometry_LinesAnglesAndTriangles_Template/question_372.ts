import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 372
 *
 * Intent: A triangle is formed with its apex on one of two parallel lines and
 * its base on the other. Given two interior angles (y and z), find the third
 * interior angle x using the triangle angle-sum theorem: x + y + z = 180.
 *
 * FIX ANALYSIS:
 * - Distractors could collide with the correct answer and with each other
 *   (e.g. when y+z=90 the answer x=90 equaled the fixed "90" distractor and the
 *   "180-x" distractor; when y=z the two supplement distractors matched). Now
 *   the draw is retried (bounded, <=50) until the answer and all three
 *   distractors are pairwise distinct.
 * - Explanation letters are read from the shuffled array; each distractor is
 *   explained by its live reason.
 * - Figure rebuilt as a plain, self-contained SVG (house style) whose angle
 *   labels sit at the correct vertices.
 */

export const generator_372 = {
  metadata: {
    id: "372",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Draw two interior angles; retry (bounded) until the answer and all three
    // distractors are pairwise distinct across the full declared ranges.
    let y = 0, z = 0, x = 0;
    let dSuppZ = 0, dSuppY = 0, dSum = 0;
    let tries = 0;
    do {
      y = getRandomInt(15, 40);
      z = getRandomInt(40, 70);
      x = 180 - y - z;               // correct: third interior angle
      dSuppZ = 180 - z;              // supplement of z (common error)
      dSuppY = 180 - y;              // supplement of y (common error)
      dSum = y + z;                  // 180 - x: "forgot to subtract from 180"
      tries++;
    } while (
      tries < 50 &&
      new Set([x, dSuppZ, dSuppY, dSum]).size !== 4
    );

    // Plain SVG figure (house style): two parallel lines with a triangle whose
    // apex is on the top line and whose base sits on the bottom line.
    const figureCode = `
      <div style="display:flex;justify-content:center;">
      <svg viewBox="0 0 460 260" style="width:100%;max-width:460px;height:auto;font-family:sans-serif;user-select:none;" role="img" aria-label="Triangle formed between two parallel lines">
        <!-- Top parallel line (ell) -->
        <line x1="20" y1="60" x2="440" y2="60" stroke="currentColor" stroke-width="2" />
        <text x="30" y="50" font-size="16" font-style="italic" fill="currentColor">&#8467;</text>
        <!-- Bottom parallel line (m) -->
        <line x1="20" y1="210" x2="440" y2="210" stroke="currentColor" stroke-width="2" />
        <text x="30" y="230" font-size="16" font-style="italic" fill="currentColor">m</text>
        <!-- Triangle sides -->
        <line x1="230" y1="60" x2="110" y2="210" stroke="currentColor" stroke-width="2" />
        <line x1="230" y1="60" x2="350" y2="210" stroke="currentColor" stroke-width="2" />
        <!-- Vertex angle labels -->
        <text x="222" y="86" font-size="16" fill="currentColor">x&#176;</text>
        <text x="120" y="200" font-size="16" fill="currentColor">y&#176;</text>
        <text x="326" y="200" font-size="16" fill="currentColor">z&#176;</text>
      </svg>
      </div>
    `;

    const correctAnswer = x.toString();

    const optionsData = [
      { text: dSuppZ.toString(), isCorrect: false, reason: "finds the supplement of z instead of using the triangle angle sum" },
      { text: correctAnswer, isCorrect: true },
      { text: dSuppY.toString(), isCorrect: false, reason: "finds the supplement of y instead of using the triangle angle sum" },
      { text: dSum.toString(), isCorrect: false, reason: "adds y and z but forgets to subtract that sum from 180" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure above, lines $\\ell$ and $m$ are parallel. The triangle has interior angles $x^{\\circ}$, $y^{\\circ}$, and $z^{\\circ}$, where $y=${y}$ and $z=${z}$. What is the value of $x$?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. The three angles $x^{\\circ}$, $y^{\\circ}$, and $z^{\\circ}$ are the interior angles of the triangle, so by the triangle angle-sum theorem $x + y + z = 180$. Substituting the given values, $x = 180 - (${y} + ${z}) = ${correctAnswer}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
