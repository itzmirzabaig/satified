import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 1efd7ef3
 * Skill: Trigonometry (Unit Circle)
 * Difficulty: Hard
 * 
 * Description: Evaluate sin(n*pi) for large integers n.
 * Fixes:
 * - Fixed "frac" and "pi" rendering as plain text by correcting escape sequences.
 * - Added proper LaTeX formatting for trig functions (\\sin).
 */
export const generator_1efd7ef3 = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // ----------------------------------------------------------------------
    // 1. GENERATE VALUES
    // ----------------------------------------------------------------------
    // Generate a large integer coefficient for pi
    const n = getRandomInt(20, 50);
    const angleLatex = `${n}\\pi`;
    
    // ----------------------------------------------------------------------
    // 2. MATHEMATICAL LOGIC
    // ----------------------------------------------------------------------
    // sin(k * pi) is always 0 for any integer k.
    const correctVal = "0";
    
    // ----------------------------------------------------------------------
    // 3. DISTRACTORS
    // ----------------------------------------------------------------------
    // Common trig values that students might guess
    const distractorB = `\\frac{1}{2}`;       // sin(pi/6)
    const distractorC = `\\frac{\\sqrt{2}}{2}`; // sin(pi/4)
    const distractorD = `1`;                  // sin(pi/2) or cos(2n*pi)
    
    const optionsData = [
      { text: `$${correctVal}$`, isCorrect: true },
      { text: `$${distractorB}$`, isCorrect: false },
      { text: `$${distractorC}$`, isCorrect: false },
      { text: `$${distractorD}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    // ----------------------------------------------------------------------
    // 4. EXPLANATION LOGIC
    // ----------------------------------------------------------------------
    // Determine if it's an even or odd multiple of pi to give precise explanation
    // Even pi (2k*pi) -> (1, 0)
    // Odd pi ((2k+1)*pi) -> (-1, 0)
    // In both cases, y-coordinate (sine) is 0.
    const isEven = n % 2 === 0;
    const rotations = Math.floor(n / 2);
    const positionDescription = isEven 
      ? `This represents ${rotations} full rotations, returning to the starting point $(1, 0)$.` 
      : `This represents ${rotations} full rotations plus an additional $\\pi$, landing at $(-1, 0)$.`;

    return {
      questionText: `What is the value of $\\sin(${angleLatex})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctVal,
      explanation: `
        Choice ${correctLetter} is correct.
        <br/><br/>
        The sine function has a period of $2\\pi$. This means $\\sin(\\theta) = \\sin(\\theta + 2\\pi k)$ for any integer $k$.
        <br/><br/>
        We can analyze the angle $${angleLatex}$:
        $$ ${n}\\pi = ${rotations} \\times 2\\pi ${isEven ? '' : '+ \\pi'} $$
        <br/>
        ${positionDescription}
        <br/>
        At both $(1, 0)$ and $(-1, 0)$, the y-coordinate is $0$. Therefore:
        $$ \\sin(${angleLatex}) = 0 $$
      `
    };
  }
};