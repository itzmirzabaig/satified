import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: f224df07
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [package weights: 100, 120 (specific), total weight: 1100, min packages: 10]
 * - Difficulty factors: [System of inequalities, optimization problem, constraint satisfaction]
 * - Distractor patterns: [A=2 (too low, not maximum), B=4 (close but not max), D=6 (violates weight constraint)]
 * - Constraints: [Must satisfy both x+y≥10 and 100x+120y≤1100, maximize y]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_f224df07 = {
  metadata: {
    // id: "f224df07",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original uses 100 and 120 pound packages, total 1100, min 10 packages
    // We'll vary the package weights and constraints while keeping similar magnitude
    const weight1 = getRandomInt(80, 120); // Lighter package weight
    const weight2 = getRandomInt(130, 160); // Heavier package weight (must be > weight1)
    const minPackages = getRandomInt(8, 15); // Minimum total packages
    const maxWeight = weight2 * minPackages + getRandomInt(100, 300); // Total weight limit
    
    // Ensure weight2 > weight1 and problem is solvable
    const lighterWeight = Math.min(weight1, weight2);
    const heavierWeight = Math.max(weight1, weight2);
    
    // STEP 2: Calculate the maximum number of heavier packages
    // We want to maximize y (heavier packages) subject to:
    // x + y >= minPackages
    // lighterWeight * x + heavierWeight * y <= maxWeight
    
    // To maximize y, minimize x. Set x + y = minPackages, so x = minPackages - y
    // Substitute: lighterWeight * (minPackages - y) + heavierWeight * y <= maxWeight
    // lighterWeight * minPackages - lighterWeight * y + heavierWeight * y <= maxWeight
    // y * (heavierWeight - lighterWeight) <= maxWeight - lighterWeight * minPackages
    // y <= (maxWeight - lighterWeight * minPackages) / (heavierWeight - lighterWeight)
    
    const maxHeavierPackages = Math.floor((maxWeight - lighterWeight * minPackages) / (heavierWeight - lighterWeight));
    
    // Ensure we have a valid problem with reasonable answer choices
    // Adjust maxWeight if needed to get a clean integer answer in range 2-8
    const targetAnswer = Math.max(2, Math.min(8, maxHeavierPackages));
    
    // Recalculate maxWeight to ensure clean answer
    const adjustedMaxWeight = lighterWeight * minPackages + targetAnswer * (heavierWeight - lighterWeight);
    
    // STEP 3: Calculate distractors based on SAT patterns
    const correctAnswer = targetAnswer;
    const distractor1 = Math.max(1, targetAnswer - 3); // Too low (like original A=2 when answer is 5)
    const distractor2 = targetAnswer - 1; // Close but not maximum (like original B=4)
    const distractor3 = targetAnswer + 1; // Violates constraint (like original D=6)
    
    // STEP 4: Create options with tracking
    const optionsData = [
      { text: distractor1.toString(), isCorrect: false },
      { text: distractor2.toString(), isCorrect: false },
      { text: correctAnswer.toString(), isCorrect: true },
      { text: distractor3.toString(), isCorrect: false }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 6: Build explanation
    const explanation = `Choice ${correctOption.letter} is correct. Let $x$ be the number of $${lighterWeight}$-pound packages and $y$ be the number of $${heavierWeight}$-pound packages. The constraints are: $x + y \\ge ${minPackages}$ and $${lighterWeight}x + ${heavierWeight}y \\le ${adjustedMaxWeight}$. To maximize $y$, set $x = ${minPackages} - y$ and substitute: $${lighterWeight}(${minPackages} - y) + ${heavierWeight}y \\le ${adjustedMaxWeight}$, which simplifies to $y \\le ${correctAnswer}$. Choice ${incorrectOptions[0].letter} is incorrect because it is possible but not the maximum. Choice ${incorrectOptions[1].letter} is incorrect because although possible, it is not the maximum. Choice ${incorrectOptions[2].letter} is incorrect because it violates the maximum weight constraint.`;
    
    // STEP 7: Return question data
    return {
      questionText: `A cargo helicopter delivers only $${lighterWeight}$-pound packages and $${heavierWeight}$-pound packages. For each delivery trip, the helicopter must carry at least $${minPackages}$ packages, and the total weight of the packages can be at most $${adjustedMaxWeight}$ pounds. What is the maximum number of $${heavierWeight}$-pound packages that the helicopter can carry per trip?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer.toString(),
      explanation: explanation
    };
  }
};
/**
 * Question ID: e723bd67
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 2, constant: 883 (three-digit), x values: 440-442]
 * - Difficulty factors: [Table verification, inequality testing with negative y values]
 * - Distractor patterns: [Tables where some points satisfy but not all]
 * - Constraints: [Must satisfy 2x - y > 883 for ALL table entries]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table in question content]
 */

// File: generators/LinearInequalitiesInOneOrTwoVariables/e723bd67.ts