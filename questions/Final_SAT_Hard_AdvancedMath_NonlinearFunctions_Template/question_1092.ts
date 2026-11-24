import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1092
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [vertex (-3, 6), one x-intercept (-17/4, 0)]
 * - Difficulty factors: [Quadratic symmetry, finding other root]
 * - Distractor patterns: [A: -29/4, B: -7/4, C: 5/4, D: 17/4]
 * - Constraints: [Other root is 2×(-3) - (-17/4) = -6 + 17/4 = -7/4]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1092 = {
  metadata: {
    id: "1092",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Before: fractions such as 18/4 or 16/4 appeared unreduced, two wrong
    // choices were the answer plus or minus a fixed 12/4, and no choice had a
    // reason. An odd offset keeps every numerator odd, so all fractions over 4
    // are in lowest terms, and each wrong choice is now a real symmetry slip.
    const h = -getRandomInt(2, 6);
    const vertexY = getRandomInt(4, 10);
    const d = getRandomElement([1, 3, 5, 7, 9]);

    const r1Num = 4 * h - d;       // given intercept, numerator over 4
    const r2Num = 4 * h + d;       // correct: 2h - r1
    const addedNum = r1Num + 4 * h; // r1 + h
    const distNum = d;             // h - r1, the distance to the vertex
    const negNum = -r1Num;         // sign of r1 changed

    const frac = (n: number) => n < 0 ? `-\\frac{${-n}}{4}` : `\\frac{${n}}{4}`;
    const point = (n: number) => `$\\left(${frac(n)}, 0\\right)$`;
    const correctText = point(r2Num);

    const optionsData = [
      { text: point(addedNum), isCorrect: false, reason: `${point(addedNum)} adds the $x$-coordinate of the vertex to the $x$-coordinate of the given intercept instead of doubling the vertex value and subtracting` },
      { text: correctText, isCorrect: true, reason: '' },
      { text: point(distNum), isCorrect: false, reason: `${point(distNum)} uses the distance from the given intercept to the vertex, $${frac(distNum)}$, as the $x$-coordinate without adding that distance to $${h}$` },
      { text: point(negNum), isCorrect: false, reason: `${point(negNum)} only changes the sign of the given $x$-coordinate, which reflects the intercept across the $y$-axis instead of across the line $x=${h}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The graph of the quadratic function $f$ in the $xy$-plane has a vertex at $(${h}, ${vertexY})$. One $x$-intercept of the graph is ${point(r1Num)}. What is the other $x$-intercept of the graph?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The graph of a quadratic function is symmetric about the vertical line through its vertex, so the $x$-coordinate of the vertex, $${h}$, is the average of the $x$-coordinates of the two intercepts. If the other intercept has $x$-coordinate $t$, then $\\frac{${frac(r1Num)}+t}{2}=${h}$, so $t=2(${h})-\\left(${frac(r1Num)}\\right)=${frac(8 * h)}+\\frac{${-r1Num}}{4}=${frac(r2Num)}$. The other $x$-intercept is ${correctText}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
