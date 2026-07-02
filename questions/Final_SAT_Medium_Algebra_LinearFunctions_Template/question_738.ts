import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 738
 * 
 * FIXES:
 * - Handled long decimals by converting to fractions.
 * - Logic: x-intercept 'a' = -b/m. y-intercept 'b' = b.
 * - Calculate a + b.
 */
export const generator_738 = {
  metadata: {
    id: "738",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // 1. Math Setup
    const m = getRandomInt(2, 6); // slope
    const b = getRandomInt(20, 50); // y-intercept constant
    
    // a = x-intercept = -b/m
    // b = y-intercept value (from problem statement: "y-intercept at (0, b)")
    // Wait, the prompt says "y-intercept at (0, b)". This is slightly confusing variable naming
    // because usually y = mx + c, intercept is c. Here intercept is 'b'. 
    // And problem asks for 'a + b'.
    // So if h(x) = 4x + 28, then y-int is 28. So b=28.
    // x-int: 4x + 28 = 0 -> x = -7. So a=-7.
    // a + b = -7 + 28 = 21.
    
    // Calculation: a + b = (-b/m) + b = b(1 - 1/m) = b(m-1)/m.
    const num = b * (m - 1);
    const den = m;
    const val = num / den;
    
    // Helper to format
    const formatVal = (v: number, n: number, d: number) => {
      if (Number.isInteger(v)) return v.toString();
      // Reduce fraction
      const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
      const common = gcd(Math.abs(n), d);
      return `\\frac{${n / common}}{${d / common}}`;
    };
    
    const correctText = formatVal(val, num, den);
    
    // Distractors
    // D1: Just b
    const d1 = b.toString();
    // D2: m + b
    const d2 = (m + b).toString();
    // D3: |a| + b => |-b/m| + b => b/m + b = b(1 + 1/m) = b(m+1)/m
    const numD3 = b * (m + 1);
    const d3 = formatVal(numD3 / den, numD3, den);

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: d1, isCorrect: false },
      { text: d2, isCorrect: false },
      { text: d3, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    
    // Pre-calc intercept for explanation
    const aVal = -b / m;
    const aStr = formatVal(aVal, -b, m);

    return {
      questionText: `The function $h$ is defined by $h(x) = ${m}x + ${b}$. The graph of $y = h(x)$ in the $xy$-plane has an $x$-intercept at $(a, 0)$ and a $y$-intercept at $(0, b)$, where $a$ and $b$ are constants. What is the value of $a + b$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1.  **Find the $x$-intercept ($a$):**
    Set $h(x) = 0$:
    $0 = ${m}x + ${b}$
    $${m}x = -${b}$
    $x = -\\frac{${b}}{${m}} = ${aStr}$
    So, $a = ${aStr}$.

2.  **Identify the $y$-intercept ($b$):**
    The problem states the $y$-intercept is at $(0, b)$. From the equation $h(x) = ${m}x + ${b}$, the $y$-intercept is the constant term, ${b}$.
    So, $b = ${b}$.

3.  **Calculate $a + b$:**
    $a + b = ${aStr} + ${b} = ${correctText}$.`
    };
  }
};
