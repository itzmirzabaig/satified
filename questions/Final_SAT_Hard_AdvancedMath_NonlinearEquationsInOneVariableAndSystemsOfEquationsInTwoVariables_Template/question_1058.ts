import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1058
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [system y=2x²-21x+64 and y=3x+a, one intersection, find x]
 * - Difficulty factors: [System with parabola and line, discriminant=0, solve for x]
 * - Distractor patterns: [A: -8, B: -6, C: 6/correct, D: 8]
 * - Constraints: [Discriminant=0 gives condition on a, then solve for x]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1058 = {
  metadata: {
    id: "1058",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // System: y = 2x^2 + bx + c and y = dx + a (a is the unknown constant).
    // Setting equal: 2x^2 + (b-d)x + (c-a) = 0. Exactly one intersection means
    // the discriminant is 0, and then x = -(b-d)/(2*2).
    // Answer-first construction: pick the intersection x-value, then derive b
    // so that b - d = -4x, guaranteeing an integer answer for every draw.
    const xValue = getRandomInt(4, 8);        // the correct answer
    const d = getRandomInt(2, 5);             // slope of the line
    const b = d - 4 * xValue;                 // in [-30, -11], always negative
    const bd = b - d;                         // = -4x, always negative

    // Before: two wrong choices were x - 2 shifted values ("-x - 2", "x + 2")
    // explained only as "an arithmetic error". Now every wrong choice is a
    // real slip: dropping the negative sign (-x), dividing by 2 instead of
    // 2(2) (2x), and answering with the y-coordinate of the intersection
    // point instead of x. With a discriminant of 0, a = c - 2x^2, so the
    // y-coordinate is y = dx + a = c + dx - 2x^2. c is redrawn until all four
    // values are distinct.
    let c = 0, aValue = 0, yValue = 0;
    do {
      c = getRandomInt(50, 80);               // constant term of the parabola
      aValue = c - 2 * xValue * xValue;
      yValue = d * xValue + aValue;
    } while (aValue === 0 || new Set([xValue, -xValue, 2 * xValue, yValue]).size < 4);

    const optionsData = [
      { text: `$${-xValue}$`, isCorrect: false, reason: `$${-xValue}$ results from dropping the negative sign in $x=-\\frac{${bd}}{2(2)}$` },
      { text: `$${2 * xValue}$`, isCorrect: false, reason: `$${2 * xValue}$ results from dividing $${-bd}$ by $2$ instead of by $2(2)=4$, forgetting that the leading coefficient of the quadratic is $2$` },
      { text: `$${xValue}$`, isCorrect: true, reason: '' },
      { text: `$${yValue}$`, isCorrect: false, reason: `$${yValue}$ is the $y$-coordinate of the intersection point, not the $x$-coordinate: setting the discriminant equal to zero gives $a=${aValue}$, and then $y=${d}(${xValue})${aValue < 0 ? '' : '+'}${aValue}=${yValue}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. The graphs intersect where the two expressions for $y$ are equal: $2x^2 - ${-b}x + ${c} = ${d}x + a$. Rewriting gives $2x^2 - ${-bd}x + (${c} - a) = 0$. Because the graphs intersect at exactly one point, this quadratic equation must have exactly one solution, so its discriminant, $(${bd})^2 - 4(2)(${c} - a)$, equals zero. A quadratic equation with a discriminant of zero has its single solution at $x = -\\frac{${bd}}{2(2)} = \\frac{${-bd}}{4} = ${xValue}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `$y = 2x^2 - ${-b}x + ${c}$\n$y = ${d}x + a$\n\nIn the given system of equations, $a$ is a constant. The graphs of the equations in the given system intersect at exactly one point, $(x, y)$, in the $xy$-plane. What is the value of $x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
