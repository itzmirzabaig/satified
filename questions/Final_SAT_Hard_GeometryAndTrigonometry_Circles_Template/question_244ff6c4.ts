import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 244ff6c4
 * Skill: Trigonometry (Unit Circle)
 * Difficulty: Hard
 * 
 * Description: Evaluate tan(theta) for a large angle theta given in radians.
 * Fixes:
 * - Fixed inconsistent random number generation (variables were regenerated in return statement).
 * - Fixed LaTeX escape sequences.
 * - Dynamic calculation of correct answer based on the generated angle.
 */
export const generator_244ff6c4 = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // ----------------------------------------------------------------------
    // 1. GENERATE ANGLE
    // ----------------------------------------------------------------------
    // We want a large angle: (3k +/- 1) * pi / 3.
    // Base reference angle is pi/3.
    // Tangent values will be +/- sqrt(3).
    
    // Generate a large numerator
    // e.g., 92pi/3 -> 30pi + 2pi/3 (Quadrant II, tan is negative)
    // e.g., 91pi/3 -> 30pi + pi/3 (Quadrant I, tan is positive)
    
    let numerator = getRandomInt(80, 100);
    // Ensure it's not divisible by 3 (so it's not a whole integer pi)
    while (numerator % 3 === 0) {
      numerator++;
    }
    
    const denominator = 3;
    const angleLatex = `\\frac{${numerator}\\pi}{${denominator}}`;

    // ----------------------------------------------------------------------
    // 2. CALCULATE CORRECT ANSWER
    // ----------------------------------------------------------------------
    // Simplify angle to find quadrant and reference
    // full rotations = numerator / 6 (since 2pi = 6pi/3)
    // remainder = numerator % 6
    
    const remainder = numerator % 6; // range 0 to 5
    // 1 -> pi/3 (Q1) -> sqrt(3)
    // 2 -> 2pi/3 (Q2) -> -sqrt(3)
    // 4 -> 4pi/3 (Q3) -> sqrt(3)
    // 5 -> 5pi/3 (Q4) -> -sqrt(3)
    
    let isPositive = false;
    if (remainder === 1 || remainder === 4) {
      isPositive = true;
    }
    
    const valStr = `\\sqrt{3}`;
    const correctVal = isPositive ? valStr : `-${valStr}`;
    const incorrectSign = isPositive ? `-${valStr}` : valStr;
    
    // Distractors: reciprocal values (sqrt(3)/3)
    const recipStr = `\\frac{\\sqrt{3}}{3}`;
    const incorrectRecip = isPositive ? recipStr : `-${recipStr}`;
    const incorrectRecipSign = isPositive ? `-${recipStr}` : recipStr;

    // ----------------------------------------------------------------------
    // 3. OPTIONS
    // ----------------------------------------------------------------------
    const optionsData = [
      { text: `$${correctVal}$`, isCorrect: true },
      { text: `$${incorrectSign}$`, isCorrect: false },
      { text: `$${incorrectRecip}$`, isCorrect: false },
      { text: `$${incorrectRecipSign}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    // ----------------------------------------------------------------------
    // 4. EXPLANATION
    // ----------------------------------------------------------------------
    // Logic for explanation text
    // "We reduce the angle..."
    const wholePi = Math.floor(numerator / 3);
    const remPi = numerator % 3; // 1 or 2
    
    // Reduced angle logic: 
    // e.g. 92pi/3 = 30pi + 2pi/3.
    // 2pi/3 is in Q2.
    
    const reducedAngle = `\\frac{${remPi}\\pi}{3}`;
    const quadrant = (remainder === 1) ? "first" : (remainder === 2) ? "second" : (remainder === 4) ? "third" : "fourth";
    
    return {
      questionText: `What is the value of $\\tan(${angleLatex})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctVal,
      explanation: `
        Choice ${correctLetter} is correct.
        <br/><br/>
        The tangent function has a period of $\\pi$. However, it is often easier to reduce modulo $2\\pi$ to find the quadrant.
        <br/>
        $$ \\frac{${numerator}\\pi}{3} = ${Math.floor(numerator/6)} \\times 2\\pi + \\frac{${remainder}\\pi}{3} $$
        <br/>
        The angle $\\frac{${remainder}\\pi}{3}$ is in the ${quadrant} quadrant.
        <br/>
        The reference angle is $\\frac{\\pi}{3}$.
        <br/>
        We know that $\\tan\\left(\\frac{\\pi}{3}\\right) = \\sqrt{3}$.
        <br/>
        In the ${quadrant} quadrant, tangent is ${isPositive ? "positive" : "negative"}.
        <br/>
        Therefore, $\\tan\\left(${angleLatex}\\right) = ${correctVal}$.
      `
    };
  }
};