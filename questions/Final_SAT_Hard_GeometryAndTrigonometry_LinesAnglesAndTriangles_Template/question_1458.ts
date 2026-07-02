import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1458
 * 
 * ANALYSIS:
 * - Context: Triangle with a parallel line cutting through it (Side-Splitter Theorem / Similar Triangles).
 * - Given: BC (base), relation between segments AE and CE (e.g. CE = 3AE).
 * - Find: Length of parallel segment DE.
 * - Logic: Triangle ADE is similar to Triangle ABC. 
 * - Ratio: AE / AC = AE / (AE + CE).
 * - DE = BC * (Ratio).
 */

export const generator_1458 = {
  metadata: {
    id: "1458",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Setup Ratios
    // Let AE = 1 unit for ratio purposes.
    // CE = k * AE.
    const k = getRandomInt(2, 5); // Multiplier: 2, 3, 4, or 5
    
    // AC = AE + CE = 1 + k
    // Similarity Ratio (small to big) = AE / AC = 1 / (1 + k)
    
    // 2. Setup Lengths
    // DE is the small base. BC is the large base.
    // BC must be divisible by (1 + k) to ensure DE is an integer (SAT integer constraints usually).
    const DE = getRandomInt(12, 30);
    const BC = DE * (1 + k);

    // 3. Question Construction
    // "CE = k * AE"
    // Question asks for DE.
    
    return {
      questionText: `In triangle $ABC$, point $D$ lies on $\\overline{AB}$ and point $E$ lies on $\\overline{AC}$ such that $\\overline{DE}$ is parallel to $\\overline{BC}$. If $BC = ${BC}$ and $CE = ${k}AE$, what is the length of $\\overline{DE}$?`,
      figureCode: null,
      options: null, // Fill in the blank
      correctAnswer: DE.toString(),
      explanation: `Since $\\overline{DE} \\parallel \\overline{BC}$, $\\angle ADE \\cong \\angle ABC$ and $\\angle AED \\cong \\angle ACB$ (corresponding angles). Thus, $\\triangle ADE$ is similar to $\\triangle ABC$ by Angle-Angle similarity.

Because the triangles are similar, the ratio of their corresponding sides is equal:
$\\frac{DE}{BC} = \\frac{AE}{AC}$

We are given that $CE = ${k}AE$. We can express $AC$ in terms of $AE$:
$AC = AE + CE = AE + ${k}AE = ${1 + k}AE$

Now substitute this into the ratio:
$\\frac{AE}{AC} = \\frac{AE}{${1 + k}AE} = \\frac{1}{${1 + k}}$

Using the proportion $\\frac{DE}{BC} = \\frac{1}{${1 + k}}$ and the given value $BC = ${BC}$:
$\\frac{DE}{${BC}} = \\frac{1}{${1 + k}}$
$DE = \\frac{${BC}}{${1 + k}} = ${DE}$`
    };
  }
};
