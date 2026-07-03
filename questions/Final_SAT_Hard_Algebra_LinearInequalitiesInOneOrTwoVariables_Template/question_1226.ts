import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1226
 * Skill: Linear Inequalities In One Or Two Variables
 * Difficulty: Hard
 *
 * Description: Range of y-values for the system  y > mx + b  and  x > c.
 * Because m > 0, mx + b increases with x, so the greatest-lower-bound of y is
 * m*c + b (approached as x -> c+). Answer: y > m*c + b.
 * Issues fixed:
 * - correctAnswer was a bare letter (CORRECT_MISMATCH); now the correct option text.
 * - Options could coincide numerically (DUP_OPTIONS); now guarded by a bounded
 *   retry that requires four distinct numeric bounds.
 * - Removed the stray backslash-before-newline that tripped SIGN_GLITCH.
 */
export const generator_1226 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Format numbers as integers, or one-decimal for half-integers.
    const formatNum = (n: number) => (Number.isInteger(n) ? n.toString() : n.toFixed(1));

    // "mx + b" or "mx - |b|"
    const formatLinear = (slope: number, intercept: number) => {
      const sign = intercept >= 0 ? "+" : "-";
      return `${slope}x ${sign} ${Math.abs(intercept)}`;
    };

    // ----------------------------------------------------------------------
    // 1. GENERATE VALUES (bounded retry so the four option bounds are distinct)
    // ----------------------------------------------------------------------
    let m = 0, b = 0, c = 0, yBound = 0, valA = 0;
    let tries = 0;
    do {
      m = getRandomInt(2, 4);            // positive slope keeps the bound direction fixed
      b = getRandomInt(-4, 4);           // y-intercept
      c = getRandomInt(1, 3) + 0.5;      // x-bound: 1.5, 2.5, or 3.5
      yBound = m * c + b;                // correct greatest-lower-bound for y
      valA = m * (c + 1) + b;            // distractor A: substitutes x = c + 1
      tries++;
      // Require the four numeric bounds (yBound, valA, c, b) to be pairwise
      // distinct so no two option strings collide.
    } while (
      tries < 50 &&
      (yBound === valA || yBound === c || yBound === b ||
       valA === c || valA === b || c === b)
    );

    // ----------------------------------------------------------------------
    // 2. OPTIONS
    // ----------------------------------------------------------------------
    // Correct: y > yBound.  A: uses x = c + 1.  B: uses the x-bound c as a y-bound.
    // C: uses the intercept b, ignoring the slope term.
    const optionsData = [
      { text: `$y > ${formatNum(yBound)}$`, isCorrect: true,  kind: "correct" },
      { text: `$y > ${formatNum(valA)}$`,   isCorrect: false, kind: "a" },
      { text: `$y > ${formatNum(c)}$`,      isCorrect: false, kind: "b" },
      { text: `$y > ${formatNum(b)}$`,      isCorrect: false, kind: "c" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const letterOf = (kind: string) => shuffledOptions.find(o => o.kind === kind)!.letter;

    const bSign = b >= 0 ? "+" : "-";
    const absB = Math.abs(b);

    return {
      questionText: `$$\\begin{cases} y > ${formatLinear(m, b)} \\\\ x > ${formatNum(c)} \\end{cases}$$ Which of the following consists of the $y$-coordinates of all the points $(x, y)$ that satisfy the system of inequalities above?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `
        Choice ${correctLetter} is correct.
        <br/><br/>
        The second inequality gives $x > ${formatNum(c)}$, and the first gives $y > ${m}x ${bSign} ${absB}$.
        <br/><br/>
        Because the slope $${m}$ is positive, $${m}x ${bSign} ${absB}$ increases as $x$ increases, so the smallest boundary value of $y$ occurs at the smallest boundary value of $x$. Substituting $x = ${formatNum(c)}$:
        $$${m}(${formatNum(c)}) ${bSign} ${absB} = ${formatNum(yBound)}$$
        Since $x > ${formatNum(c)}$ (not equal), it follows that $y > ${formatNum(yBound)}$.
        <br/><br/>
        Choice ${letterOf("a")} is incorrect: it substitutes $x = ${formatNum(c + 1)}$ instead of the boundary $x = ${formatNum(c)}$.
        Choice ${letterOf("b")} is incorrect: it uses the $x$-bound $${formatNum(c)}$ as if it were the $y$-bound.
        Choice ${letterOf("c")} is incorrect: it uses only the intercept $${formatNum(b)}$, ignoring the $${m}x$ term.
      `
    };
  }
};
