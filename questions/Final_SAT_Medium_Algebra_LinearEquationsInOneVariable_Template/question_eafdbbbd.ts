import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: eafdbbbd
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fractions: 1/4, 1/3, result: -7, solution: 79]
 * - Difficulty factors: [Fractions with common binomial, negative result]
 * - Distractor patterns: [A is negative miscalculation, B makes terms zero, D is far off]
 * - Constraints: [(1/4 - 1/3)(x+5) = -7 → (-1/12)(x+5) = -7 → x+5 = 84 → x = 79]
 * - Question type: [Multiple Choice Text]
 */

export const generator_eafdbbbd = {
  metadata: {
    // id: "eafdbbbd",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate equation (1/a)(x+c) - (1/b)(x+c) = result
    const a = 4;
    const b = 3;
    const c = getRandomInt(3, 8);
    
    // (1/4 - 1/3) = -1/12
    const coeffNum = -1;
    const coeffDen = 12;
    
    // Target x value - ensure (targetX + c) is divisible by 12 for clean integer result
    const multiplier = getRandomInt(6, 9); // This gives us x+c in range [72, 108], so x in [60-something, 90-something]
    const targetX = multiplier * 12 - c;   // Ensures (targetX + c) = multiple of 12
    
    // Now result will be a clean integer
    const result = (coeffNum * (targetX + c)) / coeffDen; // = -multiplier
    
    // Distractors
    const distractorA = -Math.round(targetX / 6);
    const distractorB = -c;
    const distractorD = targetX * 3 - c;
    
    const correctText = `${targetX}`;
    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false },
      { text: `$${distractorB}$`, isCorrect: false },
      { text: `$${targetX}$`, isCorrect: true },
      { text: `$${distractorD}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    
    // Calculate intermediate values for explanation
    const commonDenom = a * b;
    const factoredCoeff = `-\\frac{1}{${commonDenom}}`;
    const multipliedResult = result * (-a * b);
    
    return {
      questionText: `$\\frac{1}{${a}}(x+${c})-\\frac{1}{${b}}(x+${c})=${result}$ What value of $x$ is the solution to the given equation?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Factor out $(x+${c})$: $$(x+${c})\\left(\\frac{1}{${a}}-\\frac{1}{${b}}\\right)=${result}$$ Finding common denominator: $$\\frac{1}{${a}}-\\frac{1}{${b}}=\\frac{${b}-${a}}{${a*b}}=-\\frac{1}{${a*b}}$$ So $$(x+${c})\\left(-\\frac{1}{${a*b}}\\right)=${result}$$ Multiplying by $-${a*b}$: $$x+${c}=${multipliedResult}$$ Therefore $x=${targetX}$.`
    };
  }
};