import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1033
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: varied, constants: multiples of b]
 * - Difficulty factors: [Factor theorem application, testing values, finding valid b]
 * - Distractor patterns: [Non-integer b values, zero or negative b when positive required]
 * - Constraints: [b must be positive integer, only one option works]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_1033 = {
  metadata: {
    id: "1033",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Choose the positive integer b-value the correct option works for.
    // Every option has the form 3x^2 + Lx + 14b. By the Factor Theorem,
    // x + 2b is a factor exactly when p(-2b) = 12b^2 - (2L - 14)b = 0,
    // i.e. (for b > 0) when b = (L - 7)/6. So the correct option uses
    // L = 6*correctB + 7, which gives b = correctB (a positive integer).
    const correctB = getRandomInt(5, 10);
    const dLinear = 6 * correctB + 7; // 37..67

    // The wrong choices used to be 7, 28, and 42 on every draw, with reasons
    // that did not start with the value and an explanation spread over many
    // lines. They now vary: one gives b = 0, and two give a
    // b that is not an integer (L - 7 not a multiple of 6).
    const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
    const bText = (L: number): string => {
      const num = L - 7;
      if (num % 6 === 0) return `${num / 6}`;
      const g = gcd(Math.abs(num), 6);
      return `\\frac{${num / g}}{${6 / g}}`;
    };
    const smallL = 7; // b = 0 (L = 1 for b = -1 would show "1x")
    let fracL1 = 0, fracL2 = 0;
    do {
      fracL1 = getRandomInt(10, 70);
      fracL2 = getRandomInt(10, 70);
    } while ((fracL1 - 7) % 6 === 0 || (fracL2 - 7) % 6 === 0 || fracL1 === fracL2);

    const optText = (L: number) => `$3x^{2} + ${L}x + 14b$`;
    const optionsData = [
      { L: smallL, text: optText(smallL), isCorrect: false, reason: `${optText(smallL)} has a factor of $x + 2b$ only when $b = \\frac{${smallL} - 7}{6} = ${bText(smallL)}$, which is not positive` },
      { L: fracL1, text: optText(fracL1), isCorrect: false, reason: `${optText(fracL1)} has a factor of $x + 2b$ only when $b = \\frac{${fracL1} - 7}{6} = ${bText(fracL1)}$, which is not an integer` },
      { L: fracL2, text: optText(fracL2), isCorrect: false, reason: `${optText(fracL2)} has a factor of $x + 2b$ only when $b = \\frac{${fracL2} - 7}{6} = ${bText(fracL2)}$, which is not an integer` },
      { L: dLinear, text: optText(dLinear), isCorrect: true, reason: '' }
    ];

    // STEP 2: Shuffle (sorting by coefficient would always make the b = 0
    // expression choice A, so A could never be correct)
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 3: Question text
    const questionText = `Which of the following expressions has a factor of $x + 2b$, where $b$ is a positive integer constant?`;

    // STEP 4: Explanation using Factor Theorem
    const explanation = `Choice ${correctLetter} is correct. By the factor theorem, $x + 2b$ is a factor of a polynomial in $x$ exactly when the polynomial equals $0$ at $x = -2b$. Each choice has the form $3x^{2} + Lx + 14b$, where $L$ is the coefficient of $x$. Substituting $-2b$ for $x$ gives $3(-2b)^{2} + L(-2b) + 14b = 12b^{2} - (2L - 14)b$, which equals $0$ for a positive $b$ only when $12b = 2L - 14$, or $b = \\frac{L - 7}{6}$. For choice ${correctLetter}, $L = ${dLinear}$, so $3(-2b)^{2} + ${dLinear}(-2b) + 14b = 12b^{2} - ${2 * dLinear}b + 14b = 12b^{2} - ${2 * dLinear - 14}b = 12b(b - ${correctB})$, which equals $0$ when $b = ${correctB}$, a positive integer. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
