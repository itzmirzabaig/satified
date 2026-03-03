import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 3c03cbd8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [5 hectares, 24 hectares, 4529 trees]
 * - Difficulty factors: [Interpreting linear equation in context]
 * - Distractor patterns: [Confusing x with y, confusing total with average]
 * - Constraints: [Equation: 5x + 24y = 4529]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_3c03cbd8 = {
  metadata: {
    // id: "3c03cbd8",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters similar to original
    const area1 = getRandomInt(2, 10);
    const area2 = getRandomInt(15, 35);
    const totalTrees = getRandomInt(2000, 6000);
    
    // STEP 2: Create options
    const optionsData = [
      { text: `The average number of trees per hectare in the industrial park`, isCorrect: true },
      { text: `The average number of trees per hectare in the neighborhood`, isCorrect: false },
      { text: `The total number of trees in the industrial park`, isCorrect: false },
      { text: `The total number of trees in the neighborhood`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    return {
      questionText: `A certain township consists of a ${area1}-hectare industrial park and a ${area2}-hectare neighborhood. The total number of trees in the township is ${totalTrees.toLocaleString()}. The equation $${area1} x+${area2} y=${totalTrees}$ represents this situation. Which of the following is the best interpretation of $x$ in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `Choice ${correctLetter} is correct. It's given that a certain township consists of a ${area1}-hectare industrial park and a ${area2}-hectare neighborhood and that the total number of trees in the township is ${totalTrees.toLocaleString()}. It's also given that the equation $${area1} x+${area2} y=${totalTrees}$ represents this situation. Since the total number of trees for a given area can be determined by taking the size of the area, in hectares, times the average number of trees per hectare, the best interpretation of $${area1} x$ is the number of trees in the industrial park and the best interpretation of $${area2} y$ is the number of trees in the neighborhood. Since ${area1} is the size of the industrial park, in hectares, the best interpretation of $x$ is the average number of trees per hectare in the industrial park.`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-7625073d.ts
/**
 * Question ID: 7625073d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 7, 7, total: 840, b: 71]
 * - Difficulty factors: [Substitution and solving linear equation]
 * - Distractor patterns: [Not applicable - fill in blank]
 * - Constraints: [g must be positive integer]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */
