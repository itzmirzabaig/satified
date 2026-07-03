import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1060
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [system 8x+y=-11, 2x²=y+341, find greatest x²]
 * - Difficulty factors: [System with linear and quadratic, substitution, solve quadratic]
 * - Distractor patterns: [the two x-solutions themselves, the smaller x² value]
 * - Constraints: [Substitute linear into quadratic, two possible x² values, ask for greatest]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1060 = {
  metadata: {
    id: "1060",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Answer-first construction (mirrors the original 8x+y=-11, 2x²=y+341).
    // The combined quadratic has roots x = -m (negative) and x = n (positive)
    // with m >= n + 2, so the two possible values of x² are m² and n², and the
    // greatest is ALWAYS m².
    const m = getRandomInt(11, 16);     // magnitude of the negative root
    const n = getRandomInt(7, m - 2);   // positive root, strictly smaller magnitude

    const d = 2;                        // leading coefficient of the quadratic
    const a = d * (m - n);              // d(x + m)(x - n) = d·x² + a·x - d·m·n
    const sum = d * m * n;              // c1 + c2
    const c1 = -getRandomInt(5, 20);    // negative constant in the linear equation
    const c2 = sum - c1;                // positive constant in the quadratic equation

    // System: y + a·x = c1  and  y = d·x² - c2.
    // Substituting y = c1 - a·x:  c1 - a·x = d·x² - c2
    //   →  d·x² + a·x - (c1 + c2) = 0
    //   →  x² + (m - n)·x - m·n = 0
    //   →  (x + m)(x - n) = 0,  so x = -m or x = n.
    const xSqBig = m * m;               // greatest possible x² (from x = -m)
    const xSqSmall = n * n;             // the other possible x² (from x = n)

    // Options are distinct for every draw by construction:
    // -m < 0 < n < n² < m²  (n >= 7 → n² > n;  n <= m - 2 → n² < m²).
    const optionsData = [
      { text: `$${-m}$`, isCorrect: false, reason: `is one of the two solutions for $x$, not the value of $x^2$` },
      { text: `$${n}$`, isCorrect: false, reason: `is the other solution for $x$, not the value of $x^2$` },
      { text: `$${xSqSmall}$`, isCorrect: false, reason: `is the other possible value of $x^2$ (from $x = ${n}$), but it is not the greatest possible value` },
      { text: `$${xSqBig}$`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Solving the first equation for $y$ gives $y = ${c1} - ${a}x$, and the second equation gives $y = ${d}x^2 - ${c2}$. Setting these equal: $${c1} - ${a}x = ${d}x^2 - ${c2}$. Moving every term to one side and dividing by ${d} yields $x^2 + ${m - n}x - ${m * n} = 0$, which factors as $(x + ${m})(x - ${n}) = 0$. So $x = ${-m}$ or $x = ${n}$, giving $x^2 = ${xSqBig}$ or $x^2 = ${xSqSmall}$. The greatest possible value is $x^2 = ${xSqBig}$.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `$y + ${a}x = ${c1}$\n$y = ${d}x^2 - ${c2}$\n\nIf $(x, y)$ is a solution to the given system of equations, what is the greatest possible value of $x^2$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
