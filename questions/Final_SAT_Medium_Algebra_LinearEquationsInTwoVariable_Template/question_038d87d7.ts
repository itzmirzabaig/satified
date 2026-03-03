import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 038d87d7
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [2 hectares, 35 hectares, 3934 trees]
 * - Difficulty factors: [Interpreting linear equation in context]
 * - Distractor patterns: [Similar to 3c03cbd8]
 * - Constraints: [Clear variable interpretation]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_038d87d7 = {
  metadata: {
    // id: "038d87d7",
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
    
    return {
      questionText: `A neighborhood consists of a ${area1}-hectare park and a ${area2}-hectare residential area. The total number of trees in the neighborhood is ${totalTrees.toLocaleString()}. The equation $${area1}x + ${area2}y = ${totalTrees}$ represents this situation. Which of the following is the best interpretation of $x$ in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `Choice ${correctLetter} is correct. Since $${area1}x$ represents the total number of trees in the park and ${area1} is the size of the park in hectares, $x$ represents the average number of trees per hectare in the park.`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-400798d6.ts
/**
 * Question ID: 400798d6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [triangle sides: x, x, y, perimeter: 37]
 * - Difficulty factors: [Interpreting perimeter equation in geometric context]
 * - Distractor patterns: [Confusing sum with difference]
 * - Constraints: [Clear interpretation of constant]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */
