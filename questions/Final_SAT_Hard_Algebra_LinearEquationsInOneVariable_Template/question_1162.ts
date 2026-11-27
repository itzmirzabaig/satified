import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1162
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [12, 3, 3, 12 (small integers)]
 * - Difficulty factors: [Counting solutions of a linear equation]
 * - Question type: [Equation→Multiple Choice Text]
 * - Figure generation: [None]
 *
 * Previously the answer was always "Exactly one" and the wrong choices had
 * generic reasons. The outcome is now drawn:
 *   one:      a(x - b) = -c(x + d), built answer first so x is an integer
 *   zero:     a(x - b) = -a(d - x) with d != b  (x terms cancel, -ab = -ad false)
 *   infinite: a(x - b) = -a(b - x)              (both sides are ax - ab)
 */

export const generator_1162 = {
  metadata: {
    id: "1162",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const outcome = getRandomElement(['one', 'zero', 'infinite'] as const);
    const twoReason = `a linear equation cannot have exactly two solutions, since it has zero, one, or infinitely many`;

    let questionEq = '';
    let steps = '';
    let reasons: Record<string, string> = {};

    if (outcome === 'one') {
      // (a + c)x = ab - cd  =>  x = (ab - cd)/(a + c). Choose d with (x + d)
      // a multiple of a, which makes b = ((a + c)x + cd)/a an integer.
      let a = 0, b = 0, c = 0, d = 0, solution = 0;
      let tries = 0;
      do {
        solution = getRandomInt(-6, 6);
        a = getRandomInt(5, 15);
        c = getRandomInt(3, 10);
        const base = ((-solution - 8) % a + a) % a;
        d = 8 + base;
        b = ((a + c) * solution + c * d) / a;
        tries++;
      } while ((b < 2 || b > 40 || !Number.isInteger(b)) && tries < 50);

      questionEq = `${a}(x - ${b}) = -${c}(x + ${d})`;
      steps = `Distributing on both sides gives $${a}x - ${a * b} = -${c}x - ${c * d}$. Adding $${c}x$ to both sides gives $${a + c}x - ${a * b} = -${c * d}$, and adding $${a * b}$ to both sides gives $${a + c}x = ${a * b - c * d}$. Dividing both sides by $${a + c}$ gives $x = ${solution}$. This is the only value that makes the equation true, so the equation has exactly one solution.`;
      reasons = {
        'Zero': `zero solutions would require the same coefficient of $x$ on both sides, but after distributing the coefficients are $${a}$ and $-${c}$`,
        'Infinitely many': `infinitely many solutions would require both sides to be the same expression, but $${a}x - ${a * b}$ and $-${c}x - ${c * d}$ differ`,
        'Exactly two': twoReason
      };
    } else {
      const a = getRandomInt(5, 15);
      const b = getRandomInt(2, 20);
      let d = b;
      if (outcome === 'zero') {
        do { d = getRandomInt(2, 20); } while (d === b);
      }
      questionEq = `${a}(x - ${b}) = -${a}(${d} - x)`;
      const distributed = `Distributing on both sides gives $${a}x - ${a * b} = -${a * d} + ${a}x$, or $${a}x - ${a * b} = ${a}x - ${a * d}$.`;
      const signSlip = `exactly one comes from distributing $-${a}(${d} - x)$ as $-${a * d} - ${a}x$, a sign slip that makes the coefficients of $x$ differ`;
      if (outcome === 'zero') {
        steps = `${distributed} Subtracting $${a}x$ from both sides gives $-${a * b} = -${a * d}$, which is false. No value of $x$ makes the equation true, so the equation has zero solutions.`;
        reasons = {
          'Exactly one': signSlip,
          'Infinitely many': `infinitely many comes from seeing $${a}x$ on both sides and overlooking that the constants $-${a * b}$ and $-${a * d}$ differ`,
          'Exactly two': twoReason
        };
      } else {
        steps = `${distributed} The two sides are the same expression, so the equation is true for every value of $x$, and it has infinitely many solutions.`;
        reasons = {
          'Exactly one': signSlip,
          'Zero': `zero comes from reading the result $0 = 0$ as no solution, but a true statement means every value of $x$ works`,
          'Exactly two': twoReason
        };
      }
    }

    const correctText =
      outcome === 'one' ? 'Exactly one' : outcome === 'zero' ? 'Zero' : 'Infinitely many';

    const optionsData = ['Zero', 'Exactly one', 'Exactly two', 'Infinitely many'].map(text => ({
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
      questionText: `How many solutions does the equation $${questionEq}$ have?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
