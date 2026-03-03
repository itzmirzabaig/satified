import { getRandomInt, getRandomElement } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: b988eeec
 * 
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Functions
 * - Concept: Function Operations (Addition) & X-intercepts.
 * - Logic: h(x) = f(x) + g(x). Find x where h(x) = 0.
 * - Fixes: Corrected LaTeX fraction escaping (from \\\\frac to \\frac).
 *          Improved fraction arithmetic and formatting helper.
 */

export const generator_b988eeec = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Generate Functions f(x) and g(x)
    // f(x) = (n1/d1)x + c1
    // g(x) = (n2/d2)x + c2
    
    // We want relatively simple denominators for clean math
    const possibleDenoms = [2, 3, 4, 5];
    const d1 = getRandomElement(possibleDenoms);
    const d2 = getRandomElement(possibleDenoms);
    
    // Numerators (1 to d-1)
    const n1 = getRandomInt(1, d1 - 1);
    const n2 = getRandomInt(1, d2 - 1);
    
    // Constants (Integers)
    const c1 = getRandomInt(-10, -1); // Make one negative
    const c2 = getRandomInt(11, 25);  // Make one positive
    
    // 2. Compute h(x) = f(x) + g(x)
    // Slope m_h = (n1/d1) + (n2/d2)
    const commonDenom = d1 * d2;
    const numSum = (n1 * d2) + (n2 * d1);
    
    // Simplify Slope Fraction
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const slopeGCD = gcd(numSum, commonDenom);
    const mNum = numSum / slopeGCD;
    const mDen = commonDenom / slopeGCD;
    
    // Constant b_h = c1 + c2
    const b_h = c1 + c2;
    
    // 3. Solve for X-Intercept: h(x) = 0
    // 0 = (mNum/mDen)x + b_h
    // -(mNum/mDen)x = b_h
    // x = b_h * (-mDen/mNum)
    // x = (-b_h * mDen) / mNum
    
    const xIntNum = -b_h * mDen;
    const xIntDen = mNum;
    
    // Simplify Result Fraction
    const xIntGCD = Math.abs(gcd(xIntNum, xIntDen));
    const finalNum = xIntNum / xIntGCD;
    const finalDen = xIntDen / xIntGCD;

    // Helper to format fraction string
    const formatFrac = (n: number, d: number) => {
        if (d === 1) return `${n}`;
        return `\\frac{${n}}{${d}}`;
    };

    const correctAnswer = formatFrac(finalNum, finalDen);

    // 4. Explanation
    const f_slope = formatFrac(n1, d1);
    const g_slope = formatFrac(n2, d2);
    const slope_sum_unsimplified = `\\frac{${numSum}}{${commonDenom}}`;
    const slope_sum_simplified = formatFrac(mNum, mDen);

    return {
      questionText: `The functions $f$ and $g$ are defined as $f(x)=${f_slope}x ${c1 < 0 ? '-' : '+'} ${Math.abs(c1)}$ and $g(x)=${g_slope}x + ${c2}$. If the function $h$ is defined as $h(x)=f(x)+g(x)$, what is the x-coordinate of the x-intercept of the graph of $y=h(x)$ in the $xy$-plane?`,
      figureCode: null,
      options: null, // Fill-in-the-blank
      correctAnswer: correctAnswer,
      explanation: `
        First, find the expression for $h(x)$ by adding $f(x)$ and $g(x)$:
        $$ h(x) = f(x) + g(x) $$
        $$ h(x) = \\left( ${f_slope}x ${c1} \\right) + \\left( ${g_slope}x + ${c2} \\right) $$
        Group the $x$ terms and the constant terms:
        $$ h(x) = \\left( ${f_slope} + ${g_slope} \\right)x + (${c1} + ${c2}) $$
        <br/>
        Calculate the new slope:
        $$ \\frac{${n1}}{${d1}} + \\frac{${n2}}{${d2}} = \\frac{${n1*d2} + ${n2*d1}}{${d1*d2}} = ${slope_sum_unsimplified} = ${slope_sum_simplified} $$
        Calculate the new constant:
        $$ ${c1} + ${c2} = ${b_h} $$
        So, $h(x) = ${slope_sum_simplified}x + ${b_h}$.
        <br/><br/>
        To find the x-intercept, set $h(x) = 0$:
        $$ 0 = ${slope_sum_simplified}x + ${b_h} $$
        $$ -${b_h} = ${slope_sum_simplified}x $$
        Multiply by the reciprocal $\\frac{${mDen}}{${mNum}}$:
        $$ x = -${b_h} \\cdot \\frac{${mDen}}{${mNum}} $$
        $$ x = \\frac{${xIntNum}}{${xIntDen}} $$
        Simplify the fraction:
        $$ x = ${correctAnswer} $$
      `
    };
  }
};