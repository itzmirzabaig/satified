import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 8f0c82e2
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [minimum value translation]
 * - Difficulty factors: ["Minimum value" ≥ translation, phrase parsing]
 * - Distractor patterns: [A=≤ instead of ≥, C=reversed subtraction with ≤, D=reversed subtraction with ≥]
 * - Constraints: [x ≥ 6n - 12]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_8f0c82e2 = {
  metadata: {
    // id: "8f0c82e2",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: minimum x is 12 less than 6 times n → x ≥ 6n - 12
    const multiplier = getRandomInt(4, 10);
    const subtract = getRandomInt(5, 20);
    
    // STEP 2: Create options
    // A: x ≤ 6n - 12 (wrong sign)
    // B: x ≥ 6n - 12 (correct)
    // C: x ≤ 12 - 6n (reversed)
    // D: x ≥ 12 - 6n (reversed with correct sign)
    
    const optionsData = [
      { text: `$x \\leq ${multiplier}n - ${subtract}$`, isCorrect: false },
      { text: `$x \\geq ${multiplier}n - ${subtract}$`, isCorrect: true },
      { text: `$x \\leq ${subtract} - ${multiplier}n$`, isCorrect: false },
      { text: `$x \\geq ${subtract} - ${multiplier}n$`, isCorrect: false }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 4: Build explanation
    const explanation = `Choice ${correctOption.letter} is correct. "Minimum value of $x$" means $x \\geq$ (not $\\leq$). "${subtract} less than ${multiplier} times $n$" means ${multiplier}n - ${subtract} (not ${subtract} - ${multiplier}n). Therefore, $x \\geq ${multiplier}n - ${subtract}$. Choice ${incorrectOptions[0].letter} uses "$\\leq$" (maximum, not minimum). Choice ${incorrectOptions[1].letter} reverses the subtraction. Choice ${incorrectOptions[2].letter} has the correct inequality sign but reversed subtraction.`;
    
    // STEP 5: Return question data
    return {
      questionText: `The minimum value of $x$ is $${subtract}$ less than $${multiplier}$ times another number $n$. Which inequality shows the possible values of $x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `x \\geq ${multiplier}n - ${subtract}`,
      explanation: explanation
    };
  }
};
/**
 * Question ID: d02193fb
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -4, intercept: 1]
 * - Difficulty factors: [Graph to inequality, dashed line, shading]
 * - Distractor patterns: [A/B=wrong inequality sign, C=wrong slope sign]
 * - Constraints: [y > -4x + 1]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs inequality graph]
 */

// File: generators/LinearInequalitiesInOneOrTwoVariables/d02193fb.ts