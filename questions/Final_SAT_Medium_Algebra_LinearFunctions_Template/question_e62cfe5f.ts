import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: e62cfe5f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 4 (single digit), constant: 0.6 (decimal), weight: 0.5 (decimal)]
 * - Difficulty factors: [Word problem translation, decimal arithmetic]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [None - straightforward evaluation]
 * - Question type: [Text→Fill in Blank]
 * - Figure generation: [None]
 */

export const generator_e62cfe5f = {
  metadata: {
    // id: "e62cfe5f",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Keep coefficient single digit (3-6), constant simple decimal (0.2-0.8), weight simple decimal (0.3-0.7)
    const coef = getRandomInt(3, 6); // coefficient for body weight
    const constant = Math.round((Math.random() * 0.6 + 0.2) * 10) / 10; // constant term (0.2 to 0.8)
    const weight = Math.round((Math.random() * 0.4 + 0.3) * 10) / 10; // body weight (0.3 to 0.7)
    
    // STEP 2: Calculate answer
    const headWidth = constant + coef * weight;
    
    // Format as decimal or fraction if needed
    const correctAnswer = (Math.round(headWidth * 10) / 10).toString();
    
    // STEP 3: Return question data
    return {
      questionText: `According to a model, the head width, in millimeters, of a worker bumblebee can be estimated by adding ${constant} to ${coef} times the body weight of the bee, in grams. According to the model, what would be the head width, in millimeters, of a worker bumblebee that has a body weight of ${weight} grams?`,
      figureCode: null,
      options: null, // Fill in the blank
      correctAnswer: correctAnswer,
      explanation: `The correct answer is ${correctAnswer}. The model is $y = ${constant} + ${coef}x$ where $x$ is body weight in grams. Substituting ${weight} for $x$: $y = ${constant} + ${coef}(${weight}) = ${constant} + ${Math.round(coef * weight * 10) / 10} = ${correctAnswer}$.`
    };
  }
};

/**
 * Question ID: e3cf671f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 4 (single digit), k unknown, f(5)=32, find f(10)]
 * - Difficulty factors: [Two-step: find k, then evaluate at new point]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [k must be integer for clean arithmetic]
 * - Question type: [Text→Fill in Blank]
 * - Figure generation: [None]
 */