import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 270cf326
 * 
 * ANALYSIS:
 * - Domain: Advanced Math
 * - Skill: Nonlinear Functions (Exponentials)
 * - Concept: Understanding asymptotes vs. minimums.
 * - Logic: Exponential functions on the real domain (unbounded) strictly increase or decrease. 
 *          They approach an asymptote but never reach a minimum/maximum value.
 *          Function I has a horizontal asymptote at y = K.
 *          Function II has a y-intercept at y = K.
 *          Neither has a minimum value.
 */

export const generator_270cf326 = {
  metadata: {
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Generate Parameters
    // We choose a negative integer K to act as the distractor value (asymptote/intercept)
    const K = -1 * getRandomInt(2, 9); // e.g., -3, -4, -7
    
    // Function I: f(x) = -A * (B)^x + K
    // This function has a horizontal asymptote at y = K.
    // It is decreasing (if A>0) and unbounded below. It approaches K from below but never reaches it.
    const A1 = getRandomInt(2, 6);
    const Base1 = getRandomInt(2, 5);
    
    // Function II: g(x) = K * (C)^x
    // This function has a y-intercept at (0, K).
    // Since K is negative, it's strictly decreasing (if Base > 1) or increasing (if 0 < Base < 1)
    // but range is (-inf, 0). It has no minimum.
    const Base2 = getRandomInt(2, 6); // Integers > 1 for standard exponential growth/decay form

    // 2. Format Function Strings
    // f(x)
    const funcI = `f(x) = -${A1}(${Base1})^{x} ${K}`; // K is negative, so it prints like "- 3"
    
    // g(x)
    const funcII = `g(x) = ${K}(${Base2})^{x}`;

    // 3. Options
    // For this specific logic type, the answer is always "Neither" because exponentials don't have mins.
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
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    // 4. Explanation
    return {
      questionText: `Which of the following functions has(have) a minimum value at $${K}$?
      <br/><br/>
      I. $${funcI}$
      <br/>
      II. $${funcII}$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: "Neither I nor II",
      explanation: `Choice ${correctLetter} is correct.
      <br/><br/>
      <strong>Analyze Function I:</strong> $${funcI}$
      <br/>
      This is an exponential function. As $x \\to -\\infty$, the term $-${A1}(${Base1})^x$ approaches 0, so $f(x)$ approaches the horizontal asymptote $y = ${K}$. However, an asymptote is a boundary the function approaches but never reaches or crosses. The function decreases without bound as $x \\to \\infty$. Therefore, it has no minimum value.
      <br/><br/>
      <strong>Analyze Function II:</strong> $${funcII}$
      <br/>
      This is also an exponential function. Since the coefficient $${K}$ is negative and the base $${Base2} > 1$, the function is strictly decreasing. Its range is $(-\\infty, 0)$. It has a y-intercept at $${K}$, but this is just a point on the graph, not a minimum.
      <br/><br/>
      Since exponential functions defined on all real numbers do not have absolute minimum values, <strong>Neither I nor II</strong> is correct.`
    };
  }
};