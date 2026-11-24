import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1155
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [10, 15, 9, 15, 6, 10 (small integers)]
 * - Difficulty factors: [Identifying the number of solutions by simplification]
 * - Constraints: [a(bx - c) = d(fx - e) with a != d so the sides never look identical]
 * - Question type: [Equation→Multiple Choice Text]
 * - Figure generation: [None]
 *
 * Previously the answer was always "Infinitely many", a draw could show the
 * same expression on both sides or a 1x term, and the explanation used
 * markdown. The outcome is now drawn: infinitely many, zero, or exactly one.
 */

export const generator_1155 = {
  metadata: {
    id: "1155",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const gcd = (x: number, y: number): number => (y === 0 ? Math.abs(x) : gcd(y, x % y));

    // STEP 1: Build a(bx - c) = d(fx - e) with ab = df and ac = de, so the two
    // sides start out identical after distributing.
    let a = 0, b = 0, c = 0, d = 0, f = 0, e = 0;
    do {
      a = getRandomInt(2, 9);
      d = getRandomInt(2, 9);
      const lcm = (a * d) / gcd(a, d);
      const u = getRandomInt(1, 3);
      const v = getRandomInt(1, 3);
      b = (lcm * u) / a;
      f = (lcm * u) / d;
      c = (lcm * v) / a;
      e = (lcm * v) / d;
    } while (a === d || b < 2 || f < 2 || b > 15 || f > 15);

    // STEP 2: Draw the outcome and adjust the right side to produce it.
    const outcome = getRandomElement(['infinite', 'zero', 'one'] as const);
    const k = getRandomInt(1, 3);  // shift in e
    const s = getRandomInt(1, 2);  // shift in f
    if (outcome !== 'infinite') e += k;
    if (outcome === 'one') f += s;

    const leftX = a * b;
    const leftC = a * c;
    const rightX = d * f;
    const rightC = d * e;

    const correctText =
      outcome === 'infinite' ? 'Infinitely many' : outcome === 'zero' ? 'Zero' : 'Exactly one';

    // STEP 3: The solving steps for this outcome.
    const distributed = `Distributing on both sides gives $${leftX}x - ${leftC} = ${rightX}x - ${rightC}$.`;
    let steps = '';
    if (outcome === 'infinite') {
      steps = `${distributed} The two sides are the same expression, so the equation is true for every value of $x$, and it has infinitely many solutions.`;
    } else if (outcome === 'zero') {
      steps = `${distributed} Subtracting $${leftX}x$ from both sides gives $-${leftC} = -${rightC}$, which is false. No value of $x$ makes the equation true, so it has zero solutions.`;
    } else {
      const g = gcd(k, s);
      const xValue = s / g === 1 ? `${k / g}` : `\\frac{${k / g}}{${s / g}}`;
      steps = `${distributed} Subtracting $${leftX}x$ from both sides gives $-${leftC} = ${rightX - leftX}x - ${rightC}$. Adding $${rightC}$ to both sides gives $${rightC - leftC} = ${rightX - leftX}x$, and dividing both sides by $${rightX - leftX}$ gives $x = ${xValue}$. This is the only value that makes the equation true, so it has exactly one solution.`;
    }

    // STEP 4: Each wrong choice names the slip for this outcome.
    const twoReason = `a linear equation cannot have exactly two solutions, since it has zero, one, or infinitely many`;
    const reasons: Record<string, string> =
      outcome === 'infinite'
        ? {
            'Exactly one': `exactly one solution assumes every linear equation has a single answer, but both sides simplify to $${leftX}x - ${leftC}$`,
            'Zero': `zero comes from reading the result $0 = 0$ as no solution, but a true statement means every value of $x$ works`,
            'Exactly two': twoReason
          }
        : outcome === 'zero'
        ? {
            'Exactly one': `exactly one solution assumes every linear equation has a single answer, but the $x$ terms cancel and leave a false statement`,
            'Infinitely many': `infinitely many comes from seeing $${leftX}x$ on both sides and overlooking that the constants $-${leftC}$ and $-${rightC}$ differ`,
            'Exactly two': twoReason
          }
        : {
            'Zero': `zero solutions would require the same coefficient of $x$ on both sides, but the coefficients are $${leftX}$ and $${rightX}$`,
            'Infinitely many': `infinitely many solutions would require both sides to be the same expression, but $${leftX}x - ${leftC}$ and $${rightX}x - ${rightC}$ differ`,
            'Exactly two': twoReason
          };

    const optionsData = ['Exactly one', 'Exactly two', 'Zero', 'Infinitely many'].map(text => ({
      text,
      isCorrect: text === correctText,
      reason: text === correctText ? '' : reasons[text]
    }));

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. ${steps} ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `How many solutions does the equation $${a}(${b}x - ${c}) = ${d}(${f}x - ${e})$ have?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
