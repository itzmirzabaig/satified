import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 800
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 3, 4, 2, constants: 6, 4]
 * - Difficulty factors: [Subtraction method, solve for y]
 * - Distractor patterns: [Fill in blank]
 * - Constraints: [Clean subtraction gives (c1 - c2) = (b1 - b2)*y]
 * - Question type: [Fill in the blank]
 * - Figure generation: [None]
 */

export const generator_800 = {
  metadata: {
    id: "800",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Answer-first construction.
    //   a*x + c1 = b1*y
    //   a*x + c2 = b2*y
    // Subtracting the second from the first eliminates the a*x term:
    //   c1 - c2 = (b1 - b2)*y  =>  y = (c1 - c2) / (b1 - b2)
    // Choose y first, force b1 != b2, then derive c1 from c2 so subtraction
    // yields an exact integer y for every draw.
    const yValue = getRandomInt(2, 5);
    const a = getRandomInt(2, 5);
    let b1 = getRandomInt(3, 7);
    let b2 = getRandomInt(1, 3);
    let guard = 0;
    while (b1 === b2 && guard++ < 50) {
      b1 = getRandomInt(3, 7);
      b2 = getRandomInt(1, 3);
    }

    const c2 = getRandomInt(2, 6);
    const c1 = c2 + (b1 - b2) * yValue; // ensures c1 - c2 = (b1 - b2)*yValue

    // Sign-aware formatter for the constant term "+ c" (c is always positive
    // here since c2>=2 and (b1-b2)*y can be positive or negative, but c1 stays
    // positive; guard formatting anyway to avoid "+ -3").
    const term = (coef: number): string => (coef >= 0 ? `+ ${coef}` : `- ${Math.abs(coef)}`);

    // STEP 2: Build question text
    const questionText = `$$\\begin{cases} ${a}x ${term(c1)} = ${b1}y \\\\ ${a}x ${term(c2)} = ${b2}y \\end{cases}$$ \n\nThe solution to the given system of equations is $(x, y)$. What is the value of $y$?`;

    // STEP 3: Build explanation with all math wrapped in balanced $...$.
    const lhsConst = c1 - c2;        // > 0 by construction
    const yCoeff = b1 - b2;          // != 0 by guard
    const explanation = `Both equations contain the term $${a}x$. Subtract the second equation from the first to eliminate $x$:\n\n$(${a}x ${term(c1)}) - (${a}x ${term(c2)}) = ${b1}y - ${b2}y$\n\nThe $${a}x$ terms cancel, leaving $${lhsConst} = ${yCoeff}y$. Divide both sides by $${yCoeff}$ to get $y = ${yValue}$.`;

    // STEP 4: Return fill-in-the-blank (plain integer string).
    return {
      questionText: questionText,
      figureCode: null,
      options: [],
      correctAnswer: yValue.toString(),
      explanation: explanation
    };
  }
};
