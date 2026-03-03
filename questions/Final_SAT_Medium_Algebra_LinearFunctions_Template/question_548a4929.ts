import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 548a4929
 * 
 * FIXES:
 * - Handled long decimals by converting to fractions.
 * - Logic: x-intercept 'a' = -b/m. y-intercept 'b' = b.
 * - Calculate a + b.
 */
export const generator_548a4929 = {
  metadata: {
    id: "548a4929",
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

/**
 * Question ID: e62cfe5f
 * 
 * ANALYSIS:
 * - Context: Linear Modeling (Weight/Length).
 * - Function: W(L) = A*L + C.
 * - Given: Length L, calculate W.
 * - Variables: decimals common (e.g. 0.6).
 */
export const generator_e62cfe5f = {
  metadata: {
    id: "e62cfe5f",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    // W = m*x + b
    const m = getRandomInt(2, 6); // Integer coefficient (e.g. 4)
    const b = parseFloat((getRandomInt(2, 9) / 10).toFixed(1)); // Decimal constant (e.g. 0.6)
    
    // Input x (e.g. 0.5, 1.5, 2.5)
    // x should be simple decimal
    const x = parseFloat((getRandomInt(1, 15) / 10).toFixed(1)); // e.g. 0.5 or 1.2
    
    // Calculate result
    const result = m * x + b;
    // Format to max 2 decimals to avoid floating point issues
    const answer = parseFloat(result.toFixed(2)).toString();
    
    return {
      questionText: `A certain spring has a length of ${b} meters when no weight is attached. The length of the spring increases by ${m} meters for each kilogram of weight attached. If a weight of ${x} kilograms is attached to the spring, what is the total length of the spring, in meters?`,
      figureCode: null,
      options: null, // Fill in blank
      correctAnswer: answer,
      explanation: `The total length $L$ can be modeled by the linear equation $L = ${m}w + ${b}$, where $w$ is the weight in kilograms.
      
Substitute $w = ${x}$:
$L = ${m}(${x}) + ${b}$
$L = ${parseFloat((m*x).toFixed(2))} + ${b}$
$L = ${answer}$ meters.`
    };
  }
};