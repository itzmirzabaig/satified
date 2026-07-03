import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 816
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 3, 4, -3, 9, results: 17, -23]
 * - Difficulty factors: [Addition method, asks for a multiple of x]
 * - Distractor patterns: [-18, -6, 6, 18]
 * - Constraints: [Clean addition eliminates y]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 *
 * REBUILD NOTES:
 * - The original construction was mathematically inconsistent: it set
 *   right2 = right1 - S*xVal, but adding the two equations gives S*x = -(r1+r2),
 *   so the printed system's true solution did NOT equal the claimed xVal, and
 *   the "/3" distractors produced float artifacts. Rebuilt answer-first.
 * - Equal-and-opposite y coefficients let addition eliminate y; the asked
 *   quantity is exactly the sum-of-x-coefficients times x, which the single
 *   addition step yields directly as a clean integer.
 */

export const generator_816 = {
  metadata: {
    id: "816",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Render "+ n" / "- |n|" inside math so we never emit "+ -".
    const withSign = (n: number): string => (n >= 0 ? `+ ${n}` : `- ${Math.abs(n)}`);

    // STEP 1: Coefficients. Equal-and-opposite y coefficients so that adding the
    // two equations eliminates y.
    const yCoeff = getRandomInt(2, 6);       // Eq1: yCoeff*y = ... ; Eq2: -yCoeff*y = ...
    const xCoeff1 = getRandomInt(2, 5);
    const xCoeff2 = getRandomInt(5, 12);
    const S = xCoeff1 + xCoeff2;             // sum of x-coefficients (>= 7)

    // STEP 2: Answer-first. Choose the true integer x, then derive the constants
    // so the printed system is exactly consistent. Adding the equations gives
    //   0 = S*x + (right1 + right2)  =>  S*x = -(right1 + right2).
    // So set right1 + right2 = -S*xVal.
    const xVal = getRandomInt(1, 6) * (getRandomInt(0, 1) === 0 ? 1 : -1); // nonzero
    const right1 = getRandomInt(5, 15);
    const right2 = -S * xVal - right1;

    // The quantity the question asks for is S*x, obtained directly by addition.
    const answer = S * xVal; // == -(right1 + right2)

    // STEP 3: Build question text. Ask for the value of (S)x.
    const questionText = `$$\\begin{cases} ${yCoeff}y = ${xCoeff1}x ${withSign(right1)} \\\\ -${yCoeff}y = ${xCoeff2}x ${withSign(right2)} \\end{cases}$$

The solution to the given system of equations is $(x, y)$. What is the value of $${S}x$?`;

    // STEP 4: Create options. Symmetric, all-distinct integers, each mapped to a
    // clear misconception. Distinct because |S| >= 7 and xVal != 0.
    const optionsData = [
      { text: answer.toString(), isCorrect: true },     // S*x (asked)
      { text: (-answer).toString(), isCorrect: false }, // sign error: S*x = +(r1+r2)
      { text: xVal.toString(), isCorrect: false },      // reports x instead of S*x
      { text: (-xVal).toString(), isCorrect: false }    // sign error on x
    ];

    // STEP 5: Shuffle and assign letters.
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const letterOf = (val: string) => shuffledOptions.find(o => o.text === val)!.letter;

    // STEP 6: Return question data.
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: answer.toString(),
      explanation: `The two equations have equal and opposite $y$-coefficients ($${yCoeff}y$ and $-${yCoeff}y$), so adding the equations eliminates $y$ in one step.

Add the left sides and the right sides:

$$${yCoeff}y + (-${yCoeff}y) = (${xCoeff1}x ${withSign(right1)}) + (${xCoeff2}x ${withSign(right2)})$$

The left side is $0$, and combining the $x$-terms and constants on the right gives:

$$0 = ${S}x ${withSign(right1 + right2)}$$

Isolating the requested expression, $${S}x = ${answer}$. That is exactly what the question asks for, so the answer is choice ${correctLetter}.

(As a check, $x = ${xVal}$ and $${S} \\times ${xVal} = ${answer}$.)

Why the other options are incorrect:
- Choice ${letterOf((-answer).toString())} ($${-answer}$) comes from a sign error, writing $${S}x = ${right1 + right2}$ instead of $${S}x = ${answer}$.
- Choice ${letterOf(xVal.toString())} ($${xVal}$) is the value of $x$ itself, not $${S}x$.
- Choice ${letterOf((-xVal).toString())} ($${-xVal}$) is the value of $x$ with the wrong sign.`
    };
  }
};
