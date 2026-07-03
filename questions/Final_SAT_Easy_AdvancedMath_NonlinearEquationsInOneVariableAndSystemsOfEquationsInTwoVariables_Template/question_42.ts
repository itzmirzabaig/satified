import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 42
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Original coefficients 6, -9, 12; GCD = 3]
 * - Difficulty factors: [Inequality simplification, identifying common factors]
 * - Distractor patterns: [Wrong GCD division, coefficient swaps, variable swaps]
 * - Question type: [Text→Multiple Choice Text]
 */

export const generator_42 = {
  metadata: {
    id: "42",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const gcd = getRandomInt(2, 4);
    const gcdOf = (m: number, n: number): number => (n === 0 ? m : gcdOf(n, m % n));
    // Guards: baseA !== baseB so the swapped-coefficient distractor can never
    // equal the correct option, and gcd(baseA, baseB, baseC) === 1 so the
    // explanation's claim "the greatest common divisor is `gcd`" is true.
    let baseA = getRandomInt(2, 4);
    let baseB = getRandomInt(2, 5);
    let baseC = getRandomInt(3, 6);
    let tries = 0;
    while ((baseA === baseB || gcdOf(gcdOf(baseA, baseB), baseC) !== 1) && tries++ < 50) {
      baseA = getRandomInt(2, 4);
      baseB = getRandomInt(2, 5);
      baseC = getRandomInt(3, 6);
    }
    if (baseA === baseB || gcdOf(gcdOf(baseA, baseB), baseC) !== 1) {
      baseA = 2; baseB = 3; baseC = 5;
    }

    const a = baseA * gcd;
    const b = baseB * gcd;
    const c = baseC * gcd;

    const correctText = `$${baseA}x - ${baseB}y > ${baseC}$`;

    const optionsData = [
      { text: correctText, isCorrect: true, reason: "" },
      { text: `$x - y > ${Math.ceil(c / a)}$`, isCorrect: false, reason: "results from dividing terms by inconsistent values" },
      { text: `$${baseB}x - ${baseA}y > ${baseC}$`, isCorrect: false, reason: "swaps the coefficients of the variables" },
      { text: `$${baseB}y - ${baseA}x > ${baseC}$`, isCorrect: false, reason: "swaps the variables and changes the inequality structure incorrectly" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `Which of the following inequalities is equivalent to $${a}x - ${b}y > ${c}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. To simplify $${a}x - ${b}y > ${c}$, find the greatest common divisor of $${a}$, $${b}$, and $${c}$, which is $${gcd}$. Dividing every term in the inequality by $${gcd}$ yields:

$ \\frac{${a}x}{${gcd}} - \\frac{${b}y}{${gcd}} > \\frac{${c}}{${gcd}} $

Simplifying this gives $${baseA}x - ${baseB}y > ${baseC}$.

Choice ${incorrectOptions[0].letter} is incorrect because it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect because it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect because it ${incorrectOptions[2].reason}.`
    };
  }
};
