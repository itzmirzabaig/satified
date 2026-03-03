import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: c7a187a7
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = x² - 18x - 360, roots at -12 and 30]
 * - Difficulty factors: [Finding x-intercepts by factoring quadratic]
 * - Distractor patterns: [B: sign error on root, C: y-intercept, D: sign flip]
 * - Constraints: [(x-30)(x+12) = 0, so x = 30 or x = -12]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [None - pure algebra]
 */

export const generator_c7a187a7 = {
  metadata: {
    // id: "c7a187a7",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: f(x) = x² - 18x - 360, roots at -12 and 30
    // Randomize: factorable quadratics with roots r1 (negative) and r2 (positive)
    const r1 = -1 * getRandomInt(8, 20); // -8 to -20
    const r2 = getRandomInt(15, 35); // 15 to 35
    const sum = r1 + r2; // Should be positive (since r2 > |r1|)
    const product = r1 * r2; // Should be negative
    
    // STEP 2: Calculate derived values
    // Quadratic: x² - (sum)x + (product) = x² - (r1+r2)x + r1*r2
    // But since r1 is negative: x² - (r2 - |r1|)x - |r1|*r2
    const b = -(r1 + r2); // coefficient of x (will be negative of sum)
    const c = r1 * r2; // constant term (negative)
    
    // STEP 3: Build question text
    const questionText = `If the given function $f$ is graphed in the $xy$-plane, where $y = f(x)$, what is an $x$-intercept of the graph? $$f(x) = x^2 ${b >= 0 ? '+' : '-'} ${Math.abs(b)}x ${c >= 0 ? '+' : '-'} ${Math.abs(c)}$$`;
    
    // STEP 4: Create options with tracking
    const optionsData = [
      { text: `$(${r1}, 0)$`, isCorrect: true },
      { text: `$(${-r2}, 0)$`, isCorrect: false, reason: `this uses $x = ${-r2}$, but the root is at $x = ${r2}$, not $x = ${-r2}$` },
      { text: `$(${c}, 0)$`, isCorrect: false, reason: `this is the y-intercept $(0, ${c})$, not an x-intercept` },
      { text: `$(${-r1}, 0)$`, isCorrect: false, reason: `this uses $x = ${-r1}$, but the root is at $x = ${r1}$, not $x = ${-r1}$` }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `(${r1}, 0)`;
    
    // STEP 6: Build explanation with dynamic letters
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. The x-intercepts occur where $f(x) = 0$. Setting $x^2 ${b >= 0 ? '+' : '-'} ${Math.abs(b)}x ${c >= 0 ? '+' : '-'} ${Math.abs(c)} = 0$ and factoring: $(x - ${r2})(x ${r1 >= 0 ? '-' : '+'} ${Math.abs(r1)}) = 0$. By the zero product property, $x = ${r2}$ or $x = ${r1}$. Therefore, the x-intercepts are $(${r2}, 0)$ and $(${r1}, 0)$. Of these, only $(${r1}, 0)$ is listed. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    // STEP 7: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
/**
 * Question ID: a26c29f7
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Function transformation (vertical shift)
 * - Number ranges: Simple integer coefficients (1-10 range)
 * - Difficulty: Medium - requires understanding vertical shifts
 * - Distractor patterns: Confusing shift direction, wrong operation type
 */

import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';