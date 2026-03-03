import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 781c2f6e
 * 
 * ANALYSIS:
 * - Domain: Advanced Math
 * - Skill: Nonlinear Functions (Equivalent Forms)
 * - Logic: Identify which equation form explicitly shows the y-intercept as a constant.
 * - Function: f(x) = a(base^x + base^b).
 * - Y-Intercept: f(0) = a(1 + base^b).
 * - Form I: g(x) = a(base^x + k). Constants displayed: a, k. Intercept is a(1+k). Neither a nor k is the intercept.
 * - Form II: h(x) = a(base^x) + m. Constants displayed: a, m. Intercept is a + m. Neither a nor m is the intercept.
 */

export const generator_781c2f6e = {
  metadata: {
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Randomize Parameters
    const a = getRandomInt(2, 9);
    // Ensure b > a as per problem statement "0 < a < b"
    const b = a + getRandomInt(2, 6); 
    
    // Randomize base (e.g. 1.2, 2.5, 3.4) to avoid static numbers
    const baseVal = getRandomInt(12, 38) / 10; 
    const base = baseVal.toString();

    // 2. Define Options
    // The answer is always "Neither" for this specific transformation structure.
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

    // 3. Build LaTeX Strings
    const funcF = `f(x)=${a}(${base}^{x}+${base}^{b})`;
    const funcG = `g(x)=${a}(${base}^{x}+k)`;
    const funcH = `h(x)=${a}(${base})^{x}+m`;

    // 4. Explanation Logic
    return {
      questionText: `The function $f$ is defined by $${funcF}$, where $a$ and $b$ are integer constants and $0<a<b$. The functions $g$ and $h$ are equivalent to function $f$, where $k$ and $m$ are constants. Which of the following equations displays the $y$-coordinate of the $y$-intercept as a constant or coefficient?
      <br/><br/>
      I. $${funcG}$
      <br/>
      II. $${funcH}$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct.
      <br/><br/>
      First, determine the actual $y$-intercept of the function $f$ by evaluating at $x=0$:
      $$f(0) = ${a}(${base}^{0} + ${base}^{b}) = ${a}(1 + ${base}^{b}) = ${a} + ${a}\\cdot${base}^{b}$$
      The $y$-intercept is the specific value $${a} + ${a}\\cdot${base}^{b}$.
      <br/><br/>
      <strong>Analyze Equation I:</strong> $${funcG}$
      <br/>
      This equation displays the constants $${a}$ and $k$.
      Evaluating at $x=0$, the $y$-intercept is $g(0) = ${a}(1 + k)$.
      The value $k$ corresponds to $${base}^{b}$. The displayed constant $k$ is not the entire $y$-intercept.
      <br/><br/>
      <strong>Analyze Equation II:</strong> $${funcH}$
      <br/>
      This equation displays the constants $${a}$ and $m$.
      Evaluating at $x=0$, the $y$-intercept is $h(0) = ${a}(1) + m = ${a} + m$.
      The value $m$ corresponds to the constant term ${a}\\cdot${base}^{b}$. The displayed constant $m$ is only a part of the $y$-intercept (it is missing the $+${a}$ part).
      <br/><br/>
      Since neither equation explicitly shows the value $f(0)$ as a single visible constant, <strong>Neither I nor II</strong> is correct.`
    };
  }
};