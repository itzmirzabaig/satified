import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1476
 * 
 * ANALYSIS:
 * - Context: Interpreting Linear Models (Word Problem).
 * - Equation: T = A*x + B*y (or similar).
 * - Variables: 
 *   - x = area of old growth (hectares)
 *   - y = area of new growth (hectares)
 *   - T = total trees.
 * - Task: Identify what a coefficient represents.
 */
export const generator_1476 = {
  metadata: {
    id: "1476",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    const treesPerOld = getRandomInt(1000, 1500); // e.g. 1200
    const treesPerNew = getRandomInt(200, 600);   // e.g. 400
    const totalTrees = getRandomInt(3000, 5000);
    
    // Equation: total = treesPerOld * x + treesPerNew * y
    // x = hectares of old growth
    // y = hectares of new growth
    
    // Question: What does the coefficient 'treesPerNew' represent?
    // Answer: Average number of trees per hectare in new growth.
    
    // 2. Options
    const correct = `The average number of trees per hectare in the new growth section`;
    const distractor1 = `The average number of trees per hectare in the old growth section`;
    const distractor2 = `The total number of trees in the new growth section`;
    const distractor3 = `The total number of hectares of new growth`;

    const optionsData = [
      { text: correct, isCorrect: true },
      { text: distractor1, isCorrect: false },
      { text: distractor2, isCorrect: false },
      { text: distractor3, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `An ecologist estimates that there are ${treesPerOld} trees per hectare in an old-growth section of a forest and ${treesPerNew} trees per hectare in a new-growth section. The total number of trees in these two sections combined is ${totalTrees}. The equation $${treesPerOld}x + ${treesPerNew}y = ${totalTrees}$ represents this situation, where $x$ is the number of hectares in the old-growth section and $y$ is the number of hectares in the new-growth section. What is the best interpretation of the number ${treesPerNew} in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
In the equation $${treesPerOld}x + ${treesPerNew}y = ${totalTrees}$:
- $y$ represents the number of hectares of new growth.
- The term ${treesPerNew}y represents the total number of trees in the new-growth section.
- Since $y$ is in hectares, the coefficient ${treesPerNew} must be the rate of trees per hectare for the new growth to make the units work (trees/hectare * hectare = trees).
      
Therefore, ${treesPerNew} represents the average number of trees per hectare in the new-growth section.`
    };
  }
};
