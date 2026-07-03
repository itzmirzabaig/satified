import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 63
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [num: 10-30, xVal: num +/- 5]
 * - Difficulty factors: [Evaluating a rational function at a point]
 * - Distractor patterns: [Flipped fraction, using numerator only, using x only]
 * - Constraints: [Evaluation results in a fraction]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIXED:
 * - xVal could equal numeratorVal, which made the correct option collide
 *   with the flipped-fraction distractor and $numeratorVal$ collide with
 *   $xVal$. Now guarded with a bounded coprime retry (<= 50 tries, fallback
 *   xVal = numeratorVal + 1), which also guarantees the fraction is in
 *   lowest terms and never an integer.
 * - Explanation now covers each distractor using letters from the
 *   shuffled array.
 */

export const generator_63 = {
  metadata: {
    id: "63",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const gcd = (m: number, n: number): number => (n === 0 ? m : gcd(n, m % n));

    const numeratorVal = getRandomInt(10, 30);

    // Require gcd(numeratorVal, xVal) = 1: this forces xVal !== numeratorVal
    // (no option collisions) and keeps the fraction in lowest terms. Since
    // xVal >= numeratorVal - 5 >= 5 > 1, the value is never an integer.
    let xVal = getRandomInt(numeratorVal - 5, numeratorVal + 5);
    let tries = 0;
    while (gcd(numeratorVal, xVal) !== 1 && tries++ < 50) {
      xVal = getRandomInt(numeratorVal - 5, numeratorVal + 5);
    }
    if (gcd(numeratorVal, xVal) !== 1) {
      xVal = numeratorVal + 1; // consecutive integers are always coprime
    }

    const resStr = `\\frac{${numeratorVal}}{${xVal}}`;

    const optionsData = [
      { id: 'correct', text: `$${resStr}$`, isCorrect: true },
      { id: 'flipped', text: `$\\frac{${xVal}}{${numeratorVal}}$`, isCorrect: false },
      { id: 'numeratorOnly', text: `$${numeratorVal}$`, isCorrect: false },
      { id: 'xOnly', text: `$${xVal}$`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;
    const letterOf = (id: string) => shuffled.find(o => o.id === id)!.letter;

    return {
      questionText: `The function $f$ is defined by $f(x)=\\frac{${numeratorVal}}{x}$. What is the value of $f(x)$ when $x=${xVal}$?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xVal} for $x$ in $f(x)=\\frac{${numeratorVal}}{x}$ gives $f(${xVal})=\\frac{${numeratorVal}}{${xVal}}$. Since ${numeratorVal} and ${xVal} share no common factor greater than 1, this fraction is already in lowest terms. Choice ${letterOf('flipped')} is incorrect; it results from placing ${xVal} in the numerator instead of the denominator. Choice ${letterOf('numeratorOnly')} is incorrect; it is the numerator of $f(x)$, not the value of the function. Choice ${letterOf('xOnly')} is incorrect; it is the input value $x$, not $f(x)$.`
    };
  }
};
