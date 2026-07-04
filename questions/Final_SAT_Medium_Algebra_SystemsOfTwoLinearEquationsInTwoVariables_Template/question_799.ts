import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 799
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: -2, result: 40 (double-digit)]
 * - Difficulty factors: [Substitution, straightforward solve for x]
 * - Distractor patterns: [Fill in blank - no distractors to analyze]
 * - Constraints: [Integer answer]
 * - Question type: [Fill in the blank]
 * - Figure generation: [None]
 */

export const generator_799 = {
  metadata: {
    id: "799",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values.
    // coeff is the negative coefficient of x in the first equation (y = coeff*x).
    // It must NOT be -3: with coeff = -3 the combined x-coefficient (3 + coeff)
    // would be 0 and result = 3x + coeff*x = 0, collapsing the two equations to
    // the SAME line (0x = 0) so x is not uniquely determined. Choose from
    // {-1, -2, -4}, keeping (3 + coeff) in {2, 1, -1} — always nonzero, unique x.
    const coeff = -1 * getRandomElement([1, 2, 4]);
    const xValue = getRandomInt(10, 60); // Double digit x

    // y = coeff*x, 3x + y = result. combinedCoeff = 3 + coeff is guaranteed != 0.
    const combinedCoeff = 3 + coeff;
    const result = combinedCoeff * xValue;

    // Rendering helpers so terms read cleanly (e.g. -x not -1x, +2x not +-2x).
    const yCoeffStr = coeff === -1 ? '-x' : `${coeff}x`;        // first equation RHS
    const subTermStr = coeff === -1 ? '- x' : `- ${Math.abs(coeff)}x`; // 3x - |coeff|x
    const combinedStr = combinedCoeff === 1 ? 'x'
      : combinedCoeff === -1 ? '-x'
      : `${combinedCoeff}x`;                                     // combined x-term
    const yValue = coeff * xValue;

    // STEP 2: Build question text.
    const questionText = `The solution to the given system of equations is $(x, y)$. What is the value of $x$?\n\n$$\\begin{cases} y = ${yCoeffStr} \\\\ 3x + y = ${result} \\end{cases}$$`;

    // STEP 3: Return fill-in-the-blank.
    return {
      questionText: questionText,
      figureCode: null,
      options: [],
      correctAnswer: xValue.toString(),
      explanation: `We are given a system of two linear equations: 1. $y = ${yCoeffStr}$ 2. $3x + y = ${result}$ We need to find the value of $x$. Since the first equation already expresses $y$ in terms of $x$ ($y = ${yCoeffStr}$), we can substitute this expression into the second equation. Substitute $y = ${yCoeffStr}$ into $3x + y = ${result}$: $$3x + (${yCoeffStr}) = ${result}$$ Combine the like terms $3x$ and $${yCoeffStr}$: $$3x ${subTermStr} = ${result}$$ $$${combinedStr} = ${result}$$ Dividing both sides by $${combinedCoeff}$ gives: $$x = ${xValue}$$ So, the value of $x$ is ${xValue}. To double-check, we can find $y$: $y = ${coeff}(${xValue}) = ${yValue}$. Substituting back into the second equation: $3(${xValue}) + (${yValue}) = ${3 * xValue} ${yValue < 0 ? '- ' + Math.abs(yValue) : '+ ' + yValue} = ${result}$. This is correct. The value of $x$ is ${xValue}.`
    };
  }
};
