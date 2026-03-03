import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: f75bd744
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 4, -6, 10, -2, constant: 2, fractions]
 * - Difficulty factors: [No solution with elimination, parameter in y coefficient]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [After elimination, y coefficients must be equal for no solution]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: null
 */

export const generator_f75bd744 = {
  metadata: {
    // id: "f75bd744",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const a1 = getRandomInt(3, 6);
    const b1_base = getRandomInt(2, 4);
    const c1 = getRandomInt(1, 5);
    
    const mult = getRandomInt(2, 4);
    const b1_total = b1_base + 2 * mult;
    
    const t_answer = b1_total;
    
    const a2 = getRandomInt(1, 3) * a1;
    const c2 = getRandomInt(1, 10);
    
    const eq1 = `${a1}x - ${b1_base}y = ${mult}y + ${c1}`;
    const eq2 = `${a2}x + \\frac{${c2}}{2} = \\frac{t}{2}y + \\frac{${c2 * 3}}{2}`;
    
    return {
      questionText: `In the given system of equations, $t$ is a constant. If the system has no solution, what is the value of $t$? $$${eq1}$$ $$${eq2}$$`,
      figureCode: null,
      options: null,
      correctAnswer: t_answer.toString(),
      explanation: `Rearranging the first equation yields ${a1}x - ${b1_total}y = ${c1}. Rearranging and multiplying the second equation by -2 yields $-${2 * a2}x + ty = ${-c2}$. Adding these equations eliminates $x$, giving $-${b1_total}y + ty = ${c1 - c2}$. For no solution, the coefficient of $y$ must be zero (with non-zero constant), so $-${b1_total} + t = 0$, meaning $t = ${t_answer}$.`
    };
  }
};

/**
 * Question ID: 1362ccde
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 4, 15/4, constants: 1, -8/4=-2]
 * - Difficulty factors: [Substitution method, finding x-y instead of individual values]
 * - Distractor patterns: [None - fill in blank, but calculation is complex]
 * - Constraints: [Solution must be integers for clean x-y value]
 * - Question type: [Figure→Fill in blank]
 * - Figure generation: [Two intersecting lines with intersection point marked]
 */