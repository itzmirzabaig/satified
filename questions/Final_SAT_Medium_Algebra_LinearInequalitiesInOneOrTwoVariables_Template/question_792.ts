import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 792
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [package weights: 100, 120 (specific), total weight: 1100, min packages: 10]
 * - Difficulty factors: [System of inequalities, optimization problem, constraint satisfaction]
 * - Distractor patterns: [A=2 (too low, not maximum), B=4 (close but not max), D=6 (violates weight constraint)]
 * - Constraints: [Must satisfy both x+y≥10 and 100x+120y≤1100, maximize y]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_792 = {
  metadata: {
    id: "792",
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
    
    // STEP 3: Calculate distractors based on SAT patterns.
    // Each distractor carries its OWN rationale so the reason stays bound to
    // the value through the shuffle (never to a fixed shuffled position):
    //   distractor1 = target - 3  -> feasible, but well below the maximum
    //   distractor2 = target - 1  -> feasible, but not the maximum
    //   distractor3 = target + 1  -> infeasible, exceeds the weight limit
    const correctAnswer = targetAnswer;
    const distractor1 = Math.max(1, targetAnswer - 3); // Too low (feasible)
    const distractor2 = targetAnswer - 1; // Close but not maximum (feasible)
    const distractor3 = targetAnswer + 1; // Violates weight constraint (infeasible)

    // STEP 4: Create options with tracking. `reason` completes the sentence
    // "Choice _ is incorrect because <reason>." for each distractor.
    const optionsData = [
      { text: distractor1.toString(), isCorrect: false,
        reason: `it is possible but well below the maximum` },
      { text: distractor2.toString(), isCorrect: false,
        reason: `although possible, it is not the maximum` },
      { text: correctAnswer.toString(), isCorrect: true, reason: `` },
      { text: distractor3.toString(), isCorrect: false,
        reason: `it violates the maximum weight constraint` }
    ];

    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    // Distractors in the order they now appear (by letter), each with the
    // rationale that belongs to its own value.
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const distractorSentences = incorrectOptions
      .map(opt => `Choice ${opt.letter} is incorrect because ${opt.reason}.`)
      .join(' ');

    // STEP 6: Build explanation
    const explanation = `Choice ${correctOption.letter} is correct. Let $x$ be the number of $${lighterWeight}$-pound packages and $y$ be the number of $${heavierWeight}$-pound packages. The constraints are: $x + y \\ge ${minPackages}$ and $${lighterWeight}x + ${heavierWeight}y \\le ${adjustedMaxWeight}$. To maximize $y$, set $x = ${minPackages} - y$ and substitute: $${lighterWeight}(${minPackages} - y) + ${heavierWeight}y \\le ${adjustedMaxWeight}$, which simplifies to $y \\le ${correctAnswer}$. ${distractorSentences}`;
    
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
