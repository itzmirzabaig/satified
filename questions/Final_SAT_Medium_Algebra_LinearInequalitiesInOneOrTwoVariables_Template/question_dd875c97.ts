import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: dd875c97
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [max weight: 5630, equipment: 190, crate weights: 25, 62]
 * - Difficulty factors: [Multi-step inequality setup, fixed weight subtraction]
 * - Distractor patterns: [B=wrong inequality sign, C/D=swapped coefficients or no equipment subtraction]
 * - Constraints: [190 + 25x + 62y ≤ 5630, simplified to 25x + 62y ≤ 5440]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_dd875c97 = {
  metadata: {
    // id: "dd875c97",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: max 5630, equipment 190, crates 25 and 62
    // Generate similar magnitudes
    const maxWeight = getRandomInt(5000, 7000);
    const equipmentWeight = getRandomInt(100, 300);
    const crate1Weight = getRandomInt(20, 40); // Lighter crate
    const crate2Weight = getRandomInt(50, 80); // Heavier crate
    
    const remainingCapacity = maxWeight - equipmentWeight;
    
    // STEP 2: Create options based on patterns
    // Correct: crate1*x + crate2*y ≤ remainingCapacity
    // A: Correct
    // B: Wrong sign (≥ instead of ≤)
    // C: Swapped coefficients and wrong total
    // D: Swapped coefficients, wrong sign, wrong total
    
    const optionsData = [
      { 
        text: `$${crate1Weight}x + ${crate2Weight}y \\le ${remainingCapacity}$`, 
        isCorrect: true 
      },
      { 
        text: `$${crate1Weight}x + ${crate2Weight}y \\ge ${remainingCapacity}$`, 
        isCorrect: false 
      },
      { 
        text: `$${crate2Weight}x + ${crate1Weight}y \\le ${maxWeight}$`, 
        isCorrect: false 
      },
      { 
        text: `$${crate2Weight}x + ${crate1Weight}y \\ge ${maxWeight}$`, 
        isCorrect: false 
      }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 4: Build explanation
    const explanation = `Choice ${correctOption.letter} is correct. The total weight is the equipment (${equipmentWeight} pounds) plus the crates (${crate1Weight}x + ${crate2Weight}y). This must be at most ${maxWeight} pounds: $${equipmentWeight} + ${crate1Weight}x + ${crate2Weight}y \\le ${maxWeight}$. Subtracting ${equipmentWeight} from both sides gives $${crate1Weight}x + ${crate2Weight}y \\le ${remainingCapacity}$. Choice ${incorrectOptions[0].letter} is incorrect because it uses "greater than or equal to" which violates the maximum capacity. Choices ${incorrectOptions[1].letter} and ${incorrectOptions[2].letter} are incorrect because they swap the coefficients (assigning ${crate2Weight} lbs to x and ${crate1Weight} lbs to y) and fail to subtract the equipment weight.`;
    
    // STEP 5: Return question data
    return {
      questionText: `A truck can haul a maximum weight of $${maxWeight}$ pounds. During one trip, the truck will be used to haul a $${equipmentWeight}$-pound piece of equipment as well as several crates. Some of these crates weigh $${crate1Weight}$ pounds each and the others weigh $${crate2Weight}$ pounds each. Which inequality represents the possible combinations of the number of $${crate1Weight}$-pound crates, $x$, and the number of $${crate2Weight}$-pound crates, $y$, the truck can haul during one trip if only the piece of equipment and the crates are being hauled?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `${crate1Weight}x + ${crate2Weight}y \\le ${remainingCapacity}`,
      explanation: explanation
    };
  }
};
/**
 * Question ID: bf5f80c6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -4, intercept: 4]
 * - Difficulty factors: [Point testing in strict inequality y < -4x + 4]
 * - Distractor patterns: [Points where calculation error leads to wrong conclusion]
 * - Constraints: [Strict inequality <, not ≤]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/LinearInequalitiesInOneOrTwoVariables/bf5f80c6.ts