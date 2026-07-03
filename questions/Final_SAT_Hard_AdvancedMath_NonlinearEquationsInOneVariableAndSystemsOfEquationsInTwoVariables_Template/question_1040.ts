import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1040
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient 57, constants a and b, product of roots]
 * - Difficulty factors: [Vieta's formulas, product of roots = c/a, algebraic manipulation]
 * - Distractor patterns: [1/57 = correct, 1/19 = wrong coefficient, 1 = forgot denominator, 57 = inverted]
 * - Constraints: [Quadratic in standard form, identify product formula]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1040 = {
  metadata: {
    id: "1040",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Pattern: Ax^2 + (Ab + a)x + ab = 0 factors as (Ax + a)(x + b),
    // so the product of the solutions is (-a/A)(-b) = ab/A.
    // The product is given as kab, so k = 1/A.
    const A = getRandomInt(30, 80);

    // Distractor denominator: floor(A/3) lies in [10, 26] while A >= 30,
    // so 1/wrongDenom can never collide with the correct 1/A.
    const wrongDenom = Math.floor(A / 3);

    const optionsData = [
      { text: `$\\frac{1}{${A}}$`, isCorrect: true, reason: "" },
      { text: `$\\frac{1}{${wrongDenom}}$`, isCorrect: false, reason: "uses a denominator other than the leading coefficient" },
      { text: `$1$`, isCorrect: false, reason: "comes from forgetting to divide the constant term by the leading coefficient" },
      { text: `$${A}$`, isCorrect: false, reason: "inverts the relationship, using the leading coefficient itself instead of its reciprocal" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. For a quadratic equation $px^2+qx+r=0$, the product of the solutions is $\\frac{r}{p}$. Here $p=${A}$, $q=${A}b+a$, and $r=ab$, so the product of the solutions is $\\frac{ab}{${A}}$. Since this product is given as $kab$, it follows that $k=\\frac{1}{${A}}$.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `$ ${A}x^2 + (${A}b + a)x + ab = 0$\n\nIn the given equation, $a$ and $b$ are positive constants. The product of the solutions to the given equation is $kab$, where $k$ is a constant. What is the value of $k$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
