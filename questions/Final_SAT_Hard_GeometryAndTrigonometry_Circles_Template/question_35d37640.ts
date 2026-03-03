import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 35d37640
 * Skill: Circles (Unit Circle Coordinates)
 * Difficulty: Hard
 * 
 * Description: Identify the angle measure corresponding to coordinates (-1, 0) on the unit circle.
 * Fixes:
 * - Corrected LaTeX escape sequences for "frac" and "pi".
 * - Ensures n is odd for the correct answer (n*pi).
 */
export const generator_35d37640 = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // ----------------------------------------------------------------------
    // 1. GENERATE CORRECT ANSWER (Odd Multiple of PI)
    // ----------------------------------------------------------------------
    // Point F is (1, 0). G is (0, 0).
    // Point H is (-1, y). On unit circle x^2 + y^2 = 1 -> (-1)^2 + y^2 = 1 -> y=0.
    // So H is (-1, 0).
    // The angle from positive x-axis to (-1, 0) is pi, 3pi, 5pi, etc. (Odd multiples of pi).
    
    let n = getRandomInt(11, 29);
    if (n % 2 === 0) n++; // Ensure n is odd
    
    const correctLatex = `${n}\\pi`;

    // ----------------------------------------------------------------------
    // 2. GENERATE DISTRACTORS
    // ----------------------------------------------------------------------
    
    // Distractor A: Even multiple of pi (lands back at (1, 0))
    const evenN = n + 1;
    const distractorA = `${evenN}\\pi`;
    
    // Distractor B: Half-integer multiple (lands on y-axis, (0, 1) or (0, -1))
    // e.g., n*pi/2
    const distractorB = `\\frac{${n}\\pi}{2}`;

    // Distractor C: Another half-integer multiple
    const distractorC = `\\frac{${evenN}\\pi}{2}`;

    // ----------------------------------------------------------------------
    // 3. OPTIONS
    // ----------------------------------------------------------------------
    const optionsData = [
      { text: `$${correctLatex}$`, isCorrect: true },
      { text: `$${distractorA}$`, isCorrect: false },
      { text: `$${distractorB}$`, isCorrect: false },
      { text: `$${distractorC}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `Point $F$ lies on the unit circle in the $xy$-plane and has coordinates $(1,0)$. Point $G$ is the center of the circle and has coordinates $(0,0)$. Point $H$ also lies on the circle and has coordinates $(-1, y)$, where $y$ is a constant. Which of the following could be the positive measure of angle $FGH$, in radians?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLatex,
      explanation: `
        Choice ${correctLetter} is correct.
        <br/><br/>
        1. <b>Find the coordinates of $H$:</b>
        Since $H$ is on the unit circle ($x^2 + y^2 = 1$) and has an x-coordinate of $-1$:
        $$ (-1)^2 + y^2 = 1 $$
        $$ 1 + y^2 = 1 \\Rightarrow y = 0 $$
        So, $H$ is located at $(-1, 0)$.
        <br/>
        2. <b>Determine the angle:</b>
        The angle starts at the positive x-axis (where $F$ is) and rotates to the negative x-axis (where $H$ is). This is a rotation of $180^\\circ$ or $\\pi$ radians.
        <br/>
        Any angle coterminal with $\\pi$ will land at the same location. These angles are of the form $\\pi + 2\\pi k$, which simplifies to $(2k + 1)\\pi$ (odd multiples of $\\pi$).
        <br/><br/>
        Looking at the options:
        $${correctLatex}$ is an odd multiple of $\\pi$ ($n=${n}$ is odd).
        <br/>
        Therefore, this is a possible measure for angle $FGH$.
      `
    };
  }
};