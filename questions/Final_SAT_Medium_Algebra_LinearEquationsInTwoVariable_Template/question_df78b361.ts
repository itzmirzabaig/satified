import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: df78b361
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 4, 6, total: 36]
 * - Difficulty factors: [Interpreting term in context]
 * - Distractor patterns: [Confusing variable with term value]
 * - Constraints: [Clear interpretation of 6y]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_df78b361 = {
  metadata: {
    // id: "df78b361",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const smallCap = getRandomInt(3, 8);
    const largeCap = getRandomInt(smallCap + 2, 15);
    const total = getRandomInt(30, 60);
    
    // STEP 2: Create options
    const optionsData = [
      { text: `The number of large containers Lily filled`, isCorrect: false },
      { text: `The number of small containers Lily filled`, isCorrect: false },
      { text: `The total number of cups of jam in the large containers`, isCorrect: true },
      { text: `The total number of cups of jam in the small containers`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    return {
      questionText: `Lily made ${total} cups of jam. Lily then filled $x$ small containers and $y$ large containers with all the jam she made. The equation $${smallCap}x + ${largeCap}y = ${total}$ represents this situation. Which is the best interpretation of $${largeCap}y$ in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `Choice ${correctLetter} is correct. The problem states that $y$ represents the number of large containers. The equation $${smallCap}x + ${largeCap}y = ${total}$ represents the total amount of jam. Since the equation sums two terms to get the total cups of jam, each term ($${smallCap}x$ and $${largeCap}y$) must represent a quantity of jam in cups. Since $y$ is the number of large containers, $${largeCap}$ must be the capacity of a large container in cups. Therefore, $${largeCap}y$ represents the total cups of jam in the large containers.`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-0d1b1e35.ts
/**
 * Question ID: 0d1b1e35
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [cups ice cream: 4, bananas: 2, total calcium: 1114, per cup: 276]
 * - Difficulty factors: [Setting up linear equation, solving for unknown]
 * - Distractor patterns: [A: correct, B: forgot to divide by 2, C/D: calculation errors]
 * - Constraints: [Clean integer answer]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */
