import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: b00ad7f2
 *
 * ORIGINAL ANALYSIS: [Systems of two linear equations - substitution method]
 * - Number ranges: [coefficients: 3-12, solution: negative integers (-1 to -8)]
 * - Difficulty factors: [Solving a 2-variable linear system using substitution]
 * - Constraints: [Medium - integer solution with both x and y negative, y = nx + c form]
 * - Question type: [Multiple Choice Text]
 */

export const generator_b00ad7f2 = {
  metadata: {
    // id: "b00ad7f2",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Build a system with a known integer solution (x, y) both negative
    // System form: y - ax = b  (eq1)  and  cx = dy  (eq2)
    // Choose solution first, then derive coefficients
    const x = -getRandomInt(1, 6);
    const y = -getRandomInt(x === -1 ? 2 : 1, 8); // y != x to avoid trivial swaps being equal

    // eq1: y - ax = b  =>  b = y - a*x
    const a = getRandomInt(3, 12);
    const b = y - a * x;

    // eq2: cx = dy  =>  we want c/d = y/x  =>  pick c = |y|, d = |x|
    const c = Math.abs(y);
    const d = Math.abs(x);

    // Options: correct (x,y), swapped (y,x), and two numeric distractors
    // Use single $ for inline math, not \\( ... \\)
    const optionCorrect = `$(${x}, ${y})$`;
    const optionSwapped = `$(${y}, ${x})$`;
    const optionWrong1 = `$\\left(\\frac{${c}}{${d}}, 1\\right)$`;
    const optionWrong2 = `$\\left(1, \\frac{${d}}{${c}}\\right)$`;

    const optionsData = [
      { text: optionWrong1, isCorrect: false },
      { text: optionWrong2, isCorrect: false },
      { text: optionCorrect, isCorrect: true },
      { text: optionSwapped, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    const bSign = b >= 0 ? `+${b}` : `${b}`;

    return {
      questionText: `$y - ${a}x = ${b}$\n$${c}x = ${d}y$\nWhat is the solution $(x, y)$ to the given system of equations?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter, // Should be the letter, not the text
      explanation: `Choice ${correctLetter} is correct. From the first equation, $y = ${a}x ${bSign}$. Substituting into the second equation: $${c}x = ${d}(${a}x ${bSign})$, which gives $${c}x = ${d*a}x ${b >= 0 ? `+ ${d*b}` : `- ${d*Math.abs(b)}`}$. Solving: $${c - d*a}x = ${d*b}$, so $x = ${x}$. Then $y = ${a}(${x}) ${bSign} = ${y}$. The solution is $(${x}, ${y})$.`
    };
  }
};