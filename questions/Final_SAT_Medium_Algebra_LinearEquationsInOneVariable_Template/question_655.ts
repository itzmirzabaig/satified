import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 655
 *
 * ORIGINAL ANALYSIS:
 * - Concept: a linear equation ax + p = cx + q has NO solution exactly when the
 *   coefficient of x, (a - c), is zero (a = c) while the constant terms differ
 *   (p != q). Ask for the value of the parameter a that creates this condition.
 * - Number ranges: [c = 2..8; distinct constants p, q with p != q]
 * - Distractor patterns: [values of a != c, each giving a unique solution]
 * - Constraints: [Exactly one value (a = c) yields no solution; require p != q so
 *   a = c is "no solution", not "infinitely many"]
 * - Question type: [Multiple Choice Text]
 */

export const generator_655 = {
  metadata: {
    id: "655",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Build an equation  a*x + p = c*x + q  with a as the unknown
    // parameter. Rearranged: (a - c)*x = q - p. The coefficient of x is (a - c),
    // which is zero exactly when a = c. Provided q != p, that makes the equation
    // 0 = (nonzero), i.e. NO solution. So the answer is a = c.
    const c = getRandomInt(2, 8);
    const p = getRandomInt(1, 9);
    // Constant on the other side, guaranteed different from p so a = c really
    // produces "no solution" (not infinitely many solutions).
    let q = getRandomInt(1, 9);
    let guard = 0;
    while (q === p && guard++ < 50) q = getRandomInt(1, 9);
    if (q === p) q = p + 1; // deterministic fallback

    // Correct answer: the parameter value that zeroes the coefficient of x.
    const correctValue = c;

    // Distractors: other parameter values (a != c), each giving a unique
    // solution. None can equal c, so none accidentally becomes "no solution".
    const distractorB = c + 2;
    const distractorC = c + 4;
    const distractorD = c + 6;

    const correctText = `$${correctValue}$`;
    const optionsData = [
      { text: `$${correctValue}$`, isCorrect: true },
      { text: `$${distractorB}$`, isCorrect: false },
      { text: `$${distractorC}$`, isCorrect: false },
      { text: `$${distractorD}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;

    return {
      questionText: `$a x + ${p} = ${c}x + ${q}$\n\nIn the equation above, $a$ is a constant. For what value of $a$ does the equation have no solution?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Collect the $x$ terms on one side: $a x - ${c}x = ${q} - ${p}$, which is $(a - ${c})x = ${q - p}$. A linear equation of the form $(\\text{coefficient})x = ${q - p}$ has no solution only when the coefficient of $x$ is $0$ while the right side is nonzero. Setting $a - ${c} = 0$ gives $a = ${correctValue}$; since $${q - p} \\neq 0$, the equation becomes $0 = ${q - p}$, which is never true, so there is no solution. For any other value of $a$ the coefficient $a - ${c}$ is nonzero, giving exactly one solution.`
    };
  }
};
