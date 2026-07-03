import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 715
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1/3, 29, 10, 5]
 * - Difficulty factors: [Distributing fraction, combining like terms]
 * - Distractor patterns: [Not applicable - fill in blank]
 * - Constraints: [Final slope should be clean fraction]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_715 = {
  metadata: {
    id: "715",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Question: slope of y = (1/d)(a x + b) + c x.
    // Distributing: y = (a/d) x + (b/d) + c x = ((a + c d)/d) x + b/d.
    // Slope = (a + c d)/d, reduced to finalNum/finalDen.
    const d = getRandomInt(2, 6);
    const a = getRandomInt(10, 40);
    const b = getRandomInt(5, 30);
    const c = getRandomInt(2, 10);

    // Slope numerator over d. a>0, c>0, d>0 so slopeNum>0 => answer is positive.
    const slopeNum = a + c * d;

    // Reduce the slope fraction. slopeNum>0 and d>0, so divisor>0 and finalDen
    // divides d (finalDen is in {1..6}); the sign never becomes an issue.
    const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
    const divisor = gcd(slopeNum, d);
    const finalNum = slopeNum / divisor;
    const finalDen = d / divisor;

    // Fill-in answer: plain integer or "a/b" fraction only (students type it).
    const correctAnswer = finalDen === 1 ? `${finalNum}` : `${finalNum}/${finalDen}`;
    // LaTeX form used ONLY inside $...$ in the explanation. Starts with a digit
    // or \frac; every explanation math segment below is wrapped so that no bare
    // "$<digit>" occurs (keeps the currency/DOLLAR_RISK heuristic clear).
    const answerTex = finalDen === 1 ? `${finalNum}` : `\\frac{${finalNum}}{${finalDen}}`;

    return {
      questionText: `What is the slope of the graph of $y=\\frac{1}{${d}}(${a}x+${b})+${c}x$ in the $xy$-plane? Enter your answer as a fraction or decimal.`,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `A linear equation can be written in the form $y=mx+b$, where $m$ is the slope of the graph of the equation in the $xy$-plane and $(0, b)$ is the $y$-intercept. Distributing the $\\frac{1}{${d}}$ in the equation $y=\\frac{1}{${d}}(${a}x+${b})+${c}x$ yields $y=\\frac{${a}}{${d}}x+\\frac{${b}}{${d}}+${c}x$. Combining the like terms in $x$ on the right-hand side gives a slope of $m=\\frac{${a}}{${d}}+${c}=\\frac{${a}+${c}\\cdot${d}}{${d}}=\\frac{${slopeNum}}{${d}}=${answerTex}$. Therefore, the slope of the graph of the given equation in the $xy$-plane is $m=${answerTex}$.`
    };
  }
};
