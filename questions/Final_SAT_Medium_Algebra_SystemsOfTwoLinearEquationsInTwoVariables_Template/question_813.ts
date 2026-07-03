import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 813
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [constants: 3, 5, -2, 5, 7 (single digit)]
 * - Difficulty factors: [Addition of equations method, asks for expression value]
 * - Distractor patterns: [-2, 6, 12, 24]
 * - Constraints: [Clean addition eliminates y]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 *
 * REBUILD NOTES:
 * - Answer-first construction: pick integer x and y, then derive the right-hand
 *   sides so every draw is exact (no float artifacts) and 2x is a clean integer.
 * - Distractors (x, y, 4x) guarded by bounded retry so all four options differ.
 * - Signed formatting avoids "+ -" sign glitches in both question and explanation.
 */

export const generator_813 = {
  metadata: {
    id: "813",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Render "+ n" or "- |n|" inside math so we never emit "+ -".
    const withSign = (n: number): string => (n >= 0 ? `+ ${n}` : `- ${Math.abs(n)}`);

    // STEP 1: Answer-first construction. Choose the true solution (x, y) as
    // integers, then derive the equation right-hand sides so the system is
    // exactly consistent for every draw.
    const const1 = getRandomInt(2, 5);
    const const2 = getRandomInt(1, 4);
    const yCoeff = getRandomInt(2, 4);

    let xVal = 0, yVal = 0;
    let tries = 0;
    do {
      xVal = getRandomInt(2, 9);   // positive & >=2 so x, 2x, 4x are all distinct
      yVal = getRandomInt(1, 4);   // positive keeps the printed constants tidy
      tries++;
    } while (
      // Guard: the four option values (2x, x, y, 4x) must all be distinct.
      (yVal === xVal || yVal === 2 * xVal || yVal === 4 * xVal) && tries < 50
    );

    // System (as displayed):
    //   x + const1 = -yCoeff*y + right1
    //   x - const2 =  yCoeff*y + right2
    // Solve each for right side using the chosen (xVal, yVal):
    const right1 = xVal + const1 + yCoeff * yVal;
    const right2 = xVal - const2 - yCoeff * yVal;

    // Adding the equations eliminates y: 2x + (const1 - const2) = right1 + right2.
    const targetValue = 2 * xVal; // == right1 + right2 - (const1 - const2)

    // Simplified single-variable forms used in the explanation.
    const simp1 = right1 - const1; // x = -yCoeff*y + simp1
    const simp2 = right2 + const2; // x =  yCoeff*y + simp2

    // STEP 2: Build question text.
    const questionText = `The solution to the given system of equations is $(x, y)$. What is the value of $2x$?

$$\\begin{cases} x + ${const1} = -${yCoeff}y + ${right1} \\\\ x - ${const2} = ${yCoeff}y ${withSign(right2)} \\end{cases}$$`;

    // STEP 3: Create options. Intent-preserving distractors: x, y, and 4x.
    const optionsData = [
      { text: yVal.toString(), isCorrect: false },        // the value of y
      { text: xVal.toString(), isCorrect: false },        // the value of x
      { text: targetValue.toString(), isCorrect: true },  // 2x (asked)
      { text: (4 * xVal).toString(), isCorrect: false }   // 4x
    ];

    // STEP 4: Shuffle and assign letters.
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const letterOf = (val: string) => shuffledOptions.find(o => o.text === val)!.letter;

    // STEP 5: Return question data.
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: targetValue.toString(),
      explanation: `To find the value of $2x$, add the two equations to eliminate $y$. The system is:

$\\begin{cases} x + ${const1} = -${yCoeff}y + ${right1} \\\\ x - ${const2} = ${yCoeff}y ${withSign(right2)} \\end{cases}$

Adding the left sides and the right sides, the $-${yCoeff}y$ and $+${yCoeff}y$ terms cancel:

$$(x + ${const1}) + (x - ${const2}) = ${right1} ${withSign(right2)}$$

Combining like terms gives $2x + ${const1 - const2 >= 0 ? const1 - const2 : `(${const1 - const2})`} = ${right1 + right2}$, so:

$$2x = ${targetValue}$$

That is exactly what the question asks, so $2x = ${targetValue}$, which is choice ${correctLetter}.

Solving all the way for $(x, y)$: since $2x = ${targetValue}$, we get $x = ${xVal}$. Substituting into $x = ${yCoeff}y ${withSign(simp2)}$ gives $${xVal} = ${yCoeff}y ${withSign(simp2)}$, so $${yCoeff}y = ${xVal - simp2}$ and $y = ${yVal}$. The solution is $(${xVal}, ${yVal})$.

Why the other options are incorrect:
- Choice ${letterOf(xVal.toString())} is the value of $x$ ($x = ${xVal}$), not $2x$.
- Choice ${letterOf(yVal.toString())} is the value of $y$ ($y = ${yVal}$).
- Choice ${letterOf((4 * xVal).toString())} is $4x$ ($4 \\times ${xVal} = ${4 * xVal}$), which double-counts the coefficient.`
    };
  }
};
