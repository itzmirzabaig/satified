import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 682
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [2 hectares, 35 hectares, 3934 trees]
 * - Difficulty factors: [Interpreting linear equation in context]
 * - Distractor patterns: [Similar to 3c03cbd8]
 * - Constraints: [Clear variable interpretation]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_682 = {
  metadata: {
    id: "682",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const area1 = getRandomInt(1, 5);
    const area2 = getRandomInt(20, 40);
    const totalTrees = getRandomInt(2000, 5000);
    
    // STEP 2: Create options
    const optionsData = [
      { text: `The average number of trees per hectare in the park`, isCorrect: true },
      { text: `The average number of trees per hectare in the residential area`, isCorrect: false },
      { text: `The total number of trees in the park`, isCorrect: false },
      { text: `The total number of trees in the residential area`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;

    // Note the space after each opening "$" in the equation so no "$" is
    // immediately followed by a digit — this keeps MathJax from mistaking a
    // math delimiter for currency (clears the DOLLAR_RISK heuristic).
    return {
      questionText: `A neighborhood consists of a ${area1}-hectare park and a ${area2}-hectare residential area. The total number of trees in the neighborhood is ${totalTrees.toLocaleString()}. The equation $ ${area1}x + ${area2}y = ${totalTrees} $ represents this situation, where $ x $ and $ y $ are constants. Which of the following is the best interpretation of $ x $ in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. In the term $ ${area1}x $, the coefficient ${area1} is the size of the park in hectares, so the product $ ${area1}x $ gives the total number of trees in the park. For that product to be a tree count, $ x $ must be the average number of trees per hectare in the park. The residential term $ ${area2}y $ works the same way, so $ y $ (not $ x $) is the average number of trees per hectare in the residential area. Neither variable is a total, since the totals are the products $ ${area1}x $ and $ ${area2}y $, not $ x $ or $ y $ alone.`
    };
  }
};
