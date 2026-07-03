import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1296
 * Skill: Trigonometry (Unit Circle)
 * Difficulty: Hard
 *
 * Description: Evaluate tan(theta) for a large angle theta given in radians.
 * Fixes:
 * - correctAnswer now carries the same $...$ delimiters as the options so it
 *   matches exactly (was raw LaTeX with no delimiters -> CORRECT_MISMATCH).
 * - Removed dead reducedAngle/remPi variables.
 * - Reworded explanation so no inline-math segment begins with a digit,
 *   clearing the DOLLAR_RISK soft flag.
 */
export const generator_1296 = {
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
    // We want a large angle of the form (numerator)pi/3 whose reference angle
    // is pi/3, so tan = +/- sqrt(3). numerator must not be a multiple of 3
    // (otherwise the angle is a whole multiple of pi where tan = 0).
    let numerator = getRandomInt(80, 100);
    while (numerator % 3 === 0) {
      numerator++;
    }

    const denominator = 3;
    const angleLatex = `\\frac{${numerator}\\pi}{${denominator}}`;

    // ----------------------------------------------------------------------
    // 2. CALCULATE CORRECT ANSWER
    // ----------------------------------------------------------------------
    // Reduce modulo 2pi. Since 2pi = 6pi/3, the coterminal position is
    // determined by numerator % 6 (which can only be 1, 2, 4, or 5 here).
    //   1 -> pi/3   (Q1) -> tan =  sqrt(3)
    //   2 -> 2pi/3  (Q2) -> tan = -sqrt(3)
    //   4 -> 4pi/3  (Q3) -> tan =  sqrt(3)
    //   5 -> 5pi/3  (Q4) -> tan = -sqrt(3)
    const remainder = numerator % 6;
    const isPositive = (remainder === 1 || remainder === 4);

    const valStr = `\\sqrt{3}`;
    const correctVal = isPositive ? valStr : `-${valStr}`;
    const incorrectSign = isPositive ? `-${valStr}` : valStr;

    // Distractors: reciprocal values (sqrt(3)/3 = 1/sqrt(3)), the classic
    // "used cot instead of tan" trap, in both signs.
    const recipStr = `\\frac{\\sqrt{3}}{3}`;
    const incorrectRecip = isPositive ? recipStr : `-${recipStr}`;
    const incorrectRecipSign = isPositive ? `-${recipStr}` : recipStr;

    // ----------------------------------------------------------------------
    // 3. OPTIONS
    // ----------------------------------------------------------------------
    // The four strings sqrt(3), -sqrt(3), sqrt(3)/3, -sqrt(3)/3 are always
    // distinct, so no duplicate guard is needed.
    const correctOption = `$${correctVal}$`;
    const optionsData = [
      { text: correctOption, isCorrect: true },
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
    const quadrant =
      (remainder === 1) ? "first" :
      (remainder === 2) ? "second" :
      (remainder === 4) ? "third" : "fourth";
    const signWord = isPositive ? "positive" : "negative";

    return {
      questionText: `What is the value of $\\tan\\left(${angleLatex}\\right)$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption,
      explanation: `
        Choice ${correctLetter} is correct.
        <br/><br/>
        The tangent function repeats, so reduce the angle by whole multiples of $(2\\pi)$ to find its position on the unit circle.
        <br/>
        $$ \\frac{${numerator}\\pi}{3} = ${Math.floor(numerator / 6)} \\cdot 2\\pi + \\frac{${remainder}\\pi}{3} $$
        <br/>
        The coterminal angle $\\frac{${remainder}\\pi}{3}$ lies in the ${quadrant} quadrant, and its reference angle is $\\frac{\\pi}{3}$.
        <br/>
        Since $\\tan\\left(\\frac{\\pi}{3}\\right) = \\sqrt{3}$ and tangent is ${signWord} in the ${quadrant} quadrant, we have
        $$ \\tan\\left(${angleLatex}\\right) = ${correctVal}. $$
        <br/>
        The reciprocal value $\\frac{\\sqrt{3}}{3}$ corresponds to $\\cot\\left(\\frac{\\pi}{3}\\right)$, not the tangent, so those options are incorrect, as is the option with the wrong sign.
      `
    };
  }
};
