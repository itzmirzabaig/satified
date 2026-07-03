import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1122
 *
 * ANALYSIS:
 * - Domain: Advanced Math
 * - Skill: Nonlinear Functions (Equivalent Forms)
 * - Logic: Identify which equivalent form displays the y-coordinate of the
 *   y-intercept as a single visible constant or coefficient.
 * - Function: f(x) = a(base^x + base^b), with a a concrete integer coefficient
 *   and b a symbolic integer exponent (0 < a < b).
 * - Y-Intercept: f(0) = a(1 + base^b) = a + a*base^b.
 * - Form I:  g(x) = a(base^x + k).  Equivalent => k = base^b.
 *            Displayed constants: a, k. Intercept a(1+k) is not a lone constant.
 * - Form II: h(x) = a(base)^x + m.   Equivalent => m = a*base^b.
 *            Displayed constants: a, m. Intercept a + m is not a lone constant.
 * - Answer is always "Neither I nor II".
 */

export const generator_1122 = {
  metadata: {
    id: "1122",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // 1. Randomize parameters. a is a concrete coefficient; b stays symbolic.
    const a = getRandomInt(2, 9);
    const b = a + getRandomInt(2, 6); // ensures 0 < a < b

    // Base is a decimal in [1.2, 3.8] to avoid static numbers.
    const base = (getRandomInt(12, 38) / 10).toString();

    // 2. Options. The correct answer is always "Neither I nor II".
    const optionsData = [
      { text: `I only`, isCorrect: false },
      { text: `II only`, isCorrect: false },
      { text: `I and II`, isCorrect: false },
      { text: `Neither I nor II`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    // 3. LaTeX strings (spans lead with a letter to keep MathJax unambiguous).
    const funcF = `f(x)=${a}(${base}^{x}+${base}^{b})`;
    const funcG = `g(x)=${a}(${base}^{x}+k)`;
    const funcH = `h(x)=${a}(${base})^{x}+m`;

    // 4. Build response.
    return {
      questionText: `The function $f$ is defined by $${funcF}$, where $a$ and $b$ are integer constants and $b>a>0$. The functions $g$ and $h$ are equivalent to function $f$, where $k$ and $m$ are constants. Which of the following equations displays the $y$-coordinate of the $y$-intercept as a constant or coefficient?
      <br/><br/>
      I. $${funcG}$
      <br/>
      II. $${funcH}$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct.
      <br/><br/>
      First, find the actual $y$-coordinate of the $y$-intercept of $f$ by evaluating at $x=0$:
      $$f(0)=${a}(${base}^{0}+${base}^{b})=${a}(1+${base}^{b})=${a}+${a}\\cdot ${base}^{b}$$
      So the $y$-intercept is $f(0)=${a}+${a}\\cdot ${base}^{b}$, a value that still involves the unknown $b$.
      <br/><br/>
      <strong>Analyze Equation I:</strong> $${funcG}$
      <br/>
      Matching with $f$ forces $k=${base}^{b}$. The displayed constants are the coefficient $a=${a}$ and $k$. Evaluating at $x=0$ gives $g(0)=${a}(1+k)$, so the intercept equals $g(0)=${a}(1+k)$, which is neither the single constant $k$ nor the coefficient $a=${a}$.
      <br/><br/>
      <strong>Analyze Equation II:</strong> $${funcH}$
      <br/>
      Matching with $f$ forces $m=${a}\\cdot ${base}^{b}$. The displayed constants are the coefficient $a=${a}$ and $m$. Evaluating at $x=0$ gives $h(0)=${a}+m$, so the intercept equals $h(0)=${a}+m$, which is neither the single constant $m$ nor the coefficient $a=${a}$.
      <br/><br/>
      In each form the $y$-intercept requires combining two displayed pieces, so neither equation shows it as a single constant or coefficient. Therefore <strong>Neither I nor II</strong> is correct.`
    };
  }
};
