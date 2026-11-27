import { getRandomInt, getRandomElement } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1152
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [-49, -98 (coefficients)]
 * - Difficulty factors: [Simplifying to find exactly one solution]
 * - Distractor patterns: [A: zero (if contradictory), C: exactly two (quadratic confusion), D: infinitely many (if identity)]
 * - Constraints: [Must simplify to x = 0]
 * - Question type: [Equation→Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIXED: the explanation was a markdown numbered list with broken TeX (\\\\frac and
 * \\\\neq printed literally), the stem used a raw "\n", the answer was always
 * "Exactly one", and the wrong choices had generic reasons. The equation is now one
 * of three kinds (one solution x = 0, no solution, infinitely many solutions).
 */

export const generator_1152 = {
  metadata: {
    id: "1152",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const factor = getRandomInt(20, 80);
    const a = -factor;              // negative coefficient of x
    const b = -2 * factor;          // used by the one solution kind
    const p = getRandomInt(2, 9);   // constant inside the parentheses
    const ap = a * p;               // negative product
    const kind = getRandomElement(['one', 'none', 'infinite'] as const);

    const twoReason = `a linear equation has zero, one, or infinitely many solutions, so it cannot have exactly two`;

    let equation: string;
    let solution: string;
    let correctText: string;
    const reasons: Record<string, string> = { 'Exactly two': twoReason };

    if (kind === 'one') {
      // The trap: dividing both sides by x gives a false statement and suggests zero solutions.
      equation = `${a}x=${b}x`;
      correctText = 'Exactly one';
      solution = `Adding $${-b}x$ to both sides gives $${factor}x=0$. Dividing both sides by $${factor}$ gives $x=0$. This is the only value of $x$ that makes both sides equal, so the equation has exactly one solution.`;
      reasons['Zero'] = `zero comes from dividing both sides by $x$ to get $${a}=${b}$, but dividing by $x$ is not allowed when $x=0$, and $x=0$ is a solution`;
      reasons['Infinitely many'] = `infinitely many would require the two sides to be the same expression, but $${a}x$ and $${b}x$ are equal only when $x=0$`;
    } else if (kind === 'none') {
      // The right side is what a student writes after forgetting to distribute to the constant.
      equation = `${a}(x+${p})=${a}x+${p}`;
      correctText = 'Zero';
      solution = `Distributing $${a}$ gives $${a}x${ap}=${a}x+${p}$. Adding $${factor}x$ to both sides gives $${ap}=${p}$, which is false. No value of $x$ makes the equation true, so it has zero solutions.`;
      reasons['Exactly one'] = `exactly one would require different coefficients of $x$ on the two sides, but both sides have $${a}x$, so the $x$ terms cancel`;
      reasons['Infinitely many'] = `infinitely many comes from distributing $${a}$ to $x$ only, which makes the two sides look identical, but distributing to both terms gives $${a}x${ap}$`;
    } else {
      equation = `${a}(x+${p})=${a}x${ap}`;
      correctText = 'Infinitely many';
      solution = `Distributing $${a}$ gives $${a}x${ap}=${a}x${ap}$. The two sides are identical, so every value of $x$ makes the equation true, and it has infinitely many solutions.`;
      reasons['Zero'] = `zero would require the $x$ terms to cancel and leave a false statement, but here they cancel and leave the true statement $${ap}=${ap}$`;
      reasons['Exactly one'] = `exactly one would require different coefficients of $x$ on the two sides, but both sides have $${a}x$`;
    }

    // Keep the conventional order of the choices.
    const orderedOptions = ['Zero', 'Exactly one', 'Exactly two', 'Infinitely many'].map((text, index) => ({
      text,
      isCorrect: text === correctText,
      reason: text === correctText ? '' : reasons[text],
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = orderedOptions.find(o => o.isCorrect)!;
    const incorrectOptions = orderedOptions.filter(o => !o.isCorrect);

    return {
      questionText: `$${equation}$\n\nHow many solutions does the given equation have?`,
      figureCode: null,
      options: orderedOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. ${solution} ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
