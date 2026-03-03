import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: f44b4125
 * 
 * ANALYSIS:
 * - Domain: Advanced Math
 * - Skill: Nonlinear Functions (Structure of Expressions)
 * - Logic: Identify which function explicitly displays its maximum value for x >= 0 as a constant.
 * - Scenario 1: Growth (base > 1). Increases forever. No max.
 * - Scenario 2: Decay (0 < base < 1). Max at x=0.
 *   - Form A(b)^x: Max is A. A is displayed. (Correct)
 *   - Form A(b)^x + C: Max is A+C. Neither A nor C is the full max. (Incorrect)
 */

export const generator_f44b4125 = {
  metadata: {
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Generate Function I Parameters
    // Let's make Function I typically Growth (no max) to match original spirit, 
    // but we can randomize slightly.
    const a1 = getRandomInt(10, 30);
    const c1 = getRandomInt(20, 50);
    // Base > 1 means growth (no max). 
    const b1 = (getRandomInt(11, 19) / 10).toFixed(2); // 1.1 to 1.9

    // 2. Generate Function II Parameters
    // Let's make Function II typically Decay (max at 0).
    const a2 = getRandomInt(5, 15);
    // Base < 1 means decay.
    const b2 = (getRandomInt(50, 95) / 100).toFixed(2); // 0.50 to 0.95
    
    // 3. Determine Truth
    // Function I: f(x) = a1 * (b1)^x + c1
    // Base > 1, A > 0 -> Strictly increasing for x >= 0. No maximum.
    // (Even if we picked decay, max would be a1+c1, which isn't displayed as a single constant)
    const isOneCorrect = false;

    // Function II: g(x) = a2 * (b2)^x
    // Base < 1, A > 0 -> Strictly decreasing for x >= 0.
    // Maximum is at x=0: g(0) = a2.
    // The value 'a2' IS displayed as a coefficient.
    const isTwoCorrect = true;

    // 4. Construct Options
    let correctText = "";
    if (isOneCorrect && isTwoCorrect) correctText = "I and II";
    else if (isOneCorrect) correctText = "I only";
    else if (isTwoCorrect) correctText = "II only";
    else correctText = "Neither I nor II";

    const optionsData = [
      { text: `I only`, isCorrect: correctText === "I only" },
      { text: `II only`, isCorrect: correctText === "II only" },
      { text: `I and II`, isCorrect: correctText === "I and II" },
      { text: `Neither I nor II`, isCorrect: correctText === "Neither I nor II" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    // 5. Build Explanation
    const func1 = `f(x)=${a1}(${b1})^x+${c1}`;
    const func2 = `g(x)=${a2}(${b2})^x`;

    return {
      questionText: `Which of the following functions displays the maximum value of the function as a constant or coefficient for $x \\geq 0$?
      <br/><br/>
      I. $${func1}$
      <br/>
      II. $${func2}$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct.
      <br/><br/>
      <strong>Analyze Function I:</strong> $${func1}$
      <br/>
      Since the base $${b1} > 1$, this is an exponential growth function. As $x$ increases, the function value increases without bound. Therefore, it has <strong>no maximum value</strong> for $x \\geq 0$.
      <br/><br/>
      <strong>Analyze Function II:</strong> $${func2}$
      <br/>
      Since the base $${b2} < 1$ (and coefficient ${a2} is positive), this is an exponential decay function. The value decreases as $x$ increases.
      Therefore, the maximum value occurs at the smallest possible $x$, which is $x=0$.
      <br/>
      Maximum value: $g(0) = ${a2}(${b2})^0 = ${a2}(1) = ${a2}$.
      <br/>
      The number ${a2} is explicitly displayed as the coefficient in the equation.
      <br/><br/>
      Thus, <strong>${correctText}</strong>.`
    };
  }
};