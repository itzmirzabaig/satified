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
    const c = getRandomInt(50, 80);           // constant term of the parabola

    const bd = b - d;                         // = -4x, always negative

    // Distractors: never collide with xValue (>= 4 > 0) or each other.
    const distractorA = -xValue - 2;
    const distractorB = -xValue;
    const distractorD = xValue + 2;

    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false, reason: `results from a sign error and an arithmetic error when solving for the $x$-coordinate of the intersection point` },
      { text: `$${distractorB}$`, isCorrect: false, reason: `is the opposite of the correct value; it results from dropping the negative sign in $x=-\\frac{${bd}}{2(2)}$` },
      { text: `$${xValue}$`, isCorrect: true, reason: '' },
      { text: `$${distractorD}$`, isCorrect: false, reason: `results from an arithmetic error when evaluating $-\\frac{${bd}}{2(2)}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. The graphs intersect where the two expressions for $y$ are equal: $ 2x^2 - ${-b}x + ${c} = ${d}x + a$. Rewriting gives $ 2x^2 - ${-bd}x + (${c} - a) = 0$. Because the graphs intersect at exactly one point, this quadratic equation must have exactly one solution, so its discriminant, $(${bd})^2 - 4(2)(${c} - a)$, equals zero. A quadratic equation with a discriminant of zero has its single solution at $x = -\\frac{${bd}}{2(2)} = \\frac{${-bd}}{4} = ${xValue}$.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `$y = 2x^2 - ${-b}x + ${c}$\n$y = ${d}x + a$\n\nIn the given system of equations, $a$ is a constant. The graphs of the equations in the given system intersect at exactly one point, $(x, y)$, in the $xy$-plane. What is the value of $x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
