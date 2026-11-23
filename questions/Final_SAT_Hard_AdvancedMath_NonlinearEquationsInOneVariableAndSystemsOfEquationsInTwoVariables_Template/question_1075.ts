import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1075
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [line: 2y=c, parabola: y=-2x²+9x, discriminant for one intersection]
 * - Difficulty factors: [Horizontal line, parabola intersection, discriminant = 0 condition]
 * - Distractor patterns: [N/A - fill in blank, accepts fraction or decimal]
 * - Constraints: [Line is horizontal, parabola opens down, find c for single intersection]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1075 = {
  metadata: {
    id: "1075",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Original: 2y=c, y=-2x²+9x, find c
    // Pattern: lineCoeff*y = c, parabola y = -a*x² + bx
    
    // Fixed: parabolaA = 1 printed "-1x^2" and "1x^2"; the explanation showed a
    // rounded decimal as if exact ("363/16 (or 22.69)") and "30.00" for integer
    // answers; answers like 363/16 did not fit the SAT answer grid. Now: no 1x,
    // decimals shown only when exact, and the answer string is at most 5 characters.
    const gcd = (m: number, n: number): number => n === 0 ? m : gcd(n, m % n);
    let lineCoeff = 2, parabolaA = 1, parabolaB = 5;
    let simplifiedNum = 0, simplifiedDen = 1;
    do {
      lineCoeff = getRandomInt(2, 4);
      parabolaA = getRandomInt(1, 4);
      parabolaB = getRandomInt(5, 12);
      const n0 = parabolaB * parabolaB * lineCoeff;
      const d0 = 4 * parabolaA;
      const g = gcd(n0, d0);
      simplifiedNum = n0 / g;
      simplifiedDen = d0 / g;
    } while ((simplifiedDen === 1 ? `${simplifiedNum}` : `${simplifiedNum}/${simplifiedDen}`).length > 5);
    const aTerm = parabolaA === 1 ? '' : `${parabolaA}`;

    // y = c/lineCoeff intersects y = -ax² + bx
    // Substituting: c/lineCoeff = -ax² + bx
    // ax² - bx + c/lineCoeff = 0
    
    // For one solution: discriminant = b² - 4a(c/lineCoeff) = 0
    // b² = 4ac/lineCoeff → c = b²*lineCoeff/(4a)
    
    const cValue = simplifiedDen === 1 ? `${simplifiedNum}` : `${simplifiedNum}/${simplifiedDen}`;
    const cTex = simplifiedDen === 1 ? `${simplifiedNum}` : `\\frac{${simplifiedNum}}{${simplifiedDen}}`;
    // simplifiedDen divides 4 * parabolaA (at most 16), so the decimal is exact
    // whenever the denominator has only factors of 2; otherwise give grid entries.
    const dec = simplifiedNum / simplifiedDen;
    let answerNote = '';
    if (simplifiedDen !== 1) {
      const exact = [2, 4, 8, 16].includes(simplifiedDen) && String(dec).length <= 5;
      if (exact) {
        answerNote = ` (or $${dec}$)`;
      } else {
        const intDigits = String(Math.trunc(dec)).length;
        const places = Math.max(1, 4 - intDigits);
        const f = Math.pow(10, places);
        const tr = (Math.trunc(dec * f) / f).toFixed(places);
        const rd = (Math.round(dec * f) / f).toFixed(places);
        answerNote = tr === rd ? `. The decimal entry $${tr}$ is also accepted` : `. The decimal entries $${tr}$ and $${rd}$ are also accepted`;
      }
    }

    // STEP 2: No figure needed
    const figureCode = null;
    
    return {
      questionText: `In the xy-plane, a line with equation $${lineCoeff}y=c$ for some constant $c$ intersects a parabola at exactly one point. If the parabola has equation $y=-${aTerm}x^2+${parabolaB}x$, what is the value of $c$?`,
      figureCode: figureCode,
      options: [],
      correctAnswer: cValue, // Accepts fraction or decimal equivalent
      explanation: `The correct answer is $${cTex}$${answerNote}. From the line, $y=\\frac{c}{${lineCoeff}}$. Substituting into the parabola gives $\\frac{c}{${lineCoeff}}=-${aTerm}x^2+${parabolaB}x$, or $${aTerm}x^2-${parabolaB}x+\\frac{c}{${lineCoeff}}=0$. The line and parabola intersect at exactly one point when this equation has exactly one solution, so its discriminant equals $0$: $(-${parabolaB})^2-4(${parabolaA})\\left(\\frac{c}{${lineCoeff}}\\right)=0$. So $${parabolaB * parabolaB}=\\frac{${4 * parabolaA}c}{${lineCoeff}}$, and $c=\\frac{${parabolaB * parabolaB * lineCoeff}}{${4 * parabolaA}}${simplifiedDen === 1 || simplifiedNum !== parabolaB * parabolaB * lineCoeff ? `=${cTex}` : ''}$.`
    };
  }
};
