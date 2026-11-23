import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1046
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 5 (absolute value), constant: 73, results involve fractions]
 * - Difficulty factors: [Absolute value equation, requires solving two cases, summing fractions]
 * - Distractor patterns: [negated sum = sign error, one solution alone, 0 = solutions assumed opposite]
 * - Constraints: [Two cases for absolute value, must sum solutions correctly]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1046 = {
  metadata: {
    id: "1046",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // |ax + b| = c with a = -A negative, b > 0, c > b.
    // Case 1: ax + b = c  -> x1 = (c - b)/a = (b - c)/A  (negative)
    // Case 2: ax + b = -c -> x2 = (-c - b)/a = (b + c)/A (positive)
    // Sum = x1 + x2 = -2b/a = 2b/A.

    const A = getRandomInt(3, 8); // |a|
    const a = -A;
    // Before: c was nudged by +1 to dodge a collision; now c is redrawn.
    // The "one solution alone" distractor (b - c)/A equals the negated sum
    // -2b/A exactly when c = 3b (only reachable at b = 20, c = 60).
    const b = getRandomInt(10, 20);
    let c = getRandomInt(60, 90);
    while (c === 3 * b) c = getRandomInt(60, 90);

    const gcd = (m: number, n: number): number => n === 0 ? m : gcd(n, m % n);
    // Render num/den as a simplified LaTeX value: integer when den divides num,
    // otherwise a fraction with positive denominator and the sign out front.
    const fmt = (num: number, den: number): string => {
      const g = gcd(Math.abs(num), Math.abs(den));
      let n = num / g;
      let d = den / g;
      if (d < 0) { n = -n; d = -d; }
      if (d === 1) return `${n}`;
      return n < 0 ? `-\\frac{${-n}}{${d}}` : `\\frac{${n}}{${d}}`;
    };

    const x1Text = fmt(b - c, A); // first solution (negative)
    const x2Text = fmt(b + c, A); // second solution (positive)
    const sumText = fmt(2 * b, A); // correct sum (positive)

    // Distractor values: -2b/A (sign error), (b - c)/A (one solution only), 0.
    // Distinctness for every draw: 2b/A > 0 while -2b/A < 0, (b - c)/A < 0, and
    // 0 differ from it; (b - c)/A = -2b/A only when c = 3b (guarded above);
    // (b - c)/A = 0 needs b = c (impossible, c >= 60 > 20 >= b).
    // Before: reasons did not name the values and the explanation was split
    // over several lines with "Case 1:" labels. Now each reason states the
    // number and the slip, and the explanation is one paragraph.
    const wrongSignText = fmt(-2 * b, A);
    const optionsData = [
      { text: `$${sumText}$`, isCorrect: true, reason: "" },
      { text: `$${wrongSignText}$`, isCorrect: false, reason: `$${wrongSignText}$ results from dividing by $${A}$ instead of $${a}$ in each case, which flips the sign of both solutions and of their sum` },
      { text: `$${x1Text}$`, isCorrect: false, reason: `$${x1Text}$ is only the solution of $${a}x + ${b} = ${c}$; the other case, $${a}x + ${b} = ${-c}$, gives $${x2Text}$, which must be added to it` },
      { text: `$0$`, isCorrect: false, reason: `0 results from assuming the two solutions are opposites, as they are for an equation like $|x| = ${c}$; the constant ${b} inside the absolute value shifts both solutions, so they are not opposites` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index) // A=65, B=66, C=67, D=68
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. The equation $|${a}x + ${b}| = ${c}$ is true when $${a}x + ${b} = ${c}$ or $${a}x + ${b} = ${-c}$. In the first case, $${a}x = ${c - b}$, so $x = ${x1Text}$. In the second case, $${a}x = ${-c - b}$, so $x = ${x2Text}$. The sum of the solutions is $${x1Text} + ${x2Text} = ${sumText}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `What is the sum of the solutions to the given equation?\n\n$|${a}x + ${b}| = ${c}$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
