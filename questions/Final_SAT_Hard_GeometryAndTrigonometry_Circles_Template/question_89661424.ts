import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 89661424
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center: (-5, 2), radius: 9]
 * - Difficulty factors: [Converting general form to standard form]
 * - Distractor patterns: [Sign errors on linear terms, wrong constant]
 * - Constraints: [Expansion must match]
 * - Question type: [Conceptual→Fill in blank]
 * - Figure generation: [None]
 */

export const generator_89661424 = {
  metadata: {
    // id: "89661424",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate center (with mixed signs)
    const h = -getRandomInt(3, 8);
    const k = getRandomInt(1, 6);
    const r = getRandomInt(5, 12);
    
    // STEP 2: Expand to general form x² + y² + ax + by + c = 0
    // (x-h)² + (y-k)² = r²
    // x² - 2hx + h² + y² - 2ky + k² = r²
    // x² + y² - 2hx - 2ky + (h² + k² - r²) = 0
    
    const a = -2 * h;  // Coefficient of x (should be positive if h negative)
    const b = -2 * k;  // Coefficient of y (negative)
    const c = h * h + k * k - r * r;
    
    return {
      questionText: `A circle in the xy-plane has its center at $(${h}, ${k})$ and has a radius of ${r}. An equation of this circle is $x^{2}+y^{2}+${a >= 0 ? '' : '-'}${Math.abs(a)}x${b >= 0 ? '+' : '-'}${Math.abs(b)}y+c=0$, where $c$ is a constant. What is the value of $c$?`,
      figureCode: null,
      options: null,
      correctAnswer: c.toString(),
      explanation: `Expanding $(x${h >= 0 ? '-' : '+'}${Math.abs(h)})^{2}+(y-${k})^{2}=${r*r}$ gives $x^{2}${h >= 0 ? '-' : '+'}${Math.abs(2*h)}x+${h*h}+y^{2}-${2*k}y+${k*k}=${r*r}$. Combining and rearranging: $x^{2}+y^{2}${a >= 0 ? '+' : '-'}${Math.abs(a)}x${b >= 0 ? '+' : '-'}${Math.abs(b)}y+${h*h + k*k - r*r}=0$. Thus $c = ${h*h} + ${k*k} - ${r*r} = ${c}$.`
    };
  }
};

/**
 * Question ID: 196e8e6e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center: (h,k), A: (h+1, k+√102), right angle at C]
 * - Difficulty factors: [Isosceles right triangle, distance formula, Pythagorean theorem]
 * - Distractor patterns: [Forgetting to square, confusing with non-right triangle]
 * - Constraints: [AC = BC = radius, right angle at C]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */