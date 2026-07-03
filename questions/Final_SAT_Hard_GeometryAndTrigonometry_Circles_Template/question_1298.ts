import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1298
 * Skill: Circles (Unit Circle Coordinates)
 * Difficulty: Hard
 *
 * Description: Identify the angle measure corresponding to coordinates (-1, 0)
 * on the unit circle. The measure must be an odd multiple of pi.
 * Fixes:
 * - correctAnswer now carries $...$ delimiters so it matches an option exactly
 *   (was raw LaTeX -> CORRECT_MISMATCH).
 * - Rebuilt distractors: the old fourth distractor (evenN*pi/2) reduced to an
 *   ODD multiple of pi for half the draws, giving a SECOND valid answer. The
 *   new distractors (even*pi, n*pi/2, n*pi/4) are provably never odd multiples
 *   of pi, so exactly one option is correct for every draw.
 * - Reworded explanation so no inline-math segment starts with a digit
 *   (clears DOLLAR_RISK) and each distractor is explained.
 */
export const generator_1298 = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // ----------------------------------------------------------------------
    // 1. CORRECT ANSWER: an odd multiple of pi lands at (-1, 0).
    // ----------------------------------------------------------------------
    let n = getRandomInt(11, 29);
    if (n % 2 === 0) n++; // force odd; range stays 11..29 (29 is odd, no overflow)

    const correctLatex = `${n}\\pi`;
    const correctOption = `$${correctLatex}$`;

    // ----------------------------------------------------------------------
    // 2. DISTRACTORS (none is an odd multiple of pi, so none is a valid answer)
    //   - evenN*pi : even multiple -> lands back at (1, 0)
    //   - n*pi/2   : half-integer coefficient (n odd) -> lands on the y-axis
    //   - n*pi/4   : quarter turn (n odd) -> lands off the axes
    // All three strings are distinct from each other and from the answer for
    // every n in the range, so no retry guard is required.
    // ----------------------------------------------------------------------
    const evenN = n + 1;
    const distractorA = `${evenN}\\pi`;
    const distractorB = `\\frac{${n}\\pi}{2}`;
    const distractorC = `\\frac{${n}\\pi}{4}`;

    // ----------------------------------------------------------------------
    // 3. OPTIONS
    // ----------------------------------------------------------------------
    const optionsData = [
      { text: correctOption, isCorrect: true },
      { text: `$${distractorA}$`, isCorrect: false },
      { text: `$${distractorB}$`, isCorrect: false },
      { text: `$${distractorC}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const byText = (t: string) => shuffledOptions.find(o => o.text === t)!.letter;
    const letterA = byText(`$${distractorA}$`);
    const letterB = byText(`$${distractorB}$`);
    const letterC = byText(`$${distractorC}$`);

    return {
      questionText: `Point $F$ lies on the unit circle in the $xy$-plane and has coordinates $(1,0)$. Point $G$ is the center of the circle and has coordinates $(0,0)$. Point $H$ also lies on the circle and has coordinates $(-1, y)$, where $y$ is a constant. Which of the following could be the positive measure of angle $FGH$, in radians?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption,
      explanation: `
        Choice ${correctLetter} is correct.
        <br/><br/>
        <b>Locate $H$.</b> Because $H$ is on the unit circle, $x^2 + y^2 = 1$. With $x = -1$:
        $$ (-1)^2 + y^2 = 1 \\;\\Rightarrow\\; y^2 = 0 \\;\\Rightarrow\\; y = 0, $$
        so $H$ is at $(-1, 0)$.
        <br/>
        <b>Find the angle.</b> Rotating from $F$ on the positive $x$-axis to $H$ on the negative $x$-axis is a half turn, $\\pi$ radians. Every coterminal direction has the form $\\pi + 2\\pi k$, which equals $(2k+1)\\pi$ — the odd multiples of $\\pi$.
        <br/>
        Choice ${correctLetter} has an odd coefficient of $\\pi$ (here $n = ${n}$), so it points at $(-1, 0)$ and is a valid measure.
        <br/><br/>
        Choice ${letterA} is incorrect: an even multiple of $\\pi$ returns to $(1, 0)$, the location of $F$.
        <br/>
        Choice ${letterB} is incorrect: a coefficient of $\\pi$ equal to $\\frac{n}{2}$ (a half-integer) points along the $y$-axis, at $(0, 1)$ or $(0, -1)$.
        <br/>
        Choice ${letterC} is incorrect: a quarter-turn multiple of $\\pi$ lands off the axes entirely, not at $(-1, 0)$.
      `
    };
  }
};
