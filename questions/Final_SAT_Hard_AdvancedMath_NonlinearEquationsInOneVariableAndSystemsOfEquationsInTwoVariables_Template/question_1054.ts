import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1054
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [equation 2x²-5=2x+3, which becomes 2x²-2x-8=0]
 * - Difficulty factors: [Quadratic equation, standard form, quadratic formula, simplifying with radical]
 * - Distractor patterns: [2 = integer solution check, wrong radical, wrong fraction]
 * - Constraints: [Must rearrange to standard form, use quadratic formula, simplify radical]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1054 = {
  metadata: {
    id: "1054",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Equation: 2x² - p = 2x + q  →  2x² - 2x - (p+q) = 0, with S = p + q.
    // Discriminant: (-2)² - 4(2)(-S) = 4 + 8S = 4(2S+1), so the radicand is
    // k = 2S + 1 (always odd) and the solutions are (1 ± √k)/2.
    // S is constrained to [5, 11] so k ∈ {11, 13, 15, 17, 19, 21, 23} — never a
    // perfect square (the radical never collapses) — and x = 2 is never a true
    // solution (x = 2 solves the equation only when S = 4).
    const a = 2;
    const b = 2;
    const S = getRandomInt(5, 11); // p + q
    const constantLeft = getRandomInt(Math.max(3, S - 5), Math.min(7, S - 1)); // p ∈ [3,7]
    const constantRight = S - constantLeft; // q ∈ [1,5]
    const k = 2 * S + 1; // radicand of the simplified solution

    const correctText = `$\\frac{1+\\sqrt{${k}}}{2}$`;

    // STEP 2: Create options (all four strings are distinct by construction)
    const optionsData = [
      { text: `$2$`, isCorrect: false, reason: `is incorrect; substituting $x=2$ into the equation gives $\\,${8 - constantLeft}$ on the left-hand side and $\\,${4 + constantRight}$ on the right-hand side, which are not equal, so $x=2$ is not a solution` },
      { text: `$1-\\sqrt{${k}}$`, isCorrect: false, reason: `is incorrect; this expression omits the denominator of 2 from the quadratic formula result $\\frac{1-\\sqrt{${k}}}{2}$` },
      { text: `$\\frac{1}{2}+\\sqrt{${k}}$`, isCorrect: false, reason: `is incorrect; this results from dividing only the first term of the numerator by 2 instead of dividing the entire numerator $\\,1+\\sqrt{${k}}$ by 2` },
      { text: correctText, isCorrect: true, reason: `` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Subtracting $\\,${b}x+${constantRight}$ from both sides of $\\,${a}x^2-${constantLeft}=${b}x+${constantRight}$ gives $\\,${a}x^2-${b}x-${S}=0$. By the quadratic formula, $x=\\frac{${b}\\pm\\sqrt{${b * b}+${4 * a * S}}}{${2 * a}}=\\frac{${b}\\pm\\sqrt{${4 * k}}}{${2 * a}}=\\frac{${b}\\pm 2\\sqrt{${k}}}{${2 * a}}=\\frac{1\\pm\\sqrt{${k}}}{2}$. Of these two solutions, $\\frac{1+\\sqrt{${k}}}{2}$ is listed as choice ${correctLetter}.
Choice ${incorrectOptions[0].letter} ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} ${incorrectOptions[2].reason}.`;

    return {
      questionText: `$${a}x^2 - ${constantLeft} = ${b}x + ${constantRight}$\n\nWhich of the following is a solution to the equation above?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
