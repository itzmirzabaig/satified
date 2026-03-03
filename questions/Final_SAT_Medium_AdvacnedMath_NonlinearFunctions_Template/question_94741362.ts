import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 94741362
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [K = 0.5mv², m=4, K=18, v=3]
 * - Difficulty factors: [Kinetic energy formula, solving for velocity]
 * - Distractor patterns: [B: forgot 0.5 factor, C: v² instead of v, D: extreme value]
 * - Constraints: [v = sqrt(2K/m)]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [None - formula application]
 */

export const generator_94741362 = {
  metadata: {
    // id: "94741362",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: m=4, K=18, v=3
    // Randomize: mass (2-8), find velocity such that 2K/m is perfect square
    const v = getRandomInt(2, 6); // velocity
    const m = getRandomInt(2, 8); // mass
    const K = Math.floor(0.5 * m * v * v); // kinetic energy
    
    // STEP 2: Calculate derived values
    const wrongB_v = Math.floor(Math.sqrt(K/m)); // Forgot 0.5
    const wrongC_v = v * v; // v² instead of v
    
    // STEP 3: Build question text
    const questionText = `An object's kinetic energy, in joules, is equal to the product of one-half the object's mass, in kilograms, and the square of the object's speed, in meters per second. What is the speed, in meters per second, of an object with a mass of ${m} kilograms and kinetic energy of ${K} joules?`;
    
    // STEP 4: Create options with tracking
    const optionsData = [
      { text: `${v}`, isCorrect: true },
      { text: `${2 * v}`, isCorrect: false, reason: "results from forgetting the one-half factor in the formula" },
      { text: `${v * v}`, isCorrect: false, reason: "results from finding $v^2$ but forgetting to take the square root" },
      { text: `${K * 2}`, isCorrect: false, reason: "results from incorrectly manipulating the equation" }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `${v}`;
    
    // STEP 6: Build explanation with dynamic letters
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. The kinetic energy formula is $K = \\\\frac{1}{2}mv^2$. Substituting $K = ${K}$ and $m = ${m}$: $${K} = \\\\frac{1}{2}(${m})v^2 = ${Math.floor(m/2)}v^2$ (or ${m/2}v^2$). Multiplying both sides by 2: $${2*K} = ${m}v^2$. Dividing by ${m}: $v^2 = ${(2*K)/m}$. Taking the square root: $v = ${v}$. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
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
 * Question ID: d71f6dbf
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [h(x) = -16x² + 20x + 5, h(1.4) = 1.64 interpretation]
 * - Difficulty factors: [Function notation in physics context, time vs height]
 * - Distractor patterns: [B/C: swapped time and height, D: confuses height with speed]
 * - Constraints: [h(t) gives height at time t]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [None - function interpretation]
 */