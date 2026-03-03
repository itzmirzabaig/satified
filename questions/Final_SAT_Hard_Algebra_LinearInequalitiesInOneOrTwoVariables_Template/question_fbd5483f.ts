import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: fbd5483f
 * Skill: Linear Inequalities In One Or Two Variables
 * Difficulty: Hard
 * 
 * Description: Modeling consecutive odd integers with an inequality.
 * Fixes:
 * - Cleaned up option LaTeX rendering.
 * - Added proper spacing in algebraic expressions.
 */
export const generator_fbd5483f = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // ----------------------------------------------------------------------
    // 1. GENERATE VALUES
    // ----------------------------------------------------------------------
    const coefficient = getRandomInt(10, 15);
    const subtractValue = getRandomInt(20, 30);
    
    // Integers: x, x+2, x+4, x+6
    // 1st: x
    // 3rd: x+4
    // 4th: x+6
    
    // Condition:
    // "Product of [coef] and 4th" <= "Sum of 1st and 3rd" - [subtractVal]
    // Coef * (x + 6) <= (x + (x + 4)) - subtractVal

    // ----------------------------------------------------------------------
    // 2. CREATE OPTIONS
    // ----------------------------------------------------------------------
    // Correct Form
    const optCorrect = `${coefficient}(x + 6) \\le (x + (x + 4)) - ${subtractValue}`;
    
    // Distractor 1: Reversed inequality, reversed subtraction logic
    // ">= subtractVal - Sum"
    const optB = `${coefficient}(x + 6) \\ge ${subtractValue} - (x + (x + 4))`;
    
    // Distractor 2: Wrong terms (uses 3rd instead of 4th on LHS, etc)
    const optC = `${coefficient}(x + 4) \\le (x + (x + 3)) - ${subtractValue}`;
    
    // Distractor 3: Everything wrong
    const optD = `${coefficient}(x + 4) \\ge ${subtractValue} - (x + (x + 3))`;

    const optionsData = [
      { text: `$${optCorrect}$`, isCorrect: true },
      { text: `$${optB}$`, isCorrect: false },
      { text: `$${optC}$`, isCorrect: false },
      { text: `$${optD}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption.letter;

    // ----------------------------------------------------------------------
    // 3. RETURN DATA
    // ----------------------------------------------------------------------
    return {
      questionText: `In a set of four consecutive odd integers, where the integers are ordered from least to greatest, the first integer is represented by $x$. The product of $${coefficient}$ and the fourth odd integer is at most $${subtractValue}$ less than the sum of the first and third odd integers. Which inequality represents this situation?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `
        Choice ${correctLetter} is correct.
        <br/><br/>
        1. <b>Identify the integers:</b>
        Since they are consecutive odd integers starting at $x$:
        1st: $x$
        2nd: $x + 2$
        3rd: $x + 4$
        4th: $x + 6$
        <br/>
        2. <b>Translate the components:</b>
        "The product of $${coefficient}$ and the fourth odd integer":
        $$ ${coefficient}(x + 6) $$
        "The sum of the first and third odd integers":
        $$ x + (x + 4) $$
        "$${subtractValue}$ less than the sum...":
        $$ (x + (x + 4)) - ${subtractValue} $$
        <br/>
        3. <b>Build the inequality:</b>
        "Is at most" means less than or equal to ($\\le$).
        $$ ${coefficient}(x + 6) \\le (x + (x + 4)) - ${subtractValue} $$
      `
    };
  }
};