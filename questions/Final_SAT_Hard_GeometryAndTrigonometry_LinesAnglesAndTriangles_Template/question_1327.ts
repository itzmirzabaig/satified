import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1327
 * 
 * FIXES:
 * - Changed double backslash `\\\\overline` to single escape `\\overline` so it renders as `\overline` in LaTeX.
 * - This ensures the line appears over the segment names (e.g., RS) instead of the word "overline".
 */
export const generator_1327 = {
  metadata: {
    id: "1327",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate values that give clean answers
    const ratio = getRandomInt(2, 4); // Scale factor
    const LK = getRandomInt(15, 35);
    const RT = LK * ratio;

    // ST must be divisible by ratio for clean KT answer
    const ST = getRandomInt(15, 30) * ratio;
    
    // Area of Right Triangle RST = 0.5 * leg1 * leg2
    // Assuming T is the right angle, legs are RT and ST.
    const area = 0.5 * RT * ST;

    // STEP 2: Calculate KT
    // Triangle RST ~ Triangle LSK (because LK || RT and T is right angle, S is common)
    // Ratio RT/LK = ratio.
    // So ST/SK = ratio => SK = ST / ratio.
    const SK = ST / ratio;
    const KT = ST - SK;

    // Format as fraction if needed (though with current logic it's often integer)
    let answer: string;
    if (Number.isInteger(KT)) {
      answer = KT.toString();
    } else {
      const num = ST * (ratio - 1);
      const den = ratio;
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
      const g = gcd(num, den);
      answer = `${num / g}/${den / g}`;
    }

    return {
      questionText: `In triangle $RST$, angle $T$ is a right angle, point $L$ lies on $\\overline{RS}$, point $K$ lies on $\\overline{ST}$, and $\\overline{LK}$ is parallel to $\\overline{RT}$. If the length of $\\overline{RT}$ is ${RT} units, the length of $\\overline{LK}$ is ${LK} units, and the area of triangle $RST$ is ${area} square units, what is the length of $\\overline{KT}$, in units?`,
      figureCode: null,
      options: [],
      correctAnswer: answer,
      explanation: `The area of right triangle $RST$ is given by $A = \\frac{1}{2} \\cdot RT \\cdot ST$. Substituting the given values:
$${area} = \\frac{1}{2} \\cdot ${RT} \\cdot ST$
$${area * 2} = ${RT} \\cdot ST$
$ST = ${ST}$

Since $\\overline{LK} \\parallel \\overline{RT}$, triangle $RST$ is similar to triangle $LSK$. The ratio of similarity is:
$\\frac{RT}{LK} = \\frac{${RT}}{${LK}} = ${ratio}$

This ratio applies to the corresponding sides $ST$ and $SK$:
$\\frac{ST}{SK} = ${ratio} \\Rightarrow SK = \\frac{${ST}}{${ratio}} = ${SK}$

Finally, the length of $\\overline{KT}$ is the difference between $ST$ and $SK$:
$KT = ST - SK = ${ST} - ${SK} = ${answer}$`
    };
  }
};
